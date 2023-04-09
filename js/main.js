'use strict';

{
  // ハンバーガーメニュー押下時、サブメニューを表示
  const open = document.getElementById('menu_open');
  const spHeader = document.getElementById('sp_header');
  const spJumps = document.querySelectorAll('sp_jump');

  open.addEventListener('click', () => {
    if (open.classList.contains('active')) {
      open.classList.remove('active');
      spHeader.classList.remove('display');
    } else {
      open.classList.add('active');
      spHeader.classList.add('display');
    }

    // サブメニュー表示時、スクロールキャンセル
    if (open.classList.contains('active')) {
      document.addEventListener('touchmove', noscroll, { passive: false });
      document.addEventListener('wheel', noscroll, { passive: false });
    } else {
      document.removeEventListener('touchmove', noscroll);
      document.removeEventListener('wheel', noscroll);
    }
  });

  function noscroll(e) {
    e.preventDefault();
  }

  // ヘッダーの文字色を制御
  const top = document.querySelector('.top');
  const pcLinks = document.querySelectorAll('.pc_link');

  function callback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        open.classList.remove('moved');
        pcLinks.forEach(pcLink => {
          pcLink.classList.remove('move');
        });
      } else {
        open.classList.add('moved');
        pcLinks.forEach(pcLink => {
          pcLink.classList.add('move');
        });
      }
    });
  }
  const options = {
    threshold: [0.1],
  }

  const observer = new IntersectionObserver(callback, options);

  observer.observe(top);

  // CONTACTの情報(MAIL、TEL)をクリックでコピー
  const buttons = document.querySelectorAll('button');
  const text = document.querySelector('.copy_cmp');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      navigator.clipboard.writeText(buttons[i].textContent);
      text.classList.add('appear');

      setTimeout(() => {
        text.classList.remove('appear');
      }, 2000)
    });
  }

  // スクロールで各要素を表示
  const inViewObserver = new IntersectionObserver(inViewCallback, {
    threshold: 0.2,
  });

  document.querySelectorAll('.scroll').forEach(el => {
    inViewObserver.observe(el);
  });

  function inViewCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('appear');
    });
  }

  // ページ内遷移
  const smoothScrollTrigger = document.querySelectorAll('a[href^="#jump"]');
  for (let i = 0; i < smoothScrollTrigger.length; i++) {
    smoothScrollTrigger[i].addEventListener('click', (e) => {

      // サブメニューが開いている場合、閉じる
      if (open.classList.contains('active')) {
        open.classList.remove('active');
        spHeader.classList.remove('display');
      }

      e.preventDefault();
      let href = smoothScrollTrigger[i].getAttribute('href');
      let targetElement = document.getElementById(href.replace('#jump_', ''));
      const rect = targetElement.getBoundingClientRect().top;
      const offset = window.pageYOffset;
      const target = rect + offset;
      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    });
  }
}
