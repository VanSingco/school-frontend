<template>
    <EditAssignSubject :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import EditAssignSubject from '~~/components/Pages/AssignSubject/EditAssignSubject.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>