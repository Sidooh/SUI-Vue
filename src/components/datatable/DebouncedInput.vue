<template>
    <input :type="type ?? 'text'" class="form-control form-control-sm" v-model="queryString">
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    type?: string
    query: string | number
    onChange: (value: string | number) => void
    debounce?: number
    label?: string
}>()

const queryString = ref(props.query)

watch(queryString, newVal => setTimeout(() => props.onChange(newVal), props.debounce ?? 500))
</script>