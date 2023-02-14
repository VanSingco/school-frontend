<template>
    <DeleteFamily :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import DeleteFamily from '~~/components/Pages/Family/DeleteFamily.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>