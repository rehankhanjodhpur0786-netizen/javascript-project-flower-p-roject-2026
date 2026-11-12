
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
// STICKY NAVIGATION SCROLL
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

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

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

      const matchesSearch = name.includes(searchKeyword);
      const matchesColor = !selectedColor || color === selectedColor;
      const matchesPrice = price <= maximumPrice;

      return matchesSearch && matchesColor && matchesPrice;
    });

    if (sortSelect) {
      const sortValue = sortSelect.value;

      if (sortValue === "low-high") {
        filteredProducts.sort(
          (a, b) =>
            Number(a.dataset.price) - Number(b.dataset.price)
        );
      }

      if (sortValue === "high-low") {
        filteredProducts.sort(
          (a, b) =>
            Number(b.dataset.price) - Number(a.dataset.price)
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

    if (noResults) {
      noResults.classList.toggle(
        "hidden",
        filteredProducts.length !== 0
      );
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchKeyword = searchInput.value.trim().toLowerCase();
      filterProducts();
    });
  }

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      searchKeyword = searchInput.value.trim().toLowerCase();
      filterProducts();
    });
  }

  document.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      const color = button.dataset.color;

      selectedColor = selectedColor === color ? "" : color;

      filterProducts();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", filterProducts);
  }

  filterProducts();
}

initShopProducts();

// ======================================
// SHOP PAGE: PAGINATION SCROLL
// ======================================

function initPaginationScroll() {
  const paginationLinks = document.querySelectorAll(
    "[data-pagination-scroll]"
  );

  paginationLinks.forEach((link) => {
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
      selectedThumbnail.querySelector("img")?.alt ||
      "Product image";

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

  if (previousImageButton) {
    previousImageButton.addEventListener("click", () => {
      if (currentImageIndex > 0) {
        showProductImage(currentImageIndex - 1);
      }
    });
  }

  if (nextImageButton) {
    nextImageButton.addEventListener("click", () => {
      if (currentImageIndex < thumbnails.length - 1) {
        showProductImage(currentImageIndex + 1);
      }
    });
  }

  if (mainImage && thumbnails.length > 0) {
    showProductImage(0);
  }

  // PRODUCT QUANTITY

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

  // PRODUCT COLOR

  const colorButtons = document.querySelectorAll(
    "[data-product-color]"
  );

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      colorButtons.forEach((item) => {
        item.classList.remove("ring-1", "ring-[#ed5275]");
      });

      button.classList.add("ring-1", "ring-[#ed5275]");
    });
  });

  // PRODUCT SIZE

  const sizeButtons = document.querySelectorAll(
    "[data-product-size]"
  );

  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sizeButtons.forEach((item) => {
        item.classList.remove(
          "border-[#ed5275]",
          "text-[#ed5275]"
        );

        item.classList.add("border-gray-200");
      });

      button.classList.remove("border-gray-200");
      button.classList.add("border-[#ed5275]", "text-[#ed5275]");
    });
  });

  // PRODUCT TABS

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

  const addToCartButton = document.querySelector(
    "#product-add-to-cart"
  );

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const productName =
        document.querySelector("h1")?.textContent.trim() ||
        "Pink Flower Tree Red";

      const productImage =
        mainImage?.getAttribute("src") ||
        "/images/products/product-1.jpg";

      const productPrice = 49;

      let cart = [];

      try {
        cart = JSON.parse(localStorage.getItem("fiamaCart")) || [];

        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch {
        cart = [];
      }

      const existingProduct = cart.find(
        (item) =>
          item.name === productName &&
          item.image === productImage
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({
          id: Date.now(),
          name: productName,
          image: productImage,
          price: productPrice,
          quantity,
        });
      }

      localStorage.setItem("fiamaCart", JSON.stringify(cart));

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

      const productPrice = 49;

      addProductToWishlist({
        id: Date.now(),
        name: productName,
        image: productImage,
        price: productPrice,
        stock: "In Stock",
      });
    });
  }

  // CUSTOMER REVIEW RATING

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

  const reviewStatus = document.querySelector(
    "#review-message-status"
  );

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
    try {
      const cart = JSON.parse(localStorage.getItem("fiamaCart")) || [];

      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem("fiamaCart", JSON.stringify(cart));
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

  function renderCart() {
    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    const isEmpty = cart.length === 0;

    if (emptyCart) {
      emptyCart.classList.toggle("hidden", !isEmpty);
    }

    if (cartActions) {
      cartActions.classList.toggle("hidden", isEmpty);
    }

    if (cartTotals) {
      cartTotals.classList.toggle("hidden", isEmpty);
    }

    if (checkoutButton) {
      checkoutButton.classList.toggle(
        "pointer-events-none",
        isEmpty
      );

      checkoutButton.classList.toggle("opacity-50", isEmpty);

      checkoutButton.setAttribute(
        "aria-disabled",
        String(isEmpty)
      );
    }

    if (isEmpty) {
      couponApplied = false;
      localStorage.removeItem("fiamaCouponApplied");

      updateTotals(0);
      return;
    }

    cart.forEach((product, index) => {
      const row = document.createElement("div");

      row.className =
        "grid grid-cols-[25px_65px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 border-b border-[#d9dfe3] px-1 py-5 sm:grid-cols-[30px_80px_minmax(0,1fr)_90px_100px_110px] sm:gap-4 sm:py-3";

      row.innerHTML = `
        <button
          type="button"
          data-cart-remove="${index}"
          aria-label="Remove product"
          class="text-xs text-black transition hover:text-[#ed5275]">
          ×
        </button>

        <img
          src="${product.image}"
          alt="${product.name}"
          class="h-[75px] w-[65px] bg-[#f7f7f7] object-contain sm:h-[88px] sm:w-[80px]"
        >

        <h3 class="min-w-0 text-xs font-medium text-[#222] sm:text-sm">
          ${product.name}
        </h3>

        <p class="col-start-2 text-[11px] text-[#222] sm:col-start-auto sm:text-center">
          ${formatPrice(product.price)}
        </p>

        <div class="col-start-3 row-start-2 flex h-9 w-[100px] items-center justify-between bg-[#f7f7f7] px-2 sm:col-start-auto sm:row-start-auto sm:w-[82px]">

          <button
            type="button"
            data-cart-minus="${index}"
            aria-label="Decrease quantity"
            class="text-xs text-[#333] hover:text-[#ed5275]">
            -
          </button>

          <span class="text-xs text-[#222]">
            ${String(product.quantity).padStart(2, "0")}
          </span>

          <button
            type="button"
            data-cart-plus="${index}"
            aria-label="Increase quantity"
            class="text-xs text-[#333] hover:text-[#ed5275]">
            +
          </button>

        </div>

        <p class="col-start-3 row-start-3 text-xs font-bold text-black sm:col-start-auto sm:row-start-auto sm:text-center">
          ${formatPrice(product.price * product.quantity)}
        </p>
      `;

      cartItemsContainer.appendChild(row);
    });

    const subtotal = cart.reduce(
      (sum, product) =>
        sum + Number(product.price) * Number(product.quantity),
      0
    );

    updateTotals(subtotal);
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

  cartItemsContainer.addEventListener("click", (event) => {
    const minusButton = event.target.closest("[data-cart-minus]");
    const plusButton = event.target.closest("[data-cart-plus]");
    const removeButton = event.target.closest("[data-cart-remove]");

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

  if (updateButton) {
    updateButton.addEventListener("click", () => {
      renderCart();

      showMessage("Your cart has been updated.");
    });
  }

  renderCart();
}

initCartPage();

// ======================================
// WISHLIST: GET DATA
// ======================================

function getWishlist() {
  try {
    const wishlist = JSON.parse(
      localStorage.getItem("fiamaWishlist")
    ) || [];

    return Array.isArray(wishlist) ? wishlist : [];
  } catch {
    return [];
  }
}

// ======================================
// WISHLIST: SAVE DATA
// ======================================

function saveWishlist(wishlist) {
  localStorage.setItem(
    "fiamaWishlist",
    JSON.stringify(wishlist)
  );
}

// ======================================
// WISHLIST: ADD PRODUCT
// ======================================

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
      removeButton.textContent = "x";
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
        "bg-[#555] px-4 py-2 text-xs text-white transition hover:bg-pink-600 max-md:col-start-3 max-md:w-fit";

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
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("fiamaCart")) || [];

      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch {
      cart = [];
    }

    const existingProduct = cart.find(
      (item) =>
        item.name === product.name &&
        item.image === product.image
    );

    if (existingProduct) {
      existingProduct.quantity =
        Number(existingProduct.quantity || 0) + 1;
    } else {
      cart.push({
        id: Date.now(),
        name: product.name,
        image: product.image,
        price: Number(product.price),
        quantity: 1,
      });
    }

    localStorage.setItem("fiamaCart", JSON.stringify(cart));

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
    try {
      const cart = JSON.parse(localStorage.getItem("fiamaCart")) || [];

      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  }

  function formatPrice(price) {
    return `$${Number(price).toFixed(2)}`;
  }

  // LOGIN PANEL

  if (loginToggle && loginPanel) {
    loginToggle.addEventListener("click", () => {
      loginPanel.classList.toggle("hidden");

      const isExpanded = !loginPanel.classList.contains("hidden");

      loginToggle.setAttribute("aria-expanded", String(isExpanded));
    });
  }

  // COUPON PANEL

  if (couponToggle && couponPanel) {
    couponToggle.addEventListener("click", () => {
      couponPanel.classList.toggle("hidden");

      const isExpanded = !couponPanel.classList.contains("hidden");

      couponToggle.setAttribute("aria-expanded", String(isExpanded));
    });
  }

  // RENDER CHECKOUT PRODUCTS

  function renderCheckout() {
    const cart = getCart();

    if (orderItems) {
      orderItems.replaceChildren();
    }

    let subtotal = 0;

    cart.forEach((product) => {
      const price = Number(product.price) || 0;
      const quantity = Math.max(1, Number(product.quantity) || 1);
      const lineTotal = price * quantity;

      subtotal += lineTotal;

      if (!itemTemplate || !orderItems) return;

      const item = itemTemplate.content.cloneNode(true);

      const nameElement = item.querySelector("[data-checkout-name]");
      const quantityElement = item.querySelector("[data-checkout-quantity]");
      const totalElement = item.querySelector("[data-checkout-line-total]");

      if (nameElement) {
        nameElement.textContent = product.name || "Flower Product";
      }

      if (quantityElement) {
        quantityElement.textContent = quantity;
      }

      if (totalElement) {
        totalElement.textContent = formatPrice(lineTotal);
      }

      orderItems.appendChild(item);
    });

    const discount = couponApplied ? subtotal * 0.10 : 0;
    const shipping = subtotal > 0 ? SHIPPING_CHARGE : 0;
    const vat = VAT;

    const finalTotal = subtotal - discount + shipping + vat;

    if (subtotalElement) {
      subtotalElement.textContent = formatPrice(subtotal);
    }

    if (discountRow) {
      discountRow.classList.toggle("hidden", !couponApplied);
    }

    if (discountElement) {
      discountElement.textContent = `-${formatPrice(discount)}`;
    }

    if (shippingElement) {
      shippingElement.textContent = formatPrice(shipping);
    }

    if (vatElement) {
      vatElement.textContent = formatPrice(vat);
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

  // APPLY COUPON

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

        renderCheckout();
      } else {
        couponApplied = false;

        localStorage.removeItem("fiamaCouponApplied");

        if (couponMessage) {
          couponMessage.textContent = "Invalid coupon code.";

          couponMessage.classList.remove("text-green-600");
          couponMessage.classList.add("text-red-500");
        }

        renderCheckout();
      }
    });
  }

  // PAYMENT METHOD

  const paymentMethods = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );

  paymentMethods.forEach((method) => {
    method.addEventListener("change", () => {
      if (codDescription) {
        codDescription.classList.toggle(
          "hidden",
          method.value !== "cod"
        );
      }
    });
  });

  // PLACE ORDER

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
    const shipping = SHIPPING_CHARGE;
    const vat = VAT;

    const order = {
      orderId: `FIAMA-${Date.now()}`,
      customer: Object.fromEntries(formData.entries()),
      products: cart,
      subtotal,
      discount,
      shipping,
      vat,
      total: subtotal - discount + shipping + vat,
      paymentMethod: selectedPayment.value,
      orderDate: new Date().toISOString(),
    };

    localStorage.setItem("fiamaLastOrder", JSON.stringify(order));

    localStorage.removeItem("fiamaCart");
    localStorage.removeItem("fiamaCouponApplied");

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

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (event) => {
      event.preventDefault();

      if (loginMessage) {
        loginMessage.textContent =
          "Password recovery is not available yet.";

        loginMessage.setAttribute("role", "status");
      }
    });
  }
}

initLoginPage();

// ======================================
// MY ACCOUNT DASHBOARD
// ======================================

function initMyAccountPage() {
  const accountTabs = document.querySelectorAll("[data-account-tab]");
  const accountPanels = document.querySelectorAll("[data-account-panel]");

  // Account page is currently empty.
  // Dashboard functionality will initialize when its HTML is added.

  if (accountTabs.length === 0 || accountPanels.length === 0) return;

  function showAccountTab(selectedTab) {
    accountTabs.forEach((button) => {
      const isActive = button.dataset.accountTab === selectedTab;

      button.setAttribute("aria-selected", String(isActive));
    });

    accountPanels.forEach((panel) => {
      const isActive = panel.dataset.accountPanel === selectedTab;

      panel.hidden = !isActive;
    });
  }

  // DASHBOARD TAB BUTTONS

  accountTabs.forEach((button) => {
    button.addEventListener("click", () => {
      showAccountTab(button.dataset.accountTab);
    });
  });

  // DASHBOARD INTERNAL LINKS

  document.querySelectorAll("[data-account-tab-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedTab = link.dataset.accountTabLink;

      if (selectedTab) {
        showAccountTab(selectedTab);
      }
    });
  });

  // INITIAL TAB

  const initiallySelectedTab =
    document.querySelector('[data-account-tab][aria-selected="true"]') ||
    accountTabs[0];

  if (initiallySelectedTab) {
    showAccountTab(initiallySelectedTab.dataset.accountTab);
  }

  // ACCOUNT DETAILS FORM

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

  // LOAD SAVED ACCOUNT DETAILS

  function loadAccountDetails() {
    let savedDetails = {};

    try {
      savedDetails =
        JSON.parse(localStorage.getItem("fiamaAccountDetails")) || {};
    } catch {
      savedDetails = {};
    }

    if (firstNameInput) {
      firstNameInput.value = savedDetails.firstName || "";
    }

    if (lastNameInput) {
      lastNameInput.value = savedDetails.lastName || "";
    }

    if (displayNameInput) {
      displayNameInput.value = savedDetails.displayName || "";
    }

    if (emailInput) {
      emailInput.value = savedDetails.email || "";
    }
  }

  loadAccountDetails();

  // SAVE ACCOUNT DETAILS

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

      const accountDetails = {
        firstName,
        lastName,
        displayName,
        email,
      };

      localStorage.setItem(
        "fiamaAccountDetails",
        JSON.stringify(accountDetails)
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

  const firstNameInput = document.querySelector(
    "#register-first-name"
  );

  const lastNameInput = document.querySelector(
    "#register-last-name"
  );

  const emailInput = document.querySelector(
    "#register-email"
  );

  const passwordInput = document.querySelector(
    "#register-password"
  );

  const confirmPasswordInput = document.querySelector(
    "#register-confirm-password"
  );

  const privacyConsent = document.querySelector(
    "#register-privacy-consent"
  );

  const registerMessage = document.querySelector(
    "#register-message"
  );

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
