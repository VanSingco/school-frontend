<template>
    <EditSchedule :id="id" :schedule_id="schedule_id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import EditSchedule from '~~/components/Pages/AssignSubjectSchedule/EditSchedule.vue';

    const route = useRoute();
    const id = route.params.id as string;
    const schedule_id = route.params.schedule_id as string;
</script>