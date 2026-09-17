import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCaiDat, isHttpsUrl, saveCaiDat } from '@/lib/cai-dat';

export const metadata: Metadata = { title: 'Quản trị — Cài đặt', robots: { index: false } };
export const dynamic = 'force-dynamic';

const soGiay = (v: FormDataEntryValue | null, max: number) => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0;
};

async function luu(formData: FormData) {
  'use server';
  const url = String(formData.get('zaloGroupUrl') ?? '').trim();
  if (url && !isHttpsUrl(url)) redirect('/quan-tri/cai-dat?loi=url');

  await saveCaiDat({
    zaloGroupUrl: url || null,
    popupBatSau: soGiay(formData.get('popupBatSau'), 3600),
    popupLapLai: soGiay(formData.get('popupLapLai'), 86400),
    popupToiDa: soGiay(formData.get('popupToiDa'), 100),
    popupCuon: soGiay(formData.get('popupCuon'), 100),
  });
  redirect('/quan-tri/cai-dat?da-luu=1');
}

export default async function CaiDatPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const c = await getCaiDat();

  return (
    <main className="qt">
      <header className="qt__head">
        <div>
          <h1>Cài đặt</h1>
          <p>Lưu xong áp dụng ngay, không cần sửa code hay khởi động lại.</p>
        </div>
      </header>

      {params['da-luu'] && <p className="qt__flash qt__flash--ok" role="status">Đã lưu cài đặt.</p>}
      {params.loi === 'url' && (
        <p className="qt__flash qt__flash--err" role="alert">Link nhóm Zalo phải bắt đầu bằng https:// — chưa lưu gì cả.</p>
      )}

      <form action={luu} className="qt-settings">
        <fieldset>
          <legend>Nhóm Zalo</legend>
          <label htmlFor="zaloGroupUrl">Link mời vào nhóm</label>
          <input
            id="zaloGroupUrl"
            name="zaloGroupUrl"
            type="url"
            inputMode="url"
            placeholder="https://zalo.me/g/abcxyz"
            defaultValue={c.zaloGroupUrl ?? ''}
          />
          <p className="qt-settings__hint">
            Khách gửi form xong sẽ được chuyển vào nhóm này. Lấy link trong Zalo: vào nhóm → Tuỳ chọn → Link tham gia nhóm.
            Để trống = không chuyển.
          </p>
          {c.zaloGroupUrl && (
            <a className="qt-settings__test" href={c.zaloGroupUrl} target="_blank" rel="noopener noreferrer">
              Mở thử link đang dùng ↗
            </a>
          )}
        </fieldset>

        <fieldset>
          <legend>Popup giữ chỗ tự hiện</legend>
          <div className="qt-settings__grid">
            <div>
              <label htmlFor="popupBatSau">Hiện lần đầu sau (giây)</label>
              <input id="popupBatSau" name="popupBatSau" type="number" min={0} max={3600} defaultValue={c.popupBatSau} />
              <p className="qt-settings__hint">0 = không tự hiện theo thời gian.</p>
            </div>
            <div>
              <label htmlFor="popupCuon">Hoặc khi khách cuộn tới (% trang)</label>
              <input id="popupCuon" name="popupCuon" type="number" min={0} max={100} defaultValue={c.popupCuon} />
              <p className="qt-settings__hint">
                Vd. 20 = cuộn qua khoảng 1/5 trang là hiện, không cần chờ đủ giây. 0 = tắt. Cái nào tới trước thì hiện trước.
              </p>
            </div>
            <div>
              <label htmlFor="popupLapLai">Khách đóng thì hiện lại sau (giây)</label>
              <input id="popupLapLai" name="popupLapLai" type="number" min={0} max={86400} defaultValue={c.popupLapLai} />
              <p className="qt-settings__hint">0 = đóng rồi thì thôi, không hiện lại.</p>
            </div>
            <div>
              <label htmlFor="popupToiDa">Tự hiện tối đa (lần / lượt truy cập)</label>
              <input id="popupToiDa" name="popupToiDa" type="number" min={0} max={100} defaultValue={c.popupToiDa} />
              <p className="qt-settings__hint">0 = không giới hạn. Nên để 3–5 để khách không khó chịu.</p>
            </div>
          </div>
          <p className="qt-settings__hint">
            Để cả &quot;số giây&quot; và &quot;% trang&quot; bằng 0 thì popup chỉ mở khi khách bấm nút. Khách đã đăng ký rồi thì popup không tự hiện nữa. Popup cũng không chen ngang khi khách đang gõ form Liên hệ,
            đang xem ảnh hoặc đang mở menu.
          </p>
        </fieldset>

        <button className="btn btn--gold" type="submit">Lưu cài đặt</button>
      </form>
    </main>
  );
}
