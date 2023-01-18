<template>
    <li class="dropdown">
        <a class="nav-link fa-icon-wait nine-dots p-1 cursor-pointer toggle" data-bs-toggle="dropdown"
           id="navbarDropdownMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="37" viewBox="0 0 16 16" fill="none">
                <circle cx="2" cy="2" r="2" fill="#6C6E71"/>
                <circle cx="2" cy="8" r="2" fill="#6C6E71"/>
                <circle cx="2" cy="14" r="2" fill="#6C6E71"/>
                <circle cx="8" cy="8" r="2" fill="#6C6E71"/>
                <circle cx="8" cy="14" r="2" fill="#6C6E71"/>
                <circle cx="14" cy="8" r="2" fill="#6C6E71"/>
                <circle cx="14" cy="14" r="2" fill="#6C6E71"/>
                <circle cx="8" cy="2" r="2" fill="#6C6E71"/>
                <circle cx="14" cy="2" r="2" fill="#6C6E71"/>
            </svg>
        </a>
        <div class="dropdown-menu dropdown-menu-end dropdown-menu-card dropdown-caret-bg"
             aria-labelledby="navbarDropdownMenu">
            <div class="card shadow-none">
                <div data-simplebar data-simplebar-auto-hide="false" class="nine-dots-dropdown">
                    <div class="card-body px-3">
                        <div class="row text-center g-0">
                            <div v-for="(link, i) in links" :key="`link-${i}`" class="col-4">
                                <a :href="link.enabled ? link.link : undefined" target="_blank"
                                   rel="noopener noreferrer" class="d-block px-2 py-3 text-center text-decoration-none"
                                   :class="!link.enabled ? 'bg-100 ' : 'hover-bg-200 cursor-pointer rounded-3'">
                                    <div v-if="link.avatarText" class="avatar avatar-2xl ">
                                        <div class="avatar-name rounded-circle fs-2 bg-soft-primary text-primary">
                                            <span>{{ link.avatarText }}</span>
                                        </div>
                                    </div>
                                    <p class="mb-0 fw-medium text-800 text-truncate fs--2" :class="{'pt-1': link.img}">
                                        {{ link.title }}
                                    </p>
                                </a>
                            </div>
                            <div class="col-12">
                                <a href="#!" class="btn btn-outline-primary btn-sm mt-4">Show more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import 'simplebar/dist/simplebar.css';

type WaffleLink = {
    avatar?: string
    avatarText?: string
    title?: string
    link?: string
    img?: string
    hr?: boolean
    contentClass?: string
    enabled?: boolean
}
defineProps<{ links: WaffleLink[] }>()
</script>

<style scoped>

</style>