<template>
    <NuxtLayout :name="accessType">

    </NuxtLayout>
</template>

<script setup lang="ts">
    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });
</script>