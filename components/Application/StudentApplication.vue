<template>
  <div>
    <div>
      <AlertErrorSuccess  
          :success="success" 
          :errors="errors"
          @closeError="errors = []"
          @closeSuccess="success = ''"/>

      <form action="" @submit.prevent="next">
          <div class="p-5">
              <div class="flex justify-end w-full mb-5">
                <button @click="useApplication.addStudent()" type="button" class="relative flex justify-center group button-primary">
                    <span class="pr-3 item-center">
                        <Icon name="bi:plus-lg" class="w-5 h-5 text-white" />
                    </span>
                    Add Student
                </button>
              </div>
              <!-- Field Input -->
              <div v-for="(student, i) in students" class="mb-10 application__student">
                  <div class="flex items-center justify-between application__student--header">
                    <h4>Student #{{ i + 1 }}</h4>
                    <template v-if="i > 0">
                      <button @click="useApplication.removeStudent(i)" type="button" class="relative flex justify-center group button-danger">
                          <span class="pr-3 item-center">
                              <Icon name="bi:trash" class="w-5 h-5 text-white" />
                          </span>
                          Remove Student
                      </button>
                    </template>
                  </div>
                  <div class="application__student--body">
                    <div class="flex justify-center mb-10 space-y-5">
                      <div class="relative w-40 h-40 overflow-hidden shadow-lg">
                          <div class="!p-2 image-upload__overlay">
                              <div class="flex flex-col items-center justify-center text-center">
                                  <Icon name="bi:cloud-upload" class="w-5 h-5 text-white" />
                                  <label :for="`image-upload-${i}`" class="cursor-pointer"><h4 class="ml-2">Upload ID Picture</h4></label>
                                  <input :id="`image-upload-${i}`" @change="uploadImage($event, i)" :name="`image-upload-${i}`" type="file" class="hidden">
                              </div>
                          </div>
                          <nuxt-img class="w-full overflow-hidden border rounded-lg shadow sm:rounded-md" :src="student.image_url ? student.image_url : '/public-img/default_profile.png'" />
                      </div>
                    </div>
                    <FormInput :models="student" :forms="useApplication.getStudentForms" />
                  </div>
              </div>
              
              
              <div class="flex justify-end gap-3 mt-5">
                  <button type="button" class="relative flex justify-center button-default group ">
                      <span class="pr-3 item-center">
                          <Icon name="bi:chevron-left" class="w-5 h-5 text-white" />
                      </span>
                      <span>Previous</span>
                  </button>
                  <button type="submit" class="relative flex justify-center group button-primary">
                      <span>Next</span>
                      <span class="pl-3 item-center">
                          <Icon v-if="!loading" name="bi:chevron-right" class="w-5 h-5 text-white" />
                          <svg v-else class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                      </span>
                  </button>
              </div>
          </div>
      </form>
  </div>
  </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useApplicationStore } from '~~/stores/applications';
    import AlertErrorSuccess from '../Alert/AlertErrorSuccess.vue';
    import FormInput from '../form/FormInput.vue';
    import {uploadFile} from '~~/utils/custom';

    const useApplication = useApplicationStore();

    const {students} = storeToRefs(useApplication);

    const loading = ref(false);
    const errors = ref([] as String[]);
    const success = ref('');

    async function uploadImage(e : any, index: number){
        console.log(e, index);
        let file = e.target.files[0];
        students.value[index]['id_picture'] = file;
        try {
            const result = await uploadFile(file);
            students.value[index]['image_url'] = result as any
        } catch (error: any) {
            errors.value.push(error);
        }

    }


    function next() {

    }
</script>