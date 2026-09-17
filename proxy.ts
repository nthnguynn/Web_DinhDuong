import { NextResponse, type NextRequest } from 'next/server';

// Khoá trang /quan-tri bằng tài khoản/mật khẩu trong .env (ADMIN_USER, ADMIN_PASSWORD).
export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (user && password) {
    const header = request.headers.get('authorization') ?? '';
    const [scheme, encoded] = header.split(' ');
    if (scheme === 'Basic' && encoded && atob(encoded) === `${user}:${password}`) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Cần đăng nhập để xem trang quản trị.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Quan tri", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ['/quan-tri/:path*'],
};
