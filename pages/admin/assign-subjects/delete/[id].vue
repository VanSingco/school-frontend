<template>
    <DeleteAssignSubject :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import DeleteAssignSubject from '~~/components/Pages/AssignSubject/DeleteAssignSubject.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>