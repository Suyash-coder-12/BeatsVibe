// app.js

// ==========================================
// 1. ADMIN CONTROL ROOM (Student Database)
// Naye admission aane par ID aur password yahan add karna.
// ==========================================
const beatsvibeDatabase = {
    "BV-1001": { password: "pass", name: "Suyash Rathod", courses: ["Data Analytics Pro"] },
    "BV-1002": { password: "tech", name: "Ketan Jadhao", courses: ["MERN Stack Mastery"] }
};

// ==========================================
// 2. COURSES MENU & PAYMENT LINKS
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
    { id: "c9", title: "Blockchain Dev", price: "₹799", icon: "fa-link", desc: "Solidity & Smart Contracts.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c10", title: "DevOps Bootcamp", price: "₹649", icon: "fa-infinity", desc: "CI/CD & Kubernetes.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c11", title: "Machine Learning", price: "₹849", icon: "fa-robot", desc: "Algorithms & Predictive models.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c12", title: "Mobile App (Flutter)", price: "₹499", icon: "fa-mobile-alt", desc: "Cross-platform app dev.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c13", title: "Digital Marketing", price: "₹149", icon: "fa-bullhorn", desc: "Scale business with SEO/ADS.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c14", title: "SQL Database Admin", price: "₹249", icon: "fa-database", desc: "Manage enterprise databases.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" },
    { id: "c15", title: "Game Dev (Unity)", price: "₹549", icon: "fa-gamepad", desc: "3D & 2D game development.", payLink: "INSERT_YOUR_RAZORPAY_LINK_HERE" }
];

// ==========================================
// 3. COURSE CONTENT DATABASE (For lesson.html Video Player)
// ==========================================
const courseData = {
    "Data Analytics Pro": {
        materialLink: "https://drive.google.com/drive/folders/YOUR_PDF_NOTES_LINK", 
        modules: [
            // Tera YouTube video properly embed ho gaya hai
            { title: "1. Data Analytics Full Course | 10 Hours", video: "https://www.youtube.com/embed/BC1bgvwB9HQ?rel=0" },
            { title: "2. Next Module Placeholder", video: "https://www.youtube.com/embed/tgbNymZ7vqY?rel=0" }
        ]
    },
    "MERN Stack Mastery": {
        materialLink: "https://drive.google.com/drive/folders/YOUR_PDF_NOTES_LINK_2",
        modules: [
            { title: "1. HTML/CSS Crash Course", video: "https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0" },
            { title: "2. JavaScript Deep Dive", video: "https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0" }
        ]
    }
};

// ==========================================
// 4. WEBSITE LOGIC & FUNCTIONS
// ==========================================

// --- Login System ---
function handleLogin(event) {
    event.preventDefault();
    const id = document.getElementById('studentId').value.trim();
    const pass = document.getElementById('studentPass').value.trim();

    const student = beatsvibeDatabase[id];

    if (student && student.password === pass) {
        localStorage.setItem('beatsvibe_session', JSON.stringify({ id, name: student.name, courses: student.courses }));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Student ID or Password. Please contact the administrator.");
    }
}

function logout() {
    localStorage.removeItem('beatsvibe_session');
    window.location.href = "index.html";
}

// --- Render Courses on Home Page ---
function renderStore() {
    const grid = document.getElementById('courseGrid');
    if (!grid) return;

    grid.innerHTML = allCourses.map(c => `
        <div class="bg-white p-8 rounded-[32px] border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl mb-6 flex items-center justify-center text-2xl"><i class="fas ${c.icon}"></i></div>
            <h3 class="text-xl font-bold mb-2">${c.title}</h3>
            <p class="text-slate-500 mb-6 text-sm">${c.desc}</p>
            <div class="flex justify-between items-center pt-4 border-t border-slate-50">
                <span class="text-2xl font-extrabold">${c.price}</span>
                <button onclick="buyCourse('${c.id}')" class="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-900 transition-all shadow-lg shadow-blue-200">Buy Now</button>
            </div>
        </div>
    `).join('');
}

// --- Direct Buy Logic (No Login Required) ---
function buyCourse(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    
    if(course.payLink === "INSERT_YOUR_RAZORPAY_LINK_HERE") {
        alert("Payment link is currently being updated. Please try again later.");
        return;
    }
    // Opens specific payment gateway link
    window.open(course.payLink, "_blank");
}

// --- Render Student Dashboard ---
function renderDashboard() {
    const welcomeText = document.getElementById('welcomeText');
    const list = document.getElementById('myCoursesList');
    if (!welcomeText || !list) return;

    const user = JSON.parse(localStorage.getItem('beatsvibe_session'));
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    welcomeText.innerText = `Welcome back, ${user.name}!`;

    if (user.courses.length === 0) {
        list.innerHTML = `<div class="p-10 border-2 border-dashed border-slate-200 rounded-[32px] text-center text-slate-400">You haven't enrolled in any courses yet. <br><a href="index.html" class="text-blue-600 font-bold underline mt-2 inline-block">Explore Academy</a></div>`;
    } else {
        // Connects "Start Learning" button to lesson.html
        list.innerHTML = user.courses.map(courseName => `
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-lg transition">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl"><i class="fas fa-play-circle"></i></div>
                    <span class="font-bold text-lg">${courseName}</span>
                </div>
                <button onclick="window.location.href='lesson.html?course=${encodeURIComponent(courseName)}'" class="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-600 transition shadow-md">Start Learning</button>
            </div>
        `).join('');
    }
}

// --- Lesson Player Logic (For lesson.html) ---
function loadCourseData(courseName) {
    const data = courseData[courseName];
    if (!data) {
        alert("Modules for this course are being uploaded. Check back soon!");
        window.location.href = "dashboard.html";
        return;
    }

    const moduleList = document.getElementById('moduleList');
    const videoPlayer = document.getElementById('videoPlayer');
    const currentVideoName = document.getElementById('currentVideoName');

    if (!moduleList || !videoPlayer) return;

    // Load first video automatically
    videoPlayer.src = data.modules[0].video;
    currentVideoName.innerText = data.modules[0].title;

    // Build sidebar playlist
    moduleList.innerHTML = data.modules.map((mod, index) => `
        <button onclick="playVideo('${mod.video}', '${mod.title}')" class="w-full text-left p-4 rounded-xl hover:bg-blue-50 focus:bg-blue-50 focus:border-blue-200 border border-transparent transition group flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white shrink-0">
                ${index + 1}
            </div>
            <div>
                <p class="font-bold text-slate-700 text-sm group-hover:text-blue-700">${mod.title}</p>
                <p class="text-xs text-slate-400 mt-1"><i class="fas fa-play-circle mr-1"></i> Video Lesson</p>
            </div>
        </button>
    `).join('');

    // Set Download link for Notes
    window.downloadNotes = function() {
        if(data.materialLink === "https://drive.google.com/drive/folders/YOUR_PDF_NOTES_LINK") {
            alert("Notes will be available soon!");
            return;
        }
        window.open(data.materialLink, "_blank");
    };
}

function playVideo(videoUrl, title) {
    document.getElementById('videoPlayer').src = videoUrl;
    document.getElementById('currentVideoName').innerText = title;
}

// --- Utilities ---
function toggleModal(id, show) {
    const modal = document.getElementById(id);
    if(modal) {
        show ? modal.classList.remove('hidden') : modal.classList.add('hidden');
    }
}

// --- Initialize Pages Safely ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('courseGrid')) renderStore();
    if (document.getElementById('welcomeText')) renderDashboard();
    // Security check for lesson.html is handled inside lesson.html directly.
});
