import './quan-tri.css';

export default function QuanTriLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="qt-shell">
      <nav className="qt-nav" aria-label="Quản trị">
        <strong>Quản trị</strong>
        <a href="/quan-tri">Danh sách khách</a>
        <a href="/quan-tri/cai-dat">Cài đặt Zalo &amp; popup</a>
        <a href="/" target="_blank" rel="noopener noreferrer">Xem trang chủ ↗</a>
      </nav>
      {children}
    </div>
  );
}
