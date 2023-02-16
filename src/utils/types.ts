import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { Status } from "./enums";

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
    id?: number
    created_at?: string
    updated_at?: string
}
export type User = Model & {
    id: number
    name: string
    email: string
    username: string
    id_number: number
    status: Status
    password: string
}


export type Account = Model & {
    id: number
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
    id: number
    phone: string
    status: Status
    inviter_id: number
    account_id: number
    user: User
    inviter?: Omit<Account, 'inviter'>,
}