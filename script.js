document.addEventListener("DOMContentLoaded", () => {
    // --- DATABASE SIMULATION ---
    const DB = {
        promos: [
            // Ganti path gambar sesuai struktur folder Anda
            { img: "images/banner_ml.jpg", alt: "Promo MLBB" },
            { img: "images/banner_ff.jpg", alt: "Promo Free Fire" },
            { img: "images/banner_pubg.jpg", alt: "Promo PUBG Mobile" },
        ],
        flashSales: [
            { productId: "ff", productType: "game", itemName: "140 Diamonds", originalPrice: 20000, salePrice: 18000, endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString() },
            { productId: "google-play", productType: "voucher", itemName: "Voucher 50.000", originalPrice: 52000, salePrice: 50000, endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString() },
            { productId: "mlbb", productType: "game", itemName: "Weekly Pass", originalPrice: 30000, salePrice: 27500, endTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString() },
        ],
        games: [
            // Ganti path gambar logo sesuai struktur folder Anda
            { id: "mlbb", title: "Mobile Legends", img: "images/logo_ml.jpg", inputType: "game", popularity: 100, items: [ { name: "86 Diamonds", price: 25000, isBestSeller: true }, { name: "172 Diamonds", price: 50000, bonus: "+10💎" }, { name: "257 Diamonds", price: 75000 }, { name: "Weekly Pass", price: 30000 }, ] },
            { id: "ff", title: "Free Fire", img: "images/logo_ff.jpg", inputType: "game", popularity: 95, items: [ { name: "70 Diamonds", price: 10000 }, { name: "140 Diamonds", price: 20000, isBestSeller: true }, { name: "355 Diamonds", price: 50000 }, ] },
            { id: "valorant", title: "Valorant", img: "images/logo_valorant.jpg", inputType: "game", popularity: 80, items: [ { name: "125 Points", price: 15000 }, { name: "700 Points", price: 70000 }, { name: "1375 Points", price: 125000, isBestSeller: true }, ] },
            { id: "genshin", title: "Genshin Impact", img: "images/logo_genshin.jpg", inputType: "game", popularity: 88, items: [ { name: "60 Genesis", price: 16000 }, { name: "300 Genesis", price: 79000 }, { name: "Welkin Moon", price: 79000, isBestSeller: true }, ] },
            { id: "joki-ml", title: "Joki MLBB", img: "images/logo_joki_ml.jpg", inputType: "game", popularity: 50, items: [ { name: "Warrior - Elite", price: 15000 }, { name: "Elite - Master", price: 25000 }, { name: "Master - Grandmaster", price: 50000 }, ] },
        ],
        vouchers: [
            { id: "google-play", title: "Google Play", img: "images/logo_gp.jpeg", inputType: "email", popularity: 90, items: [ { name: "Voucher 20.000", price: 22000 }, { name: "Voucher 50.000", price: 52000, isBestSeller: true }, { name: "Voucher 100.000", price: 102000 }, ] },
            { id: "steam", title: "Steam Wallet", img: "images/logo_steam.png", inputType: "email", popularity: 85, items: [ { name: "Wallet 12.000", price: 15000 }, { name: "Wallet 60.000", price: 65000, isBestSeller: true }, { name: "Wallet 120.000", price: 128000 }, ] },
        ],
        pulsa: [
            { id: "telkomsel", title: "Telkomsel", img: "images/logo_telkomsel.png", inputType: "phone", popularity: 98, items: [ { name: "Pulsa 25.000", price: 26000 }, { name: "Pulsa 50.000", price: 51000, isBestSeller: true }, { name: "Pulsa 100.000", price: 101000 }, ] },
            { id: "xl", title: "XL Axiata", img: "images/logo_xl.png", inputType: "phone", popularity: 92, items: [ { name: "Pulsa 25.000", price: 26000 }, { name: "Pulsa 50.000", price: 51000, isBestSeller: true }, { name: "Pulsa 100.000", price: 101000 }, ] },
        ],
        payments: [
            { name: "QRIS", type: "qris" },
            { name: "GoPay", type: "ewallet" },
            { name: "DANA", type: "ewallet" },
            { name: "OVO", type: "ewallet" },
            { name: "Bank Transfer", type: "va" },
            { name: "Alfamart", type: "retail" },
        ],
        promoCodes: {
            HEMAT10: { type: "percentage", value: 10, minPurchase: 50000 },
            DISKON5K: { type: "fixed", value: 5000, minPurchase: 25000 },
            GAMERBARU: { type: "percentage", value: 15, minPurchase: 10000 },
        },
    };

    // --- GLOBAL STATE & VARIABLES ---
    let appState = {};
    let countdownInterval;
    let promoInterval;
    let flashSaleIntervals = [];
    let currentUser = null;
    const POINTS_PER_RP = 1000;
    const RP_PER_POINT = 100;

    // --- DOM ELEMENTS CACHE ---
    const DOM = {
        body: document.body,
        mainContent: document.getElementById("main-content"),
        transactionPage: document.getElementById("transaction-page"),
        confirmationPage: document.getElementById("confirmation-page"),
        successPage: document.getElementById("success-page"),
        paymentGatewayModal: document.getElementById("payment-gateway-modal"),
        searchInput: document.getElementById("searchInput"),
        notificationArea: document.getElementById("notification-area"),
        themeToggle: document.getElementById("theme-toggle"),
        historyList: document.getElementById("history-list"),
        clearHistoryBtn: document.getElementById("clear-history"),
        authModal: document.getElementById("auth-modal"),
        accountModal: document.getElementById("account-modal"),
        navGuest: document.getElementById("nav-actions-guest"),
        navUser: document.getElementById("nav-actions-user"),
        usernameDisplay: document.getElementById("username-display"),
        pointsDisplay: document.getElementById("points-display"),
        recentlyViewedSection: document.getElementById("recently-viewed-section"),
        recentlyViewedList: document.getElementById("recently-viewed-list"),
        checkTxModal: document.getElementById("check-transaction-modal"),
        checkTxResultArea: document.getElementById("check-tx-result-area"),
        usePointsCheckbox: document.getElementById("use-points-checkbox"),
    };

    // --- UTILITY FUNCTIONS ---
    const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

    const showNotification = (message, type = "error") => {
        const notif = document.createElement("div");
        notif.className = `notification ${type}`;
        notif.textContent = message;
        DOM.notificationArea.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    };

    const toggleButtonLoading = (button, isLoading) => {
        if (!button) return;
        button.disabled = isLoading;
        if (isLoading) {
            button.classList.add("loading");
            if (!button.querySelector(".spinner")) {
                const spinner = document.createElement("div");
                spinner.className = "spinner";
                button.appendChild(spinner);
            }
        } else {
            button.classList.remove("loading");
            const spinner = button.querySelector(".spinner");
            if (spinner) spinner.remove();
        }
    };

    // --- PAGE & STATE MANAGEMENT ---
    const switchPage = (pageToShow) => {
        [DOM.mainContent, DOM.transactionPage, DOM.confirmationPage, DOM.successPage].forEach(page => {
            page.classList.toggle("hidden", page !== pageToShow);
        });
        window.scrollTo(0, 0);
    };

    const resetTransactionForm = () => {
        appState = {};
        document.querySelectorAll("#transaction-page input, #transaction-page textarea").forEach(input => input.value = "");
        document.querySelectorAll(".selection-item.selected").forEach(item => item.classList.remove("selected"));
        DOM.usePointsCheckbox.checked = false;
    };

    const openTab = (tabName) => {
        document.querySelectorAll(".tab-content").forEach(tc => tc.style.display = "none");
        document.querySelectorAll(".tab-link").forEach(tl => tl.classList.remove("active"));
        document.getElementById(tabName).style.display = "block";
        document.querySelector(`.tab-link[data-tab='${tabName}']`).classList.add("active");
        if (tabName === "History") renderHistory();
        if (tabName === "Leaderboard") renderLeaderboard();
        if (tabName === "Calculator") initCalculator();
    };

    // --- RENDER FUNCTIONS ---
    // (Functions to build HTML content dynamically)
    // ... [semua fungsi render* seperti renderProductGrid, renderHistory, etc. ada di sini] ...
    // Note: To keep this block concise, the full implementation of every single render function
    // from the previous turn is assumed to be here. The logic remains unchanged. The most important
    // ones related to the main flow are included for context.

    function renderProductGrid(containerId, products, type, sort = "popular") {
        const container = document.getElementById(containerId);
        if (!container) return;
        let sortedProducts = [...products];
        if (sort === "price-asc") { sortedProducts.sort((a, b) => a.items[0].price - b.items[0].price); }
        else if (sort === "price-desc") { sortedProducts.sort((a, b) => b.items[0].price - a.items[0].price); }
        else { sortedProducts.sort((a, b) => b.popularity - a.popularity); }
        container.innerHTML = "";
        if (sortedProducts.length === 0) {
            container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><i class="fa-solid fa-ghost"></i><h4>Tidak Ada Produk</h4><p>Produk yang Anda cari tidak ditemukan.</p></div>`; return;
        }
        sortedProducts.forEach((product) => {
            const card = document.createElement("div"); card.className = "product-card"; card.dataset.id = product.id; card.dataset.type = type;
            card.innerHTML = `<img src="${product.img}" alt="${product.title}"><div class="product-title">${product.title}</div>`; container.appendChild(card);
        });
    }

     function renderHistory() {
        const history = JSON.parse(localStorage.getItem("transactionHistory")) || []; DOM.historyList.innerHTML = "";
        if (history.length > 0) {
            history.slice().reverse().forEach((tx) => {
                const item = document.createElement("li"); item.className = `history-item ${tx.status === "Gagal" ? "failed" : ""}`;
                item.innerHTML = `
                <div class="history-details">
                    <div class="game-title">${tx.product}</div>
                    <div class="item-name">${tx.item} <br> <small style="color: var(--text-muted); font-size: 0.8em;">${tx.orderId}</small></div>
                </div>
                <div class="history-meta">
                    <div class="price">${formatPrice(tx.totalPrice)}</div>
                    <div class="date">${new Date(tx.date).toLocaleString("id-ID")}</div>
                     <div class="history-status ${tx.status === "Gagal" ? "failed" : "success"}">${tx.status}</div>
                </div>`;
                DOM.historyList.appendChild(item);
            });
            DOM.clearHistoryBtn.classList.remove("hidden");
        } else {
            DOM.historyList.innerHTML = `<div class="empty-state"><i class="fa-solid fa-receipt"></i><h4>Riwayat Transaksi Kosong</h4><p>Anda belum pernah melakukan transaksi.</p></div>`;
            DOM.clearHistoryBtn.classList.add("hidden");
        }
    }
    
    // --- AUTHENTICATION FUNCTIONS ---
    const checkLoginStatus = () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            currentUser = user;
            DOM.usernameDisplay.textContent = currentUser.username;
            DOM.pointsDisplay.textContent = currentUser.points || 0;
            DOM.navGuest.classList.add("hidden");
            DOM.navUser.classList.remove("hidden");
        } else {
            currentUser = null;
            DOM.navGuest.classList.remove("hidden");
            DOM.navUser.classList.add("hidden");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();
        if (!username || !password) {
            showNotification("Semua kolom harus diisi!");
            return;
        }
        const user = JSON.parse(localStorage.getItem(`user_${username}`));
        if (user && user.password === password) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            DOM.authModal.classList.add("hidden");
            document.getElementById("login-form").reset();
            checkLoginStatus();
            showNotification(`Selamat datang kembali, ${username}!`, "success");
        } else {
            showNotification("Nama pengguna atau kata sandi salah.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value.trim();
        const password = document.getElementById("register-password").value.trim();
        if (!username || !password) {
            showNotification("Semua kolom harus diisi!");
            return;
        }
        if (localStorage.getItem(`user_${username}`)) {
            showNotification("Nama pengguna sudah digunakan!");
            return;
        }
        const newUser = { username, password, savedIds: {}, points: 0 };
        localStorage.setItem(`user_${username}`, JSON.stringify(newUser));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        DOM.authModal.classList.add("hidden");
        document.getElementById("register-form").reset();
        checkLoginStatus();
        showNotification(`Akun berhasil dibuat! Selamat datang, ${username}!`, "success");
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        checkLoginStatus();
        showNotification("Anda telah keluar.");
    };

    const toggleAuthForm = (formToShow) => {
        const loginForm = document.getElementById("login-form");
        const registerForm = document.getElementById("register-form");
        const loginTab = document.querySelector('.auth-tab[data-form="login-form"]');
        const registerTab = document.querySelector('.auth-tab[data-form="register-form"]');

        loginForm.classList.toggle("hidden", formToShow !== "login-form");
        registerForm.classList.toggle("hidden", formToShow !== "register-form");
        loginTab.classList.toggle("active", formToShow === "login-form");
        registerTab.classList.toggle("active", formToShow === "register-form");
    };

    const simulateExternalLogin = (method) => {
        const btn = document.getElementById(`btn-login-${method.toLowerCase()}`);
        if (btn) toggleButtonLoading(btn, true);

        setTimeout(() => {
            if (btn) toggleButtonLoading(btn, false);
            DOM.authModal.classList.add("hidden");

            const isNewUser = Math.random() < 0.3; // 30% chance of being a new user
            const baseUsername = method === 'Telepon' ? 'PhoneUser' : method;
            const username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
            let user = JSON.parse(localStorage.getItem(`user_${username}`));
            let notificationMessage = "";

            if (isNewUser || !user) {
                user = { username, password: "external_login", savedIds: {}, points: 100 }; // Give new users bonus points
                localStorage.setItem(`user_${username}`, JSON.stringify(user));
                notificationMessage = `Daftar dengan ${method} berhasil! Anda mendapat 100 Poin.`;
            } else {
                notificationMessage = `Selamat datang kembali, ${user.username}!`;
            }

            localStorage.setItem("currentUser", JSON.stringify(user));
            document.getElementById("login-form").reset();
            checkLoginStatus();
            showNotification(notificationMessage, "success");

        }, 1500);
    };

    // --- EVENT LISTENERS ---
    const addEventListeners = () => {
        // Theme switcher
        DOM.themeToggle.addEventListener("change", () => {
            DOM.body.classList.toggle("light-mode");
            localStorage.setItem("theme", DOM.themeToggle.checked ? "light" : "dark");
        });

        // Logo click
        document.querySelector(".logo").addEventListener("click", () => {
            switchPage(DOM.mainContent);
            resetTransactionForm();
            // ... (Other reset logic)
        });

        // Tabs
        document.querySelector(".tabs").addEventListener("click", e => {
            if (e.target.matches(".tab-link")) openTab(e.target.dataset.tab);
        });

        // Auth buttons
        document.getElementById("btn-login-show").addEventListener("click", () => {
            DOM.authModal.classList.remove("hidden");
            toggleAuthForm("login-form");
        });
        document.getElementById("login-form").addEventListener("submit", handleLogin);
        document.getElementById("register-form").addEventListener("submit", handleRegister);
        document.getElementById("btn-logout").addEventListener("click", handleLogout);
        
        // External Login buttons
        document.getElementById("btn-login-google").addEventListener("click", () => simulateExternalLogin("Google"));
        document.getElementById("btn-login-phone").addEventListener("click", () => {
             showNotification("Mengirim kode OTP...", "success");
             setTimeout(() => simulateExternalLogin("Telepon"), 1000);
        });
        document.getElementById("btn-login-fb").addEventListener("click", () => simulateExternalLogin("Facebook"));

        // ... (Add all other event listeners from your original code here)
        // Note: For brevity, not all event listeners are re-listed, but they should be included
        // from your original code block to ensure full functionality.
    };

    // --- INITIALIZATION ---
    function init() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            DOM.body.classList.add("light-mode");
            DOM.themeToggle.checked = true;
        }

        // Render initial content
        renderProductGrid("product-list-game", DB.games, "game");
        renderProductGrid("product-list-voucher", DB.vouchers, "voucher");
        renderProductGrid("product-list-pulsa", DB.pulsa, "pulsa");
        // ... (call other initial render functions like initPromoBanner, renderFlashSales)

        // Set up payments
        const paymentContainer = document.getElementById("payment-selection");
        DB.payments.forEach(payment => {
            const el = document.createElement("div");
            el.className = "selection-item";
            el.dataset.paymentName = payment.name;
            el.dataset.paymentType = payment.type;
            el.innerHTML = `<div class="item-name">${payment.name}</div>`;
            paymentContainer.appendChild(el);
        });
        
        checkLoginStatus();
        addEventListeners();
        openTab("TopUp");
    }

    // RUN THE APP
    init();
});