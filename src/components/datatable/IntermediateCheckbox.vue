<template>
    <div class="form-check cursor-pointer mb-0 d-flex align-items-center">
        <input type="checkbox" ref="input" class="form-check-input" :checked="checked" @change="onChange">
    </div>
</template>

<script setup lang="ts">

type Booleanish = boolean | 'true' | 'false'

const props = defineProps<{ indeterminate?: boolean, checked?: Booleanish | any[] | Set<any>, onChange: (event: any) => void }>()

/*const indeterminate = ref(props.indeterminate)
const input = ref<HTMLInputElement>()

onMounted(() => {
    if (typeof indeterminate.value === 'boolean' && input.value)
        input.value.indeterminate = Boolean(props.checked) && indeterminate.value
})

watch([indeterminate, input], () => {
    logger.info(input.value, 'changed')

    if (typeof indeterminate.value === 'boolean' && input.value)
        input.value.indeterminate = Boolean(props.checked) && indeterminate.value
})*/
</script>