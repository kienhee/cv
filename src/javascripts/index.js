
(function ($) {

  "use strict";

  // Biến DOM
  const $toggle = $('#navbarToggle');
  const $links = $('#navbarLinks');
  const $overlay = $('#navbarOverlay');
  const $menuItems = $('.navbar_links_item');
  const $progressBar = $('#scrollProgressBar');
  const $navbar = $('.navbar');

  // Ngưỡng mobile/tablet
  const isMobile = () => $(window).width() <= 1024;

  // Toggle menu
  $toggle.on('click', function () {
    $links.toggleClass('active');
    $overlay.toggleClass('active');
    $toggle.toggleClass('open');
  });

  // Click vào overlay để đóng menu
  $overlay.on('click', function () {
    $links.removeClass('active');
    $overlay.removeClass('active');
    $toggle.removeClass('open');
  });

  // Click menu item
  $menuItems.on('click', function () {
    if (isMobile()) {
      $links.removeClass('active');
      $overlay.removeClass('active');
      $toggle.removeClass('open');
    }

    $menuItems.removeClass('active');
    $(this).addClass('active');
  });
  // Active menu item on scroll
  const sectionIds = ['#about', '#skills', '#experience', '#works', '#contact'];
  const $menuLinks = $('.navbar_links_item a');

  function onScrollActiveMenu() {
    let scrollPos = $(window).scrollTop();
    let headerHeight = $navbar.outerHeight() || 0;
    let found = false;
    let windowBottom = scrollPos + $(window).height();
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      let section = $(sectionIds[i]);
      if (section.length) {
        let offset = section.offset().top - headerHeight - 2;
        let sectionBottom = section.offset().top + section.outerHeight();
        // Nếu là section cuối cùng và đã gần cuối trang thì luôn active
        if (i === sectionIds.length - 1 && windowBottom >= $(document).height() - 10) {
          $menuItems.removeClass('active');
          $menuLinks.filter(`[href='${sectionIds[i]}']`).parent().addClass('active');
          found = true;
          break;
        }
        if (scrollPos >= offset) {
          $menuItems.removeClass('active');
          $menuLinks.filter(`[href='${sectionIds[i]}']`).parent().addClass('active');
          found = true;
          break;
        }
      }
    }
    if (!found) {
      $menuItems.removeClass('active');
    }
  }

  $(window).on('scroll', onScrollActiveMenu);
  onScrollActiveMenu();

  // Cập nhật vị trí progressBar theo chiều cao navbar
  function updateProgressBarTop() {
    const navbarHeight = $navbar.outerHeight();
    $progressBar.css('top', `${navbarHeight}px`);
  }

  // Khi load + resize
  $(window).on('load resize', updateProgressBarTop);

  // Khi scroll
  $(window).on('scroll', function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrolled = (scrollTop / docHeight) * 100;

    $progressBar.css('width', `${scrolled}%`);
  });

  // Hiện nút back to top khi scroll xuống
  const $backToTop = $('#backToTop');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $backToTop.addClass('show');
    } else {
      $backToTop.removeClass('show');
    }
  });

  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // Smooth scroll to sections - đoạn này làm cho các liên kết trong navbar cuộn mượt mà đến các phần tương ứng
  $('.navbar_links a').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var headerHeight = $('.navbar').outerHeight();
    var targetOffset = $(target).offset().top - headerHeight;

    $('html, body').animate({
      scrollTop: targetOffset
    }, 500);
  });

  // Copy button
  $('.copy-btn').on('click', function () {
    const text = $(this).prev().text().trim();

    navigator.clipboard.writeText(text).then(() => {
      $.notify('Copied to clipboard', 'success', { position: 'top' });
    });
  });

  // Copyright year
  $('#copyright').text(`${new Date().getFullYear()} | copyright By Kienhee 💖`);

  $(window).on('load', function () {
    $('.preloader').fadeOut();
  });

})(jQuery);