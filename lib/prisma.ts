import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

// Khi dev, hot reload chạy lại file này liên tục → giữ 1 kết nối trên globalThis để không mở thêm.
// Nhưng sau khi đổi schema (prisma migrate / generate), class PrismaClient là class mới:
// kết nối cũ không biết bảng mới (lỗi "reading 'findUnique'") → bỏ kết nối cũ, tạo lại.
const globalForPrisma = globalThis as unknown as { prisma?: { $disconnect(): Promise<void> } };

function createClient() {
  return new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
}

const cached = globalForPrisma.prisma;
if (cached && !(cached instanceof PrismaClient)) {
  void cached.$disconnect().catch(() => {});
}

export const prisma = cached instanceof PrismaClient ? cached : createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
