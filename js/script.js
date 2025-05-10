document.addEventListener('DOMContentLoaded', () => {
  // ===== Общие элементы =====
  const preloader = document.querySelector('.preloader');
  const mainContent = document.querySelector('.main-content');
  const header = document.querySelector('.header');
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  let lastScroll = 0;

  // ===== Функции =====
  
  // 1. Прелоадер (упрощенный)
  const initPreloader = () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
      }
      if (mainContent) mainContent.style.display = 'block';
    }, 5500); // Уменьшено время для GitHub Pages
  };

  // 2. Шапка при скролле (оптимизированная)
  const initHeaderScroll = () => {
    if (!header) return;
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scrolled');
        header.classList.remove('visible');
      } else {
        header.classList.add('visible');
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  // 3. Плавный скролл (оптимизированный)
  const initSmoothScroll = () => {
    if (navLinks.length === 0) return;
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(targetId);
          
          if (target) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight - -100;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Закрытие мобильного меню
            if (mobileNav && mobileNav.classList.contains('active')) {
              burger?.classList.remove('active');
              mobileNav.classList.remove('active');
              document.body.classList.remove('no-scroll');
            }
          }
        }
      });
    });
  };

  // 4. Бургер-меню (оптимизированный)
  const initBurgerMenu = () => {
    if (!burger || !mobileNav) return;
    
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Создание кнопки "Связаться" для мобильной версии
    if (!document.querySelector('.mobile-contact-btn')) {
      const mobileContactBtn = document.createElement('a');
      mobileContactBtn.href = 'application.html';
      mobileContactBtn.className = 'mobile-contact-btn';
      mobileContactBtn.textContent = 'Связаться';
      mobileNav.appendChild(mobileContactBtn);
    }
  };

  // 5. Фильтрация портфолио (оптимизированная)
  const initPortfolioFilter = () => {
    if (filterBtns.length === 0 || portfolioItems.length === 0) return;
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.dataset.filter;
        let delay = 0;
        
        portfolioItems.forEach(item => {
          const shouldShow = filterValue === 'all' || item.dataset.category === filterValue;
          
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            item.style.display = shouldShow ? 'block' : 'none';
            
            if (shouldShow) {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, delay);
              delay += 50;
            }
          }, 100);
        });
      });
    });
  };

  // 6. Видео при наведении (оптимизированное)
  const initVideoHover = () => {
    if (portfolioItems.length === 0) return;
    
    portfolioItems.forEach(item => {
      const video = item.querySelector('video');
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata'; // Оптимизация загрузки
        
        item.addEventListener('mouseenter', () => {
          video.play().catch(e => console.log('Video play error:', e));
        });
        
        item.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
  };

  // 7. Анимация при скролле (Intersection Observer)
  const initScrollAnimation = () => {
    if (portfolioItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(0.95)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    portfolioItems.forEach(item => observer.observe(item));
  };

  // 8. Кнопка "Наверх" (оптимизированная)
  const initScrollToTop = () => {
    if (document.querySelector('.scroll-to-top')) return;
    
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(scrollToTopBtn);

    const toggleScrollButton = () => {
      scrollToTopBtn.classList.toggle('show', window.pageYOffset > 300);
    };

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', toggleScrollButton, { passive: true });
    toggleScrollButton();
  };

  // 9. Инициализация видимого состояния для hover-эффектов
  const initPortfolioHover = () => {
    if (portfolioItems.length === 0) return;
    
    document.querySelectorAll('.portfolio-item').forEach((item) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, 100);
    });
  };

  // 10. Анимация секции "О себе" (оптимизированная)
  const initAboutAnimation = () => {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(aboutSection);
  };

  // 11. Обработчик кнопки play (оптимизированный)
  const initPlayButton = () => {
    const playButton = document.querySelector('.about-media .play-button');
    const video = document.querySelector('.about-media video');
    
    if (!playButton || !video) return;
    
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    
    playButton.addEventListener('click', () => {
      if (video.paused) {
        video.play().then(() => {
          playButton.style.opacity = '0';
        }).catch(e => {
          console.error('Video play failed:', e);
          playButton.style.opacity = '1';
        });
      } else {
        video.pause();
        playButton.style.opacity = '1';
      }
    });
  };

    const initVideoModal = () => {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.video-modal-close');
    const content = modal.querySelector('.video-modal-content');

    document.querySelectorAll('.portfolio-item').forEach((item) => {
      item.addEventListener('click', () => {
        const vkSrc = item.getAttribute('data-vk-src');
        const video = item.querySelector('video');
        const title = item.querySelector('h3')?.textContent || '';

        content.innerHTML = `<span class="video-modal-close">&times;</span>`;

        if (vkSrc) {
          iframe.src = vkSrc;
          iframe.style.display = 'block';
          content.appendChild(iframe);
        } else if (video) {
          const videoSrc = video.querySelector('source')?.src;
          const newVideo = document.createElement('video');
          newVideo.src = videoSrc;
          newVideo.controls = true;
          newVideo.autoplay = true;
          newVideo.style.width = '100%';
          newVideo.style.height = '100%';
          newVideo.style.background = 'black';
          content.appendChild(newVideo);
        }
        modal.style.display = 'flex';
      });
    });

    const closeModal = () => {
      modal.style.display = 'none';
      iframe.src = '';
      content.innerHTML = `<span class="video-modal-close">&times;</span>`;
    };

    content.addEventListener('click', (e) => {
      if (e.target.classList.contains('video-modal-close')) {
        closeModal();
      }
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  };


  // ===== Инициализация =====
  const init = () => {
    initPreloader();
    initHeaderScroll();
    initSmoothScroll();
    initBurgerMenu();
    initPortfolioFilter();
    initVideoHover();
    initScrollAnimation();
    initScrollToTop();
    initPortfolioHover();
    initAboutAnimation();
    initPlayButton();
    initVideoModal();
  };

  // Запуск с проверкой готовности DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
});