export interface Holiday {
    date: string; // YYYY-MM-DD format
    name: string;
    type: 'legal' | 'traditional' | 'solar'; // 法定假日 | 传统节日 | 节气
    isRest?: boolean; // 是否休息日
    lunarDate?: string; // 农历日期，用于农历节日
}

// 2026年节假日数据
export const holidays2026: Holiday[] = [
    // 法定假日
    { date: '2026-01-01', name: '元旦', type: 'legal', isRest: true },
    { date: '2026-02-17', name: '春节', type: 'legal', isRest: true },
    { date: '2026-02-18', name: '春节', type: 'legal', isRest: true },
    { date: '2026-02-19', name: '春节', type: 'legal', isRest: true },
    { date: '2026-02-20', name: '春节', type: 'legal', isRest: true },
    { date: '2026-02-21', name: '春节', type: 'legal', isRest: true },
    { date: '2026-02-22', name: '春节', type: 'legal', isRest: true },
    { date: '2026-02-23', name: '春节', type: 'legal', isRest: true },
    { date: '2026-04-05', name: '清明节', type: 'legal', isRest: true },
    { date: '2026-05-01', name: '劳动节', type: 'legal', isRest: true },
    { date: '2026-06-25', name: '端午节', type: 'legal', isRest: true },
    { date: '2026-10-01', name: '国庆节', type: 'legal', isRest: true },
    { date: '2026-10-02', name: '国庆节', type: 'legal', isRest: true },
    { date: '2026-10-03', name: '国庆节', type: 'legal', isRest: true },

    // 传统节日
    { date: '2026-02-03', name: '除夕', type: 'traditional', lunarDate: '腊月廿九' },
    { date: '2026-02-16', name: '除夕', type: 'traditional', lunarDate: '腊月三十' },
    { date: '2026-03-05', name: '元宵节', type: 'traditional', lunarDate: '正月十五' },
    { date: '2026-05-28', name: '端午节', type: 'traditional', lunarDate: '五月初五' },
    { date: '2026-08-26', name: '七夕节', type: 'traditional', lunarDate: '七月初七' },
    { date: '2026-09-15', name: '中秋节', type: 'traditional', lunarDate: '八月十五' },
    { date: '2026-10-25', name: '重阳节', type: 'traditional', lunarDate: '九月初九' },

    // 二十四节气 2026
    { date: '2026-01-05', name: '小寒', type: 'solar' },
    { date: '2026-01-20', name: '大寒', type: 'solar' },
    { date: '2026-02-04', name: '立春', type: 'solar' },
    { date: '2026-02-18', name: '雨水', type: 'solar' },
    { date: '2026-03-05', name: '惊蛰', type: 'solar' },
    { date: '2026-03-20', name: '春分', type: 'solar' },
    { date: '2026-04-04', name: '清明', type: 'solar' },
    { date: '2026-04-20', name: '谷雨', type: 'solar' },
    { date: '2026-05-05', name: '立夏', type: 'solar' },
    { date: '2026-05-21', name: '小满', type: 'solar' },
    { date: '2026-06-05', name: '芒种', type: 'solar' },
    { date: '2026-06-21', name: '夏至', type: 'solar' },
    { date: '2026-07-07', name: '小暑', type: 'solar' },
    { date: '2026-07-22', name: '大暑', type: 'solar' },
    { date: '2026-08-07', name: '立秋', type: 'solar' },
    { date: '2026-08-23', name: '处暑', type: 'solar' },
    { date: '2026-09-07', name: '白露', type: 'solar' },
    { date: '2026-09-23', name: '秋分', type: 'solar' },
    { date: '2026-10-08', name: '寒露', type: 'solar' },
    { date: '2026-10-23', name: '霜降', type: 'solar' },
    { date: '2026-11-07', name: '立冬', type: 'solar' },
    { date: '2026-11-22', name: '小雪', type: 'solar' },
    { date: '2026-12-07', name: '大雪', type: 'solar' },
    { date: '2026-12-21', name: '冬至', type: 'solar' },
];

const holidayMap = new Map<string, Holiday[]>();

// 构建索引
holidays2026.forEach(holiday => {
    const existing = holidayMap.get(holiday.date) || [];
    existing.push(holiday);
    holidayMap.set(holiday.date, existing);
});

export function getHolidaysForDate(date: Date): Holiday[] {
    const dateStr = formatDate(date);
    return holidayMap.get(dateStr) || [];
}

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
