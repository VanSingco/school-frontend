<template>
    <EditSubject :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import EditSubject from '~~/components/Pages/Subject/EditSubject.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>