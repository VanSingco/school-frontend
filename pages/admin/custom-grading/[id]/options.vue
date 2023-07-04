<template>
    <CustomGradingOptions :id="id" accessType="admin" />
</template>

<script setup lang="ts">
    import CustomGradingOptions from '~~/components/Pages/CustomGrading/CustomGradingOptions.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>