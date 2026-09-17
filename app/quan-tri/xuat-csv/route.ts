import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CHU_DE, NGUON } from '@/lib/lien-he';
import { docLocNgay, whereNgay } from '@/lib/loc-ngay';
import type { TrangThai } from '@/lib/generated/prisma/enums';

export const dynamic = 'force-dynamic';

const TRANG_THAI = ['MOI', 'DA_LIEN_HE', 'DA_CHOT', 'HUY'];
const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;

// Xuất đúng những gì đang lọc trên trang /quan-tri (?tu=&den=&loc=)
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const ngay = docLocNgay({ tu: sp.get('tu') ?? undefined, den: sp.get('den') ?? undefined });
  const loc = sp.get('loc');

  const rows = await prisma.lienHe.findMany({
    where: { ...whereNgay(ngay), ...(loc && TRANG_THAI.includes(loc) && { trangThai: loc as TrangThai }) },
    orderBy: { createdAt: 'desc' },
  });
  const header = ['ID', 'Thời gian', 'Nguồn', 'Tên', 'Số điện thoại', 'Email', 'Chủ đề', 'Lời nhắn', 'Trạng thái', 'Ghi chú'];
  const lines = rows.map((r) =>
    [
      r.id,
      r.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      NGUON[r.nguon] ?? r.nguon,
      r.ten,
      r.sdt,
      r.email,
      r.chuDe ? (CHU_DE[r.chuDe] ?? r.chuDe) : '',
      r.loiNhan,
      r.trangThai,
      r.ghiChu,
    ]
      .map(cell)
      .join(','),
  );
  // BOM ở đầu file để Excel đọc đúng tiếng Việt
  const csv = '﻿' + [header.map(cell).join(','), ...lines].join('\r\n');
  const ten = ngay.tu || ngay.den ? `${ngay.tu ?? 'dau'}_den_${ngay.den ?? 'nay'}` : new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="khach-hang-${ten}.csv"`,
    },
  });
}
