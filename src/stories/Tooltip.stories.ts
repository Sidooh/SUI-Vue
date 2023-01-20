import { Meta, StoryFn } from '@storybook/vue3';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import TooltipComponent from "../components/Tooltip.vue";
import Button from "../components/Button.vue";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: TooltipComponent,
    argTypes: {
        placement: {
            options: ['top', 'right', 'bottom', 'left'],
        }
    },
} as Meta<typeof TooltipComponent>;

export const Tooltip: StoryFn<typeof TooltipComponent> = (args) => ({
    components: { TooltipComponent, Button },
    setup() {
        return { args };
    },
    template: `
        <TooltipComponent title="TooltipComponent" class="m-5" v-bind="args">
        <Button class="me-1">Tooltip</Button>
        </TooltipComponent>
    `,
});