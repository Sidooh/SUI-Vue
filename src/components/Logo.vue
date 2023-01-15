<template>
    <a href="/" class="text-decoration-none"
       :class="{ 'navbar-brand text-left': ['navbar-vertical', 'navbar-top'].includes(at) }">
        <div class="d-flex" :class="{
            'align-items-center py-3': at === 'navbar-vertical',
            'align-items-center': at === 'navbar-top',
            'flex-center fw-bolder fs-5 mb-4': at === 'auth',
            'flex-column': serviceName
        }">
            <img class="me-2" :src="src" alt="Logo" :width="width"/>
            <h6 :style="`font-family:'Avenir Regular', sans-serif; font-weight: bolder; margin: -.${width * .4}rem 0 0; fontSize: ${width * .1}pt`"
                v-if="serviceName">{{ serviceName }}</h6>
        </div>
    </a>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ src: string, serviceName?: string, width?: number, at?: 'navbar-vertical' | 'navbar-top' | 'auth', }>()
const at = ref(props.at ?? 'auth')
const width = ref(props.width ?? 78)
</script>