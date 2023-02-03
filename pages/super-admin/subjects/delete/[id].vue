<template>
    <DeleteSubject :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import DeleteSubject from '~~/components/Pages/Subject/DeleteSubject.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>