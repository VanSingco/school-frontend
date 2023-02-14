<template>
    <div>
        <template v-if="school.school">
            <PagesLandingSchool :school="school.school" />
        </template>
        <template v-else>
            <PagesLandingHome />
        </template>
    </div>
</template>

<script setup>
    import { useSchoolStore } from "~~/stores/school";
    definePageMeta({
        layout: "home",
    });

    const school = useSchoolStore();
</script>