<template>
    <DeleteTeacher :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import DeleteTeacher from '~~/components/Pages/Teacher/DeleteTeacher.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>