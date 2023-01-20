import { Meta, StoryFn } from '@storybook/vue3';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import StatusBadgeComponent from "../components/StatusBadge.vue";
import { Status } from "../utils";

export default {
    component: StatusBadgeComponent,
    argTypes: {
        status: {
            options: Object.values(Status),
        }
    },
} as Meta<typeof StatusBadgeComponent>;

export const StatusBadge: StoryFn<typeof StatusBadgeComponent> = (args) => ({
    components: { StatusBadgeComponent },
    setup() {
        return { args };
    },
    template: `<StatusBadgeComponent status="COMPLETED" v-bind="args"/>`,
});