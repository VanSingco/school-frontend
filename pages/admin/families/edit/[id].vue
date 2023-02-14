<template>
    <EditFamily :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import EditFamily from '~~/components/Pages/Family/EditFamily.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>