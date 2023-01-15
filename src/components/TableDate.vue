<template>
    <span v-if="date">
        <strong>{{ dateOverTime ? relativeDate : moment(date).format("hh:mm A") }}</strong><br>
        <small>{{ dateOverTime ? moment(date).format("hh:mm A") : relativeDate }}</small>
    </span>
    <small v-else v-text="'N/A'"/>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref } from "vue";

const props = defineProps<{ date?: string, dateOverTime?: boolean }>()

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

let relativeDate = ref();

if (moment(props.date).isSame(TODAY, "d")) {
    relativeDate.value = "Today";
} else if (moment(props.date).isSame(YESTERDAY, "d")) {
    relativeDate.value = "Yesterday";
} else {
    relativeDate.value = moment(props.date).format("D.M.y");
}
</script>

<style scoped>

</style>