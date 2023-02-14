<template>
    <div>
        <div class="w-full mx-auto" v-if="bodyData">
            <div class="overflow-x-auto max-w-full w-full py-2 align-middle">
                <!-- overflow-hidden  -->
                <div v-if="!loading" class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="max-w-full w-full divide-y divide-gray-300">
                        <thead class="bg-gray-100">
                            <tr>
                                <th v-for="column in columns" scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-gray-700">{{column}}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template v-if="bodyData.data && bodyData.data.length > 0">
                                <tr v-for="row in bodyData.data">
                                    <slot :row="row"></slot>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td class="px-3 py-3.5 text-center text-sm font-bold text-gray-700" :colspan="columns.length">No Data</td>
                                </tr>
                            </template>
                            
                        </tbody>
                    </table>
                </div>
                <!-- IF LOADING DATA -->
                <div v-else class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="max-w-full w-full divide-y divide-gray-300">
                        <thead class="bg-gray-100">
                            <tr>
                                <th v-for="column in columns" scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-gray-700">{{column}}</th>
                            </tr>
                        </thead>
                        <tbody class="animate-pulse divide-y divide-gray-200 bg-white">
                            <tr v-for="number in 5">
                                <td v-for="column in columns" class=" py-4 px-4"><span class="flex w-full h-5 py-1 rounded bg-gray-300"></span></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination @selectedPage="pageSelected" :bodyData="bodyData"></Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        loading: {
            type: Boolean,
            required: true
        },
        columns: {
            type: Array as any,
            require: false,
        },
        bodyData: {
            type: Object as any,
            require: false,
        }
    })

    const emit = defineEmits(['selectedPage']);

    function pageSelected(url: string | null) {
        emit('selectedPage', url);
    }
</script>