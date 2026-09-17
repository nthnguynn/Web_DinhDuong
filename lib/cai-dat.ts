import { prisma } from '@/lib/prisma';

export type CaiDatData = {
  zaloGroupUrl: string | null;
  popupBatSau: number;
  popupLapLai: number;
  popupToiDa: number;
  popupCuon: number;
};

const MAC_DINH: CaiDatData = { zaloGroupUrl: null, popupBatSau: 15, popupLapLai: 60, popupToiDa: 3, popupCuon: 20 };

export async function getCaiDat(): Promise<CaiDatData> {
  const row = await prisma.caiDat.findUnique({ where: { id: 1 } });
  if (!row) return MAC_DINH;
  const { zaloGroupUrl, popupBatSau, popupLapLai, popupToiDa, popupCuon } = row;
  return { zaloGroupUrl, popupBatSau, popupLapLai, popupToiDa, popupCuon };
}

export async function saveCaiDat(data: CaiDatData) {
  await prisma.caiDat.upsert({ where: { id: 1 }, create: { id: 1, ...data }, update: data });
}

/** Chỉ nhận link https:// để không ai chèn được link độc (javascript:...) vào nút chuyển trang. */
export function isHttpsUrl(v: string) {
  try {
    return new URL(v).protocol === 'https:';
  } catch {
    return false;
  }
}
