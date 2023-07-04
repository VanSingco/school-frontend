<template>
    <div>
        <CustomGradingDelete :id="id" accessType="admin" />
    </div>
</template>

<script setup lang="ts">
    import CustomGradingDelete from '~~/components/Pages/CustomGrading/CustomGradingDelete.vue';
    const route = useRoute();
    const id = route.params.id as string;
</script>