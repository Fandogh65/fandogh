// ============================================
// 🌰 فندق - اپلیکیشن کامل با سیستم سکه و قفل درس
// ============================================

// ===== داده‌های درس‌ها =====
const LESSONS_DATA = [
    {
        id: 1,
        icon: '🇰🇷',
        title: 'آشنایی با هانگول',
        category: 'درسی • سالم و احوالپرسی',
        description: 'یادگیری الفبای کره‌ای',
        level: 'مقدماتی',
        content: 'الفبای کره‌ای (هانگول) در سال ۱۴۴۳ ساخته شد.\nشامل ۲۴ حرف است.\n\nحروف بی‌صدا: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ\nحروف صدادار: ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ'
    },
    {
        id: 2,
        icon: '💬',
        title: 'مکالمه روزمره',
        category: 'درسی • معرفی خود',
        description: 'صحبت کردن در موقعیت‌های روزمره',
        level: 'مقدماتی',
        content: 'سلام = 안녕하세요 (آن‌نیونگ‌هاسه‌یو)\nمتشکرم = 감사합니다 (کام‌سا‌هام‌نیدا)\nمتاسفم = 죄송합니다 (چوئه‌سونگ‌هام‌نیدا)\nاسم من ... است = 제 이름은 ... 입니다'
    },
    {
        id: 3,
        icon: '📖',
        title: 'گرامر پایه',
        category: 'درسی • خانواده',
        description: 'ساخت جمله‌های ساده کره‌ای',
        level: 'متوسط',
        content: 'ترتیب جمله در کره‌ای:\nفاعل + مفعول + فعل\n\nمثال:\n나는 사과를 먹어요\n(من + سیب + میخورم)'
    },
    {
        id: 4,
        icon: '📅',
        title: 'روزها و تاریخ',
        category: 'درسی • روزها و تاریخ',
        description: 'روزهای هفته و تاریخ‌ها',
        level: 'متوسط',
        content: 'روزهای هفته به کره‌ای:\n일요일 = یک‌شنبه\n월요일 = دوشنبه\n화요일 = سه‌شنبه\n수요일 = چهارشنبه\n목요일 = پنج‌شنبه\n금요일 = جمعه\n토요일 = شنبه'
    },
    {
        id: 5,
        icon: '🕐',
        title: 'ساعت و زمان',
        category: 'درسی • ساعت و زمان',
        description: 'گفتن ساعت و زمان',
        level: 'پیشرفته',
        content: 'گفتن ساعت:\n1시 = ساعت ۱\n2시 = ساعت ۲\n3시 = ساعت ۳\n\nگفتن دقیقه:\n30분 = ۳۰ دقیقه\n3시 30분 = ساعت ۳ و ۳۰ دقیقه'
    },
    {
        id: 6,
        icon: '🛍️',
        title: 'خرید کردن',
        category: 'درسی • خرید کردن',
        description: 'مکالمات هنگام خرید',
        level: 'پیشرفته',
        content: 'قیمتش چنده؟ = 얼마예요؟ (ئول‌ما‌یه‌یو؟)\nگرونه = 비싸요 (پی‌سا‌یو)\nارزونه = 싸요 (سا‌یو)\nلطفاً به من بدهید = 주세요 (چو‌سه‌یو)'
    }
];

// ===== قیمت‌های پیش‌فرض درس‌ها =====
const DEFAULT_PRICES = {
    1: 0, // درس اول رایگان
    2: 0, // درس دوم رایگان
    3: 0, // درس سوم رایگان
    4: 100, // درس چهارم ۱۰۰ سکه
    5: 100, // درس پنجم ۱۰۰ سکه
    6: 100  // درس ششم ۱۰۰ سکه
};

// ===== ذخیره‌سازی =====
const DB = {
    get(key, def) {
        try { return JSON.parse(localStorage.getItem(key)) || def } catch { return def }
    },
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    }
};

// ===== نمایش پیام =====
function showToast(msg, type = 'info') {
    const old = document.querySelector('.toast-message');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: ${type === 'success' ? '#21d4c3' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: ${type === 'success' ? '#06121f' : '#fff'};
        padding: 14px 28px; border-radius: 14px; font-family: 'Vazirmatn', sans-serif;
        font-size: 14px; font-weight: 600; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        z-index: 9999; max-width: 90%; text-align: center; direction: rtl;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// سیستم سکه و قفل درس
// ============================================

// ===== به‌روزرسانی سکه در هدر =====
function updateCoinDisplay() {
    const coins = DB.get('coins', 0);
    const coinDisplay = document.getElementById('headerCoinCount');
    if (coinDisplay) {
        coinDisplay.textContent = coins;
    }
    const profileCoins = document.getElementById('profileCoins');
    if (profileCoins) {
        profileCoins.textContent = coins;
    }
}

// ===== دریافت قیمت درس =====
function getLessonPrice(lessonId) {
    const prices = DB.get('lessonPrices', DEFAULT_PRICES);
    return prices[lessonId] !== undefined ? prices[lessonId] : 100;
}

// ===== بررسی قفل بودن درس =====
function isLessonLocked(lessonId) {
    const price = getLessonPrice(lessonId);
    if (price === 0) return false; // رایگان
    
    const unlockedLessons = DB.get('unlockedLessons', []);
    return !unlockedLessons.includes(lessonId);
}

// ===== باز کردن درس با سکه =====
function unlockLesson(lessonId) {
    const price = getLessonPrice(lessonId);
    if (price === 0) {
        showToast('✅ این درس رایگان است!', 'info');
        return false;
    }
    
    const coins = DB.get('coins', 0);
    
    if (coins < price) {
        showToast(`⚠️ برای باز کردن این درس به ${price} سکه نیاز داری!`, 'error');
        return false;
    }
    
    if (confirm(`آیا می‌خوای ${price} سکه برای باز کردن این درس پرداخت کنی؟`)) {
        const newCoins = coins - price;
        DB.set('coins', newCoins);
        
        const unlockedLessons = DB.get('unlockedLessons', []);
        if (!unlockedLessons.includes(lessonId)) {
            unlockedLessons.push(lessonId);
            DB.set('unlockedLessons', unlockedLessons);
        }
        
        updateCoinDisplay();
        showToast(`✅ درس با موفقیت باز شد!`, 'success');
        renderLessons();
        renderAllLessons();
        return true;
    }
    return false;
}

// ============================================
// توابع رندر درس‌ها با قفل
// ============================================

function renderLessons() {
    const container = document.getElementById('lessonsContainer');
    if (!container) return;
    const lessons = DB.get('lessons', LESSONS_DATA);
    const progress = DB.get('progress', {});
    let html = '';
    
    lessons.slice(0, 3).forEach(lesson => {
        const p = progress[lesson.id] || 0;
        const locked = isLessonLocked(lesson.id);
        const price = getLessonPrice(lesson.id);
        
        html += `
            <div class="lesson-card ${locked ? 'locked' : ''}" data-lesson-id="${lesson.id}">
                ${locked ? `<div class="lock-overlay">🔒</div>` : ''}
                <div class="lesson-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p class="lesson-category">📘 ${lesson.category}</p>
                ${!locked ? `
                    <div class="progress">
                        <div class="progress-bar" style="width: ${p}%;"></div>
                    </div>
                    <div class="progress-info">
                        <span>${p === 100 ? '✅ تکمیل شده' : p > 0 ? 'در حال پیشرفت' : 'شروع نشده'}</span>
                        <span>${p}%</span>
                    </div>
                    <button class="primary-btn lesson-btn" onclick="openLesson(${lesson.id})">
                        ${p === 100 ? '📝 مرور درس' : 'ورود به درس'}
                    </button>
                ` : `
                    <div class="lesson-price">🔒 ${price} سکه برای باز کردن</div>
                    <button class="unlock-btn" onclick="unlockLesson(${lesson.id})">
                        🪙 باز کردن با ${price} سکه
                    </button>
                `}
            </div>
        `;
    });
    container.innerHTML = html;
    updateStats();
    updateCoinDisplay();
}

function renderAllLessons() {
    const container = document.getElementById('allLessonsContainer');
    if (!container) return;
    const lessons = DB.get('lessons', LESSONS_DATA);
    const progress = DB.get('progress', {});
    let html = '';
    let totalProgress = 0;
    
    lessons.forEach(lesson => {
        const p = progress[lesson.id] || 0;
        totalProgress += p;
        const locked = isLessonLocked(lesson.id);
        const price = getLessonPrice(lesson.id);
        
        html += `
            <div class="lesson-card ${locked ? 'locked' : ''}" data-lesson-id="${lesson.id}">
                ${locked ? `<div class="lock-overlay">🔒</div>` : ''}
                <div class="lesson-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p class="lesson-category">📘 ${lesson.category}</p>
                <p style="font-size:12px;color:#7f8da5;margin-bottom:12px;">${lesson.description}</p>
                ${!locked ? `
                    <div class="progress">
                        <div class="progress-bar" style="width: ${p}%;"></div>
                    </div>
                    <div class="progress-info">
                        <span>${p === 100 ? '✅ تکمیل شده' : p > 0 ? 'در حال پیشرفت' : 'شروع نشده'}</span>
                        <span>${p}%</span>
                    </div>
                    <button class="primary-btn lesson-btn" onclick="openLesson(${lesson.id})">
                        ${p === 100 ? '📝 مرور درس' : 'ورود به درس'}
                    </button>
                ` : `
                    <div class="lesson-price">🔒 ${price} سکه برای باز کردن</div>
                    <button class="unlock-btn" onclick="unlockLesson(${lesson.id})">
                        🪙 باز کردن با ${price} سکه
                    </button>
                `}
            </div>
        `;
    });
    container.innerHTML = html;

    const avg = lessons.length > 0 ? Math.round(totalProgress / lessons.length) : 0;
    const overallBar = document.getElementById('overallProgress');
    const overallText = document.getElementById('overallProgressText');
    if (overallBar) overallBar.style.width = avg + '%';
    if (overallText) overallText.textContent = avg + '%';
}

// ============================================
// مدیریت قیمت‌ها در پنل ادمین
// ============================================

function renderPriceSettings() {
    const container = document.getElementById('priceSettingsContainer');
    if (!container) return;
    
    const lessons = DB.get('lessons', LESSONS_DATA);
    const prices = DB.get('lessonPrices', DEFAULT_PRICES);
    
    let html = '';
    lessons.forEach(lesson => {
        const price = prices[lesson.id] !== undefined ? prices[lesson.id] : 100;
        const isFree = price === 0;
        html += `
            <div class="price-setting" data-lesson-id="${lesson.id}">
                <span class="lesson-title">${lesson.icon} ${lesson.title}</span>
                <label>قیمت (سکه)</label>
                <input type="number" class="price-input" data-lesson-id="${lesson.id}" value="${price}" min="0" step="10">
                <button class="toggle-free ${isFree ? 'free' : 'paid'}" data-lesson-id="${lesson.id}" onclick="toggleFreePrice(${lesson.id})">
                    ${isFree ? '✅ رایگان' : '💰 پولی'}
                </button>
            </div>
        `;
    });
    container.innerHTML = html;
}

function toggleFreePrice(lessonId) {
    const prices = DB.get('lessonPrices', DEFAULT_PRICES);
    const currentPrice = prices[lessonId] !== undefined ? prices[lessonId] : 100;
    
    if (currentPrice === 0) {
        prices[lessonId] = 100;
    } else {
        prices[lessonId] = 0;
    }
    
    DB.set('lessonPrices', prices);
    renderPriceSettings();
    showToast('✅ وضعیت قیمت تغییر کرد!', 'success');
}

function setupPriceSettings() {
    const saveBtn = document.getElementById('savePriceSettingsBtn');
    if (!saveBtn) return;
    
    renderPriceSettings();
    
    saveBtn.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.price-input');
        const prices = {};
        inputs.forEach(input => {
            const lessonId = parseInt(input.dataset.lessonId);
            const value = parseInt(input.value) || 0;
            prices[lessonId] = Math.max(0, value);
        });
        
        DB.set('lessonPrices', prices);
        showToast('✅ تنظیمات قیمت ذخیره شد!', 'success');
        renderPriceSettings();
        renderLessons();
        renderAllLessons();
    });
}

// ============================================
// بقیه توابع (openLesson, loadLessonDetail, ...)
// ============================================

function openLesson(lessonId) {
    if (isLessonLocked(lessonId)) {
        showToast('🔒 این درس قفل است! ابتدا آن را باز کنید.', 'error');
        return;
    }
    const lessons = DB.get('lessons', LESSONS_DATA);
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) {
        showToast('❌ درس پیدا نشد!', 'error');
        return;
    }
    DB.set('lastLesson', lessonId);
    window.location.href = `lesson-detail.html?id=${lessonId}`;
}

// ===== بقیه توابع (با تغییرات لازم) =====
// ... (بقیه کدهای قبلی با اضافه شدن updateCoinDisplay در جاهای مناسب)

// ===== بارگذاری پروفایل با سکه =====
function loadProfile() {
    const user = DB.get('user', { name: 'کاربر مهمان' });
    const progress = DB.get('progress', {});
    const completed = Object.values(progress).filter(p => p === 100).length;
    const currentUser = DB.get('currentUser', null);

    const displayName = currentUser || user.name;
    const status = currentUser ? 'کاربر عضو' : 'ثبت‌نام نشده';

    document.getElementById('profileName').textContent = displayName;
    document.getElementById('headerUsername').textContent = displayName;
    document.getElementById('headerUserStatus').textContent = status;
    document.getElementById('profileStatus').textContent = status;
    document.getElementById('profileCompleted').textContent = completed;
    document.getElementById('profileStreak').textContent = DB.get('stats', { streak: 0 }).streak || 0;
    document.getElementById('profileHours').textContent = (DB.get('stats', { hours: 0 }).hours || 0) + ' ساعت';
    document.getElementById('profileCoins').textContent = DB.get('coins', 0);
    document.getElementById('nameInput').value = displayName;

    // ... بقیه کدهای saveNameBtn و resetAllBtn
}

// ===== راه‌اندازی اولیه =====
document.addEventListener('DOMContentLoaded', function() {
    // ... کدهای قبلی
    
    // تنظیمات قیمت در ادمین
    if (window.location.pathname.includes('admin.html')) {
        setupPriceSettings();
    }
    
    updateCoinDisplay();
});