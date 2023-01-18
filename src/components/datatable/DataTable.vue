<template>
    <div class="row justify-content-between">
        <div class="col mb-3">
            <h6 class="mb-0 text-nowrap py-2 py-xl-0 fw-bold">
                {{ selectedRowsCount ? `You have selected ${selectedRowsCount} ${tableTitle}` : title }}
            </h6>
        </div>
        <div class="col-auto">
            <div class="d-flex align-items-center">
                <font-awesome-icon v-if="onCreateRow" :icon="faPlusCircle" @click="onCreateRow"
                                   class="fs-4 rounded-circle shadow-sm cursor-pointer text-primary"/>
                <div class="form-check form-switch">
                    <Tooltip :title="filtering ? 'Disable':'Enable' + 'Column Filtering'">
                        <input class="form-check-input" type="checkbox" :checked="filtering"
                               @change="filtering = !filtering">
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-auto col-sm-6 col-lg-4">
            <div class="search-box me-2 mb-2 d-inline-block">
                <div class="position-relative">
                    <DebouncedInput type="search" :query="globalFilter ?? ''" label="Search all columns..."
                                    :on-change="setGlobalFilter" placeholder="Search..."/>
                    <i class="bx bx-search-alt search-icon"/>
                </div>
            </div>
        </div>
    </div>
    <table class="table">
        <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th>
                <IntermediateCheckbox :checked="table.getIsAllRowsSelected()"
                                      :indeterminate="table.getIsSomeRowsSelected()"
                                      :on-change="table.getToggleAllRowsSelectedHandler()"/>
            </th>
            <th class="fw-bolder" v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
                :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
                @click="header.column.getToggleSortingHandler()?.($event)">
                <template v-if="!header.isPlaceholder">
                    <div>
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                    :props="header.getContext()"/>
                        <font-awesome-icon v-show="header.column.getIsSorted() === 'asc'" className="ms-2"
                                           :icon="faSortUp"/>
                        <font-awesome-icon v-show="header.column.getIsSorted() === 'desc'" className="ms-2"
                                           :icon="faSortDown"/>
                    </div>
                    <Filter v-if="filtering && header.column.getCanFilter()" :column="header.column" :table="table"/>
                </template>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in table.getRowModel().rows.slice(0, 10)" :key="row.id">
            <td>
                <div class="px-1">
                    <IntermediateCheckbox :checked="row.getIsSelected()"
                                          :indeterminate="row.getIsSomeSelected()"
                                          :on-change="row.getToggleSelectedHandler()"/>
                </div>
            </td>
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center fs--1 text-nowrap">
            <span>
                <span>Page </span>
                <strong>{{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}</strong>
            </span>

            <span class="ms-2">| &nbsp;</span>

            <div v-if="Boolean(selectedRowsCount)">
                {{ selectedRowsCount }} of {{ table.getPreFilteredRowModel().rows.length }} Total Rows Selected
            </div>
            <span>Total: <b>{{ table.getCoreRowModel().rows.length }}</b></span>

            <span class="ms-2">| &nbsp;</span>

            <span class="flex items-center gap-1">
              Go to page:
            </span>
            <input type="number" :value="table.getState().pagination.pageIndex + 1" @change="goToPage" step="1"
                   min="1" :max="table.getPageCount()" class="form-control form-control-sm w-auto border-3 ms-2"/>
        </div>
        <div class="d-flex">
            <button class="btn btn-sm btn-primary" :disabled="!table.getCanPreviousPage()"
                    @click="table.setPageIndex(0)">
                <font-awesome-icon :icon="faAnglesLeft" font-size="15"/>
            </button>
            <button class="btn btn-sm btn-primary ms-1" :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                <font-awesome-icon :icon="faAngleLeft" font-size="15"/>
            </button>
            <select name="" id="" class="form-select form-select-sm w-auto mx-2 border-0 px-3"
                    :disabled="!table.getCanNextPage() && !table.getCanPreviousPage()"
                    v-model.number="table.getState().pagination.pageSize" @change="setPageSize">
                <option :value="pageSize" v-for="pageSize in [5, 10, 20, 40]" :key="`size-${pageSize}`">
                    Show {{ pageSize }}
                </option>
            </select>
            <button class="btn btn-sm btn-primary" :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()">
                <font-awesome-icon :icon="faAngleRight" font-size="15"/>
            </button>
            <button class="btn btn-sm btn-primary ms-1" :disabled="!table.getCanNextPage()"
                    @click="table.setPageIndex(table.getPageCount() - 1)">
                <font-awesome-icon :icon="faAnglesRight" font-size="15"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
    faPlusCircle,
    faSortDown,
    faSortUp
} from '@fortawesome/free-solid-svg-icons'
import {
    ColumnFiltersState,
    FilterFn,
    FlexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useVueTable
} from '@tanstack/vue-table'
import { ref } from 'vue'
import IntermediateCheckbox from './IntermediateCheckbox.vue'
import DebouncedInput from './DebouncedInput.vue'
import { rankItem } from "@tanstack/match-sorter-utils";
import Filter from "@/components/datatable/Filter.vue";
import Tooltip from "@/components/Tooltip.vue";

const setPageSize = (e: any) => table.setPageSize(Number((e.target as HTMLSelectElement)?.value))

const props = defineProps<{ title: string, columns: any[], data: any[], onCreateRow?: () => void; }>()

const tableTitle = ref(props.title)

const sorting = ref<SortingState>([])
const filtering = ref<boolean>(false)
const columnFilters = ref<ColumnFiltersState>([])
const globalFilter = ref<string | number>('')
const rowSelection = ref<RowSelectionState>({})
const selectedRowsCount = ref(Object.keys(rowSelection.value).length);

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const setGlobalFilter = (value: string | number) => globalFilter.value = value

const table = useVueTable({
    get data() {
        return props.data ?? []
    },
    columns: props.columns,
    state: {
        get sorting() {
            return sorting.value
        },
        get globalFilter() {
            return globalFilter.value
        },
        get columnFilters() {
            return columnFilters.value
        },
        get rowSelection() {
            return rowSelection.value
        }
    },
    onSortingChange: updaterOrValue => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
    },
    onRowSelectionChange: update => {
        rowSelection.value = typeof update === 'function' ? update(rowSelection.value) : update
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: update => {
        columnFilters.value = typeof update === 'function' ? update(columnFilters.value) : update
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
})

const goToPage = (e: Event) => {
    const target = (e.target as HTMLInputElement)
    let page = target.value ? Number(target.value) - 1 : 0

    page = table.getPageCount() > page ? page : table.getPageCount() - 1
    table.setPageIndex(page)
}
</script>

<style scoped>
.search-box {
    font-size: .8333333333rem;
    position: relative;
    width: 21rem;
}
</style>