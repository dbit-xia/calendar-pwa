declare module 'lunar-javascript' {
    export class Solar {
        static fromDate(date: Date): Solar;
        getLunar(): Lunar;
    }

    export class Lunar {
        getYear(): number;
        getMonth(): number;
        getDay(): number;
        getYearInChinese(): string;
        getMonthInChinese(): string;
        getDayInChinese(): string;
        getYearInGanZhi(): string;
        getMonthInGanZhi(): string;
        getDayInGanZhi(): string;
        getFestivals(): string[];
    }
}
