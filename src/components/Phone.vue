<template>
<span :class="`fw-bolder`" :style="{color}">
    {{ String(phoneNumber).replace('+', '') }}
</span>
</template>

<script setup lang="ts">
import { Telco } from "@/utils/enums";
import { getTelcoFromPhone } from "@/utils/helpers";

const props = defineProps<{ phone?: string | number }>();
const telco = getTelcoFromPhone(String(props.phone));
let color = '#648381',
    phoneNumber = props.phone ?? 'N/A';

if (telco === Telco.SAFARICOM) {
    color = '#59BC58';
} else if (telco === Telco.AIRTEL) {
    color = '#EE4326';
} else if (telco === Telco.TELKOM) {
    color = '#30AACB';
}
</script>

<style scoped>

</style>