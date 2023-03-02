import moment, { Moment } from "moment";
import { RawAnalytics } from "./types";
import { Frequency, Period } from "./enums";
import pluralize from "pluralize";

export class ChartAid {
    constructor(private period: Period, private frequency: Frequency = Frequency.DAILY) {
    }

    dataset = (raw: RawAnalytics[], freqCount?: number) => {
        let labels: string[] = [], dataset: number[] = []

        if (!freqCount) {
            freqCount = this.getFrequencyCount()
        }

        let date = moment(), label: string

        for (let i = 0; i < freqCount; i++) {
            label = this.getLabel(date)

            labels.push(label)
            dataset.push(this.aggregate(raw, date))

            date = this.subtractUnits(date)
        }

        labels.reverse()
        dataset.reverse()

        return { labels, dataset }
    }

    private aggregate = (data: RawAnalytics[], date: Moment) => {
        const totalCount = (format: string) => data.filter(x => moment(x.date, 'YYYYMMDDH').format(format) === date.format(format))
            .reduce((a, b) => a + b.count, 0)

        switch (this.frequency) {
            case Frequency.QUARTERLY:
                return totalCount('YYYYQ')
            case Frequency.MONTHLY:
                return totalCount('YYYYMM')
            case Frequency.WEEKLY:
                return totalCount('YYYYW')
            case Frequency.DAILY:
                return totalCount('YYYYMMDD')
            default:
                return data?.find(x => String(x.date) === date.format('YYYYMMDDH'))?.count ?? 0
        }
    }

    private getFrequencyCount() {
        switch (this.period) {
            case Period.TODAY:
                return 24
            case Period.LAST_SEVEN_DAYS:
                return 7
            case Period.LAST_THIRTY_DAYS:
                return this.frequency === Frequency.WEEKLY ? moment().subtract(30, 'd').weeks() : 30
            case Period.LAST_THREE_MONTHS:
                return this.frequency === Frequency.MONTHLY ? 3 : moment().subtract(30, 'M').weeks()
            case Period.LAST_SIX_MONTHS:
                return 6
            case Period.YTD:
                return this.frequency === Frequency.QUARTERLY ? 4 : 13
        }
    }

    private subtractUnits(date: Moment) {
        switch (this.frequency) {
            case Frequency.HOURLY:
                date = date.subtract(1, 'h')
                break
            case Frequency.DAILY:
                date = date.subtract(1, 'd')
                break
            case Frequency.WEEKLY:
                date = date.subtract(1, 'w')
                break
            case Frequency.QUARTERLY:
                date = date.subtract(3, 'M');
                break;
            case Frequency.MONTHLY:
            case Frequency.YEARLY:
                date = date.subtract(1, 'M')
                break;
            default:
                date = date.subtract(1, 'd')
        }

        return date
    }

    private getLabel(date: Moment) {
        switch (this.frequency) {
            case Frequency.YEARLY:
                return date.year().toString()
            case Frequency.QUARTERLY:
                const endDate = date.format('MMM'),
                    startDate = moment(date).subtract(2, 'M').format('MMM')

                return `${startDate} : ${endDate}`
            case Frequency.MONTHLY:
                return date.format('MMM')
            case Frequency.WEEKLY:
                const diff = moment().diff(date, 'w')

                return diff < 1 ? 'This Week' : `${diff} ${pluralize('week', diff)} ago`
            case Frequency.DAILY:
                return date.format(this.period === Period.LAST_SEVEN_DAYS ? 'ddd' : 'Do')
            default:
                return date.format('HH00')
        }
    }
}