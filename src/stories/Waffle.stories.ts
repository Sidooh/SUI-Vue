import { Meta, StoryFn } from '@storybook/vue3';
import WaffleComponent from "../components/Waffle.vue";
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import 'simplebar/dist/simplebar.css';
import 'bootstrap/dist/js/bootstrap.min.js'

export default {
    component: WaffleComponent,
} as Meta<typeof WaffleComponent>;

export const Waffle: StoryFn<typeof WaffleComponent> = () => ({
    components: { WaffleComponent },
    template: `
        <WaffleComponent class="m-5" :links="[
    {
        avatarText: 'E',
        title: 'Enterprise',
        link: '/',
        contentClass: 'bg-primary-subtle text-primary',
        enabled: true,
        color:'danger'
    },
    {
        avatarText: 'N',
        title: 'Notify',
        link: '/',
        contentClass: 'bg-danger-subtle text-primary',
        enabled: true
    },
    {
        avatarText: 'p',
        title: 'Payments',
        link: '/',
        contentClass: 'bg-secondary-subtle text-primary',
        enabled: true
    },
    {
        avatarText: 'P',
        title: 'Products',
        link: '/',
        contentClass: 'bg-warning-subtle text-primary',
        enabled: true
    },
    {
        avatarText: 'S',
        title: 'Savings',
        link: '/',
        contentClass: 'bg-success-subtle text-primary',
        enabled: true
    },
    {
        avatarText: 'U',
        title: 'USSD',
        link: '/',
        contentClass: 'bg-info-subtle text-primary',
        enabled: true
    },
]"/>
    `,
});