import { createHeader } from "./header.js";
import { createFooter } from "./footer.js";

// ======================================
// HEADER
// ======================================

const headerContainer = document.querySelector("#header");

if (headerContainer) {
  headerContainer.innerHTML = createHeader();
}

// ======================================
// FOOTER
// ======================================

const footerContainer = document.querySelector("#footer");

if (footerContainer) {
  footerContainer.innerHTML = createFooter();
}

// ======================================
// FOOTER LOGO SLIDER
// ======================================

function initFooterLogoSlider() {
  document.querySelectorAll("[data-logo-slider]").forEach((slider) => {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    slider.addEventListener("wheel", (event) => {
      if (slider.scrollWidth <= slider.clientWidth) return;

      event.preventDefault();

      slider.scrollLeft +=
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
    }, { passive: false });

    slider.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;

      isDragging = true;
      startX = event.clientX;
      startScrollLeft = slider.scrollLeft;

      slider.classList.add("cursor-grabbing");
      slider.classList.remove("cursor-grab");

      slider.setPointerCapture(event.pointerId);
    });

    slider.addEventListener("pointermove", (event) => {
      if (!isDragging) return;

      slider.scrollLeft =
        startScrollLeft - (event.clientX - startX);
    });

    function stopDragging() {
      isDragging = false;
      slider.classList.remove("cursor-grabbing");
      slider.classList.add("cursor-grab");
    }

    slider.addEventListener("pointerup", stopDragging);
    slider.addEventListener("pointercancel", stopDragging);
    slider.addEventListener("lostpointercapture", stopDragging);

    slider.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
  });
}

initFooterLogoSlider();

// ======================================
// MOBILE MENU
// ======================================

const menuButton = document.querySelector("#mobile-menu-button");
const mobileNavigation = document.querySelector("#mobile-navigation");

if (menuButton && mobileNavigation) {
  menuButton.addEventListener("click", () => {
    mobileNavigation.classList.toggle("hidden");

    const isExpanded = !mobileNavigation.classList.contains("hidden");

    menuButton.setAttribute("aria-expanded", String(isExpanded));
  });
}

// ======================================
// STICKY NAVIGATION
// ======================================

function initStickyNavigation() {
  const navigation = document.querySelector("[data-sticky-navigation]");
  const logo = document.querySelector("[data-sticky-logo]");
  const menu = document.querySelector("[data-sticky-menu]");
  const navigationContainer = document.querySelector(
    "[data-sticky-container]"
  );

  if (!navigation || !logo || !menu || !navigationContainer) return;

  const placeholder = document.createElement("div");

  placeholder.style.display = "none";
  navigation.after(placeholder);

  const stickyStart =
    navigation.getBoundingClientRect().top + window.scrollY;

  function handleScroll() {
    const isScrolled = window.scrollY >= stickyStart;

    if (isScrolled) {
      placeholder.style.display = "block";
      placeholder.style.height = `${navigation.offsetHeight}px`;

      navigation.style.position = "fixed";
      navigation.style.top = "0";
      navigation.style.left = "0";
      navigation.style.right = "0";
      navigation.style.width = "100%";
      navigation.style.zIndex = "50";

      logo.classList.remove("hidden");

      menu.classList.remove("justify-center");
      menu.classList.add("justify-end", "flex-1");

      navigationContainer.classList.remove("justify-center");
      navigationContainer.classList.add("justify-between");
    } else {
      navigation.style.position = "";
      navigation.style.top = "";
      navigation.style.left = "";
      navigation.style.right = "";
      navigation.style.width = "";
      navigation.style.zIndex = "";

      placeholder.style.display = "none";

      logo.classList.add("hidden");

      menu.classList.remove("justify-end", "flex-1");
      menu.classList.add("justify-center");

      navigationContainer.classList.remove("justify-between");
      navigationContainer.classList.add("justify-center");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();
}

initStickyNavigation();

// ======================================
// BACK TO TOP
// ======================================

const backToTopButton = document.querySelector("#back-to-top");

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ======================================
// LATEST NEWS SLIDER
// ======================================

function initNewsSlider() {
  document.querySelectorAll("[data-news-slider]").forEach((slider) => {
    const track = slider.querySelector("[data-news-track]");
    const prev = slider.querySelector("[data-news-prev]");
    const next = slider.querySelector("[data-news-next]");

    if (!track || !prev || !next) return;

    let busy = false;

    const SPEED = 500;
    const GAP = 24;

    const step = () => {
      const firstArticle = track.querySelector("article");

      return firstArticle ? firstArticle.offsetWidth + GAP : 0;
    };

    next.addEventListener("click", () => {
      if (busy || !track.firstElementChild) return;

      busy = true;

      track.style.transition = `transform ${SPEED}ms ease-in-out`;
      track.style.transform = `translateX(-${step()}px)`;

      setTimeout(() => {
        track.style.transition = "none";
        track.appendChild(track.firstElementChild);
        track.style.transform = "translateX(0)";

        void track.offsetWidth;

        busy = false;
      }, SPEED);
    });

    prev.addEventListener("click", () => {
      if (busy || !track.lastElementChild) return;

      busy = true;

      track.style.transition = "none";

      track.insertBefore(
        track.lastElementChild,
        track.firstElementChild
      );

      track.style.transform = `translateX(-${step()}px)`;

      void track.offsetWidth;

      track.style.transition = `transform ${SPEED}ms ease-in-out`;
      track.style.transform = "translateX(0)";

      setTimeout(() => {
        busy = false;
      }, SPEED);
    });
  });
}

initNewsSlider();

// ======================================
// SHOP PAGE: MOBILE FILTER
// ======================================

function initShopSidebar() {
  const filterToggle = document.querySelector("#shop-filter-toggle");
  const shopSidebar = document.querySelector("#shop-sidebar");

  if (!filterToggle || !shopSidebar) return;

  filterToggle.addEventListener("click", () => {
    shopSidebar.classList.toggle("hidden");

    const isExpanded = !shopSidebar.classList.contains("hidden");

    filterToggle.setAttribute("aria-expanded", String(isExpanded));
  });
}

initShopSidebar();

// ======================================
// SHOP PAGE: PRODUCT FILTERS
// ======================================

function initShopProducts() {
  const productGrid = document.querySelector("#shop-product-grid");

  if (!productGrid) return;

  const products = Array.from(
    productGrid.querySelectorAll("article")
  );

  const searchInput = document.querySelector("#shop-search");
  const searchButton = document.querySelector("#shop-search-button");

  const priceRange = document.querySelector("#price-range");
  const priceValue = document.querySelector("#price-value");

  const sortSelect = document.querySelector("#shop-sort");

  const resultsCount = document.querySelector("#shop-results-count");
  const noResults = document.querySelector("#shop-no-results");

  let selectedColor = "";
  let maximumPrice = priceRange ? Number(priceRange.value) : 5000;
  let searchKeyword = "";

  if (priceRange && priceValue) {
    priceValue.textContent = priceRange.value;

    priceRange.addEventListener("input", () => {
      priceValue.textContent = priceRange.value;
      maximumPrice = Number(priceRange.value);

      filterProducts();
    });
  }

  function filterProducts() {
    let filteredProducts = products.filter((product) => {
      const name = (product.dataset.name || "").toLowerCase();
      const price = Number(product.dataset.price);
      const color = (product.dataset.color || "").toLowerCase();

      return (
        name.includes(searchKeyword) &&
        (!selectedColor || color === selectedColor) &&
        price <= maximumPrice
      );
    });

    if (sortSelect) {
      const sortValue = sortSelect.value;

      if (sortValue === "low-high") {
        filteredProducts.sort(
          (a, b) => Number(a.dataset.price) - Number(b.dataset.price)
        );
      }

      if (sortValue === "high-low") {
        filteredProducts.sort(
          (a, b) => Number(b.dataset.price) - Number(a.dataset.price)
        );
      }

      if (sortValue === "newest") {
        filteredProducts.reverse();
      }
    }

    products.forEach((product) => product.classList.add("hidden"));

    filteredProducts.forEach((product) => {
      product.classList.remove("hidden");
      productGrid.appendChild(product);
    });

    if (resultsCount) {
      resultsCount.textContent =
        `Showing ${filteredProducts.length} of ${products.length} results`;
    }

    noResults?.classList.toggle("hidden", filteredProducts.length !== 0);
  }

  searchInput?.addEventListener("input", () => {
    searchKeyword = searchInput.value.trim().toLowerCase();
    filterProducts();
  });

  searchButton?.addEventListener("click", () => {
    if (!searchInput) return;

    searchKeyword = searchInput.value.trim().toLowerCase();
    filterProducts();
  });

  document.querySelectorAll("button[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      const color = button.dataset.color;

      selectedColor = selectedColor === color ? "" : color;

      filterProducts();
    });
  });

  sortSelect?.addEventListener("change", filterProducts);

  filterProducts();
}

initShopProducts();

// ======================================
// SHOP PAGE: PAGINATION SCROLL
// ======================================

function initPaginationScroll() {
  document.querySelectorAll("[data-pagination-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
}

initPaginationScroll();

// ======================================
// PRODUCT DETAILS PAGE
// ======================================

function initProductDetails() {
  const mainImage = document.querySelector("#product-main-image");

  const thumbnailList = document.querySelector(
    "#product-thumbnail-list"
  );

  const thumbnails = Array.from(
    document.querySelectorAll("[data-product-thumbnail]")
  );

  const previousImageButton = document.querySelector(
    "#product-gallery-prev"
  );

  const nextImageButton = document.querySelector(
    "#product-gallery-next"
  );

  let currentImageIndex = 0;

  function showProductImage(index) {
    if (!mainImage || thumbnails.length === 0) return;

    currentImageIndex = Math.max(
      0,
      Math.min(index, thumbnails.length - 1)
    );

    const selectedThumbnail = thumbnails[currentImageIndex];

    mainImage.src = selectedThumbnail.dataset.image;

    mainImage.alt =
      selectedThumbnail.querySelector("img")?.alt || "Product image";

    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      thumbnail.classList.remove("border-[#ed5275]");
      thumbnail.classList.add("border-gray-200");

      if (thumbnailIndex === currentImageIndex) {
        thumbnail.classList.remove("border-gray-200");
        thumbnail.classList.add("border-[#ed5275]");
      }
    });

    if (thumbnailList) {
      const listRect = thumbnailList.getBoundingClientRect();
      const thumbnailRect = selectedThumbnail.getBoundingClientRect();

      const scrollPosition =
        thumbnailList.scrollTop +
        thumbnailRect.top -
        listRect.top;

      thumbnailList.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      showProductImage(index);
    });
  });

  previousImageButton?.addEventListener("click", () => {
    if (currentImageIndex > 0) {
      showProductImage(currentImageIndex - 1);
    }
  });

  nextImageButton?.addEventListener("click", () => {
    if (currentImageIndex < thumbnails.length - 1) {
      showProductImage(currentImageIndex + 1);
    }
  });

  if (mainImage && thumbnails.length > 0) {
    showProductImage(0);
  }

  // QUANTITY

  const minusButton = document.querySelector("#quantity-minus");
  const plusButton = document.querySelector("#quantity-plus");
  const quantityDisplay = document.querySelector("#product-quantity");

  let quantity = 1;

  if (minusButton && plusButton && quantityDisplay) {
    minusButton.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });

    plusButton.addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
    });
  }

  // COLOR

  document.querySelectorAll("[data-product-color]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-product-color]").forEach((item) => {
        item.classList.remove("ring-1", "ring-[#ed5275]");
      });

      button.classList.add("ring-1", "ring-[#ed5275]");
    });
  });

  // SIZE

  document.querySelectorAll("[data-product-size]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-product-size]").forEach((item) => {
        item.classList.remove("border-[#ed5275]", "text-[#ed5275]");
        item.classList.add("border-gray-200");
      });

      button.classList.remove("border-gray-200");
      button.classList.add("border-[#ed5275]", "text-[#ed5275]");
    });
  });

  // TABS

  const tabButtons = document.querySelectorAll("[data-product-tab]");
  const tabPanels = document.querySelectorAll("[data-product-panel]");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTab = button.dataset.productTab;

      tabButtons.forEach((item) => {
        item.classList.remove("bg-[#ed5275]");
        item.classList.add("bg-[#333]");
      });

      button.classList.remove("bg-[#333]");
      button.classList.add("bg-[#ed5275]");

      tabPanels.forEach((panel) => {
        panel.classList.toggle(
          "hidden",
          panel.dataset.productPanel !== selectedTab
        );
      });
    });
  });

  // ADD TO CART

  const addToCartButton = document.querySelector("#product-add-to-cart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const productName =
        document.querySelector("h1")?.textContent.trim() ||
        "Pink Flower Tree Red";

      const productImage =
        mainImage?.getAttribute("src") ||
        "/images/products/product-1.jpg";

      const productPrice = 49;

      addProductToCartStorage(
        {
          name: productName,
          image: productImage,
          priceNumber: productPrice,
        },
        quantity
      );

      alert("Product added to cart successfully!");
    });
  }

  // ADD TO WISHLIST

  const wishlistButton = document.querySelector(
    "#product-add-to-wishlist"
  );

  if (wishlistButton) {
    wishlistButton.addEventListener("click", () => {
      const productName =
        document.querySelector("h1")?.textContent.trim() ||
        "Pink Flower Tree Red";

      const productImage =
        mainImage?.getAttribute("src") ||
        "/images/products/product-1.jpg";

      addProductToWishlist({
        id: Date.now(),
        name: productName,
        image: productImage,
        price: 49,
        stock: "In Stock",
      });
    });
  }

  // REVIEW RATING

  const ratingButtons = document.querySelectorAll(
    "[data-review-rating]"
  );

  let selectedRating = 0;

  function updateRating() {
    ratingButtons.forEach((button) => {
      const rating = Number(button.dataset.reviewRating);

      button.textContent = rating <= selectedRating ? "★" : "☆";
    });
  }

  ratingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedRating = Number(button.dataset.reviewRating);
      updateRating();
    });
  });

  // REVIEW FORM

  const reviewForm = document.querySelector("#product-review-form");
  const reviewStatus = document.querySelector("#review-message-status");

  if (reviewForm && reviewStatus) {
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (selectedRating === 0) {
        reviewStatus.textContent = "Please select your rating.";
        reviewStatus.classList.remove("text-green-600");
        reviewStatus.classList.add("text-red-500");
        return;
      }

      reviewStatus.textContent =
        "Thank you! Your review has been submitted.";

      reviewStatus.classList.remove("text-red-500");
      reviewStatus.classList.add("text-green-600");

      reviewForm.reset();

      selectedRating = 0;
      updateRating();
    });
  }
}

initProductDetails();

// ======================================
// RELATED PRODUCTS SLIDER
// ======================================

function initRelatedProductsSlider() {
  const track = document.querySelector("[data-related-track]");

  if (!track) return;

  const previousButton = document.querySelector("[data-related-prev]");
  const nextButton = document.querySelector("[data-related-next]");

  const GAP = 16;
  const ANIMATION_TIME = 450;
  const AUTO_SLIDE_DELAY = 3000;
  const TOUCH_PAUSE_DELAY = 6000;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let animationFrame = null;
  let animationTarget = null;
  let autoSlideTimer = null;
  let resumeTimer = null;

  function getStep() {
    const firstCard = track.querySelector("article");

    return firstCard ? firstCard.offsetWidth + GAP : 0;
  }

  function getMaxScroll() {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }

  function enableManualScroll() {
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "auto";
  }

  function restoreSnap() {
    track.style.scrollSnapType = "";
    track.style.scrollBehavior = "";
  }

  function stopAnimation() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    animationTarget = null;
    restoreSnap();
  }

  function animateTo(target) {
    const maxScroll = getMaxScroll();
    const finalPosition = Math.max(0, Math.min(target, maxScroll));
    const startPosition = track.scrollLeft;
    const distance = finalPosition - startPosition;

    if (Math.abs(distance) < 1) {
      stopAnimation();
      return;
    }

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    enableManualScroll();

    animationTarget = finalPosition;

    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / ANIMATION_TIME, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      track.scrollLeft = startPosition + distance * eased;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(frame);
      } else {
        track.scrollLeft = finalPosition;
        animationFrame = null;
        animationTarget = null;
        restoreSnap();
      }
    }

    animationFrame = requestAnimationFrame(frame);
  }

  function slide(direction) {
    const step = getStep();
    const maxScroll = getMaxScroll();

    if (step === 0 || maxScroll <= 0) return;

    const basePosition =
      animationTarget !== null ? animationTarget : track.scrollLeft;

    const currentIndex = Math.round(basePosition / step);
    const lastIndex = Math.round(maxScroll / step);

    let nextIndex = currentIndex + direction;

    if (nextIndex > lastIndex) nextIndex = 0;
    if (nextIndex < 0) nextIndex = lastIndex;

    animateTo(nextIndex * step);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }

    if (resumeTimer) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  }

  function startAutoSlide() {
    if (prefersReducedMotion) return;

    stopAutoSlide();

    autoSlideTimer = setInterval(() => slide(1), AUTO_SLIDE_DELAY);
  }

  function pauseThenResume(delay = TOUCH_PAUSE_DELAY) {
    stopAutoSlide();

    if (prefersReducedMotion) return;

    resumeTimer = setTimeout(startAutoSlide, delay);
  }

  previousButton?.addEventListener("click", () => {
    slide(-1);
    pauseThenResume();
  });

  nextButton?.addEventListener("click", () => {
    slide(1);
    pauseThenResume();
  });

  track.addEventListener("touchstart", () => {
    stopAnimation();
    stopAutoSlide();
  }, { passive: true });

  track.addEventListener("touchend", () => {
    pauseThenResume();
  }, { passive: true });

  const sliderArea = track.parentElement || track;

  sliderArea.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") stopAutoSlide();
  });

  sliderArea.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") startAutoSlide();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  startAutoSlide();
}

initRelatedProductsSlider();

// ======================================
// CART STORAGE HELPER
// ======================================

function getCartStorage() {
  try {
    const cart = JSON.parse(localStorage.getItem("fiamaCart")) || [];
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function notifyCartUpdated() {
  window.dispatchEvent(new CustomEvent("fiama:cart-updated"));
}

function addProductToCartStorage(product, quantity = 1) {
  const cart = getCartStorage();

  const existingProduct = cart.find(
    (item) =>
      item.name === product.name &&
      item.image === product.image
  );

  if (existingProduct) {
    existingProduct.quantity =
      Number(existingProduct.quantity || 0) + quantity;
  } else {
    cart.push({
      id: Date.now(),
      name: product.name,
      image: product.image,
      price: Number(product.priceNumber) || 0,
      quantity,
    });
  }

  localStorage.setItem("fiamaCart", JSON.stringify(cart));

  // Update header and drawer immediately.
  notifyCartUpdated();
}

// ======================================
// HEADER CART DRAWER
// ======================================

function initHeaderCartDrawer() {
  const headerCartLink = document.querySelector(
    '#header a[href="/cart.html"]'
  );

  if (!headerCartLink) return;

  // Do not create the drawer twice.
  if (document.querySelector("#fiama-cart-drawer")) return;

  const overlay = document.createElement("div");

  overlay.id = "fiama-cart-overlay";
  overlay.className =
    "fixed inset-0 z-[90] hidden bg-black/50 opacity-0 transition-opacity duration-300";

  const drawer = document.createElement("aside");

  drawer.id = "fiama-cart-drawer";

  drawer.className =
    "fixed right-0 top-0 z-[100] flex h-screen w-[286px] max-w-[90vw] translate-x-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out";

  drawer.setAttribute("aria-label", "Shopping cart");
  drawer.setAttribute("aria-hidden", "true");

  drawer.innerHTML = `
    <div class="flex h-[63px] shrink-0 items-center justify-between border-b border-gray-200 px-5">

      <h2 class="text-[13px] font-normal tracking-wide text-[#333]">
        CART
      </h2>

      <button
        type="button"
        data-drawer-close
        aria-label="Close cart"
        class="text-[21px] font-light leading-none text-black transition-colors hover:text-[#ed5275]">
        ×
      </button>

    </div>

    <div
      id="fiama-drawer-items"
      class="min-h-0 flex-1 overflow-y-auto px-5">

    </div>

    <div class="shrink-0 px-5 pb-5">

      <div class="flex items-center justify-between border-t border-gray-200 py-3">

        <span class="text-[12px] font-medium text-black">
          Subtotal:
        </span>

        <span
          id="fiama-drawer-subtotal"
          class="text-[12px] text-[#ed5275]">
          $0.00
        </span>

      </div>

      <div
        id="fiama-drawer-actions"
        class="grid grid-cols-2 gap-2 border-t border-gray-200 pt-4">

        <a
          href="/cart.html"
          class="flex h-[29px] items-center justify-center bg-[#ed5275] px-2 text-[9px] font-medium text-white transition-colors hover:bg-[#333]">
          VIEW CART
        </a>

        <a
          href="/checkout.html"
          class="flex h-[29px] items-center justify-center bg-[#555] px-2 text-[9px] font-medium text-white transition-colors hover:bg-[#ed5275]">
          CHECKOUT
        </a>

      </div>

      <p class="mt-4 text-[9px] text-[#333]">
        Free Shipping on All Orders Over $100!
      </p>

    </div>
  `;

  document.body.append(overlay, drawer);

  const itemsContainer = drawer.querySelector("#fiama-drawer-items");
  const subtotalElement = drawer.querySelector("#fiama-drawer-subtotal");
  const actionsContainer = drawer.querySelector("#fiama-drawer-actions");

  const headerCount = headerCartLink.querySelector("span");
  const headerTexts = headerCartLink.querySelectorAll("p");

  let isOpen = false;

  function formatPrice(price) {
    return `$${Number(price || 0).toFixed(2)}`;
  }

  function getCartQuantity(cart) {
  const totalQuantity = cart.reduce(
    (total, product) =>
      total + Math.max(0, Number(product.quantity) || 0),
    0
  );

  return Math.min(totalQuantity, 2);
}

  function getCartSubtotal(cart) {
    return cart.reduce(
      (total, product) =>
        total +
        (Number(product.price) || 0) *
        (Number(product.quantity) || 0),
      0
    );
  }

  // UPDATE HEADER COUNT AND PRICE

  function updateHeaderCart(cart) {
    const quantity = getCartQuantity(cart);
    const subtotal = getCartSubtotal(cart);

    if (headerCount) {
      headerCount.textContent = quantity;
    }

    if (headerTexts[1]) {
      headerTexts[1].textContent = formatPrice(subtotal);
    }
  }

  // CREATE EMPTY CART MESSAGE

  function renderEmptyCart() {
    const emptyMessage = document.createElement("div");

    emptyMessage.className =
      "flex min-h-[180px] flex-col items-center justify-center text-center";

    const message = document.createElement("p");

    message.className = "text-sm text-gray-500";
    message.textContent = "Your cart is currently empty.";

    const shopLink = document.createElement("a");

    shopLink.href = "/shop-left-sidebar.html";
    shopLink.textContent = "Continue Shopping";
    shopLink.className =
      "mt-4 text-xs text-[#ed5275] underline hover:text-black";

    emptyMessage.append(message, shopLink);

    itemsContainer.appendChild(emptyMessage);
  }

  // RENDER CART PRODUCTS

  function renderDrawerCart() {
    const cart = getCartStorage();

    itemsContainer.replaceChildren();

    updateHeaderCart(cart);

    const subtotal = getCartSubtotal(cart);

    subtotalElement.textContent = formatPrice(subtotal);

    const isEmpty = cart.length === 0;

    actionsContainer.classList.toggle("hidden", isEmpty);

    if (isEmpty) {
      renderEmptyCart();
      return;
    }

    cart.forEach((product, index) => {
      const row = document.createElement("div");

      row.className =
        "relative grid grid-cols-[62px_minmax(0,1fr)] gap-2 border-b border-gray-200 py-[15px]";

      // REMOVE BUTTON

      const removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.dataset.drawerRemove = index;

      removeButton.setAttribute("aria-label", "Remove product");

      removeButton.className =
        "absolute left-0 top-[10px] z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-white text-[10px] text-gray-500 shadow transition-colors hover:bg-[#ed5275] hover:text-white";

      removeButton.textContent = "×";

      // PRODUCT IMAGE

      const image = document.createElement("img");

      image.src = product.image || "";
      image.alt = product.name || "Flower product";
      image.loading = "lazy";

      image.className =
        "h-[72px] w-[62px] bg-[#f7f7f7] object-contain";

      image.addEventListener("error", () => {
        image.style.visibility = "hidden";
      });

      // PRODUCT INFORMATION

      const details = document.createElement("div");

      details.className = "min-w-0 pt-1";

      const name = document.createElement("p");

      name.className =
        "mb-2 line-clamp-2 text-[11px] font-medium leading-[15px] text-[#222]";

      name.textContent = product.name || "Flower Product";

      const price = document.createElement("p");

      price.className = "text-[10px] text-[#777]";

      price.textContent =
        `${Number(product.quantity) || 1} x ${formatPrice(product.price)}`;

      details.append(name, price);

      row.append(removeButton, image, details);

      itemsContainer.appendChild(row);
    });
  }

  // OPEN DRAWER

  function openDrawer() {
    if (isOpen) return;

    isOpen = true;

    renderDrawerCart();

    overlay.classList.remove("hidden");

    drawer.classList.remove("translate-x-full");
    drawer.classList.add("translate-x-0");

    drawer.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      overlay.classList.remove("opacity-0");
      overlay.classList.add("opacity-100");
    });

    document.body.classList.add("overflow-hidden");
  }

  // CLOSE DRAWER

  function closeDrawer() {
    if (!isOpen) return;

    isOpen = false;

    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0");

    drawer.classList.remove("translate-x-0");
    drawer.classList.add("translate-x-full");

    drawer.setAttribute("aria-hidden", "true");

    window.setTimeout(() => {
      if (!isOpen) {
        overlay.classList.add("hidden");
      }
    }, 300);

    const otherModalOpen = [
      document.querySelector("#quick-view-modal"),
      document.querySelector("#cart-modal"),
    ].some((modal) => modal && !modal.classList.contains("hidden"));

    if (!otherModalOpen) {
      document.body.classList.remove("overflow-hidden");
    }
  }

  // HEADER CART CLICK

  headerCartLink.addEventListener("click", (event) => {
    event.preventDefault();
    openDrawer();
  });

  // CLOSE BUTTON

  drawer.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    if (target.closest("[data-drawer-close]")) {
      closeDrawer();
      return;
    }

    // REMOVE PRODUCT

    const removeButton = target.closest("[data-drawer-remove]");

    if (removeButton) {
      const index = Number(removeButton.dataset.drawerRemove);

      const cart = getCartStorage();

      if (cart[index]) {
        cart.splice(index, 1);

        localStorage.setItem("fiamaCart", JSON.stringify(cart));

        renderDrawerCart();
        notifyCartUpdated();
      }
    }
  });

  // OVERLAY CLICK

  overlay.addEventListener("click", closeDrawer);

  // ESCAPE KEY

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });

  // UPDATE AFTER ADDING OR REMOVING PRODUCTS

  window.addEventListener("fiama:cart-updated", renderDrawerCart);

  // UPDATE WHEN ANOTHER TAB CHANGES THE CART

  window.addEventListener("storage", (event) => {
    if (event.key === "fiamaCart") {
      renderDrawerCart();
    }
  });

  // INITIAL HEADER COUNT

  renderDrawerCart();

  // Make drawer controls available to the rest of this page.
  return {
    open: openDrawer,
    close: closeDrawer,
    render: renderDrawerCart,
  };
}

initHeaderCartDrawer();

// ======================================
// CART PAGE
// ======================================

function initCartPage() {
  const cartItemsContainer = document.querySelector("#cart-items");

  if (!cartItemsContainer) return;

  const emptyCart = document.querySelector("#cart-empty");
  const cartActions = document.querySelector("#cart-actions");
  const cartTotals = document.querySelector("#cart-totals");

  const subtotalElement = document.querySelector("#cart-subtotal");
  const shippingElement = document.querySelector("#cart-shipping");
  const vatElement = document.querySelector("#cart-vat");
  const totalElement = document.querySelector("#cart-total");

  const couponInput = document.querySelector("#cart-coupon");
  const couponButton = document.querySelector("#apply-coupon");
  const updateButton = document.querySelector("#update-cart");

  const checkoutButton = document.querySelector("#checkout-button");
  const message = document.querySelector("#cart-message");

  const SHIPPING_CHARGE = 15;
  const VAT = 0;

  let couponApplied =
    localStorage.getItem("fiamaCouponApplied") === "true";

  function getCart() {
    return getCartStorage();
  }

  function saveCart(cart) {
    localStorage.setItem("fiamaCart", JSON.stringify(cart));
    notifyCartUpdated();
  }

  function formatPrice(price) {
    return `$${Number(price).toFixed(2)}`;
  }

  function showMessage(text, success = true) {
    if (!message) return;

    message.textContent = text;
    message.classList.toggle("text-green-600", success);
    message.classList.toggle("text-red-500", !success);
  }

  function updateTotals(subtotal) {
    const shipping = subtotal > 0 ? SHIPPING_CHARGE : 0;
    const vat = VAT;
    const discount = couponApplied ? subtotal * 0.10 : 0;

    const finalSubtotal = subtotal - discount;
    const orderTotal = finalSubtotal + shipping + vat;

    if (subtotalElement) {
      subtotalElement.textContent = formatPrice(finalSubtotal);
    }

    if (shippingElement) {
      shippingElement.textContent = formatPrice(shipping);
    }

    if (vatElement) {
      vatElement.textContent = formatPrice(vat);
    }

    if (totalElement) {
      totalElement.textContent = formatPrice(orderTotal);
    }
  }

  function renderCart() {
    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    const isEmpty = cart.length === 0;

    emptyCart?.classList.toggle("hidden", !isEmpty);
    cartActions?.classList.toggle("hidden", isEmpty);
    cartTotals?.classList.toggle("hidden", isEmpty);

    if (checkoutButton) {
      checkoutButton.classList.toggle("pointer-events-none", isEmpty);
      checkoutButton.classList.toggle("opacity-50", isEmpty);
      checkoutButton.setAttribute("aria-disabled", String(isEmpty));
    }

    if (isEmpty) {
      couponApplied = false;
      localStorage.removeItem("fiamaCouponApplied");
      updateTotals(0);
      notifyCartUpdated();
      return;
    }

    cart.forEach((product, index) => {
      const row = document.createElement("div");

      row.className =
        "grid grid-cols-[25px_65px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 border-b border-[#d9dfe3] px-1 py-5 sm:grid-cols-[30px_80px_minmax(0,1fr)_90px_100px_110px] sm:gap-4 sm:py-3";

      const removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.dataset.cartRemove = index;
      removeButton.setAttribute("aria-label", "Remove product");
      removeButton.className =
        "text-xs text-black transition hover:text-[#ed5275]";
      removeButton.textContent = "×";

      const image = document.createElement("img");

      image.src = product.image;
      image.alt = product.name;
      image.className =
        "h-[75px] w-[65px] bg-[#f7f7f7] object-contain sm:h-[88px] sm:w-[80px]";

      const name = document.createElement("h3");

      name.className =
        "min-w-0 text-xs font-medium text-[#222] sm:text-sm";
      name.textContent = product.name;

      const price = document.createElement("p");

      price.className =
        "col-start-2 text-[11px] text-[#222] sm:col-start-auto sm:text-center";
      price.textContent = formatPrice(product.price);

      const quantityBox = document.createElement("div");

      quantityBox.className =
        "col-start-3 row-start-2 flex h-9 w-[100px] items-center justify-between bg-[#f7f7f7] px-2 sm:col-start-auto sm:row-start-auto sm:w-[82px]";

      const minus = document.createElement("button");

      minus.type = "button";
      minus.dataset.cartMinus = index;
      minus.textContent = "-";
      minus.className = "text-xs text-[#333] hover:text-[#ed5275]";

      const quantityText = document.createElement("span");

      quantityText.className = "text-xs text-[#222]";
      quantityText.textContent = String(product.quantity).padStart(2, "0");

      const plus = document.createElement("button");

      plus.type = "button";
      plus.dataset.cartPlus = index;
      plus.textContent = "+";
      plus.className = "text-xs text-[#333] hover:text-[#ed5275]";

      quantityBox.append(minus, quantityText, plus);

      const lineTotal = document.createElement("p");

      lineTotal.className =
        "col-start-3 row-start-3 text-xs font-bold text-black sm:col-start-auto sm:row-start-auto sm:text-center";

      lineTotal.textContent = formatPrice(
        Number(product.price) * Number(product.quantity)
      );

      row.append(
        removeButton,
        image,
        name,
        price,
        quantityBox,
        lineTotal
      );

      cartItemsContainer.appendChild(row);
    });

    const subtotal = cart.reduce(
      (sum, product) =>
        sum + Number(product.price) * Number(product.quantity),
      0
    );

    updateTotals(subtotal);
    notifyCartUpdated();
  }

  cartItemsContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const minusButton = target.closest("[data-cart-minus]");
    const plusButton = target.closest("[data-cart-plus]");
    const removeButton = target.closest("[data-cart-remove]");

    const cart = getCart();

    if (minusButton) {
      const index = Number(minusButton.dataset.cartMinus);

      if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart(cart);
        renderCart();
      }
    }

    if (plusButton) {
      const index = Number(plusButton.dataset.cartPlus);

      if (cart[index]) {
        cart[index].quantity++;
        saveCart(cart);
        renderCart();
      }
    }

    if (removeButton) {
      const index = Number(removeButton.dataset.cartRemove);

      cart.splice(index, 1);
      saveCart(cart);
      renderCart();

      showMessage("Product removed from cart.");
    }
  });

  if (couponButton && couponInput) {
    couponButton.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();

      if (getCart().length === 0) return;

      if (code === "FLOWER10") {
        couponApplied = true;
        localStorage.setItem("fiamaCouponApplied", "true");

        renderCart();
        showMessage("10% discount applied successfully!");
      } else {
        couponApplied = false;
        localStorage.removeItem("fiamaCouponApplied");

        renderCart();
        showMessage("Invalid coupon code.", false);
      }
    });
  }

  updateButton?.addEventListener("click", () => {
    renderCart();
    showMessage("Your cart has been updated.");
  });

  renderCart();
}

initCartPage();

// ======================================
// WISHLIST STORAGE
// ======================================

function getWishlist() {
  try {
    const wishlist =
      JSON.parse(localStorage.getItem("fiamaWishlist")) || [];

    return Array.isArray(wishlist) ? wishlist : [];
  } catch {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem("fiamaWishlist", JSON.stringify(wishlist));
}

function addProductToWishlist(product) {
  const wishlist = getWishlist();

  const alreadyExists = wishlist.some(
    (item) =>
      item.name === product.name &&
      item.image === product.image
  );

  if (alreadyExists) {
    alert("This product is already in your wishlist!");
    return;
  }

  wishlist.push(product);
  saveWishlist(wishlist);

  alert("Product added to wishlist successfully!");
}

// ======================================
// WISHLIST PAGE
// ======================================

function initWishlistPage() {
  const wishlistContainer = document.querySelector("#wishlist-items");
  const emptyWishlist = document.querySelector("#wishlist-empty");

  if (!wishlistContainer || !emptyWishlist) return;

  function formatPrice(price) {
    return `$${Number(price).toFixed(2)}`;
  }

  function renderWishlist() {
    const wishlist = getWishlist();

    wishlistContainer.innerHTML = "";

    const isEmpty = wishlist.length === 0;

    emptyWishlist.classList.toggle("hidden", !isEmpty);

    if (isEmpty) return;

    wishlist.forEach((product) => {
      const row = document.createElement("div");

      row.className =
        "grid grid-cols-[30px_80px_minmax(0,1fr)_90px_100px_110px] items-center gap-3 border-b border-[#d9dfe5] py-3 max-md:grid-cols-[25px_65px_minmax(0,1fr)] max-md:gap-3 max-md:py-4";

      const removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.textContent = "×";
      removeButton.setAttribute("aria-label", "Remove from wishlist");
      removeButton.className =
        "text-xs text-black transition hover:text-pink-600";

      removeButton.addEventListener("click", () => {
        removeWishlistProduct(product.id);
      });

      const image = document.createElement("img");

      image.src = product.image;
      image.alt = product.name;
      image.className =
        "h-[88px] w-[68px] bg-[#f7f7f7] object-contain";

      const name = document.createElement("h3");

      name.textContent = product.name;
      name.className =
        "pl-8 text-sm text-black max-md:col-start-3 max-md:pl-0";

      const price = document.createElement("p");

      price.textContent = formatPrice(product.price);
      price.className =
        "text-xs text-black max-md:col-start-3";

      const stock = document.createElement("p");

      stock.textContent = product.stock || "In Stock";
      stock.className =
        "text-xs text-black max-md:col-start-3";

      const addToCartButton = document.createElement("button");

      addToCartButton.type = "button";
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.className =
        "bg-[#555] px-4 py-2 text-xs text-white transition-colors duration-300 hover:bg-[#ed5275] max-md:col-start-3 max-md:w-fit";

      addToCartButton.addEventListener("click", () => {
        addWishlistProductToCart(product);
      });

      row.append(
        removeButton,
        image,
        name,
        price,
        stock,
        addToCartButton
      );

      wishlistContainer.appendChild(row);
    });
  }

  function removeWishlistProduct(productId) {
    const updatedWishlist = getWishlist().filter(
      (product) => product.id !== productId
    );

    saveWishlist(updatedWishlist);
    renderWishlist();
  }

  function addWishlistProductToCart(product) {
    addProductToCartStorage(
      {
        name: product.name,
        image: product.image,
        priceNumber: product.price,
      },
      1
    );

    alert("Product added to cart successfully!");
  }

  renderWishlist();
}

initWishlistPage();

// ======================================
// CHECKOUT PAGE
// ======================================

function initCheckoutPage() {
  const checkoutForm = document.querySelector("#checkout-form");

  if (!checkoutForm) return;

  const orderItems = document.querySelector("#checkout-order-items");
  const itemTemplate = document.querySelector("#checkout-item-template");

  const subtotalElement = document.querySelector("#checkout-subtotal");
  const discountRow = document.querySelector("#checkout-discount-row");
  const discountElement = document.querySelector("#checkout-discount");
  const shippingElement = document.querySelector("#checkout-shipping");
  const vatElement = document.querySelector("#checkout-vat");
  const totalElement = document.querySelector("#checkout-total");

  const statusElement = document.querySelector("#checkout-status");

  const loginToggle = document.querySelector("#checkout-login-toggle");
  const loginPanel = document.querySelector("#checkout-login-panel");

  const couponToggle = document.querySelector("#checkout-coupon-toggle");
  const couponPanel = document.querySelector("#checkout-coupon-panel");
  const couponInput = document.querySelector("#checkout-coupon");
  const couponButton = document.querySelector("#checkout-apply-coupon");
  const couponMessage = document.querySelector("#checkout-coupon-message");

  const codDescription = document.querySelector("#checkout-cod-description");
  const placeOrderButton = document.querySelector("#place-order-button");

  const SHIPPING_CHARGE = 15;
  const VAT = 0;

  let couponApplied =
    localStorage.getItem("fiamaCouponApplied") === "true";

  function getCart() {
    return getCartStorage();
  }

  function formatPrice(price) {
    return `$${Number(price).toFixed(2)}`;
  }

  if (loginToggle && loginPanel) {
    loginToggle.addEventListener("click", () => {
      loginPanel.classList.toggle("hidden");

      loginToggle.setAttribute(
        "aria-expanded",
        String(!loginPanel.classList.contains("hidden"))
      );
    });
  }

  if (couponToggle && couponPanel) {
    couponToggle.addEventListener("click", () => {
      couponPanel.classList.toggle("hidden");

      couponToggle.setAttribute(
        "aria-expanded",
        String(!couponPanel.classList.contains("hidden"))
      );
    });
  }

  function renderCheckout() {
    const cart = getCart();

    orderItems?.replaceChildren();

    let subtotal = 0;

    cart.forEach((product) => {
      const price = Number(product.price) || 0;
      const quantity = Math.max(1, Number(product.quantity) || 1);
      const lineTotal = price * quantity;

      subtotal += lineTotal;

      if (!itemTemplate || !orderItems) return;

      const item = itemTemplate.content.cloneNode(true);

      const nameElement = item.querySelector("[data-checkout-name]");
      const quantityElement = item.querySelector(
        "[data-checkout-quantity]"
      );

      const lineTotalElement = item.querySelector(
        "[data-checkout-line-total]"
      );

      if (nameElement) {
        nameElement.textContent = product.name || "Flower Product";
      }

      if (quantityElement) {
        quantityElement.textContent = quantity;
      }

      if (lineTotalElement) {
        lineTotalElement.textContent = formatPrice(lineTotal);
      }

      orderItems.appendChild(item);
    });

    const discount = couponApplied ? subtotal * 0.10 : 0;
    const shipping = subtotal > 0 ? SHIPPING_CHARGE : 0;
    const finalTotal = subtotal - discount + shipping + VAT;

    if (subtotalElement) {
      subtotalElement.textContent = formatPrice(subtotal);
    }

    discountRow?.classList.toggle("hidden", !couponApplied);

    if (discountElement) {
      discountElement.textContent = `-${formatPrice(discount)}`;
    }

    if (shippingElement) {
      shippingElement.textContent = formatPrice(shipping);
    }

    if (vatElement) {
      vatElement.textContent = formatPrice(VAT);
    }

    if (totalElement) {
      totalElement.textContent = formatPrice(finalTotal);
    }

    if (placeOrderButton) {
      placeOrderButton.disabled = cart.length === 0;
    }
  }

  function showCheckoutMessage(message, success = true) {
    if (!statusElement) return;

    statusElement.textContent = message;
    statusElement.classList.toggle("text-green-600", success);
    statusElement.classList.toggle("text-red-500", !success);
  }

  if (couponButton && couponInput) {
    couponButton.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();

      if (getCart().length === 0) {
        if (couponMessage) {
          couponMessage.textContent = "Your cart is empty.";
          couponMessage.classList.add("text-red-500");
        }

        return;
      }

      if (code === "FLOWER10") {
        couponApplied = true;
        localStorage.setItem("fiamaCouponApplied", "true");

        if (couponMessage) {
          couponMessage.textContent =
            "10% discount applied successfully!";

          couponMessage.classList.remove("text-red-500");
          couponMessage.classList.add("text-green-600");
        }
      } else {
        couponApplied = false;
        localStorage.removeItem("fiamaCouponApplied");

        if (couponMessage) {
          couponMessage.textContent = "Invalid coupon code.";

          couponMessage.classList.remove("text-green-600");
          couponMessage.classList.add("text-red-500");
        }
      }

      renderCheckout();
    });
  }

  document
    .querySelectorAll('input[name="paymentMethod"]')
    .forEach((method) => {
      method.addEventListener("change", () => {
        if (codDescription) {
          codDescription.classList.toggle(
            "hidden",
            method.value !== "cod"
          );
        }
      });
    });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
      showCheckoutMessage("Your cart is empty!", false);
      return;
    }

    if (!checkoutForm.reportValidity()) return;

    const selectedPayment = checkoutForm.querySelector(
      'input[name="paymentMethod"]:checked'
    );

    if (!selectedPayment) {
      showCheckoutMessage("Please select a payment method.", false);
      return;
    }

    if (selectedPayment.value === "paypal") {
      showCheckoutMessage(
        "PayPal payment gateway is not connected yet.",
        false
      );
      return;
    }

    if (selectedPayment.value === "check") {
      showCheckoutMessage(
        "Check payment is not available yet. Please select Cash on delivery.",
        false
      );
      return;
    }

    const formData = new FormData(checkoutForm);

    const subtotal = cart.reduce(
      (sum, product) =>
        sum + Number(product.price) * Number(product.quantity),
      0
    );

    const discount = couponApplied ? subtotal * 0.10 : 0;
    const shipping = subtotal > 0 ? SHIPPING_CHARGE : 0;

    const order = {
      orderId: `FIAMA-${Date.now()}`,
      customer: Object.fromEntries(formData.entries()),
      products: cart,
      subtotal,
      discount,
      shipping,
      vat: VAT,
      total: subtotal - discount + shipping + VAT,
      paymentMethod: selectedPayment.value,
      orderDate: new Date().toISOString(),
    };

    localStorage.setItem("fiamaLastOrder", JSON.stringify(order));

    localStorage.removeItem("fiamaCart");
    localStorage.removeItem("fiamaCouponApplied");

    notifyCartUpdated();

    couponApplied = false;

    renderCheckout();
    checkoutForm.reset();

    if (couponMessage) {
      couponMessage.textContent = "";
    }

    showCheckoutMessage(
      `Your demo order has been placed successfully! Order ID: ${order.orderId}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  renderCheckout();

  if (couponApplied && couponMessage) {
    couponMessage.textContent = "FLOWER10 coupon applied.";
    couponMessage.classList.add("text-green-600");
  }
}

initCheckoutPage();

// ======================================
// LOGIN PAGE
// ======================================

function initLoginPage() {
  const loginForm = document.querySelector("#account-login-form");

  if (!loginForm) return;

  const emailInput = document.querySelector("#account-email");
  const passwordInput = document.querySelector("#account-password");
  const loginMessage = document.querySelector("#account-login-message");

  const forgotPasswordLink = document.querySelector(
    "#account-forgot-password"
  );

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput?.value.trim();
    const password = passwordInput?.value;

    if (!email || !password) {
      if (loginMessage) {
        loginMessage.textContent =
          "Please enter your email and password.";

        loginMessage.setAttribute("role", "alert");
      }

      return;
    }

    if (loginMessage) {
      loginMessage.textContent =
        "Sign-in authentication is not connected yet.";

      loginMessage.setAttribute("role", "status");
    }
  });

  forgotPasswordLink?.addEventListener("click", (event) => {
    event.preventDefault();

    if (loginMessage) {
      loginMessage.textContent =
        "Password recovery is not available yet.";

      loginMessage.setAttribute("role", "status");
    }
  });
}

initLoginPage();

// ======================================
// MY ACCOUNT DASHBOARD
// ======================================

function initMyAccountPage() {
  const accountTabs = document.querySelectorAll("[data-account-tab]");
  const accountPanels = document.querySelectorAll("[data-account-panel]");

  if (accountTabs.length === 0 || accountPanels.length === 0) return;

  function showAccountTab(selectedTab) {
    accountTabs.forEach((button) => {
      const isActive = button.dataset.accountTab === selectedTab;
      button.setAttribute("aria-selected", String(isActive));
    });

    accountPanels.forEach((panel) => {
      panel.hidden = panel.dataset.accountPanel !== selectedTab;
    });
  }

  accountTabs.forEach((button) => {
    button.addEventListener("click", () => {
      showAccountTab(button.dataset.accountTab);
    });
  });

  document.querySelectorAll("[data-account-tab-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedTab = link.dataset.accountTabLink;

      if (selectedTab) {
        showAccountTab(selectedTab);
      }
    });
  });

  const initiallySelectedTab =
    document.querySelector('[data-account-tab][aria-selected="true"]') ||
    accountTabs[0];

  if (initiallySelectedTab) {
    showAccountTab(initiallySelectedTab.dataset.accountTab);
  }

  // ACCOUNT DETAILS

  const accountDetailsForm = document.querySelector(
    "#account-details-form"
  );

  const accountMessage = document.querySelector(
    "#account-details-message"
  );

  const firstNameInput = document.querySelector("#account-first-name");
  const lastNameInput = document.querySelector("#account-last-name");
  const displayNameInput = document.querySelector("#account-display-name");
  const emailInput = document.querySelector("#account-details-email");

  const newPasswordInput = document.querySelector("#account-new-password");
  const confirmPasswordInput = document.querySelector(
    "#account-confirm-password"
  );

  const currentPasswordInput = document.querySelector(
    "#account-current-password"
  );

  function loadAccountDetails() {
    let savedDetails = {};

    try {
      savedDetails =
        JSON.parse(localStorage.getItem("fiamaAccountDetails")) || {};
    } catch {
      savedDetails = {};
    }

    if (firstNameInput) firstNameInput.value = savedDetails.firstName || "";
    if (lastNameInput) lastNameInput.value = savedDetails.lastName || "";

    if (displayNameInput) {
      displayNameInput.value = savedDetails.displayName || "";
    }

    if (emailInput) emailInput.value = savedDetails.email || "";
  }

  loadAccountDetails();

  if (accountDetailsForm) {
    accountDetailsForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const firstName = firstNameInput?.value.trim() || "";
      const lastName = lastNameInput?.value.trim() || "";
      const displayName = displayNameInput?.value.trim() || "";
      const email = emailInput?.value.trim() || "";

      if (!firstName || !lastName || !displayName || !email) {
        if (accountMessage) {
          accountMessage.textContent =
            "Please fill in all required account details.";

          accountMessage.setAttribute("role", "alert");
        }

        return;
      }

      const newPassword = newPasswordInput?.value || "";
      const confirmPassword = confirmPasswordInput?.value || "";
      const currentPassword = currentPasswordInput?.value || "";

      if (newPassword || confirmPassword || currentPassword) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          if (accountMessage) {
            accountMessage.textContent =
              "Please fill in all password fields.";

            accountMessage.setAttribute("role", "alert");
          }

          return;
        }

        if (newPassword.length < 8) {
          if (accountMessage) {
            accountMessage.textContent =
              "New password must contain at least 8 characters.";

            accountMessage.setAttribute("role", "alert");
          }

          return;
        }

        if (newPassword !== confirmPassword) {
          if (accountMessage) {
            accountMessage.textContent =
              "New password and confirmation password do not match.";

            accountMessage.setAttribute("role", "alert");
          }

          return;
        }

        if (accountMessage) {
          accountMessage.textContent =
            "Password change requires server authentication. Your profile details were not changed.";

          accountMessage.setAttribute("role", "status");
        }

        return;
      }

      localStorage.setItem(
        "fiamaAccountDetails",
        JSON.stringify({
          firstName,
          lastName,
          displayName,
          email,
        })
      );

      if (accountMessage) {
        accountMessage.textContent =
          "Your account details have been saved successfully.";

        accountMessage.setAttribute("role", "status");
      }
    });
  }
}

initMyAccountPage();

// ======================================
// REGISTER PAGE
// ======================================

function initRegisterPage() {
  const registerForm = document.querySelector("#register-form");

  if (!registerForm) return;

  const firstNameInput = document.querySelector("#register-first-name");
  const lastNameInput = document.querySelector("#register-last-name");
  const emailInput = document.querySelector("#register-email");
  const passwordInput = document.querySelector("#register-password");

  const confirmPasswordInput = document.querySelector(
    "#register-confirm-password"
  );

  const privacyConsent = document.querySelector(
    "#register-privacy-consent"
  );

  const registerMessage = document.querySelector("#register-message");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = firstNameInput?.value.trim() || "";
    const lastName = lastNameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const password = passwordInput?.value || "";
    const confirmPassword = confirmPasswordInput?.value || "";

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      if (registerMessage) {
        registerMessage.textContent =
          "Please fill in all required fields.";

        registerMessage.setAttribute("role", "alert");
      }

      return;
    }

    if (password.length < 8) {
      if (registerMessage) {
        registerMessage.textContent =
          "Password must contain at least 8 characters.";

        registerMessage.setAttribute("role", "alert");
      }

      return;
    }

    if (password !== confirmPassword) {
      if (registerMessage) {
        registerMessage.textContent =
          "Passwords do not match. Please try again.";

        registerMessage.setAttribute("role", "alert");
      }

      return;
    }

    if (!privacyConsent?.checked) {
      if (registerMessage) {
        registerMessage.textContent =
          "Please accept the privacy policy.";

        registerMessage.setAttribute("role", "alert");
      }

      return;
    }

    if (registerMessage) {
      registerMessage.textContent =
        "Your details are valid. Account registration is not connected to a server yet.";

      registerMessage.setAttribute("role", "status");
    }
  });
}

initRegisterPage();

// ======================================
// PRODUCT CARD ACTIONS
// QUICK VIEW + ADD TO CART
// ======================================

function initProductCardActions() {
  const quickViewModal = document.querySelector("#quick-view-modal");
  const cartModal = document.querySelector("#cart-modal");

  if (!quickViewModal || !cartModal) return;

  const quickView = {
    image: quickViewModal.querySelector("[data-qv-image]"),
    name: quickViewModal.querySelector("[data-qv-name]"),
    price: quickViewModal.querySelector("[data-qv-price]"),
    oldPrice: quickViewModal.querySelector("[data-qv-old]"),
    quantity: quickViewModal.querySelector("[data-qv-qty]"),
  };

  const cartPopup = {
    image: cartModal.querySelector("[data-cart-image]"),
    name: cartModal.querySelector("[data-cart-name]"),
  };

  if (
    !quickView.image ||
    !quickView.name ||
    !quickView.price ||
    !quickView.oldPrice ||
    !quickView.quantity ||
    !cartPopup.image ||
    !cartPopup.name
  ) {
    console.error("Fiama: Required modal elements are missing.");
    return;
  }

  let selectedQuantity = 1;
  let currentProduct = null;

  function getProductFromCard(card) {
    const name =
      card.dataset.name ||
      card.querySelector("h3")?.textContent.trim() ||
      "Flower Product";

    const image = card.querySelector("img");
    const priceNumber = Number(card.dataset.price) || 0;

    const priceElement = card.querySelector("p");
    const oldPriceElement = priceElement?.querySelector("del");

    const oldPrice = oldPriceElement
      ? oldPriceElement.textContent.trim()
      : "";

    return {
      name,
      price: `$${priceNumber}`,
      priceNumber,
      oldPrice,
      image: image?.getAttribute("src") || "",
      alt: image?.getAttribute("alt") || name,
    };
  }

  function openModal(modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.body.classList.add("overflow-hidden");
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.classList.add("hidden");
    modal.classList.remove("flex");

    const isAnyModalOpen =
      !quickViewModal.classList.contains("hidden") ||
      !cartModal.classList.contains("hidden");

    if (!isAnyModalOpen) {
      document.body.classList.remove("overflow-hidden");
    }
  }

  function setQuantity(value) {
    selectedQuantity = Math.max(1, Number(value) || 1);

    quickView.quantity.textContent = String(
      selectedQuantity
    ).padStart(2, "0");
  }

  function resetQuickViewOptions() {
    setQuantity(1);

    quickViewModal
      .querySelectorAll('input[type="radio"]')
      .forEach((input) => {
        input.checked = false;
      });

    const firstColor = quickViewModal.querySelector(
      'input[name="qv-color"]'
    );

    if (firstColor) {
      firstColor.checked = true;
    }
  }

  function openQuickView(product) {
    if (!product.image) {
      console.error("Fiama: Product image is missing.");
      return;
    }

    currentProduct = product;

    quickView.image.src = product.image;
    quickView.image.alt = product.alt;
    quickView.name.textContent = product.name;
    quickView.price.textContent = product.price;

    if (product.oldPrice) {
      quickView.oldPrice.textContent = product.oldPrice;
      quickView.oldPrice.classList.remove("hidden");
    } else {
      quickView.oldPrice.textContent = "";
      quickView.oldPrice.classList.add("hidden");
    }

    resetQuickViewOptions();
    openModal(quickViewModal);
  }

  function openCartPopup(product, quantity = 1) {
    if (!product.image) {
      console.error("Fiama: Product image is missing.");
      return;
    }

    addProductToCartStorage(product, quantity);

    cartPopup.image.src = product.image;
    cartPopup.image.alt = product.alt || product.name;
    cartPopup.name.textContent = product.name;

    openModal(cartModal);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    // QUICK VIEW

    const quickViewButton = target.closest("[data-quick-view]");

    if (quickViewButton) {
      const card = quickViewButton.closest(
        "#shop-product-grid article, article"
      );

      if (card) {
        openQuickView(getProductFromCard(card));
      }

      return;
    }

    // ADD TO CART

    const addToCartButton = target.closest("[data-add-to-cart]");

    if (addToCartButton) {
      const card = addToCartButton.closest("article");

      if (card) {
        openCartPopup(getProductFromCard(card), 1);
      }

      return;
    }

    // QUICK VIEW ADD TO CART

    if (target.closest("[data-qv-add]")) {
      if (currentProduct) {
        closeModal(quickViewModal);
        openCartPopup(currentProduct, selectedQuantity);
      }

      return;
    }

    // QUICK VIEW WISHLIST

    if (target.closest("[data-qv-wishlist]")) {
      if (currentProduct) {
        addProductToWishlist({
          id: Date.now(),
          name: currentProduct.name,
          image: currentProduct.image,
          price: currentProduct.priceNumber,
          stock: "In Stock",
        });
      }

      return;
    }

    // DECREASE QUANTITY

    if (target.closest("[data-qty-minus]")) {
      setQuantity(selectedQuantity - 1);
      return;
    }

    // INCREASE QUANTITY

    if (target.closest("[data-qty-plus]")) {
      setQuantity(selectedQuantity + 1);
      return;
    }

    // CLOSE MODALS

    const closeButton = target.closest("[data-modal-close]");

    if (closeButton) {
      const modal = closeButton.closest(
        "#quick-view-modal, #cart-modal"
      );

      if (modal) {
        closeModal(modal);
      }

      return;
    }

    // BACKGROUND CLICK

    if (target === quickViewModal) {
      closeModal(quickViewModal);
    }

    if (target === cartModal) {
      closeModal(cartModal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(quickViewModal);
      closeModal(cartModal);
    }
  });
}

initProductCardActions();
