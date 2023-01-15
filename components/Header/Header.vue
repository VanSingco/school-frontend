<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center justify-between mb-7 mt-2">
        <div>
            
            <div class="flex flex-col mb-4">
                <h1 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-800">{{props.title}}</h1>
                <nav aria-label="Breadcrumbs" class="order-first flex space-x-2 text-sm font-semibold">
                    <template v-for="(breadcrumb, i) in breadcrumbs">
                        <nuxt-link class="text-slate-500 hover:text-slate-600" :to="breadcrumb.link">{{breadcrumb.name}}</nuxt-link>
                        <div v-if="(breadcrumbs.length - 1) > i" aria-hidden="true" class="select-none text-slate-400">/</div>
                    </template>
                </nav>
            </div>
        </div>
        <div class="flex justify-end">
            <div class="w-full sm:w-auto md:w-auto lg:w-auto">
                <slot />
            </div>
        </div>
    </div>
   
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        breadcrumbs: {
            type: Array,
            required: true,
        }
    });
</script>