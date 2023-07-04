<template>
    <AddLessonDiscussion accessType="super-admin" :id="id" />
</template>

<script setup lang="ts">
    import AddLessonDiscussion from '~~/components/Pages/LessonDiscussion/AddLessonDiscussion.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>