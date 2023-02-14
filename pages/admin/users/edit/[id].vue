<template>
    <EditUser :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import EditUser from '~~/components/Pages/User/EditUser.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>