
export function createHeader() {
    return `
        <!-- Top Header -->
        <div class="border-t-[3px] border-[#0b1918] bg-white">

            <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16
                        min-h-[130px] py-5 lg:py-0
                        flex flex-wrap items-center
                        justify-between gap-5">

                <!-- Logo -->
                <a href="/index.html" class="text-[38px] font-extrabold tracking-tight text-black">
                    fiama<span class="text-[#ed5275]">.</span>
                </a>

                <!-- Mobile Menu Button -->
                <button
                    id="mobile-menu-button"
                    class="lg:hidden p-2 text-gray-800"
                    aria-label="Toggle navigation menu"
                    aria-expanded="false"
                    aria-controls="mobile-navigation">

                    <svg class="w-7 h-7" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>

                <!-- Phone -->
                <div class="flex items-center gap-3 sm:gap-4
                            order-3 lg:order-none">

                    <svg class="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.2 1.1a11 11 0 005.49 5.49l1.1-2.2a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.16 21 3 14.84 3 7V5z"/>
                    </svg>

                    <div>
                        <p class="text-gray-600 text-sm sm:text-base">PHONE</p>
                        <p class="text-gray-800 text-sm sm:text-base">+0123-456-789</p>
                    </div>
                </div>

                <!-- Search -->
                <div class="flex items-center border border-gray-300
                    rounded-full h-[45px] px-4 sm:px-6
                    w-full lg:w-[550px] lg:max-w-full
                    order-4 lg:order-none">

                    <input type="text"
                        placeholder="Search here..."
                        class="w-full min-w-0 outline-none text-base bg-transparent">

                    <button aria-label="Search" class="shrink-0">
                        <svg class="w-7 h-7" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"
                                stroke-width="1.5"/>
                            <path d="m17 17 4 4"
                                stroke-width="1.5"
                                stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <!-- Cart -->
                <a href="/cart.html"
                    class="flex items-center gap-3 sm:gap-4
                           order-2 lg:order-none">

                    <div class="relative">
                        <svg class="w-7 h-7 sm:w-8 sm:h-8"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 8h14l-1 13H6L5 8z"/>
                            <path stroke-width="1.5"
                                d="M9 8V5a3 3 0 016 0v3"/>
                        </svg>

                        <span class="absolute -top-3 -right-3
                            bg-[#ed5275] text-white rounded-full
                            w-6 h-6 flex items-center justify-center
                            text-sm">2</span>
                    </div>

                    <div>
                        <p class="text-gray-600 text-xs sm:text-sm">YOUR CART</p>
                        <p class="text-[#ed5275] text-xs sm:text-sm">$89.25</p>
                    </div>
                </a>

            </div>
        </div>

        <!-- Desktop Sticky Navigation -->
        <nav
            data-sticky-navigation
            class="sticky top-0 z-50 border-t border-gray-100 bg-white">

            <div
                data-sticky-container
                class="max-w-7xl mx-auto min-h-[87px] px-4
                       flex items-center justify-center">

                <!-- Sticky Logo -->
                <a
                    data-sticky-logo
                    href="/index.html"
                    class="hidden text-[30px] font-extrabold tracking-tight text-black shrink-0">

                    fiama<span class="text-[#ed5275]">.</span>
                </a>

                <!-- Desktop Navigation Links -->
                <ul
                    data-sticky-menu
                    class="hidden lg:flex flex-wrap items-center justify-center
                           gap-10 xl:gap-14 text-[17px] text-[#555]">

                    <li><a href="/index.html"
                        class="hover:text-[#ed5275]">HOME</a></li>

                    <li><a href="/account.html"
                        class="hover:text-[#ed5275]">PAGES</a></li>

                    <li><a href="/shop-left-sidebar.html"
                        class="hover:text-[#ed5275]">SHOP</a></li>

                    <li><a href="#"
                        class="hover:text-[#ed5275]">PORTFOLIO</a></li>

                    <li><a href="#"
                        class="hover:text-[#ed5275]">NEWS</a></li>

                    <li><a href="#"
                        class="hover:text-[#ed5275]">CONTACT</a></li>

                </ul>
            </div>
        </nav>

        <!-- Mobile and Tablet Navigation -->
        <nav id="mobile-navigation"
            class="hidden lg:hidden border-t border-gray-100 bg-white">

            <ul class="flex flex-col gap-4 px-6 py-5
                       text-base text-[#555]">

                <li><a href="/index.html"
                    class="block hover:text-[#ed5275]">HOME</a></li>

                <li><a href="/account.html"
                    class="block hover:text-[#ed5275]">PAGES</a></li>

                <li><a href="/shop-left-sidebar.html"
                    class="block hover:text-[#ed5275]">SHOP</a></li>

                <li><a href="#"
                    class="block hover:text-[#ed5275]">PORTFOLIO</a></li>

                <li><a href="#"
                    class="block hover:text-[#ed5275]">NEWS</a></li>

                <li><a href="#"
                    class="block hover:text-[#ed5275]">CONTACT</a></li>

            </ul>
        </nav>
    `;
}
