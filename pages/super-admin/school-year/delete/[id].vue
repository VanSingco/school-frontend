<template>
    <DeleteSchoolYear :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import DeleteSchoolYear from '~~/components/Pages/SchoolYear/DeleteSchoolYear.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>