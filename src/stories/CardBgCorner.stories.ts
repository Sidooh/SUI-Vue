import { Meta, StoryFn } from '@storybook/vue3';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import CardBgCornerComponent from "../components/CardBgCorner.vue";
import Button from "../components/Button.vue";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: CardBgCornerComponent,
    argTypes: {
        corner: {
            options: [1, 2, 3, 4, 5],
        }
    },
} as Meta<typeof CardBgCornerComponent>;

export const CardBgCorner: StoryFn<typeof CardBgCornerComponent> = (args) => ({
    components: { CardBgCornerComponent, Button },
    setup() {
        return { args };
    },
    template: `
        <div class="card mb-3">
            <CardBgCornerComponent v-bind="args"/>
            <div class="card-body position-relative">
                <h5>Account #7</h5>
            </div>
        </div>`,
});