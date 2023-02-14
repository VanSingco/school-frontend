<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="`${customGrading.getCustomGrading ? customGrading.getCustomGrading.name : ''}`">
            <a href="#" class="group relative flex justify-center button-primary">
                <span class="pr-3 item-center">
                    <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                </span>
                Add Item
            </a>
        </Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
            
        <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Custom Grading Not Found" :link="`/${accessType}/custom-grading`">
            
        </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { CustomGrading, useCustomGradingStore } from '~~/stores/customGrading';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Custom Grading",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Custom Gradings', link: `/${props.accessType}/custom-grading`},
            {name: 'Custom Grading Details', link: '#'}
        ]
    };

   const loading = ref(false);

    const errors = ref([]);
    const success = ref('');

    const customGrading = useCustomGradingStore();
    const route = useRoute();
    const router = useRouter();

    const pageError = ref(false);
    const pageLoading = ref(false);



    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            customGrading.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as CustomGrading | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;

                } else {
                    pageError.value = true;
                }
            });
        });
    })


</script>