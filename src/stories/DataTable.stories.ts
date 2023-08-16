import { Meta, StoryFn } from '@storybook/vue3';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import { faker } from '@faker-js/faker';
import DataTableComponent from "../components/datatable/DataTable.vue";
import { Status } from "../utils";
import StatusBadge from "../components/StatusBadge.vue";
import { h } from "vue";

export default {
    component: DataTableComponent,
} as Meta<typeof DataTableComponent>;

export const DataTable: StoryFn<typeof DataTableComponent> = () => {
    const data = Array.from({ length: 25 }, (a) => ({
        name: faker.person.firstName(),
        age: faker.number.int(70),
        status: faker.helpers.arrayElement([...Object.values(Status), undefined])
    }));
    data.unshift({ name: 'SIDOOH', age: 21, status: undefined });
    data.unshift({ name: 'Tasha', age: 21, status: Status.ACTIVE });

    return {
        components: { DataTableComponent, StatusBadge, h },
        setup() {
            return { data, h, StatusBadge };
        },
        template: `
            <div class="card">
            <div class="card-body">
                <DataTableComponent title="Sidooh DTL" :data="data" :columns="[
                        {accessorKey:'name'},
                        {accessorKey:'age'},
                        {accessorKey:'status',cell: info => h(StatusBadge, { status: info.getValue() ?? '' })}
                    ]" :on-create-row="()=>{}"/>
            </div>
            </div>
        `,
    }
};