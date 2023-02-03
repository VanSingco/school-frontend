<template>
    <DeleteGradeLevel :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import DeleteGradeLevel from '~~/components/Pages/GradeLevel/DeleteGradeLevel.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>