<template>
<span :class="`badge badge-soft-${color} rounded-pill`">
    <font-awesome-icon :icon="icon ?? ''"/> {{ status }}
</span>
</template>

<script setup lang="ts">
import { Status } from "../utils";
import {
    faCalendarXmark,
    faCheck,
    faCircleExclamation,
    faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{ status: Status }>(),
    status = props.status?.toUpperCase() as Status

const statusProps = (status: Status) => {
    let color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' = 'dark', icon;

    if ([Status.COMPLETED, Status.ACTIVE, Status.PAID, Status.APPROVED].includes(status)) {
        color = 'success';
        icon = faCheck;
    } else if (status === Status.PENDING) {
        color = 'warning';
        icon = faHourglassStart;
    } else if ([Status.FAILED, Status.INACTIVE, Status.DECLINED].includes(status)) {
        color = 'danger';
        icon = faCircleExclamation;
    } else if ([Status.EXPIRED].includes(status)) {
        color = 'secondary';
        icon = faCalendarXmark;
    }

    return { color, icon };
};

const { color, icon } = statusProps(status);
</script>