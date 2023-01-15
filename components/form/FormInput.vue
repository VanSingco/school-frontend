<template>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
        <div v-for="input in forms" :class="`col-span-1 sm:col-span-1 md:col-span-${input.cols} lg:col-span-${input.cols}`">
            <template v-if="input.type == 'text' || input.type == 'number' || input.type == 'date' || input.type == 'email'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <input v-model="models[input.key]" :type="input.type" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </template>

            <template v-if="input.type == 'select'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="option in input.options" :value="option.value">{{option.name}}</option>
                </select>
            </template>

            <template v-if="input.type == 'select-country' && useRegionProvince.regionProvinceCityBrgy">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="option in getRegionProvinceCityBrgyOptionData(input.key)" :value="option.name">{{option.name}}</option>
                </select>
            </template>

            <template v-if="input.type == 'checkbox'">
                <div class="flex items-center ml-2">
                    <input v-model="models[input.key]" :required="input.required" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="remember-me" class="ml-2 block text-sm font-medium text-gray-700">{{input.name}}</label>
                </div>
            </template>

    
            
        </div> 
    </div>
</template>

<script setup>
    import { useRegionProvinceStore } from '~~/stores/regionProvince';

    const props = defineProps({
        forms: {type: Array, required: true, default: []},
        models: {type: Object, required: true, default: {}}
    });

    const useRegionProvince = useRegionProvinceStore();

    function getRegionProvinceCityBrgyOptionData(key) {
        const data = useRegionProvince.regionProvinceCityBrgy;

        if (data) {
            if (key == 'region') {
                return data.region
            } else if (key == 'province') {
                const region = data.region.find(item => item.name == props.models.region);
                if (region) {
                    return  data.province.filter(item => item.regCode == region.regCode);
                }
                return  data.province;
            } else if (key == 'city') {
                const province = data.province.find(item => item.name == props.models.province);
                const region = data.region.find(item => item.name == props.models.region);
                if (region) {
                    return data.city.filter(item => item.regDesc == region.regCode);
                }
                if (province) {
                    return data.city.filter(item => item.provCode == province.provCode );
                }
                return data.city;
            } else if (key == 'barangay') {
                const city = data.city.find(item => item.name == props.models.city);
                const province = data.province.find(item => item.name == props.models.province);
                const region = data.region.find(item => item.name == props.models.region);
                if (region) {
                    return data.barangay.filter(item => item.regCode == region.regCode);
                }
                if (province) {
                    return data.barangay.filter(item => item.provCode == province.provCode );
                }
                if (city) {
                    return data.barangay.filter(item => item.citymunCode == city.citymunCode);
                }
                return data.barangay;
            } else {
                return [];
            }
        } else {
            return [];
        }
    }


</script>