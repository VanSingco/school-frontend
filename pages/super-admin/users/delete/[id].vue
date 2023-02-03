<template>
    <DeleteUser :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import DeleteUser from '~~/components/Pages/User/DeleteUser.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>