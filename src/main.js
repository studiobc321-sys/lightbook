import './style.css';

const siteIntro = document.querySelector('[data-site-intro]');
const introMessage = document.querySelector('[data-intro-message]');
const introLogo = document.querySelector('[data-intro-logo]');
const INTRO_SESSION_KEY = 'lightbook-intro-seen';
const hasIntroAtLoad = document.documentElement.classList.contains('has-intro');

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

const finishSiteIntro = () => {
  document.documentElement.classList.remove('has-intro');
  siteIntro?.remove();
  window.dispatchEvent(new Event('lightbook:intro-complete'));

  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
  } catch {
    // A blocked storage context simply plays the entrance on the next load.
  }
};

const splitIntroMessage = () => {
  if (!introMessage) return;

  const characters = [...introMessage.textContent.trim()];
  const fragment = document.createDocumentFragment();

  characters.forEach((character) => {
    const letter = document.createElement('span');
    const distanceX = (Math.random() - 0.5) * window.innerWidth * 1.15;
    const distanceY = (Math.random() - 0.5) * window.innerHeight * 0.82;
    letter.textContent = character === ' ' ? '\u00a0' : character;
    letter.style.setProperty('--scatter-x', `${distanceX.toFixed(0)}px`);
    letter.style.setProperty('--scatter-y', `${distanceY.toFixed(0)}px`);
    letter.style.setProperty('--scatter-rotate', `${((Math.random() - 0.5) * 150).toFixed(0)}deg`);
    fragment.append(letter);
  });

  introMessage.replaceChildren(fragment);
};

const loadIntroLogo = () => new Promise((resolve) => {
  if (!introLogo || (introLogo.complete && introLogo.naturalWidth)) {
    resolve();
    return;
  }

  introLogo?.addEventListener('load', resolve, { once: true });
  introLogo?.addEventListener('error', resolve, { once: true });
  window.setTimeout(resolve, 900);
});

const runSiteIntro = async () => {
  if (!siteIntro || !introMessage || !introLogo) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    finishSiteIntro();
    return;
  }

  // The copy resolves from scattered fragments, then hands off to a simple logo reveal.
  splitIntroMessage();
  document.documentElement.classList.add('intro-ready');
  await wait(280);
  introMessage.classList.add('is-assembled');
  await wait(1200);
  await wait(420);
  introMessage.classList.add('is-fading');
  await wait(220);
  await loadIntroLogo();
  siteIntro.classList.add('is-logo-visible');
  await wait(1250);
  siteIntro.classList.add('is-logo-dissolving');
  await wait(820);
  siteIntro.classList.add('is-exiting');
  await wait(1050);
  finishSiteIntro();
};

if (document.documentElement.classList.contains('has-intro')) {
  runSiteIntro();
} else {
  siteIntro?.remove();
}

const setupTextReveals = () => {
  const revealTargets = [...document.querySelectorAll('[data-text-reveal]')];
  if (!revealTargets.length) return;

  revealTargets.forEach((target) => {
    const label = target.textContent.replace(/\s+/g, ' ').trim();
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue.trim().length
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });
    const textNodes = [];
    let textNode = walker.nextNode();

    while (textNode) {
      textNodes.push(textNode);
      textNode = walker.nextNode();
    }

    let characterIndex = 0;
    textNodes.forEach((node) => {
      const fragment = document.createDocumentFragment();

      [...node.nodeValue].forEach((character) => {
        const characterElement = document.createElement('span');
        characterElement.className = 'text-reveal__character';
        characterElement.setAttribute('aria-hidden', 'true');
        characterElement.style.setProperty('--reveal-index', String(Math.min(characterIndex, 60)));
        characterElement.textContent = character === ' ' ? '\u00a0' : character;
        fragment.append(characterElement);
        characterIndex += 1;
      });

      node.replaceWith(fragment);
    });

    target.classList.add('text-reveal');
    target.setAttribute('aria-label', label);
  });

  window.lightbookTextReveal = {
    replay(target) {
      if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      target.classList.remove('is-revealed');
      void target.offsetWidth;
      target.classList.add('is-revealed');
    },
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach((target) => target.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.22, rootMargin: '0px 0px -8%' });

  revealTargets.forEach((target) => observer.observe(target));
};

if (hasIntroAtLoad) {
  window.addEventListener('lightbook:intro-complete', setupTextReveals, { once: true });
} else {
  window.requestAnimationFrame(setupTextReveals);
}

// TODO: 빛책사 네이버 스마트스토어의 실제 상품 URL로 교체하세요.
const SMARTSTORE_URL = 'https://smartstore.naver.com/';

document.querySelectorAll('[data-smartstore]').forEach((link) => {
  link.href = SMARTSTORE_URL;
});

const siteHeader = document.querySelector('.site-header');
const syncHeader = () => {
  siteHeader?.classList.toggle('is-visible', window.scrollY > 48);
};

window.addEventListener('scroll', syncHeader, { passive: true });
window.addEventListener('hashchange', () => window.requestAnimationFrame(syncHeader));
syncHeader();

const siteNav = document.querySelector('.site-nav--replacement');
const navToggle = siteNav?.querySelector('[data-nav-toggle]');

if (siteNav && navToggle) {
  const setNavOpen = (open) => {
    siteNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };

  navToggle.addEventListener('click', () => {
    setNavOpen(!siteNav.classList.contains('is-open'));
  });

  siteNav.querySelectorAll('.site-nav__link').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNavOpen(false);
  });
}

const heroCarousel = document.querySelector('[data-hero-carousel]');

if (heroCarousel) {
  const heroSlides = [...heroCarousel.querySelectorAll('[data-hero-slide]')];
  const heroMedia = heroCarousel.closest('.hero__media');
  const heroPrev = document.querySelector('[data-hero-prev]');
  const heroNext = document.querySelector('[data-hero-next]');
  let heroIndex = 0;

  const syncHeroSources = () => {
    const mobile = window.matchMedia('(max-width: 680px)').matches;
    heroSlides.forEach((slide) => {
      const source = mobile ? slide.dataset.mobileSrc : slide.dataset.desktopSrc;
      if (source && !slide.src.endsWith(source)) slide.src = source;
    });
  };

  const showHeroSlide = (nextIndex) => {
    heroIndex = nextIndex % heroSlides.length;
    heroSlides.forEach((slide, index) => {
      const active = index === heroIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      if (active && heroMedia) heroMedia.style.setProperty('--hero-bg', `url("${slide.currentSrc || slide.src}")`);
    });
  };

  const moveHeroSlide = (step) => showHeroSlide((heroIndex + step + heroSlides.length) % heroSlides.length);

  syncHeroSources();
  showHeroSlide(0);
  heroPrev?.addEventListener('click', () => moveHeroSlide(-1));
  heroNext?.addEventListener('click', () => moveHeroSlide(1));
  window.addEventListener('resize', () => {
    syncHeroSources();
    showHeroSlide(heroIndex);
  });
}

const serviceRevealItems = [...document.querySelectorAll('[data-services-reveal]')];

if (serviceRevealItems.length) {
  const revealServices = () => serviceRevealItems.forEach((item) => item.classList.add('is-visible'));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealServices();
  } else {
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          servicesObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    serviceRevealItems.forEach((item) => servicesObserver.observe(item));
  }
}

document.querySelectorAll('[data-comparison]').forEach((comparison) => {
  const input = comparison.querySelector('input[type="range"]');
  if (!input) return;

  const updateComparison = () => {
    comparison.style.setProperty('--split', `${input.value}%`);
  };

  input.addEventListener('input', updateComparison);
  updateComparison();
});

const storyGallery = document.querySelector('[data-story-gallery]');

if (storyGallery) {
  const galleryItems = [...storyGallery.querySelectorAll('[data-gallery-item]')];
  const galleryDisplay = storyGallery.querySelector('[data-gallery-display]');
  const displayImage = galleryDisplay?.querySelector('img');
  const displayTitle = storyGallery.querySelector('[data-gallery-display-title]');
  const displayMeta = storyGallery.querySelector('[data-gallery-display-meta]');
  let galleryTimer = 0;

  const selectGalleryItem = (item) => {
    if (!displayImage || item.classList.contains('is-active')) return;

    galleryItems.forEach((galleryItem) => {
      const isSelected = galleryItem === item;
      galleryItem.classList.toggle('is-active', isSelected);
      galleryItem.setAttribute('aria-selected', String(isSelected));
    });

    window.clearTimeout(galleryTimer);
    galleryDisplay?.classList.add('is-switching');
    galleryTimer = window.setTimeout(() => {
      displayImage.src = item.dataset.galleryImage || displayImage.src;
      displayImage.alt = item.dataset.galleryAlt || '';
      if (displayTitle) displayTitle.textContent = item.dataset.galleryTitle || '';
      if (displayMeta) displayMeta.textContent = item.dataset.galleryMeta || '';
      displayImage.onload = () => galleryDisplay?.classList.remove('is-switching');
      window.setTimeout(() => galleryDisplay?.classList.remove('is-switching'), 360);
    }, 150);
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => selectGalleryItem(item));
  });
}

const storyMouseFollow = document.querySelector('[data-story-mouse-follow]');

if (storyMouseFollow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const storySection = storyMouseFollow.closest('.story');
  let pointerFrame = 0;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const renderStoryPointer = () => {
    pointerFrame = 0;
    currentX += (targetX - currentX) * 0.17;
    currentY += (targetY - currentY) * 0.17;
    storyMouseFollow.style.setProperty('--pointer-x', `${currentX.toFixed(1)}px`);
    storyMouseFollow.style.setProperty('--pointer-y', `${currentY.toFixed(1)}px`);

    if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
      pointerFrame = window.requestAnimationFrame(renderStoryPointer);
    }
  };

  const requestPointerRender = () => {
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderStoryPointer);
  };

  const syncPointerTarget = (event) => {
    if (!storySection) return;
    const bounds = storySection.getBoundingClientRect();
    targetX = event.clientX - bounds.left;
    targetY = event.clientY - bounds.top;
    requestPointerRender();
  };

  storySection?.addEventListener('pointerenter', (event) => {
    syncPointerTarget(event);
    currentX = targetX;
    currentY = targetY;
    storyMouseFollow.classList.add('is-visible');
    requestPointerRender();
  });
  storySection?.addEventListener('pointermove', syncPointerTarget);
  storySection?.addEventListener('pointerleave', () => storyMouseFollow.classList.remove('is-visible'));
}

const floatingContact = document.querySelector('[data-floating-contact]');

if (floatingContact) {
  const floatingToggle = floatingContact.querySelector('[data-floating-toggle]');
  const floatingMenu = floatingContact.querySelector('#floating-contact-menu');

  const setFloatingMenu = (open) => {
    floatingContact.classList.toggle('is-open', open);
    floatingToggle?.setAttribute('aria-expanded', String(open));
    floatingMenu?.setAttribute('aria-hidden', String(!open));
  };

  floatingToggle?.addEventListener('click', () => {
    setFloatingMenu(!floatingContact.classList.contains('is-open'));
  });

  floatingContact.querySelectorAll('[data-floating-item]').forEach((item) => {
    item.addEventListener('click', () => {
      // Links will be assigned once the social/contact destinations are ready.
      item.blur();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setFloatingMenu(false);
  });

  document.addEventListener('click', (event) => {
    if (!floatingContact.contains(event.target)) setFloatingMenu(false);
  });
}

const processSection = document.querySelector('.process');

if (processSection) {
  const processSteps = [...processSection.querySelectorAll('.process-step')];
  const processPanels = [...processSection.querySelectorAll('.process-panel')];
  const processRail = processSection.querySelector('.process__rail span');
  const processCounter = processSection.querySelector('.process__counter');
  let frame = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  processPanels.forEach((panel) => {
    const image = panel.querySelector('img');
    if (image) {
      panel.style.setProperty('--panel-bg', `url("${image.currentSrc || image.src}")`);
    }
  });

  const renderProcess = () => {
    frame = 0;

    const sectionRect = processSection.getBoundingClientRect();
    const travel = Math.max(1, processSection.offsetHeight - window.innerHeight);
    const progress = clamp(-sectionRect.top / travel);
    const scaledProgress = progress * processSteps.length;
    const activeIndex = Math.min(processSteps.length - 1, Math.floor(scaledProgress));
    const localProgress = activeIndex === processSteps.length - 1
      ? 1
      : clamp(scaledProgress - activeIndex);

    processSteps.forEach((step, index) => {
      const active = index === activeIndex;
      step.classList.toggle('is-active', active);
      const trigger = step.querySelector('.process-step__label');
      if (trigger) {
        if (active) trigger.setAttribute('aria-current', 'step');
        else trigger.removeAttribute('aria-current');
      }
    });

    if (processRail) {
      const railProgress = processSteps.length === 1
        ? 1
        : (activeIndex + localProgress) / (processSteps.length - 1);
      processRail.style.height = `${clamp(railProgress) * 100}%`;
    }

    if (processCounter) {
      processCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(processSteps.length).padStart(2, '0')}`;
    }

    processPanels.forEach((panel, index) => {
      const isCurrent = index === activeIndex;
      const isNext = index === activeIndex + 1;
      const nextFade = isNext ? clamp((localProgress - 0.58) / 0.42) : 0;
      const opacity = isCurrent ? 1 : nextFade * 0.8;
      const scaleProgress = isCurrent ? localProgress : nextFade;
      const scale = 0.96 + scaleProgress * 0.08;
      const translateY = (1 - scaleProgress) * 12;

      panel.classList.toggle('is-active', isCurrent);
      panel.style.opacity = opacity;
      panel.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      panel.setAttribute('aria-hidden', String(!isCurrent));
    });
  };

  const requestProcessRender = () => {
    if (!frame) frame = window.requestAnimationFrame(renderProcess);
  };

  processSteps.forEach((step, index) => {
    const trigger = step.querySelector('.process-step__label');
    trigger?.addEventListener('click', () => {
      const sectionTop = processSection.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(1, processSection.offsetHeight - window.innerHeight);
      const targetScroll = sectionTop + travel * (index / processSteps.length);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', requestProcessRender, { passive: true });
  window.addEventListener('resize', requestProcessRender);
  requestProcessRender();
}

const productsSection = document.querySelector('.products');

if (productsSection) {
  const productHeader = productsSection.querySelector('.products__header');
  const productRows = [...productsSection.querySelectorAll('.product-row')];
  const productMenuItems = [...productsSection.querySelectorAll('[data-product-menu]')];
  let productFrame = 0;
  let lastDominantProductIndex = -1;
  const clampProductProgress = (value) => Math.min(1, Math.max(0, value));

  const renderProducts = () => {
    productFrame = 0;
    const sectionRect = productsSection.getBoundingClientRect();
    const travel = Math.max(1, productsSection.offsetHeight - window.innerHeight);
    const sectionProgress = clampProductProgress(-sectionRect.top / travel);
    const stagedProgress = sectionProgress * Math.max(1, productRows.length);
    const activeIndex = Math.min(productRows.length - 1, Math.floor(stagedProgress));
    const localProgress = activeIndex === productRows.length - 1
      ? 0
      : clampProductProgress(stagedProgress - activeIndex);
    const incomingProgress = clampProductProgress((localProgress - 0.78) / 0.22);
    const easedIncoming = 1 - Math.pow(1 - incomingProgress, 3);
    const dominantIndex = easedIncoming >= 0.5 && activeIndex < productRows.length - 1
      ? activeIndex + 1
      : activeIndex;

    productRows.forEach((row, index) => {
      let opacity = 0;
      let scale = 0.9;
      let translateX = 7;

      if (index === activeIndex) {
        opacity = 1 - easedIncoming;
        scale = 1 + Math.min(localProgress, 0.82) * 0.035;
        translateX = -easedIncoming * 4.8;
      } else if (index === activeIndex + 1) {
        opacity = easedIncoming;
        scale = 0.91 + easedIncoming * 0.09;
        translateX = (1 - easedIncoming) * 7;
      }

      const active = index === dominantIndex;
      row.classList.toggle('is-product-active', active);
      row.style.opacity = opacity.toFixed(3);
      row.style.transform = `translate3d(${translateX.toFixed(2)}vw, 0, 0) scale(${scale.toFixed(3)})`;
      row.setAttribute('aria-hidden', String(!active));
      if (active) row.setAttribute('aria-current', 'true');
      else row.removeAttribute('aria-current');
    });

    if (dominantIndex !== lastDominantProductIndex) {
      window.lightbookTextReveal?.replay(productRows[dominantIndex]?.querySelector('[data-text-reveal]'));
      lastDominantProductIndex = dominantIndex;
    }

    if (productHeader) {
      productHeader.style.opacity = (1 - sectionProgress * 0.32).toFixed(3);
      productHeader.style.transform = `translateY(${(-sectionProgress * 16).toFixed(1)}px)`;
    }

    productMenuItems.forEach((item, index) => {
      const isActive = Number(item.dataset.productIndex) === dominantIndex;
      item.classList.toggle('is-active', isActive);
      if (isActive) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
  };

  const requestProductsRender = () => {
    if (!productFrame) productFrame = window.requestAnimationFrame(renderProducts);
  };

  window.addEventListener('scroll', requestProductsRender, { passive: true });
  window.addEventListener('resize', requestProductsRender);
  productMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
      const index = Number(item.dataset.productIndex);
      const sectionTop = productsSection.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(1, productsSection.offsetHeight - window.innerHeight);
      const targetScroll = sectionTop + travel * (index / Math.max(1, productRows.length));
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });
  requestProductsRender();
}

const productSampleModal = document.querySelector('[data-product-sample-modal]');

if (productSampleModal) {
  const sampleImage = productSampleModal.querySelector('[data-product-sample-image]');
  const sampleCategory = productSampleModal.querySelector('[data-product-sample-category]');
  const sampleTitle = productSampleModal.querySelector('[data-product-sample-title]');
  const sampleDescription = productSampleModal.querySelector('[data-product-sample-description]');
  const sampleClose = [...productSampleModal.querySelectorAll('[data-product-sample-close]')];
  const sampleRows = [...document.querySelectorAll('[data-product-sample]')];
  let lastSampleTrigger = null;

  const closeProductSample = () => {
    productSampleModal.classList.remove('is-open');
    productSampleModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-modal-open');
    lastSampleTrigger?.focus();
  };

  const openProductSample = (row, trigger) => {
    if (!row || !sampleImage) return;
    lastSampleTrigger = trigger || document.activeElement;
    sampleImage.src = row.dataset.productImage || '';
    sampleImage.alt = row.dataset.productAlt || '';
    if (sampleCategory) sampleCategory.textContent = row.dataset.productCategory || '';
    if (sampleTitle) sampleTitle.textContent = row.dataset.productName || '';
    if (sampleDescription) sampleDescription.textContent = row.dataset.productDescription || '';
    productSampleModal.classList.add('is-open');
    productSampleModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-modal-open');
    productSampleModal.querySelector('.product-sample-modal__close')?.focus();
  };

  sampleRows.forEach((row) => {
    row.querySelectorAll('[data-product-sample-trigger]').forEach((trigger) => {
      trigger.addEventListener('click', () => openProductSample(row, trigger));
    });

    row.addEventListener('click', (event) => {
      if (event.target.closest('a, button, input, textarea, select')) return;
      openProductSample(row, row.querySelector('[data-product-sample-trigger]'));
    });
  });

  sampleClose.forEach((button) => button.addEventListener('click', closeProductSample));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && productSampleModal.classList.contains('is-open')) closeProductSample();
  });
}

document.querySelectorAll('[data-footer-contact]').forEach((contact) => {
  contact.addEventListener('click', (event) => event.preventDefault());
});
