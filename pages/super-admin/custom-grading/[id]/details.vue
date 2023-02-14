<template>
    <CustomGradingDetail :id="id" accessType="super-admin" />
</template>

<script setup lang="ts">
    import CustomGradingDetail from '~~/components/Pages/CustomGrading/CustomGradingDetail.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>