import { Calendar } from './calendar.js';
// 初始化日历
const calendar = new Calendar();
// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    calendar.render();
    // 绑定事件监听器
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayBtn');
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const holidayType = document.getElementById('holidayType');
    prevMonthBtn?.addEventListener('click', () => {
        calendar.navigateMonth(-1);
    });
    nextMonthBtn?.addEventListener('click', () => {
        calendar.navigateMonth(1);
    });
    todayBtn?.addEventListener('click', () => {
        calendar.goToToday();
    });
    yearSelect?.addEventListener('change', (e) => {
        const target = e.target;
        calendar.setYear(parseInt(target.value));
    });
    monthSelect?.addEventListener('change', (e) => {
        const target = e.target;
        calendar.setMonth(parseInt(target.value));
    });
    holidayType?.addEventListener('change', (e) => {
        const target = e.target;
        calendar.setHolidayFilter(target.value);
    });
    // 注册 Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.log('ServiceWorker registration successful:', registration.scope);
            }, (err) => {
                console.log('ServiceWorker registration failed:', err);
            });
        });
    }
});
//# sourceMappingURL=main.js.map