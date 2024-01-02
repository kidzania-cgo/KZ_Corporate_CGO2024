$(document).ready(function () {
  $('#kznation-dropdown').hover(function () {
    $('#kznation-dropdown-menu').css('display', 'block');
    $('#kznation').addClass('open');
  });
  $('#kznation-dropdown').mouseleave(function () {
    function dismissMenuNation() {

      $('#kznation').removeClass('open');
      $('#kznation-dropdown-menu').css('display', 'none');

    }

    var timeoutID = window.setTimeout(dismissMenuNation, 300);

  });
  $('#kznation-dropdown-2').hover(function () {
    $('#kznation-dropdown-menu-2').css('display', 'block');
    $('#kznation2').addClass('open');
  });
  $('#kznation-dropdown-2').mouseleave(function () {
    function dismissMenuNation2() {
      $('#kznation2').removeClass('open');
      $('#kznation-dropdown-menu-2').css('display', 'none');

    }

    var timeoutID = window.setTimeout(dismissMenuNation2, 300);

  });
  $('#companyinfo').hover(function () {
    $('#companyinfo-dropdown').addClass('open');
  });
  $('#companyinfo-dropdown').mouseleave(function () {
    function dismissMenuCompany() {
      $('#companyinfo-dropdown').removeClass('open')
    }

    var timeoutID = window.setTimeout(dismissMenuCompany, 300);

  });
  $('#companyinfo-dropdown-2').hover(function () {
    $('#companyinfo-dropdown-menu-2').css('display', 'block');
    $('#companyinfo2').addClass('open');

  });
  $('#companyinfo-dropdown-2').mouseleave(function () {
    function dismissMenuCompany2() {
      $('#companyinfo-dropdown-menu-2').css('display', 'none');
      $('#companyinfo2').removeClass('open');
    }

    var timeoutID = window.setTimeout(dismissMenuCompany2, 300);

  });
  $('#navbar-toggle').click(function () {
    $('.home-wrapper').toggleClass('open');
    $('.navbar-header').toggleClass('open');
    $('.menu-wave').toggleClass('in');
  });
  $('#kznation').click(function () {
    $('.home-wrapper').toggleClass('nation');
    $('.navbar-header').toggleClass('nation');
  });
  $('#companyinfo').click(function () {
    $('.home-wrapper').toggleClass('company');
    $('.navbar-header').toggleClass('company');
  });
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    //>=, not <=
    if (scroll >= 550) {
      //clearHeader, not clearheader - caps H
      $("#navSpy").css("margin-top", "0");
    }
    else {
      $("#navSpy").css("margin-top", "-90px");
    }
  }); //missing );
  $('#cookiesOk').click(function () {
    $('.cookie-bar').css('opacity', '0');
    $('.cookie-bar').css('visibility', 'hidden');
    Cookies.set('visited', 'yes', {expires: 365});
  });
  $('#cookiesOk2').click(function () {
    $('.cookie-bar').css('opacity', '0');
    $('.cookie-bar').css('visibility', 'hidden');
    Cookies.set('visited', 'yes', {expires: 365});
  });

  var lastScrollTop = 0;
  $(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      $('.mobile-nav').css('top', '-90px');
      $('.mobile-nav').css('opacity', '0');
      $('.mobile-nav').css('z-index', '2');
      if (
          $('#content-list').hasClass('in')
          ) {
        $('.mobile-menu-toggle').click();
      }

    } else {
      $('.mobile-nav').css('top', '0');
      $('.mobile-nav').css('opacity', '1');
      $('.mobile-nav').css('z-index', '10');
    }
    lastScrollTop = st;
  });
});
