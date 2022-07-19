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

  /* Activeaza linkurile cand suntem intr-o sectiune */
  const navLinks = select('.nav--main .nav-link', true)
  const activateNavLinks = () => {
    let position = window.scrollY + 200
    navLinks.forEach(navLink => {
      if (!navLink.hash) return
      let section = select(navLink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navLink.classList.add('active')
      } else {
        navLink.classList.remove('active')
      }
    })
  }

  // listeners
  window.addEventListener('load', activateNavLinks)
  onScroll(document, activateNavLinks)

  /* Scrool to hash */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const el = select(window.location.hash) 
      if (el) {
        el.scrollIntoView()
      }
    }
  })

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
  
  /* Back to top */
  const backToTop = select('.back-to-top')
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add('active')
      } else {
        backToTop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBackToTop)
    onScroll(document, toggleBackToTop)
  }

})()