
export function createFooter() {
  const logos = [
    "florist1.png",
    "nature.png",
    "anna&john.png",
    "anna&john2.png",
    "claresmith.png",
    "florist2.png",
  ];

  return `
    <!-- Brand Logos: Manual Horizontal Scroll -->
    <section class="bg-[#f8f8f8] border-t border-gray-100">
      <div class="max-w-[1076px] mx-auto px-5 min-h-[139px] flex items-center">

        <div
          data-logo-slider
          class="w-full overflow-x-auto cursor-grab select-none touch-pan-x [&::-webkit-scrollbar]:hidden"
          style="scrollbar-width: none;"
          aria-label="Brand logos"
        >
          <div data-logo-track class="flex items-center w-max">

            ${logos.map((logo) => `
              <div class="flex w-[200px] flex-none items-center justify-center px-4">
                <img
                  src="/images/logo/${logo}"
                  alt="Brand logo"
                  draggable="false"
                  class="max-w-full h-auto max-h-[65px] object-contain grayscale opacity-60 pointer-events-none"
                />
              </div>
            `).join("")}

          </div>
        </div>

      </div>
    </section>

    <!-- Main Footer -->
    <footer class="relative bg-[#252525] text-[#999]">

      <div class="max-w-[1076px] mx-auto px-5 pt-[72px] pb-5">

        <!-- Footer Columns -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[140px_140px_140px_140px_minmax(0,1fr)] gap-x-[38px] gap-y-10">

          <!-- My Account -->
          <div>
            <h3 class="text-white text-xs font-semibold mb-7">
              MY ACCOUNT
            </h3>

            <ul class="space-y-3 text-[13px]">
              <li><a href="/account.html" class="hover:text-[#ed5275] transition-colors">My account</a></li>
              <li><a href="/checkout.html" class="hover:text-[#ed5275] transition-colors">Checkout</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Contact us</a></li>
              <li><a href="/cart.html" class="hover:text-[#ed5275] transition-colors">Shopping Cart</a></li>
              <li><a href="/wishlist.html" class="hover:text-[#ed5275] transition-colors">Wishlist</a></li>
            </ul>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white text-xs font-semibold mb-7">
              QUICK LINKS
            </h3>

            <ul class="space-y-3 text-[13px]">
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Store Location</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Orders Tracking</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Size Guide</a></li>
              <li><a href="/account.html" class="hover:text-[#ed5275] transition-colors">My account</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">FAQs</a></li>
            </ul>
          </div>

          <!-- Information -->
          <div>
            <h3 class="text-white text-xs font-semibold mb-7">
              INFORMATION
            </h3>

            <ul class="space-y-3 text-[13px]">
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Privacy Page</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">About us</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Careers</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Delivery Information</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Term & Conditions</a></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div>
            <h3 class="text-white text-xs font-semibold mb-7">
              CUSTOMER SERVICE
            </h3>

            <ul class="space-y-3 text-[13px]">
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Shipping Policy</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Help & Contact Us</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Returns & Refunds</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Online Stores</a></li>
              <li><a href="#" class="hover:text-[#ed5275] transition-colors">Terms and Conditions</a></li>
            </ul>
          </div>

          <!-- About Our Shop -->
          <div>
            <h3 class="text-white text-xs font-semibold mb-7">
              ABOUT OUR SHOP
            </h3>

            <p class="text-[13px] leading-5 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod incididunt ut labore et dolore
            </p>

            <ul class="space-y-1 text-[13px]">

              <li class="flex items-start gap-3">
                <svg class="w-3 h-3 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1116 0z"/>
                  <circle cx="12" cy="10" r="2.5"/>
                </svg>
                <span>Brooklyn, New York, United States</span>
              </li>

              <li class="flex items-center gap-3">
                <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M5 3h4l2 5-3 2a15 15 0 006 6l2-3 5 2v4c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2z"/>
                </svg>
                <a href="tel:+0123456789" class="hover:text-[#ed5275] transition-colors">
                  +0123-456789
                </a>
              </li>

              <li class="flex items-center gap-3">
                <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="1"/>
                  <path d="m3 7 9 7 9-7"/>
                </svg>
                <a href="mailto:example@example.com" class="hover:text-[#ed5275] transition-colors">
                  example@example.com
                </a>
              </li>

            </ul>

            <!-- Payment Methods -->
            <div class="flex items-center gap-2 mt-4 text-[8px] font-bold">
              <span class="bg-[#aaa] text-[#333] px-1.5 py-1 rounded-sm">VISA</span>
              <span class="bg-[#aaa] text-[#333] px-1.5 py-1 rounded-sm">PayPal</span>
              <span class="bg-[#aaa] text-[#333] px-1.5 py-1 rounded-sm">MASTER</span>
              <span class="bg-[#aaa] text-[#333] px-1.5 py-1 rounded-sm">AMEX</span>
              <span class="bg-[#aaa] text-[#333] px-1.5 py-1 rounded-sm">DISC</span>
            </div>
          </div>

        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-[#383838] mt-16 pt-4 flex flex-col sm:flex-row items-center justify-between gap-5">

          <p class="text-[10px]">
            © 2026 - JUST FOR YOU
          </p>

          <div class="flex items-center gap-5">

            <a href="#" aria-label="Facebook" class="hover:text-[#ed5275] transition-colors">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.7v8h3.3z"/>
              </svg>
            </a>

            <a href="#" aria-label="Twitter" class="hover:text-[#ed5275] transition-colors">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.9c-.7.3-1.4.5-2.2.6a3.8 3.8 0 001.7-2.1 7.6 7.6 0 01-2.4.9 3.8 3.8 0 00-6.5 3.5A10.8 10.8 0 014.7 4.8a3.8 3.8 0 001.2 5.1 3.8 3.8 0 01-1.7-.5v.1a3.8 3.8 0 003 3.7 3.8 3.8 0 01-1.7.1 3.8 3.8 0 003.5 2.6A7.6 7.6 0 013 17.5a10.7 10.7 0 005.8 1.7c7 0 10.8-5.8 10.8-10.8v-.5A7.7 7.7 0 0022 5.9z"/>
              </svg>
            </a>

            <a href="#" aria-label="Pinterest" class="hover:text-[#ed5275] transition-colors">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-3.6 19.3c-.1-.8-.2-2 .1-2.9l1.3-5.4s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.3-2 3.3-4.9 0-2.6-1.9-4.4-4.5-4.4-3.1 0-4.9 2.3-4.9 4.7 0 .9.3 1.9.8 2.4.1.1.1.2.1.4l-.3 1.1c0 .2-.2.3-.4.2-1.4-.6-2.2-2.4-2.2-3.9 0-3.2 2.3-6.2 6.7-6.2 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.5-5.3 6.5-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.9-.8 1.9-1.2 2.5A10 10 0 1012 2z"/>
              </svg>
            </a>

            <a href="#" aria-label="Instagram" class="hover:text-[#ed5275] transition-colors">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>

          </div>
        </div>

      </div>

      <!-- Back To Top -->
      <button
        id="back-to-top"
        type="button"
        aria-label="Back to top"
        class="absolute bottom-8 right-8 z-50 w-11 h-11 rotate-45 bg-white text-[#252525] shadow-lg flex items-center justify-center hover:bg-[#ed5275] hover:text-white transition-colors duration-300"
      >
        <svg class="-rotate-45 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

    </footer>
  `;
}
