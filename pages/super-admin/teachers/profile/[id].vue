<template>
    <TeacherProfile :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import TeacherProfile from '~~/components/Pages/Teacher/TeacherProfile.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>