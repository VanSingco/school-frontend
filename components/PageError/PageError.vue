<template>
    <div class="flex justify-center my-4">
        <div class="text-center">
            <img style="width: 400px;" src="/public-img/page_not_found.svg" alt="">
            <h4 class="mt-8 text-xl font-extrabold tracking-tight text-slate-800">{{title}}</h4>
            <div class="flex justify-center mt-8">
                <nuxt-link class="group relative flex justify-center button-primary" :to="link">Go Back</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        }
    });
</script>