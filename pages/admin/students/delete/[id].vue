<template>
    <DeleteStudent :id="id" accessType="admin" />
</template>

<script setup lang="ts">
import DeleteStudent from '~~/components/Pages/Student/DeleteStudent.vue';
const route = useRoute();
const id = route.params.id as string;
</script>