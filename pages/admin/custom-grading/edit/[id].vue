<template>
    <CustomGradingUpdate :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import CustomGradingUpdate from '~~/components/Pages/CustomGrading/CustomGradingUpdate.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>