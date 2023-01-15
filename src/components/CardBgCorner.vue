<template>
    <div class="bg-holder bg-card" :style="`background-image:url(${image})`"/>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ corner?: 1 | 2 | 3 | 4 | 5 }>()

const corner = ref(props.corner ?? 1)

const image = `/images/icons/spot-illustrations/corner-${corner.value}.png`
</script>