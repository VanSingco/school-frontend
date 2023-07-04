<template>
    <LessonShow :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import LessonShow from '~~/components/Pages/Lesson/LessonShow.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>