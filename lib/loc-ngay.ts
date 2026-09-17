// Lọc khách theo ngày đăng ký, tính theo giờ Việt Nam (UTC+7).

const NGAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const VN = '+07:00';
const MOT_NGAY = 24 * 60 * 60 * 1000;

export type LocNgay = { tu?: string; den?: string };

/** Ngày hôm nay theo giờ VN, dạng YYYY-MM-DD */
export function homNay(offsetDays = 0) {
  return new Date(Date.now() + offsetDays * MOT_NGAY).toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' });
}

export function docLocNgay(params: { tu?: string; den?: string }): LocNgay {
  const hopLe = (v?: string) => (v && NGAY_RE.test(v) && !isNaN(Date.parse(`${v}T00:00:00${VN}`)) ? v : undefined);
  return { tu: hopLe(params.tu), den: hopLe(params.den) };
}

/** Điều kiện Prisma cho cột createdAt; "đến ngày" tính trọn cả ngày đó. */
export function whereNgay({ tu, den }: LocNgay) {
  if (!tu && !den) return {};
  return {
    createdAt: {
      ...(tu && { gte: new Date(`${tu}T00:00:00${VN}`) }),
      ...(den && { lt: new Date(new Date(`${den}T00:00:00${VN}`).getTime() + MOT_NGAY) }),
    },
  };
}

/** Các nút chọn nhanh khoảng ngày */
export function khoangNhanh() {
  const today = homNay();
  return [
    { nhan: 'Hôm nay', tu: today, den: today },
    { nhan: 'Hôm qua', tu: homNay(-1), den: homNay(-1) },
    { nhan: '7 ngày', tu: homNay(-6), den: today },
    { nhan: '30 ngày', tu: homNay(-29), den: today },
    { nhan: 'Tháng này', tu: today.slice(0, 8) + '01', den: today },
  ];
}
