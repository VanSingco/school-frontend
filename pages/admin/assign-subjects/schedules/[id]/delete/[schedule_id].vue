<template>
    <DeleteSchedule :id="id" :schedule_id="schedule_id" accessType="admin" />
</template>

<script setup lang="ts">
    import DeleteSchedule from '~~/components/Pages/AssignSubjectSchedule/DeleteSchedule.vue';
    const route = useRoute();
    const id = route.params.id as string;
    const schedule_id = route.params.schedule_id as string;
</script>