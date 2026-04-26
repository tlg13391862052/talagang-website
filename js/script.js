// 网站交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // 切换图标
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击菜单项后关闭菜单（移动端）
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 计算偏移量（考虑固定导航栏）
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 这里应该发送到服务器
            // 暂时只显示成功消息
            alert('感谢您的咨询！我们会尽快与您联系。');
            this.reset();
        });
    }
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'white';
        }
    });
    
    // 产品卡片悬停效果增强
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 页面加载动画
    function initAnimations() {
        // 使用Intersection Observer实现滚动动画
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // 观察需要动画的元素
        const animateElements = document.querySelectorAll('.feature, .product-card, .step, .cert');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // 初始化动画
    initAnimations();
    
    // 当前年份更新
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
});

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature, .product-card, .step, .cert {
        opacity: 0;
    }
    
    /* 延迟动画 */
    .feature:nth-child(1) { animation-delay: 0.1s; }
    .feature:nth-child(2) { animation-delay: 0.2s; }
    .feature:nth-child(3) { animation-delay: 0.3s; }
    .feature:nth-child(4) { animation-delay: 0.4s; }
    
    .product-card:nth-child(1) { animation-delay: 0.1s; }
    .product-card:nth-child(2) { animation-delay: 0.2s; }
    .product-card:nth-child(3) { animation-delay: 0.3s; }
    .product-card:nth-child(4) { animation-delay: 0.4s; }
    
    .step:nth-child(1) { animation-delay: 0.1s; }
    .step:nth-child(2) { animation-delay: 0.2s; }
    .step:nth-child(3) { animation-delay: 0.3s; }
    .step:nth-child(4) { animation-delay: 0.4s; }
`;
document.head.appendChild(style);

// 视频控制功能
function togglePlay() {
    const video = document.getElementById('sunitVideo');
    const playBtn = document.querySelector('.play-btn i');
    
    if (video && playBtn) {
        if (video.paused) {
            video.play();
            playBtn.className = 'fas fa-pause';
            document.querySelector('.play-btn span').textContent = '暂停视频';
        } else {
            video.pause();
            playBtn.className = 'fas fa-play';
            document.querySelector('.play-btn span').textContent = '播放视频';
        }
    }
}

function toggleFullscreen() {
    const video = document.getElementById('sunitVideo');
    const container = document.querySelector('.video-container');
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 视频事件监听
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('sunitVideo');
    const playBtn = document.querySelector('.play-btn i');
    
    if (video && playBtn) {
        video.addEventListener('play', function() {
            playBtn.className = 'fas fa-pause';
            document.querySelector('.play-btn span').textContent = '暂停视频';
        });
        
        video.addEventListener('pause', function() {
            playBtn.className = 'fas fa-play';
            document.querySelector('.play-btn span').textContent = '播放视频';
        });
        
        video.addEventListener('ended', function() {
            playBtn.className = 'fas fa-redo';
            document.querySelector('.play-btn span').textContent = '重新播放';
        });
        
        // 视频加载状态提示
        video.addEventListener('waiting', function() {
            console.log('视频正在缓冲...');
        });
        
        video.addEventListener('canplay', function() {
            console.log('视频可以播放了');
        });
    }
    
    // 产品图片轮播功能
    initProductGallery();
});

// 产品图片轮播功能
function initProductGallery() {
    const galleries = document.querySelectorAll('.product-gallery');
    if (!galleries.length) return;
    
    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const dots = gallery.querySelectorAll('.dot');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        
        if (!slides.length) return;
        
        // 如果是礼盒产品，隐藏轮播按钮和指示点，只显示第一张
        if (gallery.querySelector('img[src*="talagong-gift-box"]')) {
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.style.display = 'flex';
                    slide.style.opacity = '1';
                } else {
                    slide.style.display = 'none';
                }
            });
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (dots.length) dots.forEach(d => d.style.display = 'none');
            return;
        }
        
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(index) {
            if (index < 0) index = slides.length - 1;
            else if (index >= slides.length) index = 0;
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }
        
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 3000);
        }
        
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { showSlide(index); stopAutoSlide(); startAutoSlide(); });
        });
        
        gallery.addEventListener('mouseenter', stopAutoSlide);
        gallery.addEventListener('mouseleave', startAutoSlide);
        
        // 触摸滑动
        let touchStartX = 0;
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        });
        gallery.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) nextSlide();
            else if (touchEndX > touchStartX + 50) prevSlide();
            startAutoSlide();
        });
        
        showSlide(0);
        startAutoSlide();
    });
}

// 简化：只检查礼盒图片加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('检查礼盒图片加载...');
    const giftBoxImg = new Image();
    giftBoxImg.src = 'images/talagong-gift-box.jpg';
    giftBoxImg.onload = () => console.log('✅ 礼盒图片加载成功');
    giftBoxImg.onerror = () => console.log('❌ 礼盒图片加载失败');
    
    // 初始化视频功能
    initVideoFunctions();
});

// 视频控制函数
function initVideoFunctions() {
    const video = document.getElementById('sunitVideo');
    if (!video) return;
    
    console.log('初始化视频控制...');
    
    // 检查视频是否可播放
    video.addEventListener('loadeddata', function() {
        console.log('✅ 视频加载成功，时长:', formatTime(video.duration));
    });
    
    video.addEventListener('error', function(e) {
        console.error('❌ 视频加载失败:', e);
        showVideoError();
    });
}

function togglePlay() {
    const video = document.getElementById('sunitVideo');
    const playBtn = document.querySelector('.play-btn');
    const icon = playBtn.querySelector('i');
    const text = playBtn.querySelector('span');
    
    if (video.paused) {
        video.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        text.textContent = '暂停视频';
    } else {
        video.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        text.textContent = '播放视频';
    }
}

function toggleFullscreen() {
    const video = document.getElementById('sunitVideo');
    const container = document.querySelector('.video-container');
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function toggleMute() {
    const video = document.getElementById('sunitVideo');
    const muteBtn = document.querySelector('.mute-btn');
    const icon = muteBtn.querySelector('i');
    const text = muteBtn.querySelector('span');
    
    video.muted = !video.muted;
    
    if (video.muted) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
        text.textContent = '取消静音';
    } else {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
        text.textContent = '静音';
    }
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function showVideoError() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'video-error';
    errorDiv.innerHTML = `
        <div style="padding: 20px; text-align: center; background: #f8d7da; color: #721c24; border-radius: 10px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <h4>视频加载失败</h4>
            <p>请检查视频文件路径或尝试刷新页面</p>
            <p>视频文件应位于：videos/sunit-sheep-promo.mp4</p>
        </div>
    `;
    
    videoContainer.appendChild(errorDiv);
}

// 全屏变化监听
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const icon = fullscreenBtn.querySelector('i');
    const text = fullscreenBtn.querySelector('span');
    
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
        text.textContent = '退出全屏';
    } else {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
        text.textContent = '全屏';
    }
}