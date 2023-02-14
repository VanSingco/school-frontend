<template>
    <div class="h-screen school-header bg-gray-100">
        <div class="flex justify-center items-center">
            <div class="mt-20 mb-11">
                <div class="flex justify-center">
                    <nuxt-img class="block h-52 w-auto" :src="school.logo ? `${api_url + school.logo}` : '/public-img/default_logo.png'" />
                </div>
                <div class="mt-6 text-center flex justify-center">
                   <div style="max-width: 900px;" class="px-4">
                        <h4>{{school.name}}</h4>
                        <p class="mt-3">{{school.description}}</p>
                   </div>
                </div>
                <div class="mt-7 flex justify-center">
                    <nuxt-link to="/login" class="button-primary">Login Now</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        school: {type: Object, required: true},
    });
    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;
</script>