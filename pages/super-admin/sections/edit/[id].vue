<template>
    <EditSection :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import EditSection from '~~/components/Pages/Section/EditSection.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>