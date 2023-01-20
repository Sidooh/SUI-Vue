import { Meta, StoryFn } from '@storybook/vue3';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import { faker } from '@faker-js/faker';
import DataTableComponent from "../components/datatable/DataTable.vue";

export default {
    component: DataTableComponent,
} as Meta<typeof DataTableComponent>;

export const DataTable: StoryFn<typeof DataTableComponent> = () => {
    const data = Array.from({length: 25}, (a) => ({name: faker.name.firstName(), age: faker.datatype.number(70)}));
    data.push({name: 'Tasha', age: 21});

    return {
        components: { DataTableComponent },
        setup() {
            return { data };
        },
        template: `
            <div class="card">
                <div class="card-body">
                    <DataTableComponent title="Sidooh DTL" :data="data" :columns="[
                        {accessorKey:'name'},
                        {accessorKey:'age'}
                    ]"/>
                </div>
            </div>
        `,
    }
};