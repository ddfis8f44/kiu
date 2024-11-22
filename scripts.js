// مفتاح الـ API الخاص بك (استبدله بالمفتاح الذي تحصل عليه من Football-Data.org)
const API_KEY = '6cb202f56b734caaba0b99d2e14d4764e';

// رابط الـ API لجلب المباريات
const API_URL = 'https://api.football-data.org/v4/matches';

// دالة لجلب المباريات من الـ API وعرضها في الجدول
async function loadMatches() {
    try {
        // إرسال طلب إلى الـ API
        const response = await fetch(API_URL, {
            headers: {
                '6cb202f56b734caaba0b99d2e14d4764': API_KEY  // إضافة المفتاح في الهيدر
            }
        });

        // التحقق من حالة الاستجابة
        if (!response.ok) {
            throw new Error('تعذر جلب المباريات');
        }

        // تحويل البيانات إلى JSON
        const data = await response.json();

        // الحصول على الـ matches من البيانات
        const matches = data.matches;

        // تحديد المكان الذي سيتم إضافة المباريات فيه
        const tableBody = document.querySelector('#match-table tbody');
        tableBody.innerHTML = ''; // مسح الجدول القديم

        // إضافة المباريات إلى الجدول
        matches.forEach(match => {
            const date = new Date(match.utcDate);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${match.homeTeam.name} × ${match.awayTeam.name}</td>
                <td>${match.status === 'FINISHED' ? match.score.fullTime.homeTeam + ' - ' + match.score.fullTime.awayTeam : 'قريباً'}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('خطأ في جلب المباريات:', error);
        alert('حدث خطأ أثناء تحميل المباريات. يرجى المحاولة لاحقًا.');
    }
}

// تحميل المباريات عند تحميل الصفحة
window.onload = loadMatches;
