<template>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
        <div class="hidden md:col-span-6 lg:col-span-6"></div>
        <div class="hidden md:col-span-4 lg:col-span-4"></div>
        <div v-for="input in forms.filter(item => !item.hide)" :class="`col-span-1 sm:col-span-1 md:col-span-${input.cols} lg:col-span-${input.cols}`">
            <template v-if="input.type == 'text' || input.type == 'number' || input.type == 'date' || input.type == 'email' || input.type == 'password'">
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

            <template v-if="input.type == 'select-school'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="school in useSchool.getSchools" :value="school.id">{{school.name}}</option>
                </select>
            </template>

            <template v-if="input.type == 'select-subject'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="subject in useSubject.getSubjects" :value="subject.id">{{subject.name}}</option>
                </select>
            </template>

            <template v-if="input.type == 'select-gradelevel'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="gradelevel in useGradeLevel.getGradeLevels" :value="gradelevel.id">{{gradelevel.name}}</option>
                </select>
            </template>

            <template v-if="input.type == 'select-schoolyear'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="schooYear in useSchoolYear.getSchoolYears" :value="schooYear.id">{{schooYear.school_year}}</option>
                </select>
            </template>

            <template v-if="input.type == 'select-teacher'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="teacher in useTeacher.getTeachers" :value="teacher.id">{{teacher.first_name}}, {{teacher.last_name}}, {{teacher.middle_name}}</option>
                </select>
            </template>

            <template v-if="input.type == 'select-student'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <select v-model="models[input.key]" :required="input.required"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value=""></option>
                    <option v-for="student in useStudent.getStudents" :value="student.id">{{student.first_name}}, {{student.last_name}}, {{student.middle_name}}</option>
                </select>
            </template>

            <template v-if="input.type == 'checkbox'">
                <div class="flex items-center ml-2">
                    <input v-model="models[input.key]" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="remember-me" class="ml-2 block text-sm font-medium text-gray-700">{{input.name}}</label>
                </div>
            </template>
            

            <template v-if="input.type == 'textarea'">
                <label class="block text-sm font-medium text-gray-700 capitalize">{{input.name}}</label>
                <textarea class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" v-model="models[input.key]" cols="5" rows="5"></textarea>
            </template>

            
            
        </div> 
    </div>
</template>

<script setup>
    import { useRegionProvinceStore } from '~~/stores/regionProvince';
    import { useSchoolStore } from '~~/stores/school';
    import { useSubjectStore } from '~~/stores/subject';
    import { useGradeLevelStore } from '~~/stores/gradeLevel';
    import { useSchoolYearStore } from '~~/stores/schoolYear';
    import { useTeacherStore } from '~~/stores/teacher';
    import { useStudentStore } from '~~/stores/student';

    const props = defineProps({
        forms: {type: Array, required: true, default: []},
        models: {type: Object, required: true, default: {}}
    });

    const useRegionProvince = useRegionProvinceStore();
    const useSchool =  useSchoolStore();
    const useSubject =  useSubjectStore();
    const useGradeLevel =  useGradeLevelStore();
    const useSchoolYear =  useSchoolYearStore();
    const useTeacher =  useTeacherStore();
    const useStudent =  useStudentStore();

    // Check if region, province, city, barangay fields is available
    const selectCountryExist = props.forms.find(item => item.type == 'select-country');
    const selectSchoolExist = props.forms.find(item => item.type == 'select-school');
    const selectSubjectExist = props.forms.find(item => item.type == 'select-subject');
    const selectGradeLevelExist = props.forms.find(item => item.type == 'select-gradelevel');
    const selectSchoolYearExist = props.forms.find(item => item.type == 'select-schoolyear');
    const selectTeacherExist = props.forms.find(item => item.type == 'select-teacher');
    const selectStudentExist = props.forms.find(item => item.type == 'select-student');

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

    const loadListOfData = async () => {
        if (selectSubjectExist) {
            await useSubject.list({search: '', orderBy: 'DESC', paginate: false, school_id: props.models.school_id});
        }

        if (selectGradeLevelExist) {
            await useGradeLevel.list({search: '', orderBy: 'DESC', paginate: false, school_id: props.models.school_id});
        }

        if (selectSchoolYearExist) {
            await useSchoolYear.list({search: '', orderBy: 'DESC', paginate: false, school_id: props.models.school_id});
        }

        if (selectTeacherExist) {
            await useTeacher.list({search: '', orderBy: 'DESC', paginate: false, school_id: props.models.school_id});
        }

        if (selectStudentExist) {
            await useStudent.list({search: '', orderBy: 'DESC', paginate: false, school_id: props.models.school_id});
        }

        if (selectCountryExist) {
            await useRegionProvince.regionProvinceCityBrgyList();
        }

        if (selectSchoolExist) {
            await useSchool.list({paginate: false});  
        }
    }

    watch(() => props.models.school_id, async () => {
        await loadListOfData();
    });

    onMounted(async () => {
        await nextTick(async () => {
            await loadListOfData();
           
        })
    })


</script>