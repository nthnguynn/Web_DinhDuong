-- CreateEnum
CREATE TYPE "TrangThai" AS ENUM ('MOI', 'DA_LIEN_HE', 'DA_CHOT', 'HUY');

-- CreateTable
CREATE TABLE "lien_he" (
    "id" SERIAL NOT NULL,
    "ten" TEXT NOT NULL,
    "sdt" TEXT NOT NULL,
    "email" TEXT,
    "chu_de" TEXT,
    "loi_nhan" TEXT,
    "nguon" TEXT NOT NULL DEFAULT 'lien-he',
    "trang_thai" "TrangThai" NOT NULL DEFAULT 'MOI',
    "ghi_chu" TEXT,
    "ip" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lien_he_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lien_he_created_at_idx" ON "lien_he"("created_at");

-- CreateIndex
CREATE INDEX "lien_he_trang_thai_idx" ON "lien_he"("trang_thai");
