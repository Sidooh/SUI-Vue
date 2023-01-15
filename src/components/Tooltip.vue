<template>
    <div class="tooltip-wrapper">
        <span class="tooltip-target" @mouseenter="show = true" @mouseleave="show = false" @focus="show = true"
              @blur="show = false">
            <slot/>
        </span>

        <div v-show="show" class="tooltip-container" :class="placement">
            <span class="tooltip-box" :class="placement">{{ title }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ title: string, placement?: 'top' | 'left' | 'bottom' | 'right' }>()

const placement = ref(props.placement ?? 'bottom')
const show = ref(false)
</script>

<style scoped>
.tooltip-wrapper {
    position: relative;
    display: inline-flex;
    z-index: 700;
}

.tooltip-target {
    border: none;
    background: none;
    padding: 5px;
    margin: -1px;
    color: inherit;
    cursor: inherit;
    display: flex;
    font-size: inherit;
}

.tooltip-container {
    position: absolute;
    width: 200px;
    margin-left: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}

.tooltip-container.top {
    bottom: calc(100% + 5px);
    left: 50%;
}

.tooltip-container.bottom {
    top: calc(100% + 5px);
    left: 50%;
}

.tooltip-container.left {
    margin-left: 0;
    top: 50%;
    transform: translateY(-50%);
    right: calc(100% + 5px);
    width: max-content;
}

.tooltip-container.right {
    margin-left: 0;
    top: 50%;
    transform: translateY(-50%);
    left: calc(100% + 5px);
    width: max-content;
}

.tooltip-box {
    position: relative;
    background-color: rgba(var(--sidooh-dark-rgb), .9);
    color: #fff;
    text-align: center;
    border-radius: .3rem;
    padding: 5px 7px;
    font-size: 14px;
    box-shadow: var(--sidooh-box-shadow);
}

.tooltip-box:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(var(--sidooh-dark-rgb), .9) transparent transparent transparent;
}

.tooltip-box.bottom:after {
    border-color: transparent transparent rgba(var(--sidooh-dark-rgb), .9) transparent;
    bottom: 100%;
    left: calc(50% - 5px);
}

.tooltip-box.left:after {
    border-color: transparent transparent transparent rgba(var(--sidooh-dark-rgb), .9);
    left: 100%;
    top: calc(50% - 5px);
}

.tooltip-box.right:after {
    border-color: transparent rgba(var(--sidooh-dark-rgb), .9) transparent transparent;
    right: 100%;
    top: calc(50% - 5px);
}

.tooltip-box.top:after {
    top: 100%;
    left: calc(50% - 4.5px);
}
</style>