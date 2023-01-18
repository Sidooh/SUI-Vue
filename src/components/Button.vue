<template>
    <button class="btn btn-primary position-relative" :id="id">
        <slot/>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: number | string }>()
</script>

<style scoped>

</style>