<template>
    <div>
        <Application />
    </div>
</template>

<script setup lang="ts">
    import { useSchoolStore } from '~~/stores/school';
    import Application from '../../components/Application/Application.vue';

    const useSchool = useSchoolStore();
    
    console.log(useSchool.school);

</script>