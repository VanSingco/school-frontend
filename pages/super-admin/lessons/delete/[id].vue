<template>
    <LessonDelete :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import LessonDelete from '~~/components/Pages/Lesson/LessonDelete.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>