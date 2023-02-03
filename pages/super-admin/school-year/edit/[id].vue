<template>
    <EditSchoolYear :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import EditSchoolYear from '~~/components/Pages/SchoolYear/EditSchoolYear.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>