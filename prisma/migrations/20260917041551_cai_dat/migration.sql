-- CreateTable
CREATE TABLE "cai_dat" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "zalo_group_url" TEXT,
    "popup_bat_sau" INTEGER NOT NULL DEFAULT 15,
    "popup_lap_lai" INTEGER NOT NULL DEFAULT 60,
    "popup_toi_da" INTEGER NOT NULL DEFAULT 3,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cai_dat_pkey" PRIMARY KEY ("id")
);
