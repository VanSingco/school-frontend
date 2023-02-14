<template>
    <EditAssignSubject :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import EditAssignSubject from '~~/components/Pages/AssignSubject/EditAssignSubject.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>