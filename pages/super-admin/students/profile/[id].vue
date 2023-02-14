<template>
    <StudentProfile :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import StudentProfile from '~~/components/Pages/Student/StudentProfile.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>