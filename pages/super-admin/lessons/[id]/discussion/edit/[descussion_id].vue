<template>
    <UpdateLessonDiscussion accessType="super-admin" :id="id" :descussion_id="descussion_id" />
</template>

<script setup lang="ts">
    import UpdateLessonDiscussion from '~~/components/Pages/LessonDiscussion/UpdateLessonDiscussion.vue';
    const route = useRoute();
    const id = route.params.id as string;
    const descussion_id = route.params.descussion_id as string;
</script>