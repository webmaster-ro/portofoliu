import Typed from 'typed.js';

(function () {

  /* Selector util */
  const select = (el = '', all = false) => {
    el = el.trim()
    if (all) { 
      return document.querySelectorAll(el)
    }
    return document.querySelector(el)
  }

  /* Event listener helper */
  const on = (type, el, listener, all = false) => {
    const selectedEl = select(el, all)

    if (all) {
      selectedEl.forEach(e => e.addEventListener(type, listener))
    } else {
      selectedEl.addEventListener(type, listener)
    }
  }

  /* On scroll event listener */
  const onScroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /* Toggle .header--scrolled  class to #header when page is scrolled */
  const selectedHeader = select('#header')
  if (selectedHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectedHeader.classList.add('header--scrolled')
      } else {
        selectedHeader.classList.remove('header--scrolled')
      }
    }

    window.addEventListener('load', headerScrolled)
    onScroll(document, headerScrolled)
  }

  /* Mobile nav toggle */
  on('click', '.nav-toggle', function () {
    select('body').classList.toggle('has-mobile-nav')
    this.classList.toggle('active')
  })

  /* Mobile nav link click */
  on('click', '.nav--main li > a', function () {
    const body = select('body')
    if (body.classList.contains('has-mobile-nav')) {
      body.classList.toggle('has-mobile-nav')
      select('.nav-toggle').classList.toggle('active')
    }
  }, true)

  /*
    Hero efect de tiparire
  */
  const typed = select('.typed')
  if (typed) {
    new Typed('.typed', {
      strings: ['Webmaster', 'Designer', 'Developer', 'Freelancer'],
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
  }

  
})()