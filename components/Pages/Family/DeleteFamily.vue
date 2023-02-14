<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
            <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Family Not Found" :link="`/${accessType}/families`">
                <div class="flex justify-center">
                    <div class="text-center">
                        <img style="width: 400px;" src="/public-img/throw_away.svg" alt="">
                        <h4 class="mt-8 text-md font-extrabold tracking-tight text-slate-800">Are you sure you want to delete this family "{{family.getFamily ? family.getFamily.primary_contact_person : ''}}"?</h4>
                        <div class="flex justify-center mt-8">
                            <nuxt-link class="mx-2 group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-3 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" :to="`/${accessType}/families`">Cancel</nuxt-link>
                            <button @click="deleteSubject" type="submit" class="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                <span class="pr-3 item-center">
                                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                </span>
                                Confirm Delete Family
                            </button>
                        </div>
                    </div>
                </div>
            </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { Family, useFamilyStore } from '~~/stores/family';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Delete Family",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Families', link: `/${props.accessType}/families`},
            {name: 'Delete Family', link: '#'}
        ]
    };

   const loading = ref(false);

    const errors = ref([]);
    const success = ref('');

    const family = useFamilyStore();
    const router = useRouter();

    const pageError = ref(false);
    const pageLoading = ref(false);

    function deleteSubject() {
        loading.value =  true;
        family.delete(props.id).then(res => {
            if (res.data.value) {
                success.value = 'Successfully deleted family.';
                setTimeout(() => {
                    router.push(`/${props.accessType}/families`);
                }, 2000);
            }
        });
    }

    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            family.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as Family | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;

                } else {
                    pageError.value = true;
                }
            });
        });
    })


</script>