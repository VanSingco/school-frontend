<template>
    <EditTeacher :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import EditTeacher from '~~/components/Pages/Teacher/EditTeacher.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>