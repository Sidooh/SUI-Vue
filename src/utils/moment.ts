import moment from "moment";

declare module "moment" {
    interface Moment {
        isCurrentYear(): boolean;

        isLastYear(): boolean;

        isCurrentMonth(): boolean;

        isLastMonth(): boolean;

        isCurrentWeek(): boolean;

        isLastWeek(): boolean;

        isToday(): boolean;

        isYesterday(): boolean;

        isCurrentHour(): boolean;

        isLastHour(): boolean;
    }
}

(moment as any).fn.isToday = function (): moment.Moment {
    console.log(this)

    return this.isSame(moment().startOf('d'), 'd');
};
(moment as any).fn.isYesterday = function (): moment.Moment {
    console.log(this)

    return this.isSame(moment().subtract(1, 'd').startOf('d'), 'd');
};