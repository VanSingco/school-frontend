<template>
    <EditGradeLevel :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import EditGradeLevel from '~~/components/Pages/GradeLevel/EditGradeLevel.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>