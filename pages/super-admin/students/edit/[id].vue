<template>
    <EditStudent :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
import EditStudent from '~~/components/Pages/Student/EditStudent.vue';
const route = useRoute();
const id = route.params.id as string;
</script>