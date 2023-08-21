export enum Status {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
    FAILED = 'FAILED',
    INACTIVE = 'INACTIVE',
    PAID = 'PAID',
    PENDING = 'PENDING',
    REFUNDED = 'REFUNDED',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
}

export enum Telco {
    AIRTEL = 'AIRTEL',
    EQUITEL = 'EQUITEL',
    FAIBA = 'FAIBA',
    SAFARICOM = 'SAFARICOM',
    TELKOM = 'TELKOM',
}

export enum Period {
    TODAY = 'today',
    LAST_SEVEN_DAYS = 'last_7_days',
    LAST_THIRTY_DAYS = 'last_30_days',
    LAST_THREE_MONTHS = 'last_3_months',
    LAST_SIX_MONTHS = 'last_6_months',
    YTD = 'ytd',
}

export enum Frequency {
    HOURLY = 'HOURLY',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY'
}

export enum Initiator {
    AGENT = 'AGENT',
    CONSUMER = 'CONSUMER',
    ENTERPRISE = 'ENTERPRISE'
}

export enum TransactionType {
    PAYMENT = 'PAYMENT',
    WITHDRAWAL = 'WITHDRAWAL'
}

export enum InviteType {
    INVITED = 'INVITED',
    INVITE_CODE = 'INVITE_CODE'
}