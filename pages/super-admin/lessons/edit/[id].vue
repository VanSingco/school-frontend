<template>
    <LessonUpdate :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import LessonUpdate from '~~/components/Pages/Lesson/LessonUpdate.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>