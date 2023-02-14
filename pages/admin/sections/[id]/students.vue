<template>
    <SectionStudents :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import SectionStudents from '~~/components/Pages/Section/SectionStudents.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>