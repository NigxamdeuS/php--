document.addEventListener('DOMContentLoaded', function() {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // メニューリンクをクリックしたらメニューを閉じる
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // スライドショーの実装
    const heroSection = document.querySelector('#hero');
    const images = [
        'images/main.jpg',
        'images/main1.jpg',
        'images/main2.jpg',
    ];
    
    // スライド要素の作成
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url(${image})`;
        heroSection.insertBefore(slide, heroSection.firstChild);
    });

    // スライドの切り替え
    let currentSlide = 0;
    setInterval(() => {
        const slides = document.querySelectorAll('.hero-slide');
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);

    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2  // 20%見えたら発火
    });

    // 監視対象の要素を登録
    document.querySelectorAll('.menu-item').forEach(item => {
        observer.observe(item);
    });

    // Cookie同意の処理
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptButton = document.getElementById('acceptCookies');

    // Cookieの確認
    function checkCookieConsent() {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }
    }

    // 同意ボタンのクリックイベント
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.classList.remove('show');
    });

    // 初期チェック
    checkCookieConsent();
});
