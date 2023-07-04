<template>
    <ShowLessonDiscussion accessType="super-admin" :id="id" :discussion_id="discussion_id" />
</template>

<script setup lang="ts">
    import ShowLessonDiscussion from '~~/components/Pages/LessonDiscussion/ShowLessonDiscussion.vue';
    const route = useRoute();
    const id = route.params.id as string;
    const discussion_id = route.params.descussion_id as string;
</script>