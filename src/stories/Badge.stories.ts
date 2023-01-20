import { Meta, StoryFn } from '@storybook/vue3';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import BadgeComponent from "../components/Badge.vue";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: BadgeComponent,
    argTypes: {
        bg: { options: ['primary', 'success', 'danger', 'warning', 'info', 'secondary'], },
        pill: { control: 'boolean' },
        soft: { control: 'boolean' }
    },
} as Meta<typeof BadgeComponent>;

export const Badge: StoryFn<typeof BadgeComponent> = (args) => ({
    components: { BadgeComponent },
    setup() {
        return { args };
    },
    template: `
        <BadgeComponent v-bind="args">Hello Sidooh</BadgeComponent>`,
});