import { Solar } from 'lunar-javascript';
export function getLunarDate(date) {
    const solar = Solar.fromDate(date);
    const lunar = solar.getLunar();
    return {
        year: String(lunar.getYear()),
        month: String(lunar.getMonth()),
        day: String(lunar.getDay()),
        yearInChinese: lunar.getYearInChinese(),
        monthInChinese: lunar.getMonthInChinese(),
        dayInChinese: lunar.getDayInChinese(),
        yearInGanZhi: lunar.getYearInGanZhi(),
        monthInGanZhi: lunar.getMonthInGanZhi(),
        dayInGanZhi: lunar.getDayInGanZhi(),
        festivals: lunar.getFestivals(),
    };
}
export function getLunarDayDisplay(date) {
    const lunar = getLunarDate(date);
    // 如果是初一，显示月份
    if (lunar.day === '1') {
        return lunar.monthInChinese;
    }
    return lunar.dayInChinese;
}
export function getLunarMonthDay(date) {
    const lunar = getLunarDate(date);
    return `${lunar.monthInChinese}${lunar.dayInChinese}`;
}
//# sourceMappingURL=lunar.js.map