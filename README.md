# Website Tạ Thị Nga — Dinh dưỡng & Sức khoẻ gia đình

Website thương hiệu cá nhân một trang, chạy bằng **Next.js 16 + Prisma 7 + PostgreSQL**.

- **Popup giữ chỗ** tự hiện sau vài giây hoặc khi khách cuộn tới một đoạn trang, khách đóng thì một lúc sau lại hiện (tới khi khách đăng ký); bấm các nút "Đặt lịch trò chuyện / Nhận tư vấn miễn phí" cũng mở popup
- Điền tên, số điện thoại, email → **lưu vào database** → **tự chuyển khách vào nhóm Zalo**
- Trang **`/quan-tri`** (có mật khẩu): danh sách khách, lọc theo ngày đăng ký và trạng thái, ghi chú, tải file Excel; **cài đặt link nhóm Zalo và thời gian hiện popup**
---

## 1. Chạy trên máy

Cần: Node.js 20+ và PostgreSQL (máy này đã có PostgreSQL 17, tài khoản `postgres/postgres`).

```bash
npm install
cp .env.example .env        # rồi sửa DATABASE_URL, mật khẩu quản trị, link nhóm Zalo
npx prisma migrate deploy   # tạo database + bảng (chạy 1 lần, hoặc sau khi thêm migration mới)
npm run dev                 # mở http://localhost:3005
```

Nếu form báo **"Hệ thống đang bận"** → server không ghi được vào database. Kiểm tra:
PostgreSQL có đang chạy không, `DATABASE_URL` trong `.env` đúng chưa, đã chạy `npx prisma migrate deploy` chưa.
Lỗi chi tiết in ra ở terminal đang chạy `npm run dev`.

### Biến môi trường (`.env`)

| Biến | Ý nghĩa |
|---|---|
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL |
| `ADMIN_USER`, `ADMIN_PASSWORD` | Tài khoản vào `/quan-tri`. **Đặt mật khẩu mạnh trước khi đưa lên mạng.** Để trống = khoá hẳn trang quản trị |

Link nhóm Zalo và thời gian popup **không** nằm ở đây, mà chỉnh trong `/quan-tri/cai-dat`.

Sửa `.env` xong phải khởi động lại server (`npm run dev` hoặc `pm2 restart`).

---

## 1b. Trang quản trị (CMS) — `/quan-tri`

Vào `https://ten-mien/quan-tri`, trình duyệt hỏi tài khoản/mật khẩu (`ADMIN_USER` / `ADMIN_PASSWORD`).

**Danh sách khách** (`/quan-tri`)
- Khách mới nhất ở trên, dòng **Mới** có vạch vàng bên trái; cột "Thời gian" ghi nguồn: **Popup giữ chỗ** hoặc **Form liên hệ**
- **Lọc ngày đăng ký**: chọn Từ ngày / Đến ngày, hoặc bấm nhanh Hôm nay · Hôm qua · 7 ngày · 30 ngày · Tháng này (giờ Việt Nam)
- Lọc theo trạng thái; đổi trạng thái (Mới → Đã liên hệ → Đã đăng ký / Huỷ), ghi chú, bấm **Lưu**
- **Tải file Excel (CSV)** — xuất đúng những khách đang lọc, mở thẳng bằng Excel, đúng dấu tiếng Việt

**Cài đặt** (`/quan-tri/cai-dat`) — lưu xong áp dụng ngay:
- **Link nhóm Zalo**: khách gửi form xong được chuyển vào nhóm này (trống = không chuyển)
- **Popup tự hiện**: hiện lần đầu sau N giây **hoặc** khi khách cuộn tới N% trang (cái nào tới trước) · khách đóng thì N giây sau hiện lại · tối đa N lần mỗi lượt truy cập.
  Mặc định 15 giây / cuộn 20% / 60 giây / 3 lần. Đặt cả "số giây" và "% trang" = 0 thì popup chỉ mở khi bấm nút.
  Khách đã đăng ký thì popup thôi tự hiện; popup không chen ngang khi khách đang gõ form Liên hệ, xem ảnh hay mở menu.
- Xem/sửa dữ liệu thô: `npm run db:studio`

---

## 2. Cấu trúc thư mục

```
Web_DinhDuong/
├── app/
│   ├── layout.tsx              ← thẻ <head>: tiêu đề, mô tả SEO, ảnh chia sẻ
│   ├── page.tsx                ← TOÀN BỘ nội dung chữ của trang (trước đây là index.html)
│   ├── api/lien-he/route.ts    ← nhận form, kiểm tra, lưu database, trả link Zalo
│   ├── api/cau-hinh/route.ts   ← cho main.js biết thời gian tự hiện popup
│   └── quan-tri/               ← CMS: danh sách khách, lọc ngày, xuất CSV, cai-dat/ (Zalo, popup)
├── lib/
│   ├── prisma.ts               ← kết nối database
│   ├── lien-he.ts              ← luật kiểm tra form phía server, tên chủ đề
│   ├── cai-dat.ts              ← đọc/ghi cài đặt (link Zalo, popup)
│   └── loc-ngay.ts             ← lọc theo ngày (giờ Việt Nam)
├── prisma/
│   ├── schema.prisma           ← bảng lien_he (khách) và cai_dat (cài đặt)
│   └── migrations/             ← lịch sử thay đổi database (phải đưa lên git)
├── proxy.ts                    ← khoá /quan-tri bằng mật khẩu
├── public/
│   ├── robots.txt, sitemap.xml
│   └── assets/
│       ├── css/styles.css      ← toàn bộ giao diện, hệ màu ở đầu file (mục 21b = popup)
│       ├── js/main.js          ← menu, hiệu ứng, slider, form, popup (mục 10–11)
│       ├── fonts/
│       └── img/                ← ảnh — đây là chỗ bạn cần thay
└── .env                        ← mật khẩu, database (KHÔNG đưa lên git)
```

Sửa chữ trong `app/page.tsx` giống sửa HTML, chỉ khác: `class` → `className`, `for` → `htmlFor`,
chú thích viết `{/* ... */}`.

**Popup:** chữ trong popup nằm cuối `app/page.tsx` (tìm `lead-modal`). Thời gian tự hiện chỉnh trong `/quan-tri/cai-dat`.
Nút nào có thuộc tính `data-open-lead` thì bấm vào sẽ mở popup.

---

## 3. Ý nghĩa hệ màu (phần này là điểm khác biệt của trang)

Mỗi màu được chọn để kể một phần câu chuyện, không phải chọn cho đẹp mắt:

| Màu | Mã | Ý nghĩa |
|---|---|---|
| **Ngọc bích** | `#12312A` → `#2F7357` | Sức khoẻ, sự sống, mầm cây. Màu chủ đạo — nghề dinh dưỡng và sự vững chãi. |
| **Vàng lúa** | `#A8762A` → `#EFDCB6` | Mùa gặt **sau** những năm hy sinh. Chỉ dùng làm điểm nhấn: chỗ nào có vàng, chỗ đó là thành quả. |
| **Hồng sen** | `#C97B77` | Người phụ nữ, người mẹ — sen mọc lên từ bùn. Dùng rất tiết chế, cho phần ký ức. |
| **Nâu đất** | `#2A2118` | Cội nguồn, gia đình, chữ nghĩa. Màu của chữ. |
| **Kem gạo** | `#FCF9F3` | Nền mộc mạc, ấm, không chói mắt người lớn tuổi. |

Tỉ lệ dùng: **60% kem/trắng · 25% ngọc bích · 10% nâu đất · 5% vàng + sen.**
Giữ đúng tỉ lệ này thì trang sẽ luôn sang; đổ vàng tràn lan là hỏng ngay.

Muốn đổi màu: sửa các biến trong khối `:root` ở đầu [assets/css/styles.css](assets/css/styles.css).
Đổi ở đó một chỗ là cả trang đổi theo.

---

## 4. Việc cần làm trước khi đưa lên mạng

Đây là danh sách bắt buộc. Nội dung hiện tại là **bản mẫu** dựa trên câu chuyện bạn kể.

### 4.1 Thay ảnh thật ⚠️ quan trọng nhất

Tất cả ảnh trong `assets/img/` đang là ảnh giả (SVG có chữ "Ảnh chân dung"…).
Chép ảnh thật vào thư mục đó, đặt **đúng tên file**, rồi sửa đuôi `.svg` → `.jpg` trong `app/page.tsx`:

| File cần thay | Dùng ở đâu | Kích thước nên dùng |
|---|---|---|
| `chan-dung-hero.svg` | Ảnh lớn đầu trang | 900 × 1150 (dọc) |
| `chan-dung-cau-chuyen.svg` | Mục "Câu chuyện" | 860 × 1080 (dọc) |
| `thu-vien-1…6.svg` | Thư viện ảnh | 900 × 1120 (dọc) / 900 × 700 (ngang) |
| `avatar-1…4.svg` | Ảnh người gửi cảm nhận | 160 × 160 (vuông) |
| `bai-viet-1…3.svg` | Ảnh bài viết | 800 × 520 |
| `og-image.svg` | Ảnh hiện khi chia sẻ Facebook/Zalo | 1200 × 630 |
| `favicon.svg` | Icon trên tab trình duyệt | 64 × 64 |

Ví dụ trong `app/page.tsx`:
```html
<!-- từ -->
<img src="/assets/img/chan-dung-hero.svg" alt="Chân dung Tạ Thị Nga" ... />
<!-- thành -->
<img src="/assets/img/chan-dung-hero.jpg" alt="Chân dung Tạ Thị Nga" ... />
```

> Mẹo: nén ảnh bằng [squoosh.app](https://squoosh.app) xuống dưới 300 KB mỗi tấm,
> xuất định dạng WebP nếu được — trang sẽ mở nhanh hơn nhiều trên mạng 3G/4G.

### 4.2 Thay thông tin liên hệ

Tìm và thay trong `app/page.tsx` (dùng Ctrl+F / Cmd+F):

- `0900 000 000` → số điện thoại thật (cả trong `public/assets/js/main.js`) (đổi cả trong `tel:+84900000000` — bỏ số 0 đầu, thêm `+84`)
- `lienhe@ngadinhduong.com` → email thật
- `https://zalo.me/` → link Zalo thật
- `https://facebook.com/` → link Facebook thật
- `https://youtube.com/`, `https://tiktok.com/` → link thật, **hoặc xoá hẳn thẻ `<a>` đó** nếu không dùng
- `https://ngadinhduong.com` → tên miền thật (có ở `app/layout.tsx`, `public/robots.txt`, `public/sitemap.xml`)
- `Hà Nội` → địa phương thật

### 4.3 Thay lời cảm nhận ⚠️ bắt buộc

Bốn lời cảm nhận ở mục **Cảm nhận** là **nội dung mẫu do máy viết**, không phải người thật.
Trong `app/page.tsx` có ghi chú `{/* LƯU Ý ... */}` ngay trên khối đó.

**Phải thay bằng cảm nhận thật và phải xin phép người viết trước khi đăng tên/ảnh họ.**
Đăng cảm nhận bịa là vi phạm quy định quảng cáo và làm mất uy tín — đúng thứ mà cả
trang này đang cố xây dựng.

Nếu chưa kịp xin, cách an toàn: **xoá tạm cả mục Cảm nhận** — xoá đoạn từ
`<section className="section testimonials" id="cam-nhan">` đến `</section>` tương ứng,
và xoá dòng `<li><a href="#cam-nhan">Cảm nhận</a></li>` trong menu.

### 4.4 Kiểm tra lại các con số

`24+ năm`, `1.200+ gia đình`, `86 buổi chia sẻ` là con số ước lượng.
Sửa trong `app/page.tsx` ở thuộc tính `data-count`:

```html
<span class="count" data-count="1200">0</span>+
```

Chỉ ghi con số bạn chứng minh được.

### 4.5 Câu chuyện & mốc thời gian

Phần "Câu chuyện" và "Hành trình" viết dựa trên những gì bạn kể (con cả, nghỉ học
cho em gái và em trai đi học). Hãy đọc lại **cùng cô Nga** và sửa cho đúng sự thật:
mốc tuổi, nghề đã làm, năm bắt đầu học dinh dưỡng, tên các em…

Chi tiết thật luôn cảm động hơn chi tiết hay.

---

## 5. Form lưu vào đâu?

Cả popup và form ở mục Liên hệ đều gửi về `/api/lien-he` → lưu vào bảng `lien_he` trong PostgreSQL
→ hiện ở `/quan-tri` → trình duyệt chuyển khách vào nhóm Zalo (link đặt ở `/quan-tri/cai-dat`).

Chống spam có sẵn: ô bẫy bot ẩn, giới hạn 5 lần gửi / 10 phút mỗi IP, kiểm tra lại dữ liệu ở server.

Thêm cột mới cho form (ví dụ "Năm sinh"): sửa `prisma/schema.prisma` → chạy
`npm run db:migrate` → thêm ô vào `app/page.tsx` và luật vào `lib/lien-he.ts`.

---

## 6. Đưa lên server (VPS Ubuntu)

Trang **cần Node.js và PostgreSQL** chạy liên tục — không dùng được Netlify Drop, GitHub Pages hay hosting cPanel chỉ có PHP.

```bash
# 1. Cài một lần trên server
sudo apt install -y postgresql nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm i -g pm2
sudo -u postgres psql -c "CREATE USER nga WITH PASSWORD 'mat-khau-manh';"
sudo -u postgres psql -c "CREATE DATABASE dinhduong OWNER nga;"

# 2. Lấy code
git clone <link-repo> /var/www/dinhduong && cd /var/www/dinhduong
cp .env.example .env && nano .env
#   DATABASE_URL="postgresql://nga:mat-khau-manh@localhost:5432/dinhduong?schema=public"
#   ADMIN_PASSWORD = mật khẩu mạnh (link Zalo nhập sau trong /quan-tri/cai-dat)

# 3. Build & chạy
npm ci
npx prisma migrate deploy
npm run build
pm2 start npm --name dinhduong -- start      # chạy ở cổng 3005
pm2 save && pm2 startup
```

Nginx trỏ tên miền về cổng 3005 (`/etc/nginx/sites-available/dinhduong`):

```nginx
server {
  server_name ngadinhduong.com www.ngadinhduong.com;
  location / {
    proxy_pass http://127.0.0.1:3005;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Bật HTTPS: `sudo certbot --nginx -d ngadinhduong.com -d www.ngadinhduong.com`
(bắt buộc — trang quản trị gửi mật khẩu, không có HTTPS là lộ).

**Cập nhật code về sau:**

```bash
cd /var/www/dinhduong && git pull && npm ci && npx prisma migrate deploy && npm run build && pm2 restart dinhduong
```

Muốn dùng Vercel thay VPS: tạo database PostgreSQL online (Neon, Supabase, Prisma Postgres),
đặt 4 biến môi trường trong Vercel, build command giữ nguyên `npm run build`, và chạy
`npx prisma migrate deploy` với `DATABASE_URL` của database đó.

---

## 7. Những gì đã có sẵn trong trang

**Nội dung** — 13 phần: Đầu trang · Câu chuyện · Hành trình (mốc thời gian) · Con số ·
Đồng hành (4 dịch vụ) · Điều tôi tin · Cảm nhận · Thư viện ảnh · Bài viết · Hỏi & Đáp ·
Liên hệ · Trích dẫn kết · Chân trang.

**Kỹ thuật**
- Font tiếng Việt tải sẵn trong máy chủ của bạn — không gọi ra Google, vào nhanh kể cả khi mạng chậm
- Chạy tốt từ điện thoại 360px đến màn hình lớn; đã kiểm tra không tràn ngang
- Menu trượt trên điện thoại, thanh tiến độ đọc, nút Zalo/gọi/lên đầu trang nổi
- Slider cảm nhận: bấm nút, vuốt tay, phím mũi tên đều được
- Xem ảnh phóng to (lightbox), đóng bằng phím Esc
- Kiểm tra form ngay khi nhập, báo lỗi bằng tiếng Việt
- Điều hướng bằng bàn phím đầy đủ, có link "Bỏ qua tới nội dung", có `aria-*`
- Tôn trọng `prefers-reduced-motion` — người bị chóng mặt sẽ không thấy hiệu ứng
- SEO: thẻ mô tả, Open Graph (Facebook/Zalo), dữ liệu có cấu trúc `Person`, `sitemap.xml`
- In ra giấy vẫn đọc được (đã có `@media print`)

**Về hiệu ứng hiện dần:** phần này cố ý **không** dùng `IntersectionObserver` mà quét
theo vị trí trong `main.js`. Lý do ghi ngay trong file — cách quét chắc chắn hơn khi
người dùng vuốt rất nhanh hoặc mở trang bằng link `#neo`.

---

## 8. Chưa có (nếu sau này cần)

- Trang blog riêng cho từng bài — hiện 3 bài ở mục "Chia sẻ" chỉ là thẻ giới thiệu,
  bấm vào chưa đi đâu. Cần thì tạo thêm `bai-viet/ten-bai.html`.
- Trang "Chính sách bảo mật" — **nên có**: form đang thu tên, số điện thoại, email và lưu lại.
- Đa ngôn ngữ, đặt lịch tự động, thanh toán trực tuyến.
