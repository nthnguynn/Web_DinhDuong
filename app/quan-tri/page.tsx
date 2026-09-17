import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { CHU_DE, NGUON } from '@/lib/lien-he';
import { docLocNgay, khoangNhanh, whereNgay } from '@/lib/loc-ngay';
import type { TrangThai } from '@/lib/generated/prisma/enums';

export const metadata: Metadata = { title: 'Quản trị — Khách để lại thông tin', robots: { index: false } };
export const dynamic = 'force-dynamic';

const TRANG_THAI: Record<TrangThai, string> = {
  MOI: 'Mới',
  DA_LIEN_HE: 'Đã liên hệ',
  DA_CHOT: 'Đã đăng ký',
  HUY: 'Huỷ / spam',
};
const TAT_CA = Object.keys(TRANG_THAI) as TrangThai[];

async function capNhat(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const trangThai = String(formData.get('trangThai')) as TrangThai;
  if (!Number.isInteger(id) || !(trangThai in TRANG_THAI)) return;
  await prisma.lienHe.update({
    where: { id },
    data: { trangThai, ghiChu: String(formData.get('ghiChu') ?? '').slice(0, 2000) || null },
  });
  revalidatePath('/quan-tri');
}

const fmt = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh' });
const fmtNgay = (d: string) => d.split('-').reverse().join('/');

type Params = { loc?: string; tu?: string; den?: string };

/** Tạo query string, bỏ các giá trị trống */
function qs(p: Params) {
  const s = new URLSearchParams(Object.entries(p).filter(([, v]) => v) as [string, string][]).toString();
  return s ? `?${s}` : '';
}

export default async function QuanTri({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const filter = params.loc && params.loc in TRANG_THAI ? (params.loc as TrangThai) : undefined;
  const ngay = docLocNgay(params);
  const whereDate = whereNgay(ngay);
  const coLocNgay = Boolean(ngay.tu || ngay.den);

  const [rows, counts] = await Promise.all([
    prisma.lienHe.findMany({
      where: { ...whereDate, ...(filter && { trangThai: filter }) },
      orderBy: { createdAt: 'desc' },
      take: 500,
    }),
    prisma.lienHe.groupBy({ by: ['trangThai'], where: whereDate, _count: { _all: true } }),
  ]);
  const countOf = (t: TrangThai) => counts.find((c) => c.trangThai === t)?._count._all ?? 0;
  const total = counts.reduce((sum, c) => sum + c._count._all, 0);

  const moTaNgay = !coLocNgay
    ? 'mọi thời gian'
    : ngay.tu === ngay.den
      ? `ngày ${fmtNgay(ngay.tu!)}`
      : `${ngay.tu ? `từ ${fmtNgay(ngay.tu)}` : ''} ${ngay.den ? `đến ${fmtNgay(ngay.den)}` : ''}`.trim();

  return (
    <main className="qt">
      <header className="qt__head">
        <div>
          <h1>Khách để lại thông tin</h1>
          <p>
            {total} lượt · {moTaNgay} · hiển thị tối đa 500 dòng mới nhất
          </p>
        </div>
        <a className="btn btn--sm btn--jade" href={`/quan-tri/xuat-csv${qs({ ...ngay, loc: filter })}`}>
          Tải file Excel (CSV)
        </a>
      </header>

      <section className="qt-dates" aria-label="Lọc theo ngày đăng ký">
        <form method="get" action="/quan-tri" className="qt-dates__form">
          {filter && <input type="hidden" name="loc" value={filter} />}
          <label>
            Từ ngày
            <input type="date" name="tu" defaultValue={ngay.tu} />
          </label>
          <label>
            Đến ngày
            <input type="date" name="den" defaultValue={ngay.den} />
          </label>
          <button className="btn btn--sm btn--gold" type="submit">Lọc</button>
          {coLocNgay && (
            <a className="qt-dates__clear" href={`/quan-tri${qs({ loc: filter })}`}>
              Bỏ lọc ngày
            </a>
          )}
        </form>
        <div className="qt-dates__quick">
          {khoangNhanh().map((k) => (
            <a
              key={k.nhan}
              href={`/quan-tri${qs({ loc: filter, tu: k.tu, den: k.den })}`}
              aria-current={ngay.tu === k.tu && ngay.den === k.den ? 'true' : undefined}
            >
              {k.nhan}
            </a>
          ))}
        </div>
      </section>

      <nav className="qt__tabs" aria-label="Lọc theo trạng thái">
        <a href={`/quan-tri${qs(ngay)}`} aria-current={!filter ? 'page' : undefined}>
          Tất cả ({total})
        </a>
        {TAT_CA.map((t) => (
          <a key={t} href={`/quan-tri${qs({ ...ngay, loc: t })}`} aria-current={filter === t ? 'page' : undefined}>
            {TRANG_THAI[t]} ({countOf(t)})
          </a>
        ))}
      </nav>

      {rows.length === 0 ? (
        <p className="qt__empty">{coLocNgay || filter ? 'Không có khách nào khớp bộ lọc.' : 'Chưa có ai để lại thông tin.'}</p>
      ) : (
        <div className="qt__table-wrap">
          <table className="qt__table">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Khách</th>
                <th>Nội dung</th>
                <th>Xử lý</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} data-status={r.trangThai}>
                  <td className="qt__time">
                    {fmt.format(r.createdAt)}
                    <span className="qt__tag">{NGUON[r.nguon] ?? r.nguon}</span>
                  </td>
                  <td>
                    <strong>{r.ten}</strong>
                    <a href={`tel:${r.sdt.replace(/[^\d+]/g, '')}`}>{r.sdt}</a>
                    {r.email && <a href={`mailto:${r.email}`}>{r.email}</a>}
                  </td>
                  <td>
                    {r.chuDe && <em>{CHU_DE[r.chuDe] ?? r.chuDe}</em>}
                    {r.loiNhan && <p>{r.loiNhan}</p>}
                  </td>
                  <td>
                    <form action={capNhat} className="qt__form">
                      <input type="hidden" name="id" value={r.id} />
                      <select name="trangThai" defaultValue={r.trangThai} aria-label="Trạng thái">
                        {TAT_CA.map((t) => (
                          <option key={t} value={t}>
                            {TRANG_THAI[t]}
                          </option>
                        ))}
                      </select>
                      <textarea name="ghiChu" defaultValue={r.ghiChu ?? ''} rows={2} placeholder="Ghi chú…" aria-label="Ghi chú" />
                      <button className="btn btn--sm btn--gold" type="submit">Lưu</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
