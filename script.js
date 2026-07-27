// ============================================
// 🌰 فندق - اپلیکیشن کامل با تلفظ Edge TTS
// ============================================

// ===== داده‌های درس‌ها با لغات =====
const LESSONS_DATA = [
    {
        id: 1,
        icon: '🇰🇷',
        title: 'آشنایی با هانگول',
        category: 'درسی • سالم و احوالپرسی',
        description: 'یادگیری الفبای کره‌ای',
        level: 'مقدماتی',
        content: 'الفبای کره‌ای (هانگول) در سال ۱۴۴۳ ساخته شد. شامل ۲۴ حرف است.',
        vocabulary: [
            { korean: '한글', pronunciation: 'Han-geul', meaning: 'هانگول (الفبای کره‌ای)' },
            { korean: 'ㄱ', pronunciation: 'Gi-yeok', meaning: 'گیوک (حرف بی‌صدا)' },
            { korean: 'ㄴ', pronunciation: 'Ni-eun', meaning: 'نیون (حرف بی‌صدا)' },
            { korean: 'ㅏ', pronunciation: 'A', meaning: 'آ (حرف صدادار)' },
            { korean: 'ㅑ', pronunciation: 'Ya', meaning: 'یا (حرف صدادار)' }
        ]
    },
    {
        id: 2,
        icon: '💬',
        title: 'مکالمه روزمره',
        category: 'درسی • معرفی خود',
        description: 'صحبت کردن در موقعیت‌های روزمره',
        level: 'مقدماتی',
        content: 'سلام = 안녕하세요 (آن‌نیونگ‌هاسه‌یو)، متشکرم = 감사합니다 (کام‌سا‌هام‌نیدا)',
        vocabulary: [
            { korean: '안녕하세요', pronunciation: 'An-nyeong-ha-se-yo', meaning: 'سلام' },
            { korean: '감사합니다', pronunciation: 'Kam-sa-ham-ni-da', meaning: 'متشکرم' },
            { korean: '죄송합니다', pronunciation: 'Choe-song-ham-ni-da', meaning: 'متاسفم' },
            { korean: '이름', pronunciation: 'I-reum', meaning: 'اسم' },
            { korean: '저는', pronunciation: 'Jeo-neun', meaning: 'من (مؤدبانه)' }
        ]
    },
    {
        id: 3,
        icon: '📖',
        title: 'گرامر پایه',
        category: 'درسی • خانواده',
        description: 'ساخت جمله‌های ساده کره‌ای',
        level: 'متوسط',
        content: 'ترتیب جمله در کره‌ای: فاعل + مفعول + فعل',
        vocabulary: [
            { korean: '은/는', pronunciation: 'Eun/Neun', meaning: 'شناسه فاعل' },
            { korean: '을/를', pronunciation: 'Eul/Reul', meaning: 'شناسه مفعول' },
            { korean: '입니다', pronunciation: 'Im-ni-da', meaning: 'هست (رسمی)' },
            { korean: '아니에요', pronunciation: 'A-ni-e-yo', meaning: 'نیست (غیررسمی)' }
        ]
    },
    {
        id: 4,
        icon: '📅',
        title: 'روزها و تاریخ',
        category: 'درسی • روزها و تاریخ',
        description: 'روزهای هفته و تاریخ‌ها',
        level: 'متوسط',
        content: 'یک‌شنبه = 일요일 (ایریول)، دوشنبه = 월요일 (وُریول)',
        vocabulary: [
            { korean: '월요일', pronunciation: 'Wol-yo-il', meaning: 'دوشنبه' },
            { korean: '화요일', pronunciation: 'Hwa-yo-il', meaning: 'سه‌شنبه' },
            { korean: '수요일', pronunciation: 'Su-yo-il', meaning: 'چهارشنبه' },
            { korean: '금요일', pronunciation: 'Geum-yo-il', meaning: 'جمعه' },
            { korean: '주말', pronunciation: 'Ju-mal', meaning: 'آخر هفته' }
        ]
    },
    {
        id: 5,
        icon: '🕐',
        title: 'ساعت و زمان',
        category: 'درسی • ساعت و زمان',
        description: 'گفتن ساعت و زمان',
        level: 'پیشرفته',
        content: 'ساعت ۱ = 1시 (هان‌شی)، ساعت ۳ و ۳۰ دقیقه = 3시 30분',
        vocabulary: [
            { korean: '시', pronunciation: 'Si', meaning: 'ساعت' },
            { korean: '분', pronunciation: 'Bun', meaning: 'دقیقه' },
            { korean: '오전', pronunciation: 'O-jeon', meaning: 'صبح' },
            { korean: '오후', pronunciation: 'O-hu', meaning: 'بعدازظهر' },
            { korean: '몇 시예요?', pronunciation: 'Myeot si-ye-yo?', meaning: 'ساعت چند است؟' }
        ]
    },
    {
        id: 6,
        icon: '🛍️',
        title: 'خرید کردن',
        category: 'درسی • خرید کردن',
        description: 'مکالمات هنگام خرید',
        level: 'پیشرفته',
        content: 'قیمتش چنده؟ = 얼마예요؟ (ئول‌ما‌یه‌یو؟)',
        vocabulary: [
            { korean: '얼마예요?', pronunciation: 'Eol-ma-ye-yo?', meaning: 'قیمتش چنده؟' },
            { korean: '비싸요', pronunciation: 'Bi-ssa-yo', meaning: 'گرونه' },
            { korean: '싸요', pronunciation: 'Ssa-yo', meaning: 'ارزونه' },
            { korean: '주세요', pronunciation: 'Ju-se-yo', meaning: 'لطفاً به من بدهید' },
            { korean: '이거', pronunciation: 'I-geo', meaning: 'این' }
        ]
    }
];

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
// سیستم تلفظ با Edge TTS (کیفیت بالا، رایگان)
// ============================================

async function speakKorean(text) {
    try {
        // ساخت URL برای Edge TTS
        const url = `https://speech.platform.bing.com/recognize?${new URLSearchParams({
            'dnt': '1',
            'form': 'DETAILS',
            'ig': 'ADB6C4B1C5174D12A2D5D8D6E4F5C6D7',
            'mode': 'tts',
            'mkt': 'ko-KR',
            'resultid': Date.now(),
            's': Date.now(),
            'c': 'load',
            'rc': '2058',
            'p': 'b'
        })}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ssml+xml',
                'X-MSEdge-ClientID': 'fandogh',
            },
            body: `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR">
                <voice name="ko-KR-SunHiNeural">
                    <prosody rate="0.9" pitch="0">
                        ${text}
                    </prosody>
                </voice>
            </speak>`
        });

        if (!response.ok) {
            throw new Error('TTS request failed');
        }

        const audioData = await response.arrayBuffer();
        const audioBlob = new Blob([audioData], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
        };
        
        audio.play();
        console.log('🎤 تلفظ پخش شد:', text);
        
    } catch (error) {
        console.error('TTS Error:', error);
        // Fallback: استفاده از Web Speech API
        fallbackSpeak(text);
    }
}

// ===== Fallback (در صورت عدم موفقیت Edge TTS) =====
function fallbackSpeak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        const voices = window.speechSynthesis.getVoices();
        const koreanVoice = voices.find(voice => voice.lang.startsWith('ko'));
        if (koreanVoice) {
            utterance.voice = koreanVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    } else {
        showToast('⚠️ مرورگر شما از تلفظ صوتی پشتیبانی نمی‌کند!', 'error');
    }
}

// ===== بارگذاری صداها =====
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

// ===== محاسبه سن =====
function calculateAgeFromShamsi(year, month, day) {
    const today = new Date();
    const gregorianYear = parseInt(year) + 621;
    const gregorianMonth = parseInt(month);
    const gregorianDay = parseInt(day);
    const birthDate = new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// ===== باز کردن درس =====
function openLesson(lessonId) {
    const lessons = DB.get('lessons', LESSONS_DATA);
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) {
        showToast('❌ درس پیدا نشد!', 'error');
        return;
    }
    DB.set('lastLesson', lessonId);
    window.location.href = `lesson-detail.html?id=${lessonId}`;
}

// ===== رندر درس‌ها =====
function renderLessons() {
    const container = document.getElementById('lessonsContainer');
    if (!container) return;
    const lessons = DB.get('lessons', LESSONS_DATA);
    const progress = DB.get('progress', {});
    let html = '';
    lessons.slice(0, 3).forEach(lesson => {
        const p = progress[lesson.id] || 0;
        html += `
            <div class="lesson-card">
                <div class="lesson-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p class="lesson-category">📘 ${lesson.category}</p>
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
            </div>
        `;
    });
    container.innerHTML = html;
    updateStats();
}

// ===== رندر همه درس‌ها =====
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
        html += `
            <div class="lesson-card">
                <div class="lesson-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p class="lesson-category">📘 ${lesson.category}</p>
                <p style="font-size:12px;color:#7f8da5;margin-bottom:12px;">${lesson.description}</p>
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

// ===== به‌روزرسانی آمار =====
function updateStats() {
    const progress = DB.get('progress', {});
    const completed = Object.values(progress).filter(p => p === 100).length;
    const lessons = DB.get('lessons', LESSONS_DATA);
    const total = lessons.length;

    document.getElementById('statLessons').textContent = `${completed} / ${total}`;
    document.getElementById('statStreak').textContent = DB.get('stats', { streak: 0 }).streak || 0;
    document.getElementById('statHours').textContent = (DB.get('stats', { hours: 0 }).hours || 0) + ' ساعت';
}

// ===== نمایش لغات =====
function displayVocabulary(vocab) {
    const container = document.getElementById('vocabularyContainer');
    if (!container) return;
    
    if (!vocab || vocab.length === 0) {
        container.innerHTML = '<p style="color:#6b7a93;">هیچ لغتی برای این درس ثبت نشده است.</p>';
        return;
    }
    
    let html = '<div style="display:grid;grid-template-columns:1fr;gap:10px;margin-top:10px;">';
    vocab.forEach((item) => {
        // کلمه رو برای تلفظ آماده میکنیم
        const cleanText = item.korean.replace(/[?؟!¡,;]/g, '').trim();
        html += `
            <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.03);padding:12px 16px;border-radius:10px;flex-wrap:wrap;gap:10px;">
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:20px;font-weight:700;color:#ffffff;">${item.korean}</span>
                    <span style="color:#6b7a93;font-size:13px;">${item.pronunciation || ''}</span>
                    <span style="color:#2dd4bf;font-size:13px;">${item.meaning}</span>
                </div>
                <button class="primary-btn" onclick="speakKorean('${cleanText}')" style="padding:6px 14px;font-size:12px;background:rgba(45,212,191,0.1);color:#2dd4bf;border:1px solid rgba(45,212,191,0.15);">
                    🔊 تلفظ
                </button>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// ===== بارگذاری صفحه درس =====
function loadLessonDetail() {
    const params = new URLSearchParams(window.location.search);
    const lessonId = parseInt(params.get('id'));
    if (!lessonId) {
        document.getElementById('lessonTitle').textContent = '❌ درس نامعتبر';
        return;
    }

    const lessons = DB.get('lessons', LESSONS_DATA);
    const data = lessons.find(l => l.id === lessonId);
    if (!data) {
        document.getElementById('lessonTitle').textContent = '❌ درس پیدا نشد';
        return;
    }

    document.getElementById('lessonTitle').textContent = `📖 ${data.title}`;
    document.getElementById('lessonCategory').textContent = data.category;
    document.getElementById('lessonIcon').textContent = data.icon;
    document.getElementById('lessonFullTitle').textContent = data.title;
    document.getElementById('lessonDescription').textContent = data.description;
    document.getElementById('lessonText').innerHTML = `<p>${data.content || 'محتوا در حال ویرایش...'}</p>`;

    // نمایش لغات
    displayVocabulary(data.vocabulary || []);

    // تمرین
    const exercises = [
        { q: `${data.title} درباره چیه؟`, options: ['یادگیری کره‌ای', 'ریاضی', 'تاریخ', 'شیمی'], correct: 0 }
    ];
    let exHtml = '';
    exercises.forEach((ex, i) => {
        exHtml += `<div style="background:rgba(255,255,255,0.03);padding:15px;border-radius:12px;margin-bottom:10px;">
            <p style="font-weight:600;">${i+1}. ${ex.q}</p>
            ${ex.options.map((opt, oi) => `
                <label style="display:block;margin:5px 0;cursor:pointer;">
                    <input type="radio" name="ex${i}" value="${oi}"> ${opt}
                </label>
            `).join('')}
            <button class="check-btn" data-ex="${i}" style="margin-top:10px;padding:6px 16px;background:#2dd4bf;border:none;border-radius:8px;color:#0a0e1a;font-weight:700;cursor:pointer;">بررسی</button>
            <div class="fb" style="margin-top:8px;font-size:13px;"></div>
        </div>`;
    });
    document.getElementById('exerciseContainer').innerHTML = exHtml;

    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const exIdx = parseInt(this.dataset.ex);
            const sel = document.querySelector(`input[name="ex${exIdx}"]:checked`);
            const fb = this.parentElement.querySelector('.fb');
            if (!sel) { fb.textContent = '⚠️ یک گزینه رو انتخاب کن!'; fb.style.color = '#f59e0b'; return; }
            const correct = exercises[exIdx].correct;
            if (parseInt(sel.value) === correct) {
                fb.textContent = '✅ آفرین! درسته! 🎉';
                fb.style.color = '#2dd4bf';
            } else {
                fb.textContent = `❌ نه! پاسخ صحیح گزینه ${correct+1} بود.`;
                fb.style.color = '#ef4444';
            }
        });
    });

    // پیشرفت
    const progress = DB.get('progress', {});
    const p = progress[lessonId] || 0;
    document.getElementById('lessonProgressBar').style.width = p + '%';
    document.getElementById('lessonProgressText').textContent = p + '%';

    document.getElementById('markComplete').addEventListener('click', function() {
        const prog = DB.get('progress', {});
        prog[lessonId] = 100;
        DB.set('progress', prog);
        document.getElementById('lessonProgressBar').style.width = '100%';
        document.getElementById('lessonProgressText').textContent = '۱۰۰%';
        showToast('🎉 تبریک! درس رو کامل کردی!', 'success');
        this.disabled = true;
        this.style.opacity = '0.5';
        updateStats();
    });

    document.getElementById('resetProgress').addEventListener('click', function() {
        if (confirm('ریست کنم؟')) {
            const prog = DB.get('progress', {});
            prog[lessonId] = 0;
            DB.set('progress', prog);
            document.getElementById('lessonProgressBar').style.width = '0%';
            document.getElementById('lessonProgressText').textContent = '۰%';
            document.getElementById('markComplete').disabled = false;
            document.getElementById('markComplete').style.opacity = '1';
            showToast('🔄 ریست شد!', 'info');
            updateStats();
        }
    });
}

// ===== بارگذاری پروفایل =====
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

    document.getElementById('saveNameBtn').addEventListener('click', function() {
        const newName = document.getElementById('nameInput').value.trim();
        if (!newName) { showToast('⚠️ لطفاً یک نام وارد کن!', 'error'); return; }
        const user = DB.get('user', { name: 'کاربر مهمان' });
        user.name = newName;
        DB.set('user', user);
        document.getElementById('profileName').textContent = newName;
        document.getElementById('headerUsername').textContent = newName;
        showToast(`✅ نام شما به "${newName}" تغییر کرد!`, 'success');
    });

    document.getElementById('resetAllBtn').addEventListener('click', function() {
        if (confirm('⚠️ همه داده‌ها پاک میشن! مطمئنی؟')) {
            if (confirm('‼️ باز هم تأیید میکنی؟')) {
                localStorage.clear();
                showToast('🗑️ همه داده‌ها پاک شد!', 'error');
                setTimeout(() => window.location.reload(), 1500);
            }
        }
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('🚪 مطمئنی میخوای خارج بشی؟')) {
                DB.set('currentUser', null);
                showToast('👋 شما خارج شدید!', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
}

// ===== صفحه پشتیبانی =====
function setupSupportPage() {
    const form = document.getElementById('supportForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('supportName').value.trim();
        const email = document.getElementById('supportEmail').value.trim();
        const subject = document.getElementById('supportSubject').value;
        const message = document.getElementById('supportMessage').value.trim();

        if (!name || !email || !message) {
            showToast('⚠️ لطفاً همه فیلدها رو پر کن!', 'error');
            return;
        }

        const messages = DB.get('supportMessages', []);
        messages.push({
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleDateString('fa-IR'),
            time: new Date().toLocaleTimeString('fa-IR')
        });
        DB.set('supportMessages', messages);

        showToast('✅ پیام شما با موفقیت ارسال شد!', 'success');
        form.reset();
    });
}

// ===== مدیریت منو بر اساس وضعیت ورود =====
function updateMenuBasedOnAuth() {
    const currentUser = DB.get('currentUser', null);
    const menu = document.querySelector('.menu');
    if (!menu) return;

    let loginItem = null;
    let registerItem = null;
    let logoutItem = null;
    let adminItem = document.getElementById('adminMenuItem');

    const items = menu.querySelectorAll('.menu-item');
    items.forEach(item => {
        const href = item.getAttribute('href');
        if (href === 'login.html') loginItem = item;
        if (href === 'register.html') registerItem = item;
        if (item.getAttribute('data-action') === 'logout') logoutItem = item;
    });

    if (currentUser) {
        if (loginItem) loginItem.style.display = 'none';
        if (registerItem) registerItem.style.display = 'none';

        if (adminItem) {
            adminItem.style.display = isAdmin() ? 'flex' : 'none';
        }

        if (!logoutItem) {
            const newLogout = document.createElement('a');
            newLogout.href = '#';
            newLogout.className = 'menu-item';
            newLogout.setAttribute('data-action', 'logout');
            newLogout.innerHTML = `
                <span class="menu-icon">🚪</span>
                <span>خروج</span>
            `;
            const profileItem = menu.querySelector('a[href="profile.html"]');
            if (profileItem) {
                menu.insertBefore(newLogout, profileItem);
            } else {
                menu.appendChild(newLogout);
            }

            newLogout.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('🚪 مطمئنی میخوای خارج بشی؟')) {
                    DB.set('currentUser', null);
                    showToast('👋 شما خارج شدید!', 'info');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            });
        }
    } else {
        if (loginItem) loginItem.style.display = 'flex';
        if (registerItem) registerItem.style.display = 'flex';
        if (adminItem) adminItem.style.display = 'none';
        if (logoutItem) logoutItem.remove();
    }
}

// ===== نمایش وضعیت ورود در هدر =====
function updateAuthStatus() {
    const currentUser = DB.get('currentUser', null);
    const userInfoStrong = document.getElementById('headerUsername');
    const userInfoSpan = document.getElementById('headerUserStatus');

    if (userInfoStrong) {
        userInfoStrong.textContent = currentUser || 'کاربر مهمان';
    }
    if (userInfoSpan) {
        userInfoSpan.textContent = currentUser ? 'کاربر عضو' : 'ثبت‌نام نشده';
    }

    updateMenuBasedOnAuth();
}

// ===== ثبت‌نام =====
function setupRegisterPage() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    const step1Next = document.getElementById('step1Next');
    const step2Back = document.getElementById('step2Back');
    const step2Next = document.getElementById('step2Next');
    const step3Back = document.getElementById('step3Back');

    const regUsername = document.getElementById('regUsername');
    const regPassword = document.getElementById('regPassword');
    const regPasswordConfirm = document.getElementById('regPasswordConfirm');
    const regYear = document.getElementById('regYear');
    const regMonth = document.getElementById('regMonth');
    const regDay = document.getElementById('regDay');
    const regAge = document.getElementById('regAge');

    let userData = {};

    function validateUsername(username) {
        return /^[a-zA-Z]+$/.test(username);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function updateAgeAutomatically() {
        const year = regYear.value.trim();
        const month = regMonth.value.trim();
        const day = regDay.value.trim();
        
        if (year && month && day) {
            const y = parseInt(year);
            const m = parseInt(month);
            const d = parseInt(day);
            
            if (y >= 1300 && y <= 1410 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
                const age = calculateAgeFromShamsi(y, m, d);
                if (age >= 10 && age <= 99) {
                    regAge.value = age;
                } else {
                    regAge.value = '';
                }
            } else {
                regAge.value = '';
            }
        } else {
            regAge.value = '';
        }
    }

    regYear.addEventListener('input', updateAgeAutomatically);
    regMonth.addEventListener('input', updateAgeAutomatically);
    regDay.addEventListener('input', updateAgeAutomatically);

    step1Next.addEventListener('click', function() {
        const username = regUsername.value.trim();
        const password = regPassword.value;
        const passwordConfirm = regPasswordConfirm.value;

        if (!username) {
            showToast('⚠️ لطفاً نام کاربری را وارد کن!', 'error');
            return;
        }

        if (!validateUsername(username)) {
            showToast('⚠️ نام کاربری فقط باید شامل حروف انگلیسی باشد!', 'error');
            return;
        }

        const users = DB.get('users', []);
        if (users.find(u => u.username === username)) {
            showToast('⚠️ این نام کاربری قبلاً ثبت شده است!', 'error');
            return;
        }

        if (!password) {
            showToast('⚠️ لطفاً رمز عبور را وارد کن!', 'error');
            return;
        }

        if (!validatePassword(password)) {
            showToast('⚠️ رمز عبور باید حداقل ۸ کاراکتر باشد!', 'error');
            return;
        }

        if (password !== passwordConfirm) {
            showToast('⚠️ رمز عبور و تکرار آن مطابقت ندارند!', 'error');
            return;
        }

        userData.username = username;
        userData.password = password;

        step1.style.display = 'none';
        step2.style.display = 'block';
        updateAgeAutomatically();
    });

    step2Back.addEventListener('click', function() {
        step2.style.display = 'none';
        step1.style.display = 'block';
    });

    step2Next.addEventListener('click', function() {
        const year = regYear.value.trim();
        const month = regMonth.value.trim();
        const day = regDay.value.trim();
        const age = regAge.value.trim();

        if (!year || !month || !day) {
            showToast('⚠️ لطفاً تاریخ تولد را کامل وارد کن!', 'error');
            return;
        }

        if (parseInt(year) < 1300 || parseInt(year) > 1410) {
            showToast('⚠️ سال باید بین ۱۳۰۰ تا ۱۴۱۰ باشد!', 'error');
            return;
        }

        if (parseInt(month) < 1 || parseInt(month) > 12) {
            showToast('⚠️ ماه باید بین ۱ تا ۱۲ باشد!', 'error');
            return;
        }

        if (parseInt(day) < 1 || parseInt(day) > 31) {
            showToast('⚠️ روز باید بین ۱ تا ۳۱ باشد!', 'error');
            return;
        }

        if (!age) {
            showToast('⚠️ لطفاً تاریخ تولد را درست وارد کن!', 'error');
            return;
        }

        if (parseInt(age) < 10 || parseInt(age) > 99) {
            showToast('⚠️ سن باید بین ۱۰ تا ۹۹ باشد!', 'error');
            return;
        }

        userData.birthDate = `${year}/${month}/${day}`;
        userData.age = parseInt(age);

        step2.style.display = 'none';
        step3.style.display = 'block';
    });

    step3Back.addEventListener('click', function() {
        step3.style.display = 'none';
        step2.style.display = 'block';
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const genderInput = document.querySelector('input[name="gender"]:checked');
        if (!genderInput) {
            showToast('⚠️ لطفاً جنسیت خود را انتخاب کن!', 'error');
            return;
        }

        userData.gender = genderInput.value;

        const users = DB.get('users', []);
        users.push({
            username: userData.username,
            password: userData.password,
            birthDate: userData.birthDate,
            age: userData.age,
            gender: userData.gender,
            registeredAt: new Date().toISOString()
        });
        DB.set('users', users);

        DB.set('currentUser', userData.username);

        showToast('🎉 ثبت‌نام با موفقیت انجام شد! خوش اومدی!', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
}

// ===== ورود =====
function setupLoginPage() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!username || !password) {
            showToast('⚠️ لطفاً همه فیلدها را پر کن!', 'error');
            return;
        }

        const users = DB.get('users', []);
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            showToast('❌ نام کاربری یا رمز عبور اشتباه است!', 'error');
            return;
        }

        DB.set('currentUser', username);

        showToast('✅ خوش اومدی ' + username + '!', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
}

// ============================================
// تنظیمات ادمین
// ============================================

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

function isAdmin() {
    const currentUser = DB.get('currentUser', null);
    if (!currentUser) return false;
    const users = DB.get('users', []);
    const user = users.find(u => u.username === currentUser);
    return user && user.isAdmin === true;
}

function createDefaultAdmin() {
    const users = DB.get('users', []);
    const adminExists = users.find(u => u.username === ADMIN_USERNAME);
    if (!adminExists) {
        users.push({
            username: ADMIN_USERNAME,
            password: ADMIN_PASSWORD,
            isAdmin: true,
            birthDate: '1370/01/01',
            age: 30,
            gender: 'male',
            registeredAt: new Date().toISOString()
        });
        DB.set('users', users);
        console.log('👑 ادمین پیش‌فرض ایجاد شد!');
        console.log('👤 نام کاربری: admin');
        console.log('🔑 رمز عبور: admin123');
    }
}

// ============================================
// پنل مدیریت - بخش درس‌ها با لغات
// ============================================

function renderAdminLessons() {
    const container = document.getElementById('adminLessonsContainer');
    if (!container) return;
    const lessons = DB.get('lessons', LESSONS_DATA);
    let html = '';
    lessons.forEach((lesson, index) => {
        const vocabCount = (lesson.vocabulary || []).length;
        html += `
            <div class="admin-lesson-item" data-index="${index}">
                <div class="lesson-info">
                    <span style="font-size:24px;">${lesson.icon}</span>
                    <span><strong>${lesson.title}</strong></span>
                    <span class="level-badge">${lesson.level || 'مقدماتی'}</span>
                    <span style="color:#7f8da5;font-size:12px;">📚 ${vocabCount} لغت</span>
                </div>
                <div class="lesson-actions">
                    <button class="btn-edit" onclick="editLesson(${index})">✏️ ویرایش</button>
                    <button class="btn-delete" onclick="deleteLesson(${index})">🗑️ حذف</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html || '<p style="color:#7f8da5;">هیچ درسی وجود ندارد.</p>';
}

function editLesson(index) {
    const lessons = DB.get('lessons', LESSONS_DATA);
    const lesson = lessons[index];
    if (!lesson) return;
    
    const newTitle = prompt('عنوان جدید:', lesson.title);
    if (newTitle !== null) lesson.title = newTitle;
    
    const newIcon = prompt('آیکون جدید:', lesson.icon);
    if (newIcon !== null) lesson.icon = newIcon;
    
    const newCategory = prompt('دسته‌بندی جدید:', lesson.category);
    if (newCategory !== null) lesson.category = newCategory;
    
    const newLevel = prompt('سطح جدید (مقدماتی/متوسط/پیشرفته):', lesson.level || 'مقدماتی');
    if (newLevel !== null) lesson.level = newLevel;
    
    const newDesc = prompt('توضیحات جدید:', lesson.description);
    if (newDesc !== null) lesson.description = newDesc;
    
    const newContent = prompt('محتوای آموزشی جدید:', lesson.content || '');
    if (newContent !== null) lesson.content = newContent;
    
    // ویرایش لغات
    const vocabText = (lesson.vocabulary || []).map(v => `${v.korean} | ${v.pronunciation} | ${v.meaning}`).join('\n');
    const newVocabText = prompt('لغات (هر خط: کلمه | تلفظ | معنی):', vocabText);
    if (newVocabText !== null) {
        lesson.vocabulary = newVocabText.split('\n').map(line => {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length === 3) {
                return { korean: parts[0], pronunciation: parts[1], meaning: parts[2] };
            }
            return null;
        }).filter(v => v !== null);
    }
    
    lessons[index] = lesson;
    DB.set('lessons', lessons);
    renderAdminLessons();
    showToast('✅ درس ویرایش شد!', 'success');
}

function deleteLesson(index) {
    if (!confirm('⚠️ مطمئنی میخوای این درس رو حذف کنی؟')) return;
    const lessons = DB.get('lessons', LESSONS_DATA);
    lessons.splice(index, 1);
    DB.set('lessons', lessons);
    renderAdminLessons();
    showToast('🗑️ درس حذف شد!', 'info');
}

// ===== افزودن درس جدید با لغات =====
function setupAddLesson() {
    const addBtn = document.getElementById('addLessonBtn');
    const form = document.getElementById('addLessonForm');
    const cancelBtn = document.getElementById('cancelAddLessonBtn');
    const saveBtn = document.getElementById('saveNewLessonBtn');
    if (!addBtn) return;
    
    addBtn.addEventListener('click', function() {
        form.style.display = 'block';
        this.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', function() {
        form.style.display = 'none';
        addBtn.style.display = 'inline-block';
    });
    
    saveBtn.addEventListener('click', function() {
        const title = document.getElementById('newLessonTitle').value.trim();
        const icon = document.getElementById('newLessonIcon').value.trim();
        const category = document.getElementById('newLessonCategory').value.trim();
        const description = document.getElementById('newLessonDescription').value.trim();
        const level = document.getElementById('newLessonLevel').value;
        const content = document.getElementById('newLessonContent').value.trim();
        const vocabText = document.getElementById('newLessonVocabulary').value.trim();
        
        if (!title || !icon || !category || !description) {
            showToast('⚠️ لطفاً همه فیلدها را پر کن!', 'error');
            return;
        }
        
        // پردازش لغات
        const vocabulary = [];
        if (vocabText) {
            const lines = vocabText.split('\n');
            for (const line of lines) {
                const parts = line.split('|').map(p => p.trim());
                if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
                    vocabulary.push({
                        korean: parts[0],
                        pronunciation: parts[1],
                        meaning: parts[2]
                    });
                }
            }
        }
        
        const lessons = DB.get('lessons', LESSONS_DATA);
        const newId = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
        
        lessons.push({
            id: newId,
            title: title,
            icon: icon,
            category: category,
            description: description,
            level: level,
            content: content || 'محتوا در حال ویرایش...',
            vocabulary: vocabulary
        });
        
        DB.set('lessons', lessons);
        renderAdminLessons();
        
        // پاک کردن فرم
        document.getElementById('newLessonTitle').value = '';
        document.getElementById('newLessonIcon').value = '';
        document.getElementById('newLessonCategory').value = '';
        document.getElementById('newLessonDescription').value = '';
        document.getElementById('newLessonContent').value = '';
        document.getElementById('newLessonVocabulary').value = '';
        form.style.display = 'none';
        addBtn.style.display = 'inline-block';
        
        showToast(`✅ درس جدید اضافه شد! (${vocabulary.length} لغت)`, 'success');
    });
}

function renderUsers() {
    const container = document.getElementById('usersListContainer');
    if (!container) return;
    const users = DB.get('users', []);
    const progress = DB.get('progress', {});
    
    if (users.length === 0) {
        container.innerHTML = '<p style="color:#7f8da5;">هیچ کاربری ثبت نام نکرده است.</p>';
        return;
    }
    
    let html = '';
    users.forEach(user => {
        const userProgress = Object.values(progress).filter(p => p === 100).length || 0;
        const userCoins = DB.get('coins', 0);
        html += `
            <div class="user-item">
                <div class="user-info">
                    <span style="font-size:20px;">${user.gender === 'male' ? '👨' : '👩'}</span>
                    <span><strong>${user.username}</strong> ${user.isAdmin ? '⭐' : ''}</span>
                    <span class="user-detail">سن: ${user.age || 'نامشخص'}</span>
                    <span class="user-detail">تولد: ${user.birthDate || 'نامشخص'}</span>
                    <span class="user-detail">جنسیت: ${user.gender === 'male' ? 'مرد' : 'زن'}</span>
                </div>
                <div class="user-stats">
                    <span>📚 ${userProgress} درس</span>
                    <span>🪙 ${userCoins}</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderMessages() {
    const container = document.getElementById('messagesListContainer');
    if (!container) return;
    const messages = DB.get('supportMessages', []);
    
    if (messages.length === 0) {
        container.innerHTML = '<p style="color:#7f8da5;">هیچ پیامی وجود ندارد.</p>';
        return;
    }
    
    let html = '';
    messages.forEach((msg, index) => {
        const subjectMap = {
            'problem': 'مشکل فنی',
            'question': 'سوال درسی',
            'suggestion': 'پیشنهاد',
            'other': 'سایر'
        };
        html += `
            <div class="message-item">
                <div class="message-header">
                    <span class="sender">${msg.name}</span>
                    <span class="date">${msg.date} - ${msg.time || ''}</span>
                </div>
                <div class="message-subject">📌 ${subjectMap[msg.subject] || msg.subject}</div>
                <div class="message-text">${msg.message}</div>
                ${msg.reply ? `<div style="margin-top:8px;padding:8px 12px;background:rgba(45,212,191,0.1);border-radius:8px;border-right:2px solid #2dd4bf;color:#2dd4bf;font-size:13px;">✅ پاسخ: ${msg.reply}</div>` : ''}
                <div class="message-actions">
                    <textarea id="replyText_${index}" placeholder="پاسخ خود را بنویس...">${msg.reply || ''}</textarea>
                    <button class="reply-btn" onclick="replyToMessage(${index})">📤 ارسال پاسخ</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function replyToMessage(index) {
    const textarea = document.getElementById(`replyText_${index}`);
    if (!textarea) return;
    const reply = textarea.value.trim();
    if (!reply) {
        showToast('⚠️ لطفاً متن پاسخ را بنویس!', 'error');
        return;
    }
    const messages = DB.get('supportMessages', []);
    messages[index].reply = reply;
    messages[index].repliedAt = new Date().toLocaleDateString('fa-IR');
    DB.set('supportMessages', messages);
    textarea.value = reply;
    showToast('✅ پاسخ شما ارسال شد!', 'success');
    renderMessages();
}

// ============================================
// مدیریت اعلان‌ها
// ============================================

function renderNotifications() {
    const container = document.getElementById('notificationsList');
    if (!container) return;
    const notifications = DB.get('notifications', []);
    
    if (notifications.length === 0) {
        container.innerHTML = '<p style="color:#7f8da5;text-align:center;padding:20px;">هیچ اعلانی منتشر نشده است.</p>';
        return;
    }
    
    let html = '';
    notifications.forEach((notif, index) => {
        const color = notif.type === 'success' ? '#4ade80' : notif.type === 'warning' ? '#fbbf24' : '#60a5fa';
        html += `
            <div class="notification-item" style="border-right-color:${color};">
                <div class="notif-title" style="color:${color};">${notif.title}</div>
                <div class="notif-text">${notif.text}</div>
                <div class="notif-date">${notif.date} - ${notif.time}</div>
                <div style="display:flex;gap:8px;margin-top:10px;">
                    <button class="btn-edit" onclick="editNotification(${index})">✏️ ویرایش</button>
                    <button class="btn-delete" onclick="deleteNotification(${index})">🗑️ حذف</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function editNotification(index) {
    const notifications = DB.get('notifications', []);
    const notif = notifications[index];
    if (!notif) {
        showToast('❌ اعلان پیدا نشد!', 'error');
        return;
    }

    const newTitle = prompt('عنوان جدید:', notif.title);
    if (newTitle === null) return;
    if (!newTitle.trim()) {
        showToast('⚠️ عنوان نمی‌تواند خالی باشد!', 'error');
        return;
    }

    const newText = prompt('متن جدید:', notif.text);
    if (newText === null) return;
    if (!newText.trim()) {
        showToast('⚠️ متن نمی‌تواند خالی باشد!', 'error');
        return;
    }

    const newType = prompt('نوع جدید (info/success/warning):', notif.type);
    if (newType === null) return;
    if (!['info', 'success', 'warning'].includes(newType)) {
        showToast('⚠️ نوع باید info، success یا warning باشد!', 'error');
        return;
    }

    notifications[index].title = newTitle.trim();
    notifications[index].text = newText.trim();
    notifications[index].type = newType;
    notifications[index].editedAt = new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR');
    
    DB.set('notifications', notifications);
    renderNotifications();
    DB.set('notificationsRead', false);
    DB.set('notificationCount', notifications.length);
    showToast('✅ اعلان ویرایش شد!', 'success');
}

function deleteNotification(index) {
    if (!confirm('⚠️ مطمئنی میخوای این اعلان رو حذف کنی؟')) return;
    const notifications = DB.get('notifications', []);
    notifications.splice(index, 1);
    DB.set('notifications', notifications);
    renderNotifications();
    DB.set('notificationCount', notifications.length);
    if (notifications.length === 0) {
        DB.set('notificationsRead', true);
    }
    showToast('🗑️ اعلان حذف شد!', 'info');
}

function setupNotifications() {
    const publishBtn = document.getElementById('publishNotificationBtn');
    if (!publishBtn) return;
    renderNotifications();
    
    publishBtn.addEventListener('click', function() {
        const title = document.getElementById('notificationTitle').value.trim();
        const text = document.getElementById('notificationText').value.trim();
        const type = document.getElementById('notificationType').value;
        
        if (!title || !text) {
            showToast('⚠️ لطفاً عنوان و متن اعلان را وارد کن!', 'error');
            return;
        }
        
        const notifications = DB.get('notifications', []);
        notifications.push({
            title: title,
            text: text,
            type: type,
            date: new Date().toLocaleDateString('fa-IR'),
            time: new Date().toLocaleTimeString('fa-IR')
        });
        DB.set('notifications', notifications);
        DB.set('notificationsRead', false);
        DB.set('notificationCount', notifications.length);
        
        document.getElementById('notificationTitle').value = '';
        document.getElementById('notificationText').value = '';
        renderNotifications();
        showToast('📢 اعلان با موفقیت منتشر شد!', 'success');
    });
}

function setupAdminPage() {
    if (!isAdmin()) {
        document.querySelector('.main').innerHTML = `
            <div style="text-align:center;padding:50px;color:#ef4444;">
                <span style="font-size:60px;">⛔</span>
                <h2 style="margin-top:20px;">دسترسی غیرمجاز!</h2>
                <p style="color:#7f8da5;">شما اجازه دسترسی به این صفحه را ندارید.</p>
                <button class="primary-btn" onclick="window.location.href='index.html'" style="margin-top:20px;">🏠 بازگشت به خانه</button>
            </div>
        `;
        return;
    }
    
    const tabs = document.querySelectorAll('.admin-tab');
    const panels = {
        lessons: document.getElementById('tab-lessons'),
        users: document.getElementById('tab-users'),
        messages: document.getElementById('tab-messages'),
        notifications: document.getElementById('tab-notifications')
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const tabName = this.dataset.tab;
            Object.keys(panels).forEach(key => {
                panels[key].style.display = key === tabName ? 'block' : 'none';
            });
            if (tabName === 'lessons') renderAdminLessons();
            if (tabName === 'users') renderUsers();
            if (tabName === 'messages') renderMessages();
        });
    });
    
    renderAdminLessons();
    renderUsers();
    renderMessages();
    setupAddLesson();
    setupNotifications();
    document.getElementById('adminStatus').textContent = 'خوش آمدید ادمین!';
}

// ============================================
// سیستم اعلان‌ها برای کاربران
// ============================================

function showNotifications() {
    const panel = document.getElementById('notificationPanel');
    const list = document.getElementById('notificationList');
    const notifications = DB.get('notifications', []);
    const bell = document.getElementById('notificationBell');

    if (!panel) return;

    if (panel.style.display === 'block') {
        panel.style.display = 'none';
        return;
    }

    if (notifications.length === 0) {
        list.innerHTML = '<p style="color:#7f8da5;text-align:center;padding:20px;">🔕 هیچ اعلانی وجود ندارد.</p>';
    } else {
        let html = '';
        notifications.slice().reverse().forEach(notif => {
            const typeClass = notif.type === 'success' ? 'notif-type-success' : notif.type === 'warning' ? 'notif-type-warning' : 'notif-type-info';
            html += `
                <div class="notification-item-panel ${typeClass}">
                    <div class="notif-title-panel">${notif.title}</div>
                    <div class="notif-text-panel">${notif.text}</div>
                    <div class="notif-date-panel">${notif.date} - ${notif.time}</div>
                </div>
            `;
        });
        list.innerHTML = html;

        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.style.display = 'none';
            badge.textContent = '0';
        }

        DB.set('notificationsRead', true);
    }

    panel.style.display = 'block';

    setTimeout(() => {
        document.addEventListener('click', closeNotificationsOutside);
    }, 100);
}

function closeNotifications() {
    const panel = document.getElementById('notificationPanel');
    if (panel) panel.style.display = 'none';
    document.removeEventListener('click', closeNotificationsOutside);
}

function closeNotificationsOutside(e) {
    const panel = document.getElementById('notificationPanel');
    const bell = document.getElementById('notificationBell');
    if (panel && !panel.contains(e.target) && bell && !bell.contains(e.target)) {
        panel.style.display = 'none';
        document.removeEventListener('click', closeNotificationsOutside);
    }
}

function updateNotificationBadge() {
    const notifications = DB.get('notifications', []);
    const read = DB.get('notificationsRead', false);
    const badge = document.getElementById('notificationBadge');

    if (!badge) return;

    if (notifications.length > 0 && !read) {
        badge.style.display = 'flex';
        badge.textContent = notifications.length;
    } else {
        badge.style.display = 'none';
    }
}

function checkNewNotifications() {
    const previousCount = DB.get('notificationCount', 0);
    const notifications = DB.get('notifications', []);
    
    if (notifications.length > previousCount) {
        const newNotif = notifications[notifications.length - 1];
        showToast(`🔔 ${newNotif.title}: ${newNotif.text}`, newNotif.type || 'info');
        
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.style.display = 'flex';
            badge.textContent = notifications.length;
        }
        
        DB.set('notificationCount', notifications.length);
        DB.set('notificationsRead', false);
    }
}

function showUserNotifications() {
    const notifications = DB.get('notifications', []);
    if (notifications.length === 0) return;
    const lastNotif = notifications[notifications.length - 1];
    showToast(`📢 ${lastNotif.title}: ${lastNotif.text}`, lastNotif.type || 'info');
}

// ============================================
// منوی کشویی
// ============================================

function setupHamburgerMenu() {
    const btn = document.getElementById('hamburgerBtn');
    const sidebar = document.querySelector('.sidebar');
    if (!btn || !sidebar) return;

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 99;
    `;
    document.body.appendChild(overlay);

    function toggleMenu() {
        sidebar.classList.toggle('open');
        overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
        const icon = btn.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }

    btn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
            toggleMenu();
        }
    });
}

// ===== تابع فیلتر درس‌ها =====
function filterLessons(filter, search) {
    const container = document.getElementById('allLessonsContainer');
    if (!container) return;

    const lessons = DB.get('lessons', LESSONS_DATA);
    const progress = DB.get('progress', {});
    let filtered = [...lessons];

    if (filter !== 'all') {
        filtered = filtered.filter(lesson => {
            const p = progress[lesson.id] || 0;
            if (filter === 'completed') return p === 100;
            if (filter === 'in-progress') return p > 0 && p < 100;
            if (filter === 'not-started') return p === 0;
            return true;
        });
    }

    if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(lesson =>
            lesson.title.toLowerCase().includes(q) ||
            lesson.category.includes(q) ||
            lesson.description.toLowerCase().includes(q)
        );
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:40px;color:#7f8da5;grid-column:1/-1;">
                <span style="font-size:48px;">🔍</span>
                <p style="margin-top:10px;">هیچ درسی پیدا نشد!</p>
            </div>
        `;
        return;
    }

    let html = '';
    let totalProgress = 0;
    filtered.forEach(lesson => {
        const p = progress[lesson.id] || 0;
        totalProgress += p;
        html += `
            <div class="lesson-card">
                <div class="lesson-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p class="lesson-category">📘 ${lesson.category}</p>
                <p style="font-size:12px;color:#7f8da5;margin-bottom:12px;">${lesson.description}</p>
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
            </div>
        `;
    });
    container.innerHTML = html;

    const avg = filtered.length > 0 ? Math.round(totalProgress / filtered.length) : 0;
    const overallBar = document.getElementById('overallProgress');
    const overallText = document.getElementById('overallProgressText');
    if (overallBar) overallBar.style.width = avg + '%';
    if (overallText) overallText.textContent = avg + '%';
}

// ============================================
// صفحه سکه رایگان
// ============================================

function setupEarnCoinsPage() {
    let adTimer = null;
    let adTimeLeft = 45;
    let isAdWatching = false;
    let lastAdTime = 0;
    const AD_COOLDOWN = 30 * 60 * 1000;
    const AD_DURATION = 45;
    let spinCount = 0;
    let spinChances = 0;

    const userCoinsDisplay = document.getElementById('userCoinsDisplay');
    const startAdBtn = document.getElementById('startAdBtn');
    const completeAdBtn = document.getElementById('completeAdBtn');
    const adMessage = document.getElementById('adMessage');
    const adCooldownSpan = document.getElementById('adCooldown');
    const spinChancesSpan = document.getElementById('spinChances');
    const spinBtn = document.getElementById('spinBtn');
    const spinResult = document.getElementById('spinResult');
    const canvas = document.getElementById('wheelCanvas');

    const prizes = [
        { label: '۵ سکه', value: 5, color: '#4ade80' },
        { label: '۱۰ سکه', value: 10, color: '#60a5fa' },
        { label: '۲۰ سکه', value: 20, color: '#fbbf24' },
        { label: '۵۰ سکه', value: 50, color: '#fb923c' },
        { label: '۲۰۰ سکه', value: 200, color: '#f472b6' },
        { label: 'پوچ', value: 0, color: '#9ca3af' }
    ];

    const weights = [20, 25, 25, 15, 10, 5];

    function updateCoinsDisplay() {
        const coins = DB.get('coins', 0);
        userCoinsDisplay.textContent = coins;
    }

    function addCoins(amount) {
        const coins = DB.get('coins', 0);
        DB.set('coins', coins + amount);
        updateCoinsDisplay();
        showToast(`🪙 ${amount} سکه به حساب شما اضافه شد!`, 'success');
    }

    function updateAdStatus() {
        const now = Date.now();
        const timeSinceLastAd = now - lastAdTime;

        if (lastAdTime === 0) {
            startAdBtn.disabled = false;
            completeAdBtn.disabled = true;
            adMessage.textContent = '✅ آماده تماشا';
            adMessage.style.color = '#4ade80';
            adCooldownSpan.textContent = '۰';
            return;
        }

        if (timeSinceLastAd < AD_COOLDOWN) {
            const remaining = Math.ceil((AD_COOLDOWN - timeSinceLastAd) / 60000);
            startAdBtn.disabled = true;
            completeAdBtn.disabled = true;
            adMessage.textContent = '⏳ لطفاً صبر کن...';
            adMessage.style.color = '#f59e0b';
            adCooldownSpan.textContent = remaining;
        } else {
            startAdBtn.disabled = false;
            completeAdBtn.disabled = true;
            adMessage.textContent = '✅ آماده تماشا';
            adMessage.style.color = '#4ade80';
            adCooldownSpan.textContent = '۰';
        }
    }

    startAdBtn.addEventListener('click', function() {
        if (isAdWatching) return;
        if (startAdBtn.disabled) {
            showToast('⏳ لطفاً منتظر بمان...', 'error');
            return;
        }

        isAdWatching = true;
        adTimeLeft = AD_DURATION;
        startAdBtn.disabled = true;
        completeAdBtn.disabled = true;
        adMessage.textContent = `⏳ در حال پخش تبلیغ... (${adTimeLeft}s)`;
        adMessage.style.color = '#f59e0b';

        adTimer = setInterval(() => {
            adTimeLeft--;
            adMessage.textContent = `⏳ در حال پخش تبلیغ... (${adTimeLeft}s)`;

            if (adTimeLeft <= 0) {
                clearInterval(adTimer);
                adTimer = null;
                completeAdBtn.disabled = false;
                adMessage.textContent = '✅ تبلیغ به پایان رسید! دکمه اتمام را بزن.';
                adMessage.style.color = '#4ade80';
            }
        }, 1000);
    });

    completeAdBtn.addEventListener('click', function() {
        if (completeAdBtn.disabled) return;

        addCoins(20);
        lastAdTime = Date.now();
        isAdWatching = false;
        startAdBtn.disabled = true;
        completeAdBtn.disabled = true;
        adMessage.textContent = '✅ دریافت شد!';
        adMessage.style.color = '#4ade80';

        spinCount++;
        if (spinCount % 3 === 0) {
            spinChances++;
            spinChancesSpan.textContent = spinChances;
            spinBtn.disabled = false;
            spinBtn.textContent = `🎡 بچرخون (${spinChances} شانس)`;
            showToast('🎟️ یک شانس چرخوندن گردونه دریافت کردی!', 'success');
            DB.set('spinChances', spinChances);
        }

        updateAdStatus();
        setTimeout(() => {
            updateAdStatus();
        }, 1000);
    });

    function drawWheel(rotation = 0) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const sliceAngle = (2 * Math.PI) / prizes.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        prizes.forEach((prize, i) => {
            const startAngle = i * sliceAngle + rotation;
            const endAngle = startAngle + sliceAngle;

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
        });

        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#2dd4bf';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    function spinWheel() {
        if (spinChances <= 0) {
            showToast('❌ شانس کافی نداری!', 'error');
            return;
        }

        spinChances--;
        spinChancesSpan.textContent = spinChances;
        spinBtn.disabled = true;
        spinBtn.textContent = '🎡 در حال چرخش...';
        spinResult.textContent = '';
        DB.set('spinChances', spinChances);

        let totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        let selectedIndex = 0;
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                selectedIndex = i;
                break;
            }
        }

        const prize = prizes[selectedIndex];
        const sliceAngle = (2 * Math.PI) / prizes.length;
        const targetRotation = (2 * Math.PI) * 5 + (2 * Math.PI - (selectedIndex * sliceAngle + sliceAngle / 2));

        let currentRotation = 0;
        const duration = 4000;
        const startTime = Date.now();

        function animateWheel() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            currentRotation = targetRotation * ease;

            drawWheel(currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animateWheel);
            } else {
                if (prize.value > 0) {
                    addCoins(prize.value);
                    spinResult.textContent = `🎉 ${prize.label} برنده شدی!`;
                    spinResult.style.color = '#4ade80';
                } else {
                    spinResult.textContent = '😐 متأسفانه پوچ!';
                    spinResult.style.color = '#9ca3af';
                }

                if (spinChances > 0) {
                    spinBtn.disabled = false;
                    spinBtn.textContent = `🎡 بچرخون (${spinChances} شانس)`;
                } else {
                    spinBtn.disabled = true;
                    spinBtn.textContent = '🎡 بچرخون (۰ شانس)';
                }
            }
        }

        animateWheel();
    }

    spinBtn.addEventListener('click', spinWheel);

    setInterval(() => {
        updateAdStatus();
    }, 60000);

    drawWheel();
    updateCoinsDisplay();
    updateAdStatus();

    spinChances = DB.get('spinChances', 0);
    spinChancesSpan.textContent = spinChances;
    if (spinChances > 0) {
        spinBtn.disabled = false;
        spinBtn.textContent = `🎡 بچرخون (${spinChances} شانس)`;
    }
}

// ============================================
// راه‌اندازی اولیه
// ============================================

createDefaultAdmin();

document.addEventListener('DOMContentLoaded', function() {

    updateAuthStatus();

    if (document.getElementById('lessonsContainer')) {
        renderLessons();
    }

    if (document.getElementById('allLessonsContainer')) {
        renderAllLessons();
    }

    if (window.location.pathname.includes('lesson-detail.html')) {
        loadLessonDetail();
    }

    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }

    if (window.location.pathname.includes('support.html')) {
        setupSupportPage();
    }

    if (window.location.pathname.includes('earn-coins.html')) {
        setupEarnCoinsPage();
    }

    if (window.location.pathname.includes('register.html')) {
        setupRegisterPage();
    }

    if (window.location.pathname.includes('login.html')) {
        setupLoginPage();
    }

    if (window.location.pathname.includes('admin.html')) {
        setupAdminPage();
    }

    setupHamburgerMenu();

    const continueBtn = document.getElementById('continueLesson');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            const lastLesson = DB.get('lastLesson', null);
            if (lastLesson) {
                openLesson(lastLesson);
            } else {
                showToast('📚 هنوز درسی رو شروع نکردی!', 'info');
            }
        });
    }

    const searchInput = document.getElementById('searchLessons');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.dataset.filter : 'all';
            filterLessons(filter, this.value);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            const search = document.getElementById('searchLessons')?.value || '';
            filterLessons(filter, search);
        });
    });

    updateNotificationBadge();
    setInterval(checkNewNotifications, 30000);

    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        setTimeout(() => {
            showUserNotifications();
        }, 1000);
    }

    console.log('🌰 فندق با موفقیت بارگذاری شد!');
});