// Kiểm tra dữ liệu form ở phía server — cùng luật với main.js (không tin trình duyệt).

export const CHU_DE: Record<string, string> = {
  'ca-nhan': 'Tư vấn dinh dưỡng cá nhân',
  'gia-dinh': 'Thực đơn cho cả gia đình',
  '90-ngay': 'Chương trình đồng hành 90 ngày',
  'cong-dong': 'Mời chia sẻ / đào tạo',
  khac: 'Điều khác',
};

export const NGUON: Record<string, string> = {
  popup: 'Popup giữ chỗ',
  'lien-he': 'Form liên hệ',
};

export type LienHeInput = {
  ten: string;
  sdt: string;
  email: string | null;
  chuDe: string | null;
  loiNhan: string | null;
  nguon: string;
};

type Result = { ok: true; data: LienHeInput } | { ok: false; errors: Record<string, string> };

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function validateLienHe(raw: Record<string, unknown>): Result {
  const nguon = str(raw['nguon'], 20) in NGUON ? str(raw['nguon'], 20) : 'lien-he';
  const ten = str(raw['ten'], 100);
  const sdt = str(raw['sdt'], 30);
  const email = str(raw['email'], 200);
  const chuDe = str(raw['chu-de'], 30);
  const loiNhan = str(raw['loi-nhan'], 5000);
  const errors: Record<string, string> = {};

  if (ten.length < 2) errors.ten = 'Bạn cho tôi biết tên gọi nhé.';
  if (!/^(\+?84|0)\d{8,10}$/.test(sdt.replace(/[^\d+]/g, ''))) errors.sdt = 'Số điện thoại chưa đúng định dạng.';

  // Popup bắt buộc email; form liên hệ thì không bắt buộc.
  if (email ? !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) : nguon === 'popup') {
    errors.email = email ? 'Email chưa đúng định dạng.' : 'Bạn điền email giúp tôi nhé.';
  }

  if (nguon === 'lien-he') {
    if (loiNhan.length < 10) errors['loi-nhan'] = 'Viết giúp tôi vài dòng (ít nhất 10 ký tự).';
    if (!raw['dong-y']) errors['dong-y'] = 'Bạn cần đồng ý để tôi có thể liên hệ lại.';
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      ten,
      sdt,
      email: email || null,
      chuDe: chuDe in CHU_DE ? chuDe : null,
      loiNhan: loiNhan || null,
      nguon,
    },
  };
}
