<template>
    <AddSchedule :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import AddSchedule from '~~/components/Pages/AssignSubjectSchedule/AddSchedule.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>