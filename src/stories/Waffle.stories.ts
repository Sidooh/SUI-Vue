import { Meta, StoryFn } from '@storybook/vue3';
import Waffle from "../components/Waffle.vue";
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import 'simplebar/dist/simplebar.css';
import 'bootstrap/dist/js/bootstrap.min.js'

export default {
    component: Waffle,
} as Meta<typeof Waffle>;

export const Default: StoryFn<typeof Waffle> = () => ({
    components: { Waffle },
    template: `
        <Waffle class="m-5" :links="[
    {
        avatarText: 'E',
        title: 'Enterprise',
        link: '/',
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'N',
        title: 'Notify',
        link: '/',
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'p',
        title: 'Payments',
        link: '/',
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'P',
        title: 'Products',
        link: '/',
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'S',
        title: 'Savings',
        link: '/',
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'U',
        title: 'USSD',
        link: '/',
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
]"/>
    `,
});