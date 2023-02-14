<template>
    <div class="home-header h-screen bg-gray-100">
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-5">
            <div class="col-span-6 flex items-center">
                <div class="px-20">
                    <h1>Escuela</h1>
                    <h2>A fully featured school management system.</h2>
                    <p class="mt-5">It allows school to easily handle student grades, attendance, billings, enrollment, and reports. It helps in simplifying the process for teachers while requiring less effort. </p>
                    <div class="mt-10">
                        <nuxt-link class="button-default mr-4" to="#">Request Demo</nuxt-link>
                        <nuxt-link class="button-primary mr-4" to="#">Create School</nuxt-link>
                    </div>
                </div>
            </div>
            <div class="col-span-6 pr-24">
                <nuxt-img class="" src="/public-img/professor.png" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>