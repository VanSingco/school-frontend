<template>
    <ScheduleList :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import ScheduleList from '~~/components/Pages/AssignSubjectSchedule/ScheduleList.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>