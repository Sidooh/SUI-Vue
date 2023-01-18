<template>
    <div v-if="firstValue === 'number'"></div>
    <div v-else>
        <datalist :id="column.id+'list'">
            <option :value="v" v-for="v in sortedUniqueValues.slice(0, 5000)"/>
        </datalist>
        <DebouncedInput :on-change="value => column.setFilterValue(value)" :query="String(columnFilterValue)"
                        :placeholder="`Search...(${column.getFacetedUniqueValues().size})`"
                        :list="column.id+'list'"/>
    </div>
</template>

<script setup lang="ts">
import { Column, Table } from "@tanstack/vue-table";
import { ref } from "vue";
import DebouncedInput from "./DebouncedInput.vue";

const props = defineProps<{ column: Column<any>, table: Table<any> }>()

const firstValue = ref(props.table.getPreFilteredRowModel().flatRows[0]?.getValue(props.column.id))
const columnFilterValue = ref(props.column.getFilterValue() ?? '');

const sortedUniqueValues = typeof firstValue.value === 'number' ? [] : Array.from(props.column.getFacetedUniqueValues().keys()).sort();
</script>