import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { Initiator, Status, TransactionType } from "./enums";

type RouteChildType = {
    name: string
    to: string
    active?: boolean
    icon?: IconDefinition
    children?: RouteChildType[]
}
export type RouteType = {
    label?: string
    children: RouteChildType[]
}

export type Model = {
    id: number
    created_at?: string
    updated_at?: string
}

export type User = Model & {
    name: string
    email: string
    username: string
    id_number: number
    status: Status
    password: string
}

export type Account = Model & {
    phone: string
    active: boolean
    inviter_id: number
    user_id: number
    user: User
    inviter: Invite
    invite_code: string
    level: number
}

export type Invite = Model & {
    phone: string
    status: Status
    type: string
    inviter_id: number
    account_id: number

    user: User
    inviter?: Omit<Account, 'inviter'>,
}

export type Transaction = Model & {
    account_id: number
    product_id: number

    initiator: Initiator
    type: TransactionType
    amount: number
    charge: number
    status: Status
    description: string
    destination: string
}

export type Subscription = Model & {
    account_id: number
    subscription_type_id: number

    start_date: string
    end_date: string
    status: Status
}

export type RawAnalytics = {
    date: number
    count: number
}
