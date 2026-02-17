// app.js

// ==========================================
// 1. ADMIN CONTROL ROOM (Tera Private Database)
// ==========================================
const beatsvibeDatabase = {
    "BV-1001": { password: "pass", name: "Suyash Rathod", courses: ["Data Analytics Pro"] },
    "BV-1002": { password: "tech", name: "Ketan Jadhao", courses: ["MERN Stack Mastery"] },
    "BV-1003": { password: "mona", name: "Mohini Borkar", courses: ["Data Analytics Pro", "MERN Stack Mastery"] }
};

// ==========================================
// 2. COURSES MENU & RAZORPAY LINKS
// ==========================================
const allCourses = [
    { id: "c1", title: "Data Analytics Pro", price: "₹249", icon: "fa-chart-pie", desc: "Master SQL, PowerBI & Python.", payLink: "https://rzp.io/rzp/YteZfW52" },
    { id: "c2", title: "MERN Stack Mastery", price: "₹499", icon: "fa-code", desc: "Full-stack web dev bootcamp.", payLink: "https://rzp.io/rzp/RpTvBjV" },
    { id: "c3", title: "AI & Neural Networks", price: "₹899", icon: "fa-brain", desc: "Build advanced AI models.", payLink: "https://rzp.io/rzp/84MUXtO" },
    { id: "c4", title: "Cybersecurity Expert", price: "₹399", icon: "fa-shield-alt", desc: "Network security & ethical hacking.", payLink: "https://rzp.io/rzp/MO5sHK0" },
    { id: "c5", title: "Python for Finance", price: "₹299", icon: "fa-coins", desc: "Financial data analysis.", payLink: "https://rzp.io/rzp/wwWdXC5f" },
    { id: "c6", title: "Cloud Ops (AWS)", price: "₹599", icon: "fa-cloud", desc: "Manage scalable cloud infra.", payLink: "https://rzp.io/rzp/dNORm22" },
    { id: "c7", title: "UI/UX Design Systems", price: "₹199", icon: "fa-paint-brush", desc: "Master Figma & Design.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c8", title: "Ethical Hacking 2.0", price: "₹449", icon: "fa-user-secret", desc: "Advanced VAPT training.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c9", title: "Blockchain Dev", price: "₹799", icon: "fa-link", desc: "Solidity & Smart Contracts.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" }
];

// ==========================================
// 3. COURSE CONTENT (lesson.html Video Player Links)
// ==========================================
const courseData = {
    "Data Analytics Pro": {
        materialLink: "https://drive.google.com/drive/folders/YOUR_PDF_LINK", 
        modules: [
            { title: "1. Data Analytics Full Course | 10 Hours", video: "https://www.youtube.com/embed/BC1bgvwB9HQ?rel=0" },
            { title: "2. SQL Queries Mastery", video: "https://www.youtube.com/embed/tgbNymZ7vqY?rel=0" }
        ]
    },
    "MERN Stack Mastery": {
        materialLink: "https://drive.google.com/drive/folders/YOUR_PDF_LINK_2",
        modules: [
            { title: "1. HTML/CSS Crash Course", video: "https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0" }
        ]
    }
};

// ==========================================
// 4. CORE FUNCTIONS (Login, Buy, Theme)
// ==========================================
function handleLogin(event) {
    event.preventDefault();
    const id = document.getElementById('studentId').value.trim();
    const pass = document.getElementById('studentPass').value.trim();
    const student = beatsvibeDatabase[id];

    if (student && student.password === pass) {
        localStorage.setItem('beatsvibe_session', JSON.stringify({ id, name: student.name, courses: student.courses }));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Student ID or Password. Please contact Suyash Rathod.");
    }
}

function logout() {
    localStorage.removeItem('beatsvibe_session');
    window.location.href = "index.html";
}

function buyCourse(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    if(course.payLink === "INSERT_YOUR_RAZORPAY_LINK_HERE") {
        alert("Payment link is currently being updated. Please try again later.");
        return;
    }
    window.open(course.payLink, "_blank");
}

function renderStore() {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    grid.innerHTML = allCourses.map(c => `
        <div class="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 hover-card-anim shadow-sm">
            <div class="w-14 h-14 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-2xl mb-6 flex items-center justify-center text-2xl"><i class="fas ${c.icon}"></i></div>
            <h3 class="text-xl font-bold mb-2 dark:text-white">${c.title}</h3>
            <p class="text-slate-500 dark:text-slate-400 mb-6 text-sm">${c.desc}</p>
            <div class="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-700">
                <span class="text-2xl font-extrabold dark:text-white">${c.price}</span>
                <button onclick="buyCourse('${c.id}')" class="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-900 dark:hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30">Buy Now</button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 5. DASHBOARD TABS & RENDERING
// ==========================================
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('block'));
    
    document.querySelectorAll('.dash-tab').forEach(el => {
        el.className = 'dash-tab w-full text-left p-3 rounded-xl font-bold text-sm transition flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';
    });

    document.getElementById('tab-' + tabId).classList.remove('hidden');
    document.getElementById('tab-' + tabId).classList.add('block');

    const btn = document.getElementById('btn-' + tabId);
    if(btn) btn.className = 'dash-tab w-full text-left p-3 rounded-xl font-bold text-sm transition flex items-center gap-3 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
}

function renderDashboard() {
    const welcomeText = document.getElementById('welcomeText');
    const coursesList = document.getElementById('myCoursesList');
    const notesList = document.getElementById('myNotesList');
    
    if (!welcomeText || !coursesList) return;

    const user = JSON.parse(localStorage.getItem('beatsvibe_session'));
    if (!user) { window.location.href = "index.html"; return; }

    if(document.getElementById('set-name')) document.getElementById('set-name').value = user.name;
    if(document.getElementById('set-id')) document.getElementById('set-id').value = user.id;
    if(document.getElementById('dashName')) document.getElementById('dashName').innerText = user.name.split(' ')[0];

    welcomeText.innerText = `Welcome back, ${user.name.split(' ')[0]}!`;

    if (user.courses.length === 0) {
        coursesList.innerHTML = `<div class="col-span-full p-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[32px] text-center text-slate-400">You haven't enrolled in any courses yet. <br><a href="index.html" class="text-blue-600 dark:text-blue-400 font-bold underline mt-2 inline-block">Explore Academy</a></div>`;
        notesList.innerHTML = `<div class="p-6 text-slate-400 italic">No study material available yet.</div>`;
    } else {
        coursesList.innerHTML = user.courses.map(courseName => `
            <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center hover:shadow-lg transition">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center text-xl"><i class="fas fa-play"></i></div>
                    <span class="font-bold text-lg dark:text-white">${courseName}</span>
                </div>
                <button onclick="window.location.href='lesson.html?course=${encodeURIComponent(courseName)}'" class="bg-slate-900 dark:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 dark:hover:bg-blue-500 transition shadow-md">Watch</button>
            </div>
        `).join('');

        notesList.innerHTML = user.courses.map(courseName => {
            const link = (courseData[courseName] && courseData[courseName].materialLink) ? courseData[courseName].materialLink : '#';
            const action = link === '#' ? `alert('Notes for ${courseName} will be uploaded soon!')` : `window.open('${link}', '_blank')`;
            return `
            <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex justify-between items-center mb-4">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl flex items-center justify-center text-2xl"><i class="fas fa-file-pdf"></i></div>
                    <div><h4 class="font-bold dark:text-white">${courseName} - Guide</h4><p class="text-xs text-slate-400">Premium Notes</p></div>
                </div>
                <button onclick="${action}" class="bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition">Download</button>
            </div>`;
        }).join('');
    }
}

// ==========================================
// 6. LESSON PLAYER LOGIC
// ==========================================
function loadCourseData(courseName) {
    const data = courseData[courseName];
    if (!data) {
        alert("Modules for this course are currently being uploaded. Check back soon!");
        window.location.href = "dashboard.html";
        return;
    }

    const moduleList = document.getElementById('moduleList');
    const videoPlayer = document.getElementById('videoPlayer');
    const currentVideoName = document.getElementById('currentVideoName');

    if (!moduleList || !videoPlayer) return;

    videoPlayer.src = data.modules[0].video;
    currentVideoName.innerText = data.modules[0].title;

    moduleList.innerHTML = data.modules.map((mod, index) => `
        <button onclick="playVideo('${mod.video}', '${mod.title}')" class="w-full text-left p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 border border-transparent transition group flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white shrink-0">${index + 1}</div>
            <div>
                <p class="font-bold text-slate-700 dark:text-slate-200 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">${mod.title}</p>
                <p class="text-xs text-slate-400 mt-1"><i class="fas fa-play-circle mr-1"></i> Video Lesson</p>
            </div>
        </button>
    `).join('');

    window.downloadNotes = function() {
        if(!data.materialLink || data.materialLink.includes("YOUR_PDF_LINK")) {
            alert("Study material will be updated soon!");
            return;
        }
        window.open(data.materialLink, "_blank");
    };
}

function playVideo(videoUrl, title) {
    document.getElementById('videoPlayer').src = videoUrl;
    document.getElementById('currentVideoName').innerText = title;
}

// ==========================================
// 7. THEME & UTILITIES
// ==========================================
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.querySelectorAll('.fa-moon, .fa-sun').forEach(icon => {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

function toggleModal(id, show) {
    const modal = document.getElementById(id);
    if(modal) show ? modal.classList.remove('hidden') : modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('courseGrid')) renderStore();
    if (document.getElementById('welcomeText')) renderDashboard();
});
