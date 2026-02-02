import { getLunarDate, getLunarDayDisplay } from './lunar.js';
import { getHolidaysForDate, formatDate } from './holidays.js';
export class Calendar {
    constructor() {
        this.selectedDate = null;
        this.holidayFilter = 'all';
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
    }
    render() {
        this.renderYearSelector();
        this.renderMonthSelector();
        this.renderCalendarGrid();
    }
    renderYearSelector() {
        const yearSelect = document.getElementById('yearSelect');
        if (!yearSelect)
            return;
        yearSelect.innerHTML = '';
        const currentYear = new Date().getFullYear();
        for (let year = currentYear - 5; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = String(year);
            option.textContent = `${year}年`;
            if (year === this.currentYear) {
                option.selected = true;
            }
            yearSelect.appendChild(option);
        }
    }
    renderMonthSelector() {
        const monthSelect = document.getElementById('monthSelect');
        if (!monthSelect)
            return;
        monthSelect.innerHTML = '';
        for (let month = 0; month < 12; month++) {
            const option = document.createElement('option');
            option.value = String(month);
            option.textContent = `${month + 1}月`;
            if (month === this.currentMonth) {
                option.selected = true;
            }
            monthSelect.appendChild(option);
        }
    }
    renderCalendarGrid() {
        const grid = document.getElementById('calendarGrid');
        if (!grid)
            return;
        grid.innerHTML = '';
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        // 获取第一天是星期几 (0=周日, 1=周一, ..., 6=周六)
        // 转换为周一开始 (0=周一, 1=周二, ..., 6=周日)
        let firstDayOfWeek = firstDay.getDay();
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        // 上个月的日期填充
        const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0);
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthLastDay.getDate() - i;
            const date = new Date(this.currentYear, this.currentMonth - 1, day);
            grid.appendChild(this.createDateCell(date, true));
        }
        // 当前月的日期
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            grid.appendChild(this.createDateCell(date, false));
        }
        // 下个月的日期填充
        const remainingCells = 42 - grid.children.length; // 6行 x 7列
        for (let day = 1; day <= remainingCells; day++) {
            const date = new Date(this.currentYear, this.currentMonth + 1, day);
            grid.appendChild(this.createDateCell(date, true));
        }
    }
    createDateCell(date, isOtherMonth) {
        const cell = document.createElement('div');
        cell.className = 'date-cell';
        if (isOtherMonth) {
            cell.classList.add('other-month');
        }
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        if (isToday) {
            cell.classList.add('today');
        }
        // 周末样式
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            cell.classList.add('weekend');
        }
        // 获取节假日信息
        const holidays = getHolidaysForDate(date);
        const filteredHolidays = this.filterHolidays(holidays);
        if (filteredHolidays.length > 0) {
            cell.classList.add('has-holiday');
        }
        // 日期数字
        const dayNum = document.createElement('div');
        dayNum.className = 'day-number';
        dayNum.textContent = String(date.getDate());
        // 添加休息日标记
        const hasRestDay = holidays.some(h => h.isRest);
        if (hasRestDay) {
            const badge = document.createElement('span');
            badge.className = 'rest-badge';
            badge.textContent = '休';
            dayNum.appendChild(badge);
        }
        cell.appendChild(dayNum);
        // 农历日期或节日
        const lunarText = document.createElement('div');
        lunarText.className = 'lunar-text';
        if (filteredHolidays.length > 0) {
            lunarText.textContent = filteredHolidays[0].name;
            lunarText.classList.add(`holiday-${filteredHolidays[0].type}`);
        }
        else {
            lunarText.textContent = getLunarDayDisplay(date);
        }
        cell.appendChild(lunarText);
        // 点击事件
        cell.addEventListener('click', () => {
            this.selectDate(date, cell);
        });
        return cell;
    }
    filterHolidays(holidays) {
        if (this.holidayFilter === 'all') {
            return holidays;
        }
        return holidays.filter(h => h.type === this.holidayFilter);
    }
    selectDate(date, cellElement) {
        this.selectedDate = date;
        // 更新选中状态
        document.querySelectorAll('.date-cell').forEach(cell => {
            cell.classList.remove('selected');
        });
        cellElement.classList.add('selected');
        this.showDateInfo(date);
    }
    showDateInfo(date) {
        const lunarInfo = getLunarDate(date);
        const holidays = getHolidaysForDate(date);
        const titleEl = document.getElementById('lunarTitle');
        const detailsEl = document.getElementById('lunarDetails');
        if (!titleEl || !detailsEl)
            return;
        // 标题
        titleEl.textContent = `${lunarInfo.monthInChinese}${lunarInfo.dayInChinese}`;
        // 详细信息
        let html = `<div class="info-row">
      <span class="info-label">公历:</span>
      <span class="info-value">${formatDate(date)}</span>
    </div>`;
        html += `<div class="info-row">
      <span class="info-label">农历:</span>
      <span class="info-value">${lunarInfo.yearInGanZhi}年 ${lunarInfo.monthInChinese}${lunarInfo.dayInChinese}</span>
    </div>`;
        if (holidays.length > 0) {
            html += `<div class="info-row">
        <span class="info-label">节日:</span>
        <span class="info-value">`;
            holidays.forEach((holiday, index) => {
                const typeIcon = holiday.type === 'legal' ? '🔴' :
                    holiday.type === 'traditional' ? '🎊' : '🌸';
                html += `${typeIcon} ${holiday.name}`;
                if (index < holidays.length - 1)
                    html += '<br>';
            });
            html += `</span></div>`;
        }
        if (lunarInfo.festivals.length > 0) {
            html += `<div class="info-row">
        <span class="info-label">传统:</span>
        <span class="info-value">${lunarInfo.festivals.join('、')}</span>
      </div>`;
        }
        detailsEl.innerHTML = html;
    }
    navigateMonth(offset) {
        this.currentMonth += offset;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    }
    setYear(year) {
        this.currentYear = year;
        this.render();
    }
    setMonth(month) {
        this.currentMonth = month;
        this.render();
    }
    goToToday() {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.render();
    }
    setHolidayFilter(filter) {
        this.holidayFilter = filter;
        this.render();
    }
}
//# sourceMappingURL=calendar.js.map