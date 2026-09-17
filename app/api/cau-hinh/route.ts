import { NextResponse } from 'next/server';
import { getCaiDat } from '@/lib/cai-dat';

export const dynamic = 'force-dynamic';

// main.js gọi khi tải trang để biết lúc nào tự bật popup (chỉnh trong /quan-tri/cai-dat).
export async function GET() {
  try {
    const { popupBatSau, popupLapLai, popupToiDa, popupCuon } = await getCaiDat();
    return NextResponse.json({ popupBatSau, popupLapLai, popupToiDa, popupCuon });
  } catch (err) {
    console.error('[api/cau-hinh] Đọc cài đặt lỗi:', err);
    return NextResponse.json({ popupBatSau: 0, popupLapLai: 0, popupToiDa: 0, popupCuon: 0 });
  }
}
