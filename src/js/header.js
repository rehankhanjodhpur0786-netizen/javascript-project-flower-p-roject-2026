
export function createHeader() {
    return `
        <!-- TOP HEADER -->
        <div class="border-t-[3px] border-[#0b1918] bg-white">

            <div class="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 pb-5 pt-2 sm:px-6 md:min-h-[130px] md:justify-between md:gap-5 md:py-5 lg:flex-nowrap lg:px-0 lg:py-0">

                <!-- LOGO -->
                <a href="/index.html"
                    class="w-full text-center text-[38px] font-extrabold leading-[46px] tracking-tight text-black md:w-auto md:text-left md:leading-normal">
                    fiama<span class="text-[#ed5275]">.</span>
                </a>

                <!-- MOBILE MENU BUTTON -->
                <button
                    id="mobile-menu-button"
                    class="order-3 p-2 text-gray-800 lg:hidden md:order-none"
                    aria-label="Toggle navigation menu"
                    aria-expanded="false"
                    aria-controls="mobile-navigation">

                    <svg class="h-6 w-6 md:h-7 md:w-7" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>

                <!-- PHONE -->
                <div class="order-3 hidden items-center gap-3 sm:gap-4 md:flex lg:order-none">

                    <svg class="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.2 1.1a11 11 0 005.49 5.49l1.1-2.2a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.16 21 3 14.84 3 7V5z"/>
                    </svg>

                    <div>
                        <p class="text-sm text-gray-600 sm:text-base">PHONE</p>
                        <p class="text-sm text-gray-800 sm:text-base">+0123-456-789</p>
                    </div>
                </div>

                <!-- SEARCH -->
                <div class="order-4 hidden h-[45px] w-full min-w-0 items-center rounded-full border border-gray-300 px-4 sm:px-6 md:flex lg:order-none lg:w-auto lg:flex-1">

                    <input type="text"
                        placeholder="Search here..."
                        class="w-full min-w-0 bg-transparent text-base outline-none">

                    <button aria-label="Search" class="shrink-0">
                        <svg class="h-7 w-7" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"
                                stroke-width="1.5"/>
                            <path d="m17 17 4 4"
                                stroke-width="1.5"
                                stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <!-- CART -->
                <a href="/cart.html"
                    class="order-2 flex items-center gap-3 sm:gap-4 lg:order-none">

                    <div class="relative">
                        <svg class="h-6 w-6 sm:h-8 sm:w-8"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 8h14l-1 13H6L5 8z"/>
                            <path stroke-width="1.5"
                                d="M9 8V5a3 3 0 016 0v3"/>
                        </svg>

                        <span class="absolute -right-2.5 -top-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ed5275] text-[11px] text-white sm:-right-3 sm:-top-3 sm:h-6 sm:w-6 sm:text-sm">2</span>
                    </div>

                    <div>
                        <p class="text-[13px] text-gray-600 sm:text-sm">YOUR CART</p>
                        <p class="text-[13px] text-[#ed5275] sm:text-sm">$89.25</p>
                    </div>
                </a>

            </div>
        </div>

        <!-- DESKTOP STICKY NAVIGATION -->
        <nav
            data-sticky-navigation
            class="sticky top-0 z-50 border-t border-gray-100 bg-white">

            <div
                data-sticky-container
                class="mx-auto flex min-h-[65px] w-full max-w-[1036px] items-center justify-center px-5 sm:px-6 lg:min-h-[87px] lg:px-0">

                <!-- STICKY LOGO -->
                <a
                    data-sticky-logo
                    href="/index.html"
                    class="hidden shrink-0 text-[30px] font-extrabold tracking-tight text-black">

                    fiama<span class="text-[#ed5275]">.</span>
                </a>

                <!-- DESKTOP NAVIGATION LINKS -->
                <ul
                    data-sticky-menu
                    class="hidden flex-wrap items-center justify-center gap-6 text-[14px] text-[#555] lg:flex xl:gap-12 xl:text-[17px]">

                    <!-- HOME DROPDOWN -->
                    <li class="group relative">
                        <a href="#"
                            class="flex items-center gap-1 py-8 transition-colors group-hover:text-[#ed5275]">
                            HOME
                            <span class="text-[10px]">▼</span>
                        </a>

                        <ul class="invisible absolute left-0 top-full z-50 min-w-[210px] translate-y-2 rounded-sm bg-white py-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                            <li><a href="/index.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Home Style - 01</a></li>
                            <li><a href="/index-2.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Home Style - 02</a></li>
                            <li><a href="/index-3.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Home Style - 03</a></li>
                            <li><a href="/index-4.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Home Style - 04</a></li>
                        </ul>
                    </li>

                    <!-- PAGES MEGA MENU -->
                    <li class="group relative">
                        <a href="#"
                            class="flex items-center gap-1 py-8 transition-colors group-hover:text-[#ed5275]">
                            PAGES
                            <span class="text-[10px]">▼</span>
                        </a>

                        <div class="invisible absolute left-1/2 top-full z-50 w-[850px] -translate-x-1/2 translate-y-2 rounded-sm bg-white p-8 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">

                            <div class="grid grid-cols-4 gap-8">

                                <!-- INNER PAGES 1 -->
                                <div>
                                    <h3 class="mb-4 border-b border-gray-100 pb-3 text-sm font-semibold text-black">Inner Pages</h3>
                                    <ul class="space-y-3 text-sm">
                                        <li><a href="/about.html" class="hover:text-[#ed5275]">About Us</a></li>
                                        <li><a href="/portfolio.html" class="hover:text-[#ed5275]">Portfolio</a></li>
                                        <li><a href="/portfolio-2.html" class="hover:text-[#ed5275]">Portfolio - 02</a></li>
                                        <li><a href="/portfolio-details.html" class="hover:text-[#ed5275]">Portfolio Details</a></li>
                                        <li><a href="/faq.html" class="hover:text-[#ed5275]">FAQ</a></li>
                                    </ul>
                                </div>

                                <!-- INNER PAGES 2 -->
                                <div>
                                    <h3 class="mb-4 border-b border-gray-100 pb-3 text-sm font-semibold text-black">Inner Pages</h3>
                                    <ul class="space-y-3 text-sm">
                                        <li><a href="/locations.html" class="hover:text-[#ed5275]">Google Map Locations</a></li>
                                        <li><a href="/404.html" class="hover:text-[#ed5275]">404</a></li>
                                        <li><a href="/contact.html" class="hover:text-[#ed5275]">Contact</a></li>
                                        <li><a href="/coming-soon.html" class="hover:text-[#ed5275]">Coming Soon</a></li>
                                    </ul>
                                </div>

                                <!-- SHOP PAGES -->
                                <div>
                                    <h3 class="mb-4 border-b border-gray-100 pb-3 text-sm font-semibold text-black">Shop Pages</h3>
                                    <ul class="space-y-3 text-sm">
                                        <li><a href="/shop.html" class="hover:text-[#ed5275]">Shop</a></li>
                                        <li><a href="/shop-grid.html" class="hover:text-[#ed5275]">Shop Grid</a></li>
                                        <li><a href="/shop-left-sidebar.html" class="hover:text-[#ed5275]">Shop Left sidebar</a></li>
                                        <li><a href="/shop-right-sidebar.html" class="hover:text-[#ed5275]">Shop right sidebar</a></li>
                                        <li><a href="/product-details.html" class="hover:text-[#ed5275]">Shop details</a></li>
                                    </ul>
                                </div>

                                <!-- BLOG PAGES -->
                                <div>
                                    <h3 class="mb-4 border-b border-gray-100 pb-3 text-sm font-semibold text-black">Blog Pages</h3>
                                    <ul class="space-y-3 text-sm">
                                        <li><a href="/blog.html" class="hover:text-[#ed5275]">News</a></li>
                                        <li><a href="/blog-grid.html" class="hover:text-[#ed5275]">News Grid</a></li>
                                        <li><a href="/blog-left-sidebar.html" class="hover:text-[#ed5275]">News Left sidebar</a></li>
                                        <li><a href="/blog-right-sidebar.html" class="hover:text-[#ed5275]">News Right sidebar</a></li>
                                        <li><a href="/blog-details.html" class="hover:text-[#ed5275]">News details</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </li>

                    <!-- SHOP DROPDOWN -->
                    <li class="group relative">
                        <a href="/shop-left-sidebar.html"
                            class="flex items-center gap-1 py-8 transition-colors group-hover:text-[#ed5275]">
                            SHOP
                            <span class="text-[10px]">▼</span>
                        </a>

                        <ul class="invisible absolute left-0 top-full z-50 min-w-[230px] translate-y-2 rounded-sm bg-white py-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">

                            <li><a href="/shop.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Shop</a></li>
                            <li><a href="/shop-grid.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Shop Grid</a></li>
                            <li><a href="/shop-left-sidebar.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Shop Left sidebar</a></li>
                            <li><a href="/shop-right-sidebar.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Shop right sidebar</a></li>
                            <li><a href="/product-details.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Shop details</a></li>

                            <!-- OTHER PAGES NESTED DROPDOWN -->
                            <li class="group/other relative">
                                <a href="#"
                                    class="flex items-center justify-between px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">
                                    Other Pages
                                    <span>›</span>
                                </a>

                                <ul class="invisible absolute left-full top-0 z-50 min-w-[190px] rounded-sm bg-white py-3 opacity-0 shadow-xl transition-all duration-200 group-hover/other:visible group-hover/other:opacity-100 group-focus-within/other:visible group-focus-within/other:opacity-100">
                                    <li><a href="/cart.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Cart</a></li>
                                    <li><a href="/wishlist.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Wishlist</a></li>
                                    <li><a href="/checkout.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Checkout</a></li>
                                    <li><a href="/order-tracking.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Order Tracking</a></li>
                                    <li><a href="/account.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">My Account</a></li>
                                    <li><a href="/login.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Sign in</a></li>
                                    <li><a href="/register.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Register</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <!-- PORTFOLIO DROPDOWN -->
                    <li class="group relative">
                        <a href="#"
                            class="flex items-center gap-1 py-8 transition-colors group-hover:text-[#ed5275]">
                            PORTFOLIO
                            <span class="text-[10px]">▼</span>
                        </a>

                        <ul class="invisible absolute left-0 top-full z-50 min-w-[230px] translate-y-2 rounded-sm bg-white py-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                            <li><a href="/portfolio.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Portfolio</a></li>
                            <li><a href="/portfolio-2.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Portfolio - 02</a></li>
                            <li><a href="/portfolio-details.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">Portfolio Details</a></li>
                        </ul>
                    </li>

                    <!-- NEWS DROPDOWN -->
                    <li class="group relative">
                        <a href="#"
                            class="flex items-center gap-1 py-8 transition-colors group-hover:text-[#ed5275]">
                            NEWS
                            <span class="text-[10px]">▼</span>
                        </a>

                        <ul class="invisible absolute left-0 top-full z-50 min-w-[230px] translate-y-2 rounded-sm bg-white py-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                            <li><a href="/blog.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">News</a></li>
                            <li><a href="/blog-grid.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">News Grid</a></li>
                            <li><a href="/blog-left-sidebar.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">News Left sidebar</a></li>
                            <li><a href="/blog-right-sidebar.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">News Right sidebar</a></li>
                            <li><a href="/blog-details.html" class="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#ed5275]">News details</a></li>
                        </ul>
                    </li>

                    <!-- CONTACT -->
                    <li>
                        <a href="/contact.html"
                            class="py-8 transition-colors hover:text-[#ed5275]">CONTACT</a>
                    </li>

                </ul>
            </div>
        </nav>

        <!-- MOBILE AND TABLET NAVIGATION -->
        <nav id="mobile-navigation"
            class="hidden border-t border-gray-100 bg-white lg:hidden">

            <ul class="mx-auto flex w-full max-w-[1036px] flex-col gap-4 px-5 py-5 text-base text-[#555] sm:px-6">

                <!-- MOBILE HOME -->
                <li>
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between transition-colors hover:text-[#ed5275]">
                            HOME
                            <span class="text-xs">▼</span>
                        </summary>
                        <ul class="mt-3 space-y-3 border-l-2 border-gray-100 pl-4 text-sm">
                            <li><a href="/index.html" class="block hover:text-[#ed5275]">Home Style - 01</a></li>
                            <li><a href="/index-2.html" class="block hover:text-[#ed5275]">Home Style - 02</a></li>
                            <li><a href="/index-3.html" class="block hover:text-[#ed5275]">Home Style - 03</a></li>
                            <li><a href="/index-4.html" class="block hover:text-[#ed5275]">Home Style - 04</a></li>
                        </ul>
                    </details>
                </li>

                <!-- MOBILE PAGES -->
                <li>
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between transition-colors hover:text-[#ed5275]">
                            PAGES
                            <span class="text-xs">▼</span>
                        </summary>

                        <div class="mt-3 space-y-5 border-l-2 border-gray-100 pl-4 text-sm">

                            <div>
                                <p class="mb-3 font-semibold text-black">Inner Pages</p>
                                <ul class="space-y-3">
                                    <li><a href="/about.html" class="hover:text-[#ed5275]">About Us</a></li>
                                    <li><a href="/portfolio.html" class="hover:text-[#ed5275]">Portfolio</a></li>
                                    <li><a href="/portfolio-2.html" class="hover:text-[#ed5275]">Portfolio - 02</a></li>
                                    <li><a href="/portfolio-details.html" class="hover:text-[#ed5275]">Portfolio Details</a></li>
                                    <li><a href="/faq.html" class="hover:text-[#ed5275]">FAQ</a></li>
                                    <li><a href="/locations.html" class="hover:text-[#ed5275]">Google Map Locations</a></li>
                                    <li><a href="/404.html" class="hover:text-[#ed5275]">404</a></li>
                                    <li><a href="/contact.html" class="hover:text-[#ed5275]">Contact</a></li>
                                    <li><a href="/coming-soon.html" class="hover:text-[#ed5275]">Coming Soon</a></li>
                                </ul>
                            </div>

                            <div>
                                <p class="mb-3 font-semibold text-black">Shop Pages</p>
                                <ul class="space-y-3">
                                    <li><a href="/shop.html" class="hover:text-[#ed5275]">Shop</a></li>
                                    <li><a href="/shop-grid.html" class="hover:text-[#ed5275]">Shop Grid</a></li>
                                    <li><a href="/shop-left-sidebar.html" class="hover:text-[#ed5275]">Shop Left sidebar</a></li>
                                    <li><a href="/shop-right-sidebar.html" class="hover:text-[#ed5275]">Shop right sidebar</a></li>
                                    <li><a href="/product-details.html" class="hover:text-[#ed5275]">Shop details</a></li>
                                </ul>
                            </div>

                            <div>
                                <p class="mb-3 font-semibold text-black">Blog Pages</p>
                                <ul class="space-y-3">
                                    <li><a href="/blog.html" class="hover:text-[#ed5275]">News</a></li>
                                    <li><a href="/blog-grid.html" class="hover:text-[#ed5275]">News Grid</a></li>
                                    <li><a href="/blog-left-sidebar.html" class="hover:text-[#ed5275]">News Left sidebar</a></li>
                                    <li><a href="/blog-right-sidebar.html" class="hover:text-[#ed5275]">News Right sidebar</a></li>
                                    <li><a href="/blog-details.html" class="hover:text-[#ed5275]">News details</a></li>
                                </ul>
                            </div>

                        </div>
                    </details>
                </li>

                <!-- MOBILE SHOP -->
                <li>
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between transition-colors hover:text-[#ed5275]">
                            SHOP
                            <span class="text-xs">▼</span>
                        </summary>

                        <ul class="mt-3 space-y-3 border-l-2 border-gray-100 pl-4 text-sm">
                            <li><a href="/shop.html" class="block hover:text-[#ed5275]">Shop</a></li>
                            <li><a href="/shop-grid.html" class="block hover:text-[#ed5275]">Shop Grid</a></li>
                            <li><a href="/shop-left-sidebar.html" class="block hover:text-[#ed5275]">Shop Left sidebar</a></li>
                            <li><a href="/shop-right-sidebar.html" class="block hover:text-[#ed5275]">Shop right sidebar</a></li>
                            <li><a href="/product-details.html" class="block hover:text-[#ed5275]">Shop details</a></li>
                        </ul>

                        <details class="ml-4 mt-4">
                            <summary class="cursor-pointer list-none text-sm hover:text-[#ed5275]">
                                Other Pages
                            </summary>
                            <ul class="mt-3 space-y-3 border-l-2 border-gray-100 pl-4 text-sm">
                                <li><a href="/cart.html" class="block hover:text-[#ed5275]">Cart</a></li>
                                <li><a href="/wishlist.html" class="block hover:text-[#ed5275]">Wishlist</a></li>
                                <li><a href="/checkout.html" class="block hover:text-[#ed5275]">Checkout</a></li>
                                <li><a href="/order-tracking.html" class="block hover:text-[#ed5275]">Order Tracking</a></li>
                                <li><a href="/account.html" class="block hover:text-[#ed5275]">My Account</a></li>
                                <li><a href="/login.html" class="block hover:text-[#ed5275]">Sign in</a></li>
                                <li><a href="/register.html" class="block hover:text-[#ed5275]">Register</a></li>
                            </ul>
                        </details>
                    </details>
                </li>

                <!-- MOBILE PORTFOLIO -->
                <li>
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between transition-colors hover:text-[#ed5275]">
                            PORTFOLIO
                            <span class="text-xs">▼</span>
                        </summary>
                        <ul class="mt-3 space-y-3 border-l-2 border-gray-100 pl-4 text-sm">
                            <li><a href="/portfolio.html" class="block hover:text-[#ed5275]">Portfolio</a></li>
                            <li><a href="/portfolio-2.html" class="block hover:text-[#ed5275]">Portfolio - 02</a></li>
                            <li><a href="/portfolio-details.html" class="block hover:text-[#ed5275]">Portfolio Details</a></li>
                        </ul>
                    </details>
                </li>

                <!-- MOBILE NEWS -->
                <li>
                    <details class="group">
                        <summary class="flex cursor-pointer list-none items-center justify-between transition-colors hover:text-[#ed5275]">
                            NEWS
                            <span class="text-xs">▼</span>
                        </summary>
                        <ul class="mt-3 space-y-3 border-l-2 border-gray-100 pl-4 text-sm">
                            <li><a href="/blog.html" class="block hover:text-[#ed5275]">News</a></li>
                            <li><a href="/blog-grid.html" class="block hover:text-[#ed5275]">News Grid</a></li>
                            <li><a href="/blog-left-sidebar.html" class="block hover:text-[#ed5275]">News Left sidebar</a></li>
                            <li><a href="/blog-right-sidebar.html" class="block hover:text-[#ed5275]">News Right sidebar</a></li>
                            <li><a href="/blog-details.html" class="block hover:text-[#ed5275]">News details</a></li>
                        </ul>
                    </details>
                </li>

                <!-- MOBILE CONTACT -->
                <li>
                    <a href="/contact.html"
                        class="block transition-colors hover:text-[#ed5275]">CONTACT</a>
                </li>

            </ul>
        </nav>
    `;
}
