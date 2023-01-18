<template>
    <button class="btn btn-primary position-relative" :id="id">
        <slot/>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<style scoped>

</style>