// ============================================
// 🌰 فندق - نسخه کامل نهایی (رفع مشکل باز کردن درس + ویرایش با مودال)
// ============================================

// ===== داده‌های درس‌ها =====
var LESSONS_DATA = [
    { id: 1, icon: '🇰🇷', title: 'آشنایی با هانگول', category: 'درسی • سالم و احوالپرسی', description: 'یادگیری الفبای کره‌ای', level: 'مقدماتی', content: 'الفبای کره‌ای (هانگول) در سال ۱۴۴۳ ساخته شد.' },
    { id: 2, icon: '💬', title: 'مکالمه روزمره', category: 'درسی • معرفی خود', description: 'صحبت کردن در موقعیت‌های روزمره', level: 'مقدماتی', content: 'سلام = 안녕하세요، متشکرم = 감사합니다' },
    { id: 3, icon: '📖', title: 'گرامر پایه', category: 'درسی • خانواده', description: 'ساخت جمله‌های ساده کره‌ای', level: 'متوسط', content: 'ترتیب جمله: فاعل + مفعول + فعل' },
    { id: 4, icon: '📅', title: 'روزها و تاریخ', category: 'درسی • روزها و تاریخ', description: 'روزهای هفته و تاریخ‌ها', level: 'متوسط', content: 'یک‌شنبه = 일요일، دوشنبه = 월요일' },
    { id: 5, icon: '🕐', title: 'ساعت و زمان', category: 'درسی • ساعت و زمان', description: 'گفتن ساعت و زمان', level: 'پیشرفته', content: 'ساعت ۱ = 1시، ساعت ۳:۳۰ = 3시 30분' },
    { id: 6, icon: '🛍️', title: 'خرید کردن', category: 'درسی • خرید کردن', description: 'مکالمات هنگام خرید', level: 'پیشرفته', content: 'قیمتش چنده؟ = 얼마예요؟' }
];

// ===== قیمت‌های پیش‌فرض =====
var DEFAULT_PRICES = { 1: 0, 2: 0, 3: 0, 4: 100, 5: 100, 6: 100 };

// ===== ذخیره‌سازی =====
function getData(key, def) {
    try { var data = localStorage.getItem(key); return data ? JSON.parse(data) : def; } catch(e) { return def; }
}
function setData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

// ===== پیام =====
function showToast(msg, type) {
    var old = document.querySelector('.toast-message');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.className = 'toast-message';
    var bg = type === 'success' ? '#2dd4bf' : type === 'error' ? '#ef4444' : '#3b82f6';
    var color = type === 'success' ? '#0a0e1a' : '#fff';
    toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:' + bg + ';color:' + color + ';padding:14px 28px;border-radius:14px;font-family:Vazirmatn,sans-serif;font-size:14px;font-weight:600;box-shadow:0 10px 40px rgba(0,0,0,0.5);z-index:9999;max-width:90%;text-align:center;direction:rtl;';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 3000);
}

// ===== قیمت درس =====
function getLessonPrice(id) {
    var prices = getData('lessonPrices', DEFAULT_PRICES);
    return prices[id] !== undefined ? prices[id] : 100;
}

// ===== قفل بودن =====
function isLessonLocked(id) {
    var price = getLessonPrice(id);
    if (price === 0) return false;
    var unlocked = getData('unlockedLessons', []);
    return unlocked.indexOf(id) === -1;
}

// ============================================
// تابع باز کردن درس (اصلاح شده با دیباگ کامل)
// ============================================
function unlockLesson(id) {
    console.log('🔓 ===== شروع باز کردن درس =====');
    console.log('📚 ID درس:', id);
    
    // ۱. دریافت قیمت درس
    var price = getLessonPrice(id);
    console.log('💰 قیمت درس:', price);
    
    if (price === 0) {
        showToast('✅ این درس رایگان است!', 'info');
        return false;
    }
    
    // ۲. دریافت سکه کاربر
    var coins = getData('coins', 0);
    console.log('🪙 سکه فعلی:', coins);
    
    if (coins < price) {
        showToast('⚠️ به ' + price + ' سکه نیاز داری! (داری: ' + coins + ')', 'error');
        return false;
    }
    
    // ۳. تأیید کاربر
    if (!confirm('آیا می‌خوای ' + price + ' سکه پرداخت کنی؟')) {
        console.log('❌ کاربر انصراف داد');
        return false;
    }
    
    // ۴. کسر سکه
    var newCoins = coins - price;
    setData('coins', newCoins);
    console.log('✅ سکه جدید:', newCoins);
    
    // ۵. باز کردن درس
    var unlocked = getData('unlockedLessons', []);
    console.log('📋 لیست درس‌های باز شده قبلی:', unlocked);
    
    if (unlocked.indexOf(id) === -1) {
        unlocked.push(id);
        setData('unlockedLessons', unlocked);
        console.log('✅ درس با ID ' + id + ' به لیست بازشده اضافه شد.');
    } else {
        console.log('ℹ️ درس قبلاً باز شده بود.');
    }
    
    // ۶. ذخیره آخرین درس
    setData('lastLesson', id);
    
    // ۷. به‌روزرسانی نمایش
    updateCoinDisplay();
    showToast('✅ درس باز شد!', 'success');
    
    // ۸. رندر مجدد (مهم!)
    var container1 = document.getElementById('lessonsContainer');
    var container2 = document.getElementById('allLessonsContainer');
    
    if (container1) {
        console.log('🔄 رندر مجدد lessonsContainer');
        renderLessons();
    }
    if (container2) {
        console.log('🔄 رندر مجدد allLessonsContainer');
        renderAllLessons();
    }
    
    // ۹. نمایش پیام موفقیت
    alert('✅ درس با موفقیت باز شد! حالا می‌تونی وارد درس بشی.');
    
    return true;
}

// ===== نمایش سکه =====
function updateCoinDisplay() {
    var coins = getData('coins', 0);
    var el = document.getElementById('headerCoinCount');
    if (el) el.textContent = coins;
}

// ===== باز کردن درس =====
function openLesson(id) {
    if (isLessonLocked(id)) { 
        showToast('🔒 این درس قفل است!', 'error'); 
        return; 
    }
    var lessons = getData('lessons', LESSONS_DATA);
    var lesson = lessons.find(function(l) { return l.id === id; });
    if (!lesson) { 
        showToast('❌ درس پیدا نشد!', 'error'); 
        return; 
    }
    setData('lastLesson', id);
    window.location.href = 'lesson-detail.html?id=' + id;
}

// ============================================
// رندر درس‌ها (با دکمه‌های اصلاح‌شده)
// ============================================
function renderLessons() {
    var container = document.getElementById('lessonsContainer');
    if (!container) return;
    var lessons = getData('lessons', LESSONS_DATA);
    var progress = getData('progress', {});
    var html = '';
    for (var i = 0; i < Math.min(lessons.length, 3); i++) {
        var lesson = lessons[i];
        var p = progress[lesson.id] || 0;
        var locked = isLessonLocked(lesson.id);
        var price = getLessonPrice(lesson.id);
        html += '<div class="lesson-card' + (locked ? ' locked' : '') + '">';
        if (locked) html += '<div class="lock-overlay">🔒</div>';
        html += '<div class="lesson-icon">' + lesson.icon + '</div><h3>' + lesson.title + '</h3><p class="lesson-category">📘 ' + lesson.category + '</p>';
        if (!locked) {
            html += '<div class="progress"><div class="progress-bar" style="width:' + p + '%;"></div></div>';
            html += '<div class="progress-info"><span>' + (p === 100 ? '✅ تکمیل شده' : p > 0 ? 'در حال پیشرفت' : 'شروع نشده') + '</span><span>' + p + '%</span></div>';
            html += '<button class="primary-btn lesson-btn" data-lesson-id="' + lesson.id + '">' + (p === 100 ? '📝 مرور درس' : 'ورود به درس') + '</button>';
        } else {
            html += '<div class="lesson-price">🔒 ' + price + ' سکه</div>';
            html += '<button class="unlock-btn" data-lesson-id="' + lesson.id + '">🪙 باز کردن</button>';
        }
        html += '</div>';
    }
    container.innerHTML = html;
    attachLessonEvents();
    updateStats();
    updateCoinDisplay();
}

// ===== رندر همه درس‌ها =====
function renderAllLessons() {
    var container = document.getElementById('allLessonsContainer');
    if (!container) return;
    var lessons = getData('lessons', LESSONS_DATA);
    var progress = getData('progress', {});
    var html = '';
    var total = 0;
    for (var i = 0; i < lessons.length; i++) {
        var lesson = lessons[i];
        var p = progress[lesson.id] || 0;
        total += p;
        var locked = isLessonLocked(lesson.id);
        var price = getLessonPrice(lesson.id);
        html += '<div class="lesson-card' + (locked ? ' locked' : '') + '">';
        if (locked) html += '<div class="lock-overlay">🔒</div>';
        html += '<div class="lesson-icon">' + lesson.icon + '</div><h3>' + lesson.title + '</h3><p class="lesson-category">📘 ' + lesson.category + '</p><p style="font-size:12px;color:#7f8da5;margin-bottom:12px;">' + lesson.description + '</p>';
        if (!locked) {
            html += '<div class="progress"><div class="progress-bar" style="width:' + p + '%;"></div></div>';
            html += '<div class="progress-info"><span>' + (p === 100 ? '✅ تکمیل شده' : p > 0 ? 'در حال پیشرفت' : 'شروع نشده') + '</span><span>' + p + '%</span></div>';
            html += '<button class="primary-btn lesson-btn" data-lesson-id="' + lesson.id + '">' + (p === 100 ? '📝 مرور درس' : 'ورود به درس') + '</button>';
        } else {
            html += '<div class="lesson-price">🔒 ' + price + ' سکه</div>';
            html += '<button class="unlock-btn" data-lesson-id="' + lesson.id + '">🪙 باز کردن</button>';
        }
        html += '</div>';
    }
    container.innerHTML = html;
    attachLessonEvents();
    var avg = lessons.length > 0 ? Math.round(total / lessons.length) : 0;
    var bar = document.getElementById('overallProgress');
    var text = document.getElementById('overallProgressText');
    if (bar) bar.style.width = avg + '%';
    if (text) text.textContent = avg + '%';
}

// ============================================
// اتصال رویدادهای دکمه‌ها (روش جایگزین برای onclick)
// ============================================
function attachLessonEvents() {
    // دکمه‌های "باز کردن" (unlock)
    var unlockBtns = document.querySelectorAll('.unlock-btn');
    unlockBtns.forEach(function(btn) {
        btn.removeEventListener('click', handleUnlock);
        btn.addEventListener('click', handleUnlock);
    });
    
    // دکمه‌های "ورود به درس" (open)
    var lessonBtns = document.querySelectorAll('.lesson-btn');
    lessonBtns.forEach(function(btn) {
        btn.removeEventListener('click', handleOpenLesson);
        btn.addEventListener('click', handleOpenLesson);
    });
}

function handleUnlock(e) {
    var btn = e.currentTarget;
    var id = parseInt(btn.getAttribute('data-lesson-id'));
    console.log('🖱️ کلیک روی دکمه باز کردن برای درس ID:', id);
    if (!id) return;
    unlockLesson(id);
}

function handleOpenLesson(e) {
    var btn = e.currentTarget;
    var id = parseInt(btn.getAttribute('data-lesson-id'));
    console.log('🖱️ کلیک روی دکمه ورود به درس ID:', id);
    if (!id) return;
    openLesson(id);
}

// ===== به‌روزرسانی آمار =====
function updateStats() {
    var progress = getData('progress', {});
    var completed = 0;
    var keys = Object.keys(progress);
    for (var i = 0; i < keys.length; i++) { if (progress[keys[i]] === 100) completed++; }
    var lessons = getData('lessons', LESSONS_DATA);
    document.getElementById('statLessons').textContent = completed + ' / ' + lessons.length;
    document.getElementById('statStreak').textContent = getData('stats', { streak: 0 }).streak || 0;
    document.getElementById('statHours').textContent = (getData('stats', { hours: 0 }).hours || 0) + ' ساعت';
}

// ===== بارگذاری صفحه درس =====
function loadLessonDetail() {
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'));
    if (!id) { document.getElementById('lessonTitle').textContent = '❌ درس نامعتبر'; return; }
    var lessons = getData('lessons', LESSONS_DATA);
    var data = lessons.find(function(l) { return l.id === id; });
    if (!data) { document.getElementById('lessonTitle').textContent = '❌ درس پیدا نشد'; return; }
    document.getElementById('lessonTitle').textContent = '📖 ' + data.title;
    document.getElementById('lessonCategory').textContent = data.category;
    document.getElementById('lessonIcon').textContent = data.icon;
    document.getElementById('lessonFullTitle').textContent = data.title;
    document.getElementById('lessonDescription').textContent = data.description;
    document.getElementById('lessonText').innerHTML = '<p style="white-space:pre-wrap;word-wrap:break-word;">' + (data.content || 'محتوا در حال ویرایش...') + '</p>';
    var progress = getData('progress', {});
    var p = progress[id] || 0;
    document.getElementById('lessonProgressBar').style.width = p + '%';
    document.getElementById('lessonProgressText').textContent = p + '%';
    document.getElementById('markComplete').onclick = function() {
        var prog = getData('progress', {});
        prog[id] = 100;
        setData('progress', prog);
        document.getElementById('lessonProgressBar').style.width = '100%';
        document.getElementById('lessonProgressText').textContent = '۱۰۰%';
        showToast('🎉 تبریک!', 'success');
    };
    document.getElementById('resetProgress').onclick = function() {
        if (confirm('ریست کنم؟')) {
            var prog = getData('progress', {});
            prog[id] = 0;
            setData('progress', prog);
            document.getElementById('lessonProgressBar').style.width = '0%';
            document.getElementById('lessonProgressText').textContent = '۰%';
            showToast('🔄 ریست شد!', 'info');
        }
    };
}

// ============================================
// مدیریت کاربر (ورود/ثبت‌نام/پروفایل)
// ============================================

function updateUserHeader() {
    var user = getData('currentUser', null);
    var nameEl = document.getElementById('headerUsername');
    var statusEl = document.getElementById('headerUserStatus');
    var displayEl = document.getElementById('userDisplayName');
    if (nameEl) nameEl.textContent = user || 'کاربر مهمان';
    if (statusEl) statusEl.textContent = user ? 'کاربر عضو' : 'ثبت‌نام نشده';
    if (displayEl) displayEl.textContent = user || 'کاربر مهمان';
    var profileName = document.getElementById('profileName');
    var profileStatus = document.getElementById('profileStatus');
    if (profileName) profileName.textContent = user || 'کاربر مهمان';
    if (profileStatus) profileStatus.textContent = user ? 'کاربر عضو' : 'ثبت‌نام نشده';
    var nameInput = document.getElementById('nameInput');
    if (nameInput) nameInput.value = user || '';
}

function continueLastLesson() {
    var last = getData('lastLesson', null);
    if (last) { openLesson(last); } else { showToast('📚 هنوز درسی رو شروع نکردی!', 'info'); }
}

function updateAuthMenu() {
    var user = getData('currentUser', null);
    var loginItem = document.getElementById('loginMenuItem');
    var registerItem = document.getElementById('registerMenuItem');
    var logoutItem = document.getElementById('logoutMenuItem');
    var adminItem = document.getElementById('adminMenuItem');

    if (user) {
        if (loginItem) loginItem.style.display = 'none';
        if (registerItem) registerItem.style.display = 'none';
        if (logoutItem) logoutItem.style.display = 'flex';
        if (adminItem) {
            var users = getData('users', []);
            var found = users.find(function(u) { return u.username === user; });
            adminItem.style.display = (found && found.isAdmin) ? 'flex' : 'none';
        }
    } else {
        if (loginItem) loginItem.style.display = 'flex';
        if (registerItem) registerItem.style.display = 'flex';
        if (logoutItem) logoutItem.style.display = 'none';
        if (adminItem) adminItem.style.display = 'none';
    }
}

function logoutUser() {
    if (confirm('🚪 مطمئنی میخوای خارج بشی؟')) {
        setData('currentUser', null);
        showToast('👋 خارج شدید!', 'info');
        updateAuthMenu();
        updateUserHeader();
        setTimeout(function() { window.location.reload(); }, 500);
    }
}

function createAdminAccount() {
    var users = getData('users', []);
    var adminExists = users.some(function(u) { return u.username === 'admin'; });
    if (!adminExists) {
        users.push({
            username: 'admin',
            password: 'admin123',
            isAdmin: true,
            registeredAt: new Date().toISOString()
        });
        setData('users', users);
        console.log('✅ اکانت ادمین با موفقیت ایجاد شد!');
        console.log('👤 نام کاربری: admin');
        console.log('🔑 رمز عبور: admin123');
    } else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === 'admin') {
                users[i].isAdmin = true;
                break;
            }
        }
        setData('users', users);
    }
}

// ============================================
// پنل مدیریت - درس‌ها (با مودال ویرایش)
// ============================================

// ===== باز کردن مودال ویرایش =====
function openEditModal(index) {
    var lessons = getData('lessons', LESSONS_DATA);
    var l = lessons[index];
    if (!l) {
        showToast('❌ درس پیدا نشد!', 'error');
        return;
    }
    
    document.getElementById('editLessonIndex').value = index;
    document.getElementById('editTitle').value = l.title || '';
    document.getElementById('editIcon').value = l.icon || '📚';
    document.getElementById('editCategory').value = l.category || '';
    document.getElementById('editLevel').value = l.level || 'مقدماتی';
    document.getElementById('editDescription').value = l.description || '';
    document.getElementById('editContent').value = l.content || '';
    
    document.getElementById('editLessonModal').style.display = 'flex';
}

// ===== بستن مودال =====
function closeEditModal() {
    document.getElementById('editLessonModal').style.display = 'none';
}

// ===== ذخیره ویرایش =====
function saveEditLesson() {
    var index = parseInt(document.getElementById('editLessonIndex').value);
    var lessons = getData('lessons', LESSONS_DATA);
    var l = lessons[index];
    if (!l) {
        showToast('❌ درس پیدا نشد!', 'error');
        return;
    }
    
    var newTitle = document.getElementById('editTitle').value.trim();
    var newIcon = document.getElementById('editIcon').value.trim() || '📚';
    var newCategory = document.getElementById('editCategory').value.trim();
    var newLevel = document.getElementById('editLevel').value;
    var newDesc = document.getElementById('editDescription').value.trim();
    var newContent = document.getElementById('editContent').value.trim();
    
    if (!newTitle || !newCategory) {
        showToast('⚠️ عنوان و دسته‌بندی الزامی است!', 'error');
        return;
    }
    
    lessons[index] = {
        id: l.id,
        icon: newIcon,
        title: newTitle,
        category: newCategory,
        description: newDesc || 'توضیحی وارد نشده.',
        level: newLevel,
        content: newContent || 'محتوای در حال ویرایش...'
    };
    
    setData('lessons', lessons);
    renderAdminLessons();
    renderLessons();
    renderAllLessons();
    closeEditModal();
    showToast('✅ درس با موفقیت ویرایش شد!', 'success');
}

// ===== رندر درس‌ها در پنل مدیریت =====
function renderAdminLessons() {
    var container = document.getElementById('adminLessonsContainer');
    if (!container) return;
    var lessons = getData('lessons', LESSONS_DATA);
    if (lessons.length === 0) {
        container.innerHTML = '<p style="color:#7f8da5;text-align:center;padding:30px;">هیچ درسی وجود ندارد.</p>';
        return;
    }
    var html = '';
    for (var i = 0; i < lessons.length; i++) {
        var l = lessons[i];
        html += '<div class="admin-lesson-item" data-index="' + i + '">';
        html += '<div class="lesson-info">';
        html += '<span style="font-size:24px;">' + l.icon + '</span>';
        html += '<span><strong>' + l.title + '</strong></span>';
        html += '<span class="level-badge">' + (l.level || 'مقدماتی') + '</span>';
        html += '<span style="color:#7f8da5;font-size:12px;">' + l.category + '</span>';
        html += '</div>';
        html += '<div class="lesson-actions">';
        // استفاده از openEditModal به جای editLesson
        html += '<button class="btn-edit" onclick="openEditModal(' + i + ')">✏️ ویرایش</button>';
        html += '<button class="btn-delete" onclick="deleteLesson(' + i + ')">🗑️ حذف</button>';
        html += '</div>';
        html += '</div>';
    }
    container.innerHTML = html;
}

// ===== حذف درس =====
function deleteLesson(index) {
    if (!confirm('⚠️ مطمئنی این درس رو حذف کنی؟')) return;
    if (!confirm('‼️ آخرین تأیید؟')) return;
    var lessons = getData('lessons', LESSONS_DATA);
    var removed = lessons.splice(index, 1);
    setData('lessons', lessons);
    var progress = getData('progress', {});
    if (progress[removed[0].id]) { delete progress[removed[0].id]; setData('progress', progress); }
    var unlocked = getData('unlockedLessons', []);
    var newUnlocked = [];
    for (var i = 0; i < unlocked.length; i++) { if (unlocked[i] !== removed[0].id) newUnlocked.push(unlocked[i]); }
    setData('unlockedLessons', newUnlocked);
    renderAdminLessons();
    renderLessons();
    renderAllLessons();
    showToast('🗑️ درس حذف شد!', 'info');
}

// ===== افزودن درس جدید =====
function showAddLessonForm() {
    var form = document.getElementById('addLessonForm');
    if (form) form.style.display = 'block';
}
function hideAddLessonForm() {
    var form = document.getElementById('addLessonForm');
    if (form) form.style.display = 'none';
    document.getElementById('newLessonTitle').value = '';
    document.getElementById('newLessonIcon').value = '📚';
    document.getElementById('newLessonCategory').value = '';
    document.getElementById('newLessonDescription').value = '';
    document.getElementById('newLessonContent').value = '';
}

function saveNewLesson() {
    var title = document.getElementById('newLessonTitle').value.trim();
    var icon = document.getElementById('newLessonIcon').value.trim() || '📚';
    var category = document.getElementById('newLessonCategory').value.trim();
    var description = document.getElementById('newLessonDescription').value.trim();
    var level = document.getElementById('newLessonLevel').value;
    var content = document.getElementById('newLessonContent').value.trim();
    if (!title || !category) { showToast('⚠️ عنوان و دسته‌بندی الزامی است!', 'error'); return; }
    var lessons = getData('lessons', LESSONS_DATA);
    var newId = lessons.length + 1;
    lessons.push({ id: newId, icon: icon, title: title, category: category, description: description || 'توضیحی وارد نشده.', level: level, content: content || 'محتوای در حال ویرایش...' });
    setData('lessons', lessons);
    renderAdminLessons();
    hideAddLessonForm();
    showToast('✅ درس اضافه شد!', 'success');
    renderLessons();
    renderAllLessons();
}

// ============================================
// پنل مدیریت - قیمت‌ها
// ============================================

function renderPriceSettings() {
    var container = document.getElementById('priceSettingsContainer');
    if (!container) return;
    var lessons = getData('lessons', LESSONS_DATA);
    var prices = getData('lessonPrices', DEFAULT_PRICES);
    var html = '';
    for (var i = 0; i < lessons.length; i++) {
        var l = lessons[i];
        var price = prices[l.id] !== undefined ? prices[l.id] : 100;
        html += '<div class="price-setting"><span class="lesson-title">' + l.icon + ' ' + l.title + '</span><label>قیمت</label><input type="number" class="price-input" data-id="' + l.id + '" value="' + price + '" min="0" step="10"></div>';
    }
    container.innerHTML = html;
}

function savePrices() {
    var inputs = document.querySelectorAll('.price-input');
    var prices = {};
    inputs.forEach(function(input) { var id = parseInt(input.dataset.id); prices[id] = parseInt(input.value) || 0; });
    setData('lessonPrices', prices);
    showToast('✅ قیمت‌ها ذخیره شد!', 'success');
    renderAllLessons();
    renderLessons();
}

// ============================================
// پنل مدیریت - کاربران
// ============================================

function renderUsers() {
    var container = document.getElementById('usersListContainer');
    if (!container) return;
    var users = getData('users', []);
    var progress = getData('progress', {});
    var lessons = getData('lessons', LESSONS_DATA);
    var userCoins = getData('userCoins', {});
    if (users.length === 0) {
        container.innerHTML = '<p style="color:#7f8da5;text-align:center;padding:30px;">هیچ کاربری ثبت نام نکرده است.</p>';
        return;
    }
    var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-weight:700;color:#2dd4bf;font-size:13px;text-align:center;"><span>👤 نام کاربری</span><span>🪙 سکه</span><span>📚 درس‌ها</span><span>📖 آخرین درس</span></div>';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var username = user.username;
        var completed = 0;
        for (var key in progress) { if (progress[key] === 100) completed++; }
        var lastLesson = getData('lastLesson', null);
        var lastLessonTitle = 'ندارد';
        if (lastLesson) {
            for (var j = 0; j < lessons.length; j++) {
                if (lessons[j].id === lastLesson) { lastLessonTitle = lessons[j].title; break; }
            }
        }
        var coins = userCoins[username] || 0;
        html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.03);text-align:center;align-items:center;"><span style="color:#ffffff;font-weight:600;">' + username + (user.isAdmin ? ' ⭐' : '') + '</span><span style="color:#fbbf24;font-weight:700;">' + coins + '</span><span style="color:#4ade80;font-weight:600;">' + completed + ' / ' + lessons.length + '</span><span style="color:#7f8da5;font-size:13px;">' + lastLessonTitle + '</span></div>';
    }
    container.innerHTML = html;
}

// ============================================
// پنل مدیریت - پیام‌ها
// ============================================

function renderMessages() {
    var container = document.getElementById('messagesListContainer');
    if (!container) return;
    var messages = getData('supportMessages', []);
    if (messages.length === 0) {
        container.innerHTML = '<p style="color:#7f8da5;text-align:center;padding:20px;">هیچ پیامی وجود ندارد.</p>';
        return;
    }
    var html = '';
    for (var i = messages.length - 1; i >= 0; i--) {
        var m = messages[i];
        var statusColor = m.closed ? '#ef4444' : (m.replied ? '#4ade80' : '#fbbf24');
        var statusText = m.closed ? '🔒 بسته شده' : (m.replied ? '✅ پاسخ داده شده' : '⏳ در انتظار پاسخ');
        var ticketId = m.ticketId || (i + 1);
        html += '<div class="message-item" style="border-right:3px solid ' + statusColor + ';margin-bottom:15px;padding:15px;background:rgba(255,255,255,0.02);border-radius:10px;"><div class="message-header" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:5px;margin-bottom:6px;"><span class="sender" style="font-weight:700;color:#2dd4bf;">👤 ' + m.username + '</span><span style="font-size:11px;color:#7f8da5;">🆔 #' + ticketId + ' - ' + m.date + ' ' + (m.time || '') + '</span><span style="font-size:11px;color:' + statusColor + ';">' + statusText + '</span></div><div class="message-text" style="color:#c8d0dc;font-size:14px;padding:6px 0;">' + m.message + '</div>';
        if (m.replied && m.reply) {
            html += '<div style="margin-top:10px;padding:12px 15px;background:rgba(45,212,191,0.08);border-radius:8px;border-right:3px solid #2dd4bf;"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:5px;"><span style="color:#2dd4bf;font-size:13px;font-weight:600;">📩 پاسخ ادمین</span><span style="font-size:10px;color:#7f8da5;">' + (m.repliedAt || '') + '</span></div><div style="color:#c8d0dc;font-size:14px;margin-top:6px;">' + m.reply + '</div></div>';
        }
        if (m.closed) { html += '<div style="margin-top:6px;font-size:11px;color:#7f8da5;">🔒 بسته شده در: ' + (m.closedAt || '') + '</div>'; }
        html += '<div class="message-actions" style="margin-top:12px;">';
        if (!m.replied && !m.closed) {
            html += '<textarea id="replyText_' + i + '" placeholder="پاسخ خود را بنویس..." style="width:100%;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:#07152b;color:#fff;font-family:Vazirmatn,sans-serif;font-size:13px;resize:vertical;min-height:45px;"></textarea><button class="reply-btn" onclick="replyToMessage(' + i + ')" style="margin-top:6px;padding:6px 16px;border:none;border-radius:8px;background:#2dd4bf;color:#0a0e1a;font-family:Vazirmatn,sans-serif;font-weight:700;cursor:pointer;">📤 ارسال پاسخ</button>';
        } else if (!m.closed && m.replied) {
            html += '<button class="reply-btn" onclick="closeTicketFromAdmin(' + i + ')" style="margin-top:6px;padding:6px 16px;border:none;border-radius:8px;background:#ef4444;color:#fff;font-family:Vazirmatn,sans-serif;font-weight:700;cursor:pointer;">🔒 بستن تیکت</button>';
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

function replyToMessage(index) {
    var textarea = document.getElementById('replyText_' + index);
    if (!textarea) return;
    var reply = textarea.value.trim();
    if (!reply) { showToast('⚠️ متن پاسخ را بنویس!', 'error'); return; }
    var messages = getData('supportMessages', []);
    var actualIndex = messages.length - 1 - index;
    if (actualIndex < 0 || actualIndex >= messages.length) { showToast('❌ پیام پیدا نشد!', 'error'); return; }
    messages[actualIndex].reply = reply;
    messages[actualIndex].replied = true;
    messages[actualIndex].repliedAt = new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR');
    setData('supportMessages', messages);
    showToast('✅ پاسخ شما با موفقیت ارسال شد!', 'success');
    renderMessages();
}

function closeTicketFromAdmin(index) {
    if (!confirm('🔒 آیا مطمئنی میخوای این تیکت رو ببندی؟')) return;
    var messages = getData('supportMessages', []);
    var actualIndex = messages.length - 1 - index;
    if (actualIndex < 0 || actualIndex >= messages.length) { showToast('❌ تیکت پیدا نشد!', 'error'); return; }
    messages[actualIndex].closed = true;
    messages[actualIndex].closedAt = new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR');
    setData('supportMessages', messages);
    showToast('🔒 تیکت با موفقیت بسته شد!', 'success');
    renderMessages();
}

// ============================================
// پنل مدیریت - اعلان‌ها
// ============================================

function renderNotifications() {
    var container = document.getElementById('notificationsList');
    if (!container) return;
    var notifications = getData('notifications', []);
    if (notifications.length === 0) {
        container.innerHTML = '<p style="color:#7f8da5;text-align:center;padding:20px;">هیچ اعلانی منتشر نشده است.</p>';
        return;
    }
    var html = '';
    for (var i = notifications.length - 1; i >= 0; i--) {
        var n = notifications[i];
        var color = n.type === 'success' ? '#4ade80' : n.type === 'warning' ? '#fbbf24' : '#60a5fa';
        html += '<div class="notification-item" style="border-right-color:' + color + ';"><div class="notif-title" style="color:' + color + ';">' + n.title + '</div><div class="notif-text">' + n.text + '</div><div class="notif-date">' + n.date + ' - ' + n.time + '</div>' + (n.editedAt ? '<div style="font-size:10px;color:#7f8da5;margin-top:4px;">✏️ ویرایش شده: ' + n.editedAt + '</div>' : '') + '<div style="display:flex;gap:8px;margin-top:10px;"><button class="btn-edit" onclick="editNotification(' + i + ')">✏️ ویرایش</button><button class="btn-delete" onclick="deleteNotification(' + i + ')">🗑️ حذف</button></div></div>';
    }
    container.innerHTML = html;
}

function editNotification(index) {
    var notifications = getData('notifications', []);
    var n = notifications[index];
    if (!n) { showToast('❌ اعلان پیدا نشد!', 'error'); return; }
    var newTitle = prompt('عنوان جدید:', n.title);
    if (newTitle === null) return;
    if (!newTitle.trim()) { showToast('⚠️ عنوان نمی‌تواند خالی باشد!', 'error'); return; }
    var newText = prompt('متن جدید:', n.text);
    if (newText === null) return;
    if (!newText.trim()) { showToast('⚠️ متن نمی‌تواند خالی باشد!', 'error'); return; }
    var newType = prompt('نوع جدید (info/success/warning):', n.type);
    if (newType === null) return;
    if (!['info', 'success', 'warning'].includes(newType)) { showToast('⚠️ نوع باید info، success یا warning باشد!', 'error'); return; }
    notifications[index] = { title: newTitle.trim(), text: newText.trim(), type: newType, date: n.date, time: n.time, editedAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR') };
    setData('notifications', notifications);
    renderNotifications();
    setData('notificationsRead', false);
    showToast('✅ اعلان ویرایش شد!', 'success');
}

function deleteNotification(index) {
    if (!confirm('⚠️ مطمئنی میخوای این اعلان رو حذف کنی؟')) return;
    var notifications = getData('notifications', []);
    notifications.splice(index, 1);
    setData('notifications', notifications);
    renderNotifications();
    setData('notificationsRead', false);
    showToast('🗑️ اعلان حذف شد!', 'info');
}

function setupNotifications() {
    var publishBtn = document.getElementById('publishNotificationBtn');
    if (!publishBtn) return;
    renderNotifications();
    publishBtn.addEventListener('click', function() {
        var title = document.getElementById('notificationTitle').value.trim();
        var text = document.getElementById('notificationText').value.trim();
        var type = document.getElementById('notificationType').value;
        if (!title || !text) { showToast('⚠️ لطفاً عنوان و متن اعلان را وارد کن!', 'error'); return; }
        var notifications = getData('notifications', []);
        notifications.push({ title: title, text: text, type: type, date: new Date().toLocaleDateString('fa-IR'), time: new Date().toLocaleTimeString('fa-IR') });
        setData('notifications', notifications);
        setData('notificationsRead', false);
        document.getElementById('notificationTitle').value = '';
        document.getElementById('notificationText').value = '';
        renderNotifications();
        showToast('📢 اعلان با موفقیت منتشر شد!', 'success');
    });
}

function showTab(tab) {
    document.querySelectorAll('.admin-panel').forEach(function(el) { el.style.display = 'none'; });
    var panel = document.getElementById('tab-' + tab);
    if (panel) panel.style.display = 'block';
    document.querySelectorAll('.admin-tab').forEach(function(el) { el.classList.remove('active'); });
    var btns = document.querySelectorAll('.admin-tab');
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute('onclick') && btns[i].getAttribute('onclick').includes("'" + tab + "'")) {
            btns[i].classList.add('active');
        }
    }
    if (tab === 'lessons') renderAdminLessons();
    if (tab === 'prices') renderPriceSettings();
    if (tab === 'users') renderUsers();
    if (tab === 'messages') renderMessages();
    if (tab === 'notifications') renderNotifications();
}

// ============================================
// سکه رایگان (تبلیغات + گردونه)
// ============================================

function setupEarnCoinsPage() {
    var userCoinsDisplay = document.getElementById('userCoinsDisplay');
    var startAdBtn = document.getElementById('startAdBtn');
    var completeAdBtn = document.getElementById('completeAdBtn');
    var adMessage = document.getElementById('adMessage');
    var adCooldownSpan = document.getElementById('adCooldown');
    var spinChancesSpan = document.getElementById('spinChances');
    var spinBtn = document.getElementById('spinBtn');
    var spinResult = document.getElementById('spinResult');
    var canvas = document.getElementById('wheelCanvas');

    var prizes = [
        { label: '۵ سکه', value: 5, color: '#4ade80' },
        { label: '۱۵ سکه', value: 15, color: '#60a5fa' },
        { label: '۵۰ سکه', value: 50, color: '#fbbf24' },
        { label: '۱۰۰ سکه', value: 100, color: '#fb923c' },
        { label: '۲۰۰ سکه', value: 200, color: '#f472b6' },
        { label: 'پوچ', value: 0, color: '#9ca3af' }
    ];
    var weights = [25, 25, 20, 15, 5, 10];

    var STORAGE_KEY = 'adState_v2';
    var AD_DURATION = 45;
    var AD_COOLDOWN = 20 * 60;

    var saved = getData(STORAGE_KEY, null);
    var lastAdCompleteTime = saved ? saved.lastAdCompleteTime : 0;
    var adStartTime = saved ? saved.adStartTime : 0;
    var isAdWatching = saved ? saved.isAdWatching : false;
    var adTimeLeft = saved ? saved.adTimeLeft : AD_DURATION;
    var spinChances = saved ? saved.spinChances : 0;
    var watchCount = saved ? saved.watchCount : 0;

    function saveState() {
        var state = {
            lastAdCompleteTime: lastAdCompleteTime,
            adStartTime: adStartTime,
            isAdWatching: isAdWatching,
            adTimeLeft: adTimeLeft,
            spinChances: spinChances,
            watchCount: watchCount
        };
        setData(STORAGE_KEY, state);
    }

    function updateCoinsDisplay() {
        var coins = getData('coins', 0);
        if (userCoinsDisplay) userCoinsDisplay.textContent = coins;
        var headerCoin = document.getElementById('headerCoinCount');
        if (headerCoin) headerCoin.textContent = coins;
    }

    function addCoins(amount) {
        var coins = getData('coins', 0);
        setData('coins', coins + amount);
        updateCoinsDisplay();
        showToast('🪙 ' + amount + ' سکه اضافه شد!', 'success');
        saveState();
    }

    function updateSpinButton() {
        if (spinChancesSpan) spinChancesSpan.textContent = spinChances;
        if (spinBtn) {
            if (spinChances > 0) {
                spinBtn.disabled = false;
                spinBtn.textContent = '🎡 بچرخون (' + spinChances + ' شانس)';
                spinBtn.style.background = '#2dd4bf';
                spinBtn.style.color = '#0a0e1a';
                spinBtn.style.opacity = '1';
                spinBtn.style.cursor = 'pointer';
            } else {
                spinBtn.disabled = true;
                spinBtn.textContent = '🎡 بچرخون (۰ شانس)';
                spinBtn.style.background = '#555';
                spinBtn.style.color = '#fff';
                spinBtn.style.opacity = '0.6';
                spinBtn.style.cursor = 'not-allowed';
            }
        }
        saveState();
    }

    function updateUI() {
        var now = Date.now();
        var timeSinceLastComplete = (now - lastAdCompleteTime) / 1000;

        if (isAdWatching) {
            var elapsed = (now - adStartTime) / 1000;
            var remaining = Math.max(0, AD_DURATION - elapsed);
            adTimeLeft = Math.ceil(remaining);
            if (adTimeLeft <= 0) {
                isAdWatching = false;
                adTimeLeft = 0;
                if (startAdBtn) startAdBtn.disabled = true;
                if (completeAdBtn) {
                    completeAdBtn.disabled = false;
                    completeAdBtn.style.background = '#2dd4bf';
                    completeAdBtn.style.borderColor = '#2dd4bf';
                    completeAdBtn.style.color = '#0a0e1a';
                }
                if (adMessage) {
                    adMessage.textContent = '✅ تبلیغ تموم شد! دکمه اتمام رو بزن.';
                    adMessage.style.color = '#4ade80';
                }
                saveState();
                updateSpinButton();
            } else {
                if (startAdBtn) startAdBtn.disabled = true;
                if (completeAdBtn) {
                    completeAdBtn.disabled = true;
                    completeAdBtn.style.background = '#555';
                    completeAdBtn.style.borderColor = '#555';
                    completeAdBtn.style.color = '#fff';
                }
                if (adMessage) {
                    adMessage.textContent = '⏳ در حال پخش... (' + adTimeLeft + 's)';
                    adMessage.style.color = '#f59e0b';
                }
                setTimeout(function() { updateUI(); }, 1000);
            }
            return;
        }

        if (lastAdCompleteTime > 0 && timeSinceLastComplete < AD_COOLDOWN) {
            var remainingMin = Math.ceil((AD_COOLDOWN - timeSinceLastComplete) / 60);
            if (startAdBtn) startAdBtn.disabled = true;
            if (completeAdBtn) {
                completeAdBtn.disabled = true;
                completeAdBtn.style.background = '#555';
                completeAdBtn.style.borderColor = '#555';
                completeAdBtn.style.color = '#fff';
            }
            if (adMessage) {
                adMessage.textContent = '⏳ صبر کن... (' + remainingMin + ' دقیقه)';
                adMessage.style.color = '#f59e0b';
            }
            if (adCooldownSpan) adCooldownSpan.textContent = remainingMin;
            setTimeout(function() { updateUI(); }, 60000);
            updateSpinButton();
            return;
        }

        if (startAdBtn) startAdBtn.disabled = false;
        if (completeAdBtn) {
            completeAdBtn.disabled = true;
            completeAdBtn.style.background = '#555';
            completeAdBtn.style.borderColor = '#555';
            completeAdBtn.style.color = '#fff';
        }
        if (adMessage) {
            adMessage.textContent = '✅ آماده تماشا';
            adMessage.style.color = '#4ade80';
        }
        if (adCooldownSpan) adCooldownSpan.textContent = '۰';
        if (lastAdCompleteTime > 0 && timeSinceLastComplete >= AD_COOLDOWN) {
            lastAdCompleteTime = 0;
            saveState();
        }
        updateSpinButton();
    }

    if (startAdBtn) {
        startAdBtn.addEventListener('click', function() {
            if (startAdBtn.disabled) return;
            var now = Date.now();
            var timeSinceLastComplete = (now - lastAdCompleteTime) / 1000;
            if (lastAdCompleteTime > 0 && timeSinceLastComplete < AD_COOLDOWN) {
                showToast('⏳ هنوز زمان تماشای بعدی نرسیده!', 'error');
                return;
            }
            isAdWatching = true;
            adStartTime = now;
            adTimeLeft = AD_DURATION;
            startAdBtn.disabled = true;
            if (completeAdBtn) {
                completeAdBtn.disabled = true;
                completeAdBtn.style.background = '#555';
                completeAdBtn.style.borderColor = '#555';
                completeAdBtn.style.color = '#fff';
            }
            if (adMessage) {
                adMessage.textContent = '⏳ در حال پخش... (' + AD_DURATION + 's)';
                adMessage.style.color = '#f59e0b';
            }
            saveState();
            setTimeout(function() { updateUI(); }, 1000);
        });
    }

    if (completeAdBtn) {
        completeAdBtn.addEventListener('click', function() {
            if (completeAdBtn.disabled) return;
            
            addCoins(20);
            watchCount++;
            lastAdCompleteTime = Date.now();
            isAdWatching = false;
            adTimeLeft = 0;
            
            if (watchCount % 3 === 0) {
                spinChances++;
                showToast('🎟️ یک شانس گردونه دریافت کردی!', 'success');
                updateSpinButton();
            }
            
            saveState();
            updateUI();
            updateCoinsDisplay();
            
            if (completeAdBtn) {
                completeAdBtn.disabled = true;
                completeAdBtn.style.background = '#555';
                completeAdBtn.style.borderColor = '#555';
                completeAdBtn.style.color = '#fff';
            }
            if (adMessage) {
                adMessage.textContent = '✅ سکه دریافت شد!';
                adMessage.style.color = '#4ade80';
            }
            setTimeout(function() { updateUI(); }, 1000);
        });
    }

    // ============================================
    // گردونه شانس
    // ============================================

    function drawWheel(rotation) {
        rotation = rotation || 0;
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = Math.min(centerX, centerY) - 10;
        var sliceAngle = (2 * Math.PI) / prizes.length;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < prizes.length; i++) {
            var prize = prizes[i];
            var startAngle = i * sliceAngle + rotation;
            var endAngle = startAngle + sliceAngle;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = prize.color;
            ctx.fill();
            ctx.strokeStyle = '#07152b';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#07152b';
            ctx.font = 'bold 12px Vazirmatn';
            ctx.fillText(prize.label, radius * 0.65, 0);
            ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#2dd4bf';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    function spinWheel() {
        if (spinChances <= 0) {
            showToast('❌ شانس نداری!', 'error');
            return;
        }
        
        spinChances--;
        updateSpinButton();
        if (spinResult) spinResult.textContent = '';
        saveState();

        var totalWeight = weights.reduce(function(a, b) { return a + b; }, 0);
        var random = Math.random() * totalWeight;
        var selectedIndex = 0;
        for (var i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) { selectedIndex = i; break; }
        }
        var prize = prizes[selectedIndex];
        var sliceAngle = (2 * Math.PI) / prizes.length;
        var targetRotation = (2 * Math.PI) * 5 + (2 * Math.PI - (selectedIndex * sliceAngle + sliceAngle / 2));
        var currentRotation = 0;
        var duration = 4000;
        var startTime = Date.now();

        if (spinBtn) {
            spinBtn.disabled = true;
            spinBtn.textContent = '🎡 در حال چرخش...';
            spinBtn.style.background = '#555';
            spinBtn.style.color = '#fff';
        }

        function animateWheel() {
            var elapsed = Date.now() - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            currentRotation = targetRotation * ease;
            drawWheel(currentRotation);
            if (progress < 1) {
                requestAnimationFrame(animateWheel);
            } else {
                if (prize.value > 0) {
                    addCoins(prize.value);
                    if (spinResult) {
                        spinResult.textContent = '🎉 ' + prize.label + ' برنده شدی!';
                        spinResult.style.color = '#4ade80';
                    }
                } else {
                    if (spinResult) {
                        spinResult.textContent = '😐 متأسفانه پوچ!';
                        spinResult.style.color = '#9ca3af';
                    }
                }
                updateSpinButton();
                saveState();
            }
        }
        animateWheel();
    }

    if (spinBtn) {
        spinBtn.addEventListener('click', spinWheel);
    }

    drawWheel();
    updateCoinsDisplay();
    updateUI();
    updateSpinButton();
    saveState();

    window.addEventListener('beforeunload', function() {
        saveState();
    });
}

// ============================================
// دکمه شروع تماشا (تبلیغات تپسل)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    var adBtn = document.getElementById('showAdBtn');
    if (adBtn) {
        adBtn.addEventListener('click', function() {
            if (typeof Android !== 'undefined' && Android) {
                Android.showAd();
            } else {
                showToast('⚠️ این قابلیت فقط در اپلیکیشن قابل استفاده است!', 'error');
            }
        });
    }
});

function giveAdReward() {
    var coins = getData('coins', 0);
    var newCoins = coins + 20;
    setData('coins', newCoins);
    updateCoinDisplay();
    showToast('🪙 ۲۰ سکه دریافت شد!', 'success');
}

// ============================================
// راه‌اندازی نهایی
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    createAdminAccount();
    updateUserHeader();
    updateAuthMenu();
    updateCoinDisplay();
    if (document.getElementById('lessonsContainer')) renderLessons();
    if (document.getElementById('allLessonsContainer')) renderAllLessons();
    if (window.location.pathname.includes('lesson-detail.html')) loadLessonDetail();
    if (window.location.pathname.includes('earn-coins.html')) setupEarnCoinsPage();
    var continueBtn = document.getElementById('continueLesson');
    if (continueBtn) continueBtn.onclick = continueLastLesson;
    var searchInput = document.getElementById('searchLessons');
    if (searchInput) {
        searchInput.oninput = function() {
            var search = this.value.trim().toLowerCase();
            var cards = document.querySelectorAll('#allLessonsContainer .lesson-card');
            cards.forEach(function(card) {
                card.style.display = card.textContent.toLowerCase().includes(search) ? '' : 'none';
            });
        };
    }
    if (window.location.pathname.includes('admin.html')) {
        renderAdminLessons();
        renderPriceSettings();
        renderUsers();
        renderMessages();
        setupNotifications();
        var addBtn = document.getElementById('addLessonBtn');
        if (addBtn) addBtn.onclick = showAddLessonForm;
        var cancelBtn = document.getElementById('cancelAddLessonBtn');
        if (cancelBtn) cancelBtn.onclick = hideAddLessonForm;
        var saveBtn = document.getElementById('saveNewLessonBtn');
        if (saveBtn) saveBtn.onclick = saveNewLesson;
        var priceSaveBtn = document.getElementById('savePriceSettingsBtn');
        if (priceSaveBtn) priceSaveBtn.onclick = savePrices;
    }
    console.log('🌰 فندق با موفقیت بارگذاری شد!');
});
// ============================================
// منوی همبرگر (برای همه صفحات)
// ============================================

function toggleMenu() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
}

function closeMenu() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
}