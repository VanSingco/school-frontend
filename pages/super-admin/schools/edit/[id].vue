<template>
    <EditSchool :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import EditSchool from '~~/components/Pages/School/EditSchool.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>