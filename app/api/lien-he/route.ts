import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateLienHe } from '@/lib/lien-he';
import { getCaiDat } from '@/lib/cai-dat';

// Chặn gửi dồn dập: tối đa 5 lần / 10 phút cho mỗi IP (lưu trong bộ nhớ, đủ cho 1 server).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  let raw: Record<string, unknown>;
  try {
    raw = request.headers.get('content-type')?.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return NextResponse.json({ ok: false, message: 'Dữ liệu gửi lên không hợp lệ.' }, { status: 400 });
  }

  // Ô "website" bị ẩn với người thật — có giá trị tức là bot. Trả về ok để bot không thử lại.
  if (typeof raw['website'] === 'string' && raw['website'].trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (tooMany(ip)) {
    return NextResponse.json({ ok: false, message: 'Bạn gửi hơi nhiều lần, thử lại sau ít phút nhé.' }, { status: 429 });
  }

  const result = validateLienHe(raw);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: 'Còn vài ô cần bạn xem lại giúp tôi.', errors: result.errors }, { status: 422 });
  }

  try {
    await prisma.lienHe.create({
      data: { ...result.data, ip, userAgent: request.headers.get('user-agent')?.slice(0, 300) ?? null },
    });
  } catch (err) {
    console.error('[api/lien-he] Lưu database lỗi:', err);
    return NextResponse.json({ ok: false, message: 'Hệ thống đang bận, bạn thử lại sau nhé.' }, { status: 500 });
  }

  // Gửi xong → trình duyệt chuyển khách vào nhóm Zalo (link chỉnh trong /quan-tri/cai-dat).
  // Đọc cài đặt lỗi thì vẫn báo gửi thành công, chỉ là không chuyển.
  const redirect = await getCaiDat()
    .then((c) => c.zaloGroupUrl)
    .catch(() => null);
  return NextResponse.json({ ok: true, redirect });
}
