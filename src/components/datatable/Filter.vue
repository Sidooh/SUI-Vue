<template>
    <div v-if="typeof firstValue === 'number'">
        <div class="d-flex">
            <DebouncedInput type="number" class="border rounded me-1"
                            :min="Number(column.getFacetedMinMaxValues()?.[0] ?? '')"
                            :max="Number(column.getFacetedMinMaxValues()?.[1] ?? '')"
                            :on-change="value => column.setFilterValue((old: [number, number]) => [value, old?.[1]])"
                            :query="String(columnFilterValue?.[0] ?? '')"
                            :placeholder="`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`"/>
            <DebouncedInput type="number" class="border rounded"
                            :min="Number(column.getFacetedMinMaxValues()?.[0] ?? '')"
                            :max="Number(column.getFacetedMinMaxValues()?.[1] ?? '')"
                            :on-change="value => column.setFilterValue((old: [number, number]) => [old?.[0], value])"
                            :query="String(columnFilterValue?.[0] ?? '')"
                            :placeholder="`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`"/>
        </div>
    </div>
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
const columnFilterValue = ref((props.column.getFilterValue() ?? '') as [number, number]);

const sortedUniqueValues = typeof firstValue.value === 'number' ? [] : Array.from(props.column.getFacetedUniqueValues().keys()).sort();
</script>
