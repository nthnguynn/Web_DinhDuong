// Trang chủ — toàn bộ nội dung chữ nằm ở đây (trước đây là index.html).
// Tương tác (menu, slider, form, popup) do public/assets/js/main.js xử lý.

export default function Home() {
  return (
    <>

      <a className="skip-link" href="#noi-dung">Bỏ qua, tới nội dung chính</a>

      {/* ============================================================ HEADER */}
      <header className="site-header" id="site-header">
        <div className="shell header__inner">
          <a className="brand" href="#top" aria-label="Tạ Thị Nga — về đầu trang">
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 1.5c2.6 2.9 3.8 6.9 0 21-3.8-14.1-2.6-18.1 0-21Z" fill="currentColor" /></svg>
            </span>{' '}
            <span className="brand__text">
              <strong>Tạ Thị Nga</strong>{' '}
              <em>Dinh dưỡng &amp; Sức khoẻ gia đình</em>
            </span>
          </a>

          <nav className="nav" id="primary-nav" aria-label="Điều hướng chính">
            <ul className="nav__list">
              <li><a href="#cau-chuyen">Câu chuyện</a></li>
              <li><a href="#hanh-trinh">Hành trình</a></li>
              <li><a href="#dong-hanh">Đồng hành</a></li>
              <li><a href="#cam-nhan">Cảm nhận</a></li>
              <li><a href="#chia-se">Chia sẻ</a></li>
              <li><a href="#lien-he">Liên hệ</a></li>
            </ul>
          </nav>

          <a className="btn btn--sm btn--gold header__cta" href="#lien-he" data-open-lead="">Đặt lịch trò chuyện</a>{' '}

          <button className="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Mở menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className="header__progress" id="scroll-progress" aria-hidden="true"></div>
      </header>

      <main id="noi-dung">

      {/* ============================================================ HERO */}
      <section className="hero" id="top">
        <div className="hero__bg" aria-hidden="true">
          <span className="orb orb--jade"></span>{' '}
          <span className="orb orb--gold"></span>{' '}
          <span className="orb orb--lotus"></span>
        </div>

        <div className="shell hero__grid">
          <div className="hero__copy">
            <p className="kicker" data-reveal="">
              <span className="kicker__line" aria-hidden="true"></span>{' '}
              Người đồng hành dinh dưỡng &amp; sức khoẻ gia đình
            </p>

            <h1 className="hero__title" data-reveal="" data-reveal-delay="1">
              Có những người<br />
              <em>gác lại con chữ</em><br />
              để người khác được đi học.
            </h1>

            <p className="hero__lead" data-reveal="" data-reveal-delay="2">
              Tôi là Nga — con cả trong một mái nhà nhỏ. Năm ấy, tôi gấp sách lại giữa chừng
              để hai đứa em được tiếp tục đến trường. Ba mươi năm sau, tôi mở lại trang sách của
              chính mình — lần này để gieo cho hàng nghìn gia đình một điều quý hơn cả tấm bằng:{' '}
              <strong>sức khoẻ và sự bền lòng</strong>.
            </p>

            <div className="hero__actions" data-reveal="" data-reveal-delay="3">
              <a className="btn btn--jade" href="#cau-chuyen">
                Đọc câu chuyện của tôi{' '}
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>{' '}
              <a className="btn btn--ghost" href="#lien-he" data-open-lead="">Nhận tư vấn miễn phí</a>
            </div>

            <dl className="hero__stats" data-reveal="" data-reveal-delay="4">
              <div><dt>Năm bền bỉ</dt><dd><span className="count" data-count="24">0</span>+</dd></div>
              <div><dt>Gia đình đồng hành</dt><dd><span className="count" data-count="1200">0</span>+</dd></div>
              <div><dt>Buổi chia sẻ cộng đồng</dt><dd><span className="count" data-count="86">0</span></dd></div>
            </dl>
          </div>

          <figure className="hero__portrait" data-reveal="" data-reveal-delay="2">
            <div className="portrait-frame">
              <img src="/assets/img/chan-dung-hero.svg" alt="Chân dung Tạ Thị Nga" width="900" height="1150" />{' '}
              <span className="portrait-frame__ring" aria-hidden="true"></span>
            </div>
            <figcaption className="portrait-badge">
              <span className="portrait-badge__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 1.5c2.6 2.9 3.8 6.9 0 21-3.8-14.1-2.6-18.1 0-21Z" fill="currentColor" /></svg>
              </span>{' '}
              <span>
                <strong>“Chị học thay phần em.”</strong>{' '}
                <em>— điều mẹ tôi nói, năm tôi 15 tuổi</em>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============================================================ DẢI GIÁ TRỊ */}
      <section className="ticker" aria-label="Giá trị cốt lõi">
        <div className="ticker__track">
          <div className="ticker__group">
            <span>Tận tâm</span><i aria-hidden="true">✦</i>{' '}
            <span>Chính trực</span><i aria-hidden="true">✦</i>{' '}
            <span>Bền bỉ</span><i aria-hidden="true">✦</i>{' '}
            <span>Yêu thương</span><i aria-hidden="true">✦</i>{' '}
            <span>Khoa học</span><i aria-hidden="true">✦</i>{' '}
            <span>Sẻ chia</span><i aria-hidden="true">✦</i>
          </div>
          <div className="ticker__group" aria-hidden="true">
            <span>Tận tâm</span><i>✦</i>{' '}
            <span>Chính trực</span><i>✦</i>{' '}
            <span>Bền bỉ</span><i>✦</i>{' '}
            <span>Yêu thương</span><i>✦</i>{' '}
            <span>Khoa học</span><i>✦</i>{' '}
            <span>Sẻ chia</span><i>✦</i>
          </div>
        </div>
      </section>

      {/* ============================================================ CÂU CHUYỆN */}
      <section className="section story" id="cau-chuyen">
        <div className="shell story__grid">
          <figure className="story__figure" data-reveal="">
            <div className="portrait-frame portrait-frame--soft">
              <img src="/assets/img/chan-dung-cau-chuyen.svg" alt="Tạ Thị Nga thời trẻ" width="860" height="1080" loading="lazy" />
            </div>
            <div className="story__stamp" aria-hidden="true">
              <span>Con cả</span>{' '}
              <strong>Của một mái nhà nhỏ</strong>
            </div>
          </figure>

          <div className="story__body">
            <p className="kicker" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Câu chuyện</p>
            <h2 className="section__title" data-reveal="" data-reveal-delay="1">
              Tấm bằng đẹp nhất đời tôi<br /><em>mang tên hai đứa em</em>
            </h2>

            <div className="prose" data-reveal="" data-reveal-delay="2">
              <p>
                Nhà tôi có ba chị em. Bố mẹ làm nông, mùa được mùa mất. Năm tôi học dở dang,
                bố ngồi rất lâu bên hiên rồi nói một câu mà đến giờ tôi vẫn nghe rõ trong đầu:{' '}
                <em>“Nhà mình chỉ đủ cho hai đứa thôi con ạ.”</em>
              </p>
              <p>
                Tôi là chị cả. Tôi gấp sách lại.
              </p>
            </div>

            <blockquote className="pull-quote" data-reveal="" data-reveal-delay="3">
              <p>Tôi không bỏ học. Tôi chỉ đổi lớp học — từ trường làng sang ruộng đồng, gian bếp và những đêm thức trắng.</p>
            </blockquote>

            <div className="prose" data-reveal="" data-reveal-delay="3">
              <p>
                Những năm sau đó, tôi làm đủ nghề. Đôi tay chai đi, nhưng có một điều không bao giờ chai:
                niềm tin rằng tri thức là thứ duy nhất không ai lấy đi được của con người. Tôi không giữ
                được nó cho mình, thì tôi giữ nó cho các em.
              </p>
              <p>
                Ngày em gái tôi cầm tấm bằng đại học, tôi đứng phía cuối hội trường, mặc chiếc áo đẹp nhất
                mình có. Không ai đọc tên tôi cả. Nhưng hôm ấy tôi biết mình đã <strong>tốt nghiệp</strong> —
                một ngôi trường không có giấy chứng nhận.
              </p>
              <p>
                Rồi ở tuổi mà nhiều người nghĩ đã muộn, tôi bắt đầu học lại. Học về dinh dưỡng, về cơ thể
                con người, về cách một bữa cơm tử tế có thể thay đổi cả một gia đình. Tôi học chậm hơn
                người khác, nhưng tôi có thứ họ không có: <strong>ba mươi năm hiểu thế nào là thiếu thốn</strong>.
              </p>
              <p>
                Hôm nay, mỗi lần một người mẹ nhắn cho tôi “chị ơi, con em ăn ngon miệng rồi”, tôi lại
                thấy mình được đi học thêm một ngày nữa.
              </p>
            </div>

            <div className="signature" data-reveal="" data-reveal-delay="4">
              <svg className="signature__ink" viewBox="0 0 240 70" aria-hidden="true">
                <path d="M8 52c14-30 26-38 32-24s-6 34 4 34 20-30 26-40 10 8 18 6 14-16 22-12-6 26 4 28 22-18 30-30 14 4 22 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              <p><strong>Tạ Thị Nga</strong><span>Con cả — và mãi là học trò của cuộc đời</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ HÀNH TRÌNH */}
      <section className="section section--cream journey" id="hanh-trinh">
        <div className="shell">
          <header className="section__head section__head--center">
            <p className="kicker kicker--center" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Hành trình</p>
            <h2 className="section__title" data-reveal="" data-reveal-delay="1">Những cột mốc<em> làm nên tôi</em></h2>
            <p className="section__lead" data-reveal="" data-reveal-delay="2">
              Không có bước ngoặt nào diễn ra trong một ngày. Chỉ có những năm tháng đủ dài để một
              hạt giống kịp nảy mầm.
            </p>
          </header>

          <ol className="timeline">
            <li className="timeline__item" data-reveal="">
              <span className="timeline__dot" aria-hidden="true"></span>
              <p className="timeline__year">Tuổi thơ</p>
              <h3>Chị cả của một mái nhà nhỏ</h3>
              <p>Lớn lên giữa đồng ruộng, học cách nấu cơm cho cả nhà trước khi biết viết trọn một bài văn.</p>
            </li>
            <li className="timeline__item" data-reveal="" data-reveal-delay="1">
              <span className="timeline__dot" aria-hidden="true"></span>
              <p className="timeline__year">Năm 15 tuổi</p>
              <h3>Gấp lại trang sách</h3>
              <p>Nghỉ học giữa chừng để hai em được tiếp tục tới trường. Một quyết định không ai bắt tôi phải chọn.</p>
            </li>
            <li className="timeline__item" data-reveal="" data-reveal-delay="2">
              <span className="timeline__dot" aria-hidden="true"></span>
              <p className="timeline__year">Những năm sau đó</p>
              <h3>Học từ ruộng đồng và gian bếp</h3>
              <p>Làm đủ nghề để nuôi các em ăn học. Học cách chăm sóc con người bằng chính đôi tay mình.</p>
            </li>
            <li className="timeline__item" data-reveal="" data-reveal-delay="3">
              <span className="timeline__dot timeline__dot--gold" aria-hidden="true"></span>
              <p className="timeline__year">Ngày các em tốt nghiệp</p>
              <h3>Tấm bằng của em, cũng là của chị</h3>
              <p>Hai đứa em nên người. Đó là bản CV đầu tiên và đáng tự hào nhất của cuộc đời tôi.</p>
            </li>
            <li className="timeline__item" data-reveal="" data-reveal-delay="4">
              <span className="timeline__dot" aria-hidden="true"></span>
              <p className="timeline__year">Bước ngoặt</p>
              <h3>Trở lại với con chữ</h3>
              <p>Bắt đầu học dinh dưỡng ở tuổi nhiều người cho là đã muộn. Chép tay từng trang tài liệu.</p>
            </li>
            <li className="timeline__item" data-reveal="" data-reveal-delay="5">
              <span className="timeline__dot timeline__dot--gold" aria-hidden="true"></span>
              <p className="timeline__year">Hôm nay</p>
              <h3>Gieo lại điều mình từng lỡ hẹn</h3>
              <p>Đồng hành cùng hơn 1.200 gia đình Việt xây dựng nếp ăn lành và một cơ thể khoẻ mạnh.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ============================================================ CON SỐ */}
      <section className="section section--dark numbers" aria-label="Những con số">
        <div className="shell">
          <header className="section__head section__head--center">
            <p className="kicker kicker--center kicker--light" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Những con số</p>
            <h2 className="section__title section__title--light" data-reveal="" data-reveal-delay="1">Được đo bằng<em> con người</em>, không phải doanh số</h2>
          </header>

          <div className="numbers__grid">
            <div className="stat" data-reveal="">
              <p className="stat__value"><span className="count" data-count="24">0</span><span className="stat__suffix">+</span></p>
              <p className="stat__label">Năm gắn bó với dinh dưỡng &amp; sức khoẻ</p>
            </div>
            <div className="stat" data-reveal="" data-reveal-delay="1">
              <p className="stat__value"><span className="count" data-count="1200">0</span><span className="stat__suffix">+</span></p>
              <p className="stat__label">Gia đình đã đồng hành</p>
            </div>
            <div className="stat" data-reveal="" data-reveal-delay="2">
              <p className="stat__value"><span className="count" data-count="86">0</span></p>
              <p className="stat__label">Buổi chia sẻ cộng đồng miễn phí</p>
            </div>
            <div className="stat" data-reveal="" data-reveal-delay="3">
              <p className="stat__value"><span className="count" data-count="2">0</span></p>
              <p className="stat__label">Đứa em đã nên người — lý do của tất cả</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ ĐỒNG HÀNH */}
      <section className="section services" id="dong-hanh">
        <div className="shell">
          <header className="section__head">
            <div>
              <p className="kicker" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Tôi đồng hành cùng bạn</p>
              <h2 className="section__title" data-reveal="" data-reveal-delay="1">Bốn cách<em> chúng ta có thể bắt đầu</em></h2>
            </div>
            <p className="section__lead" data-reveal="" data-reveal-delay="2">
              Không có phác đồ chung cho mọi người. Mỗi gia đình có một gian bếp, một nhịp sống và một
              nỗi lo riêng — tôi bắt đầu từ đó.
            </p>
          </header>

          <div className="cards">
            <article className="card" data-reveal="">
              <span className="card__num">01</span>{' '}
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 28s-9-5.6-9-12.2A5.4 5.4 0 0 1 16 12a5.4 5.4 0 0 1 9 3.8C25 22.4 16 28 16 28Z" /><path d="M16 12V6M13 8l3-3 3 3" />
                </svg>
              </span>
              <h3>Tư vấn dinh dưỡng cá nhân hoá</h3>
              <p>Đánh giá thể trạng, thói quen ăn uống và mục tiêu của riêng bạn, rồi cùng nhau dựng một kế hoạch bạn thật sự theo được.</p>
              <ul className="card__list">
                <li>Buổi trò chuyện 1–1 (60 phút)</li>
                <li>Bảng phân tích khẩu phần chi tiết</li>
                <li>Theo dõi &amp; điều chỉnh hằng tuần</li>
              </ul>
            </article>

            <article className="card" data-reveal="" data-reveal-delay="1">
              <span className="card__num">02</span>{' '}
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 14h20M8 14v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V14" /><path d="M11 10c0-2 1-2 1-4M16 10c0-2 1-2 1-4M21 10c0-2 1-2 1-4" />
                </svg>
              </span>
              <h3>Thực đơn cho gia đình Việt</h3>
              <p>Món ăn quen thuộc, nguyên liệu ngoài chợ, giá hợp lý — nhưng được cân đối lại để cả nhà cùng khoẻ.</p>
              <ul className="card__list">
                <li>Thực đơn 4 tuần theo mùa</li>
                <li>Đi chợ tiết kiệm, ít bỏ phí</li>
                <li>Phù hợp người lớn tuổi &amp; trẻ nhỏ</li>
              </ul>
            </article>

            <article className="card card--feature" data-reveal="" data-reveal-delay="2">
              <span className="card__num">03</span>{' '}
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="16" cy="16" r="11" /><path d="M16 9v7l5 3" />
                </svg>
              </span>
              <h3>Đồng hành 90 ngày thay đổi nếp sống</h3>
              <p>Ba tháng đi cùng nhau, có người nhắc, có người lắng nghe — thứ mà một cuốn sách không làm được cho bạn.</p>
              <ul className="card__list">
                <li>Nhóm nhỏ tối đa 12 người</li>
                <li>Check-in cùng tôi mỗi tuần</li>
                <li>Báo cáo tiến bộ theo tháng</li>
              </ul>
              <p className="card__tag">Được chọn nhiều nhất</p>
            </article>

            <article className="card" data-reveal="" data-reveal-delay="3">
              <span className="card__num">04</span>{' '}
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8h20v14H16l-6 4v-4H6z" /><path d="M11 13h10M11 17h6" />
                </svg>
              </span>
              <h3>Chia sẻ &amp; đào tạo cộng đồng</h3>
              <p>Buổi nói chuyện cho hội phụ nữ, trường học, doanh nghiệp. Tôi vẫn giữ thói quen làm miễn phí mỗi tháng một buổi.</p>
              <ul className="card__list">
                <li>Chủ đề thiết kế riêng</li>
                <li>Trực tiếp hoặc trực tuyến</li>
                <li>Tài liệu gửi lại sau buổi học</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================ GIÁ TRỊ */}
      <section className="section section--cream values" id="gia-tri">
        <div className="shell">
          <header className="section__head section__head--center">
            <p className="kicker kicker--center" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Điều tôi tin</p>
            <h2 className="section__title" data-reveal="" data-reveal-delay="1">Ba điều<em> tôi không đánh đổi</em></h2>
          </header>

          <div className="values__grid">
            <article className="value" data-reveal="">
              <span className="value__glyph" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 30c0-8 5-13 12-13s12 5 12 13z" /><path d="M20 17V9M20 9c-3-1-5-3-5-5 3 0 5 2 5 5Zm0 0c3-1 5-3 5-5-3 0-5 2-5 5Z" />
                </svg>
              </span>
              <h3>Sức khoẻ bắt đầu từ gian bếp</h3>
              <p>Không phải từ một loại thực phẩm chức năng đắt tiền. Từ nồi cơm, rổ rau và cách chúng ta ngồi xuống ăn cùng nhau.</p>
            </article>

            <article className="value" data-reveal="" data-reveal-delay="1">
              <span className="value__glyph" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="15" r="4.5" /><circle cx="26" cy="15" r="4.5" /><path d="M6 31c0-4.4 3.6-8 8-8M34 31c0-4.4-3.6-8-8-8M15 31h10" />
                </svg>
              </span>
              <h3>Không ai đi xa một mình</h3>
              <p>Tôi từng đi một mình và biết nó dài thế nào. Nên tôi chọn nghề đi cùng người khác — không đứng trên bục giảng bài.</p>
            </article>

            <article className="value" data-reveal="" data-reveal-delay="2">
              <span className="value__glyph" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 5l4.2 8.6 9.5 1.4-6.9 6.7 1.7 9.4L20 26.7l-8.5 4.4 1.7-9.4-6.9-6.7 9.5-1.4z" />
                </svg>
              </span>
              <h3>Tử tế là một kỷ luật</h3>
              <p>Tôi không hứa điều mình không làm được, không bán thứ mình không dùng, và luôn nói thật kể cả khi sự thật khó nghe.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================ CẢM NHẬN */}
      {/* LƯU Ý: 4 lời cảm nhận dưới đây là nội dung MẪU. Hãy thay bằng cảm nhận thật
           của học viên/khách hàng (kèm sự đồng ý của họ) trước khi đưa website lên mạng. */}
      <section className="section testimonials" id="cam-nhan">
        <div className="shell">
          <header className="section__head">
            <div>
              <p className="kicker" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Cảm nhận</p>
              <h2 className="section__title" data-reveal="" data-reveal-delay="1">Những người<em> đã đi cùng tôi</em></h2>
            </div>
            <div className="testimonials__nav" data-reveal="" data-reveal-delay="2">
              <button className="round-btn" data-slide="prev" aria-label="Cảm nhận trước">
                <svg viewBox="0 0 20 20" width="18" height="18"><path d="M12 4l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>{' '}
              <button className="round-btn" data-slide="next" aria-label="Cảm nhận tiếp theo">
                <svg viewBox="0 0 20 20" width="18" height="18"><path d="M8 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </header>

          <div className="slider" id="testimonial-slider" tabIndex={0} aria-label="Danh sách cảm nhận, dùng phím mũi tên để xem">
            <div className="slider__track">
              <figure className="quote">
                <svg className="quote__mark" viewBox="0 0 40 32" aria-hidden="true"><path d="M0 32V18C0 8 5 2 15 0l2 5c-6 2-9 5-9 10h8v17H0Zm23 0V18c0-10 5-16 15-18l2 5c-6 2-9 5-9 10h8v17H23Z" fill="currentColor" /></svg>
                <blockquote><p>Cô Nga không đưa tôi một tờ thực đơn rồi thôi. Cô hỏi nhà tôi hay ăn gì, chợ gần nhà bán gì, chồng tôi ghét món nào. Sau ba tháng, cả nhà tôi ăn khác hẳn mà không ai thấy mình đang “ăn kiêng”.</p></blockquote>
                <figcaption>
                  <img src="/assets/img/avatar-1.svg" alt="" width="160" height="160" loading="lazy" />{' '}
                  <span><strong>Chị Hạnh</strong><em>Giáo viên, Hà Nội</em></span>
                </figcaption>
              </figure>

              <figure className="quote">
                <svg className="quote__mark" viewBox="0 0 40 32" aria-hidden="true"><path d="M0 32V18C0 8 5 2 15 0l2 5c-6 2-9 5-9 10h8v17H0Zm23 0V18c0-10 5-16 15-18l2 5c-6 2-9 5-9 10h8v17H23Z" fill="currentColor" /></svg>
                <blockquote><p>Mẹ tôi 72 tuổi, huyết áp thất thường, rất khó tính chuyện ăn uống. Cô Nga là người đầu tiên bà chịu nghe — có lẽ vì cô nói chuyện như con cháu trong nhà chứ không như một chuyên gia.</p></blockquote>
                <figcaption>
                  <img src="/assets/img/avatar-2.svg" alt="" width="160" height="160" loading="lazy" />{' '}
                  <span><strong>Anh Tuấn</strong><em>Kỹ sư, Bắc Ninh</em></span>
                </figcaption>
              </figure>

              <figure className="quote">
                <svg className="quote__mark" viewBox="0 0 40 32" aria-hidden="true"><path d="M0 32V18C0 8 5 2 15 0l2 5c-6 2-9 5-9 10h8v17H0Zm23 0V18c0-10 5-16 15-18l2 5c-6 2-9 5-9 10h8v17H23Z" fill="currentColor" /></svg>
                <blockquote><p>Điều tôi quý nhất không phải là tôi giảm được bao nhiêu cân, mà là lần đầu tiên sau nhiều năm tôi không còn thấy có lỗi mỗi khi ngồi vào bàn ăn.</p></blockquote>
                <figcaption>
                  <img src="/assets/img/avatar-3.svg" alt="" width="160" height="160" loading="lazy" />{' '}
                  <span><strong>Chị Mai</strong><em>Nhân viên văn phòng, TP.HCM</em></span>
                </figcaption>
              </figure>

              <figure className="quote">
                <svg className="quote__mark" viewBox="0 0 40 32" aria-hidden="true"><path d="M0 32V18C0 8 5 2 15 0l2 5c-6 2-9 5-9 10h8v17H0Zm23 0V18c0-10 5-16 15-18l2 5c-6 2-9 5-9 10h8v17H23Z" fill="currentColor" /></svg>
                <blockquote><p>Công ty tôi mời cô về nói chuyện cho 80 nhân viên. Không slide màu mè, không thuật ngữ. Cô kể chuyện đời mình, rồi mọi người tự thấy mình trong đó. Hôm ấy nhiều người khóc.</p></blockquote>
                <figcaption>
                  <img src="/assets/img/avatar-4.svg" alt="" width="160" height="160" loading="lazy" />{' '}
                  <span><strong>Chị Lan</strong><em>Trưởng phòng Nhân sự</em></span>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="slider__dots" id="testimonial-dots" role="tablist" aria-label="Chọn cảm nhận"></div>
        </div>
      </section>

      {/* ============================================================ THƯ VIỆN */}
      <section className="section section--cream gallery" id="thu-vien">
        <div className="shell">
          <header className="section__head section__head--center">
            <p className="kicker kicker--center" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Thư viện</p>
            <h2 className="section__title" data-reveal="" data-reveal-delay="1">Những khoảnh khắc<em> tôi giữ lại</em></h2>
          </header>

          <div className="gallery__grid">
            <button className="tile tile--tall" data-reveal="" data-lightbox="assets/img/thu-vien-1.svg" data-caption="Lớp học dinh dưỡng cuối tuần">
              <img src="/assets/img/thu-vien-1.svg" alt="Lớp học dinh dưỡng cuối tuần" width="900" height="1120" loading="lazy" />{' '}
              <span className="tile__cap">Lớp học cuối tuần</span>
            </button>{' '}
            <button className="tile" data-reveal="" data-reveal-delay="1" data-lightbox="assets/img/thu-vien-2.svg" data-caption="Gian bếp lành của gia đình Việt">
              <img src="/assets/img/thu-vien-2.svg" alt="Gian bếp lành của gia đình Việt" width="900" height="700" loading="lazy" />{' '}
              <span className="tile__cap">Gian bếp lành</span>
            </button>{' '}
            <button className="tile" data-reveal="" data-reveal-delay="2" data-lightbox="assets/img/thu-vien-3.svg" data-caption="Cùng học viên sau buổi chia sẻ">
              <img src="/assets/img/thu-vien-3.svg" alt="Cùng học viên sau buổi chia sẻ" width="900" height="700" loading="lazy" />{' '}
              <span className="tile__cap">Cùng học viên</span>
            </button>{' '}
            <button className="tile" data-reveal="" data-reveal-delay="1" data-lightbox="assets/img/thu-vien-4.svg" data-caption="Vườn rau sau nhà">
              <img src="/assets/img/thu-vien-4.svg" alt="Vườn rau sau nhà" width="900" height="700" loading="lazy" />{' '}
              <span className="tile__cap">Vườn rau sau nhà</span>
            </button>{' '}
            <button className="tile tile--tall" data-reveal="" data-reveal-delay="2" data-lightbox="assets/img/thu-vien-5.svg" data-caption="Buổi chia sẻ cộng đồng">
              <img src="/assets/img/thu-vien-5.svg" alt="Buổi chia sẻ cộng đồng" width="900" height="1120" loading="lazy" />{' '}
              <span className="tile__cap">Chia sẻ cộng đồng</span>
            </button>{' '}
            <button className="tile" data-reveal="" data-reveal-delay="3" data-lightbox="assets/img/thu-vien-6.svg" data-caption="Gia đình — nơi mọi thứ bắt đầu">
              <img src="/assets/img/thu-vien-6.svg" alt="Gia đình — nơi mọi thứ bắt đầu" width="900" height="700" loading="lazy" />{' '}
              <span className="tile__cap">Gia đình</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ CHIA SẺ / BLOG */}
      <section className="section posts" id="chia-se">
        <div className="shell">
          <header className="section__head">
            <div>
              <p className="kicker" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Chia sẻ</p>
              <h2 className="section__title" data-reveal="" data-reveal-delay="1">Viết lại<em> những gì tôi học được</em></h2>
            </div>
            <a className="link-arrow" href="#lien-he" data-reveal="" data-reveal-delay="2">
              Nhận bài mới qua Zalo{' '}
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </header>

          <div className="posts__grid">
            <article className="post" data-reveal="">
              <a href="#chia-se" className="post__media"><img src="/assets/img/bai-viet-1.svg" alt="" width="800" height="520" loading="lazy" /></a>
              <p className="post__meta"><span>Dinh dưỡng gia đình</span> · 6 phút đọc</p>
              <h3><a href="#chia-se">Bữa cơm 60.000đ vẫn đủ chất — tôi đi chợ thế nào</a></h3>
              <p>Danh sách đi chợ thật của một tuần, kèm cách chọn thực phẩm rẻ mà không nghèo dinh dưỡng.</p>
            </article>

            <article className="post" data-reveal="" data-reveal-delay="1">
              <a href="#chia-se" className="post__media"><img src="/assets/img/bai-viet-2.svg" alt="" width="800" height="520" loading="lazy" /></a>
              <p className="post__meta"><span>Người cao tuổi</span> · 8 phút đọc</p>
              <h3><a href="#chia-se">Bố mẹ tuổi 70: ăn ít đi hay ăn khác đi?</a></h3>
              <p>Vì sao “ăn kiêng” không phải câu trả lời, và ba thay đổi nhỏ có tác động lớn nhất.</p>
            </article>

            <article className="post" data-reveal="" data-reveal-delay="2">
              <a href="#chia-se" className="post__media"><img src="/assets/img/bai-viet-3.svg" alt="" width="800" height="520" loading="lazy" /></a>
              <p className="post__meta"><span>Chuyện nghề</span> · 5 phút đọc</p>
              <h3><a href="#chia-se">Ngày tôi bắt đầu học lại ở tuổi bốn mươi</a></h3>
              <p>Về những quyển vở chép tay, những buổi học online lúc nửa đêm và cảm giác sợ mình quá muộn.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================ FAQ */}
      <section className="section section--cream faq" id="hoi-dap">
        <div className="shell faq__grid">
          <div className="faq__intro">
            <p className="kicker" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Hỏi &amp; Đáp</p>
            <h2 className="section__title" data-reveal="" data-reveal-delay="1">Những câu<em> hay được hỏi nhất</em></h2>
            <p className="section__lead" data-reveal="" data-reveal-delay="2">
              Nếu câu hỏi của bạn chưa có ở đây, cứ nhắn cho tôi. Tôi trả lời tất cả tin nhắn,
              thường trong vòng 24 giờ.
            </p>
            <a className="btn btn--jade" href="#lien-he" data-reveal="" data-reveal-delay="3">Gửi câu hỏi cho tôi</a>
          </div>

          <div className="accordion" data-reveal="" data-reveal-delay="1">
            <div className="acc">
              <button className="acc__head" aria-expanded="false">
                <span>Buổi tư vấn đầu tiên diễn ra như thế nào?</span>{' '}
                <span className="acc__icon" aria-hidden="true"></span>
              </button>
              <div className="acc__panel"><div><p>Chúng ta trò chuyện khoảng 60 phút, trực tiếp hoặc qua Zalo/Google Meet. Tôi hỏi về thói quen ăn uống, giấc ngủ, công việc và cả những khó khăn rất đời thường của bạn. Kết thúc buổi đầu, bạn nhận được một bản đánh giá và ba việc cụ thể để bắt đầu ngay.</p></div></div>
            </div>

            <div className="acc">
              <button className="acc__head" aria-expanded="false">
                <span>Tôi có phải mua thực phẩm chức năng không?</span>{' '}
                <span className="acc__icon" aria-hidden="true"></span>
              </button>
              <div className="acc__panel"><div><p>Không. Nguyên tắc của tôi là bữa ăn trước, sản phẩm sau. Chỉ khi cơ thể bạn thật sự thiếu một chất nào đó và không bù được bằng thực phẩm, tôi mới đề cập — và luôn nói rõ vì sao.</p></div></div>
            </div>

            <div className="acc">
              <button className="acc__head" aria-expanded="false">
                <span>Cô có làm việc với người bệnh mạn tính không?</span>{' '}
                <span className="acc__icon" aria-hidden="true"></span>
              </button>
              <div className="acc__panel"><div><p>Có, nhưng luôn song song với bác sĩ điều trị của bạn. Tôi hỗ trợ phần dinh dưỡng và lối sống, không thay thế chỉ định y khoa. Nếu tình trạng vượt ngoài phạm vi của tôi, tôi sẽ nói thẳng và giới thiệu bạn tới đúng người.</p></div></div>
            </div>

            <div className="acc">
              <button className="acc__head" aria-expanded="false">
                <span>Bao lâu thì thấy kết quả?</span>{' '}
                <span className="acc__icon" aria-hidden="true"></span>
              </button>
              <div className="acc__panel"><div><p>Phần lớn mọi người thấy khác biệt về giấc ngủ và mức năng lượng trong 2–3 tuần. Những thay đổi về cân nặng, chỉ số máu cần 8–12 tuần. Tôi không hứa “7 ngày lột xác” — đó không phải cách cơ thể vận hành.</p></div></div>
            </div>

            <div className="acc">
              <button className="acc__head" aria-expanded="false">
                <span>Chi phí thế nào?</span>{' '}
                <span className="acc__icon" aria-hidden="true"></span>
              </button>
              <div className="acc__panel"><div><p>Buổi trò chuyện tìm hiểu đầu tiên (20 phút) luôn miễn phí. Sau đó tuỳ chương trình bạn chọn, tôi sẽ báo mức phí rõ ràng ngay từ đầu, không phát sinh. Với các hoàn cảnh khó khăn, mỗi tháng tôi dành vài suất đồng hành không thu phí.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ LIÊN HỆ */}
      <section className="section section--dark contact" id="lien-he">
        <div className="shell contact__grid">
          <div className="contact__intro">
            <p className="kicker kicker--light" data-reveal=""><span className="kicker__line" aria-hidden="true"></span>Liên hệ</p>
            <h2 className="section__title section__title--light" data-reveal="" data-reveal-delay="1">
              Kể cho tôi nghe<br /><em>câu chuyện của bạn</em>
            </h2>
            <p className="section__lead section__lead--light" data-reveal="" data-reveal-delay="2">
              Không cần chuẩn bị gì cả. Cứ viết ra điều đang khiến bạn bận lòng nhất về sức khoẻ
              của mình hoặc của người thân — tôi sẽ đọc và trả lời bằng chính chữ của mình.
            </p>

            <ul className="contact__list" data-reveal="" data-reveal-delay="3">
              <li>
                <span className="contact__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6c0 8 6 14 14 14l2.5-3-4.5-2.5-2 2A14 14 0 0 1 9.5 12l2-2L9 5.5 6 8z" /></svg>
                </span>{' '}
                <span><em>Điện thoại &amp; Zalo</em><a href="tel:+84900000000">0900 000 000</a></span>
              </li>
              <li>
                <span className="contact__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                </span>{' '}
                <span><em>Email</em><a href="mailto:lienhe@ngadinhduong.com">lienhe@ngadinhduong.com</a></span>
              </li>
              <li>
                <span className="contact__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></svg>
                </span>{' '}
                <span><em>Nơi làm việc</em><span className="contact__plain">Hà Nội — nhận tư vấn trực tuyến toàn quốc</span></span>
              </li>
              <li>
                <span className="contact__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
                </span>{' '}
                <span><em>Giờ trả lời</em><span className="contact__plain">08:00 – 20:00, tất cả các ngày</span></span>
              </li>
            </ul>

            <div className="socials" data-reveal="" data-reveal-delay="4">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.63A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.46-4 4.15V9.9H7.6V13h2.7v8z" /></svg>
              </a>{' '}
              <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" aria-label="Zalo">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M12 3.5c5 0 8.5 3.1 8.5 7s-3.5 7-8.5 7c-1 0-2-.12-2.9-.35L5 19l.9-3.1A6.9 6.9 0 0 1 3.5 10.5c0-3.9 3.5-7 8.5-7Z" /><path d="M8 9.5h3.2L8 13.6h3.4M14.4 9.5v4.1M17 11.4v2.2" strokeLinecap="round" /></svg>
              </a>{' '}
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3z" /></svg>
              </a>{' '}
              <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 3c.35 2.2 1.75 3.6 3.9 3.8v2.6c-1.4.1-2.7-.3-3.9-1.05v5.5c0 4.35-4.4 6.9-8.05 4.6a4.9 4.9 0 0 1 3-9v2.8a2.2 2.2 0 1 0 1.9 2.15V3z" /></svg>
              </a>
            </div>
          </div>

          <div className="contact__card" data-reveal="" data-reveal-delay="2">
            {/* Form gửi về /api/lien-he và lưu vào database (xem app/api/lien-he/route.ts). */}
            <form className="form" id="contact-form" action="/api/lien-he" method="post" noValidate>
              <input type="hidden" name="nguon" value="lien-he" />
              <div className="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="field">
                <label htmlFor="ten">Tôi có thể gọi bạn là?</label>{' '}
                <input type="text" id="ten" name="ten" autoComplete="name" placeholder="Ví dụ: chị Hương" required />
                <p className="field__err" data-err-for="ten"></p>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="sdt">Số điện thoại / Zalo</label>{' '}
                  <input type="tel" id="sdt" name="sdt" autoComplete="tel" inputMode="tel" placeholder="09xx xxx xxx" required />
                  <p className="field__err" data-err-for="sdt"></p>
                </div>
                <div className="field">
                  <label htmlFor="email">Email <span>(không bắt buộc)</span></label>{' '}
                  <input type="email" id="email" name="email" autoComplete="email" placeholder="ban@email.com" />
                  <p className="field__err" data-err-for="email"></p>
                </div>
              </div>

              <div className="field">
                <label htmlFor="chu-de">Bạn muốn trò chuyện về điều gì?</label>{' '}
                <select id="chu-de" name="chu-de">
                  <option value="ca-nhan">Tư vấn dinh dưỡng cá nhân</option>
                  <option value="gia-dinh">Thực đơn cho cả gia đình</option>
                  <option value="90-ngay">Chương trình đồng hành 90 ngày</option>
                  <option value="cong-dong">Mời chia sẻ / đào tạo</option>
                  <option value="khac">Điều khác</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="loi-nhan">Điều bạn đang bận lòng</label>{' '}
                <textarea id="loi-nhan" name="loi-nhan" rows={4} placeholder="Viết ngắn gọn cũng được, tôi sẽ hỏi thêm..." required></textarea>
                <p className="field__err" data-err-for="loi-nhan"></p>
              </div>

              <label className="checkbox">
                <input type="checkbox" id="dong-y" name="dong-y" required />{' '}
                <span>Tôi đồng ý để cô Nga liên hệ lại qua số điện thoại/email tôi cung cấp.</span>
              </label>
              <p className="field__err" data-err-for="dong-y"></p>

              <button className="btn btn--gold btn--block" type="submit">
                Gửi lời nhắn{' '}
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>

              <p className="form__note">Buổi trò chuyện tìm hiểu đầu tiên hoàn toàn miễn phí. Thông tin của bạn được giữ kín.</p>
              <p className="form__status" id="form-status" role="status" aria-live="polite"></p>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================ CTA CUỐI */}
      <section className="closing">
        <div className="shell closing__inner" data-reveal="">
          <svg className="closing__grain" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M12 1.5c2.6 2.9 3.8 6.9 0 21-3.8-14.1-2.6-18.1 0-21Z" fill="currentColor" /></svg>
          <p className="closing__quote">“Ngày xưa tôi phải gấp sách lại vì nhà không đủ tiền.<br />
            Bây giờ tôi mở sách ra, và không tính tiền ai cả — cho đến khi họ thật sự muốn đi cùng tôi.”</p>
          <p className="closing__by">— Tạ Thị Nga</p>
          <a className="btn btn--gold" href="#lien-he" data-open-lead="">Bắt đầu từ một cuộc trò chuyện</a>
        </div>
      </section>

      </main>

      {/* ============================================================ FOOTER */}
      <footer className="site-footer">
        <div className="shell footer__grid">
          <div className="footer__brand">
            <a className="brand brand--light" href="#top">
              <span className="brand__mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 1.5c2.6 2.9 3.8 6.9 0 21-3.8-14.1-2.6-18.1 0-21Z" fill="currentColor" /></svg>
              </span>{' '}
              <span className="brand__text"><strong>Tạ Thị Nga</strong><em>Dinh dưỡng &amp; Sức khoẻ gia đình</em></span>
            </a>
            <p>Đồng hành cùng các gia đình Việt xây dựng nếp ăn lành, cơ thể khoẻ và một cuộc sống bền lòng.</p>
          </div>

          <nav className="footer__col" aria-label="Liên kết trang">
            <h3>Khám phá</h3>
            <ul>
              <li><a href="#cau-chuyen">Câu chuyện</a></li>
              <li><a href="#hanh-trinh">Hành trình</a></li>
              <li><a href="#dong-hanh">Đồng hành</a></li>
              <li><a href="#gia-tri">Điều tôi tin</a></li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Liên kết khác">
            <h3>Kết nối</h3>
            <ul>
              <li><a href="#cam-nhan">Cảm nhận</a></li>
              <li><a href="#thu-vien">Thư viện ảnh</a></li>
              <li><a href="#chia-se">Bài viết</a></li>
              <li><a href="#hoi-dap">Hỏi &amp; Đáp</a></li>
            </ul>
          </nav>

          <div className="footer__col">
            <h3>Liên hệ</h3>
            <ul>
              <li><a href="tel:+84900000000">0900 000 000</a></li>
              <li><a href="mailto:lienhe@ngadinhduong.com">lienhe@ngadinhduong.com</a></li>
              <li><span>Hà Nội, Việt Nam</span></li>
            </ul>
          </div>
        </div>

        <div className="shell footer__bottom">
          <p>© <span id="year">2026</span> Tạ Thị Nga. Mọi quyền được bảo lưu.</p>
          <p className="footer__made">Dành tặng người chị cả — và hai đứa em đã nên người.</p>
        </div>
      </footer>

      {/* Nút liên hệ nổi */}
      <div className="floating">
        <a className="floating__btn floating__btn--zalo" href="https://zalo.me/" target="_blank" rel="noopener noreferrer" aria-label="Nhắn Zalo">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 3.5c5 0 8.5 3.1 8.5 7s-3.5 7-8.5 7c-1 0-2-.12-2.9-.35L5 19l.9-3.1A6.9 6.9 0 0 1 3.5 10.5c0-3.9 3.5-7 8.5-7Z" /><path d="M8 9.5h3.2L8 13.6h3.4M14.4 9.5v4.1M17 11.4v2.2" strokeLinecap="round" /></svg>
        </a>{' '}
        <a className="floating__btn floating__btn--call" href="tel:+84900000000" aria-label="Gọi điện">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6c0 8 6 14 14 14l2.5-3-4.5-2.5-2 2A14 14 0 0 1 9.5 12l2-2L9 5.5 6 8z" /></svg>
        </a>{' '}
        <button className="floating__btn floating__btn--top" id="to-top" aria-label="Về đầu trang">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M6 12l6-6 6 6" /></svg>
        </button>
      </div>

      {/* Lightbox */}
      <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh" hidden>
        <button className="lightbox__close" id="lightbox-close" aria-label="Đóng">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <figure className="lightbox__inner">
          <img id="lightbox-img" alt="" />
          <figcaption id="lightbox-cap"></figcaption>
        </figure>
      </div>

      {/* Popup giữ chỗ: mở bằng các nút có data-open-lead, tự hiện sau vài giây (xem main.js mục 11) */}
      <div className="lead-modal" id="lead-modal" hidden>
        <div className="lead-modal__box" role="dialog" aria-modal="true" aria-labelledby="lead-title">
          <button className="lead-modal__close" type="button" data-lead-close="" aria-label="Đóng">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>

          <div className="lead-modal__body" id="lead-body">
            <p className="lead-modal__kicker">Buổi trò chuyện đầu tiên · <strong>Miễn phí</strong></p>
            <h2 className="lead-modal__title" id="lead-title">Giữ chỗ một buổi<br /><em>tư vấn dinh dưỡng 1:1</em> cùng cô Nga</h2>

            <figure className="lead-modal__media">
              <img src="/assets/img/chan-dung-hero.svg" alt="" width="900" height="1150" loading="lazy" />
            </figure>

            <p className="lead-modal__lead">Mỗi tuần cô Nga chỉ nhận một số buổi để trò chuyện kỹ với từng gia đình. Điền thông tin bên dưới để được giữ chỗ:</p>

            <form className="form lead-form" id="lead-form" action="/api/lien-he" method="post" noValidate>
              <input type="hidden" name="nguon" value="popup" />
              <div className="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>

              <div className="field">
                <label className="sr-only" htmlFor="lead-ten">Tên của bạn</label>{' '}
                <input type="text" id="lead-ten" name="ten" autoComplete="name" placeholder="Tên của bạn *" required />
                <p className="field__err" data-err-for="ten"></p>
              </div>
              <div className="field">
                <label className="sr-only" htmlFor="lead-sdt">Số điện thoại</label>{' '}
                <input type="tel" id="lead-sdt" name="sdt" autoComplete="tel" inputMode="tel" placeholder="Số điện thoại / Zalo *" required />
                <p className="field__err" data-err-for="sdt"></p>
              </div>
              <div className="field">
                <label className="sr-only" htmlFor="lead-email">Email</label>{' '}
                <input type="email" id="lead-email" name="email" autoComplete="email" placeholder="Email *" required />
                <p className="field__err" data-err-for="email"></p>
              </div>

              <button className="btn btn--gold btn--block lead-form__submit" type="submit">
                Giữ chỗ cho tôi{' '}
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <p className="form__note">Thông tin của bạn được giữ kín, chỉ dùng để cô Nga liên hệ lại.</p>
              <p className="form__status" role="status" aria-live="polite"></p>
            </form>
          </div>

          <div className="lead-modal__done" id="lead-done" hidden>
            <span className="lead-modal__tick" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
            <h2 className="lead-modal__title">Đã giữ chỗ cho bạn!</h2>
            <p className="lead-modal__lead" id="lead-done-text">Cô Nga sẽ gọi hoặc nhắn Zalo cho bạn trong vòng 24 giờ. Muốn trò chuyện ngay thì nhắn Zalo luôn nhé.</p>
            <a className="btn btn--jade btn--block" id="lead-zalo" href="https://zalo.me/" target="_blank" rel="noopener noreferrer">Nhắn Zalo cho cô Nga</a>
          </div>
        </div>
      </div>

    </>
  );
}
