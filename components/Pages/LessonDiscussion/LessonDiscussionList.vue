<template>
    <div>
        <TabGroup>
            <TabList class="flex space-x-1 rounded-xl bg-gray-200/70 p-1">
              <Tab
                v-for="(quarter, i) in quarter_list"
                as="template"
                :key="i"
                v-slot="{ selected }"
              >
                <button
                  :class="[
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-900',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-700 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-900',
                  ]"
                >
                  {{ quarter }}
                </button>
              </Tab>
            </TabList>
      
            <TabPanels class="mt-2">
              <TabPanel
                v-for="(quarter, i) in quarter_list"
                :key="i"
                :class="[
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-yellow-400 focus:outline-none focus:ring-2',
                ]"
              >
                <ul v-if="Object.keys(lessonDiscussion.getLessonDiscussions).length > 0">
                  <li
                    v-for="discussion in lessonDiscussion.getLessonDiscussions[i]"
                    :key="discussion.id"
                    class="relative rounded-md p-3 hover:bg-gray-100 ring-yellow-400 focus:z-10 focus:outline-none focus:ring-2"
                  >
                    <div class="w-full flex justify-between items-center">
                        <div>
                            <nuxt-link :to="`/${accessType}/lessons/${id}/discussion/${discussion.id}`" class="text-sm font-medium leading-5">
                                {{ discussion.title }}
                            </nuxt-link>
          
                
                            <ul
                                class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"
                              >
                                <li>Start Date: {{ moment(discussion.start_date).format('LL') }}</li>
                                <li>&middot;</li>
                                <li>End Date: {{ moment(discussion.end_date).format('LL') }}</li>
                                <li>&middot;</li>
                            </ul>
                        </div>
                        <div class="flex items-center">
                            <nuxt-link :to="`/${accessType}/lessons/${id}/discussion/${discussion.id}`" class="button-primary !text-[12px] !px-[15px] !py-[8px]">View</nuxt-link>
                            <nuxt-link v-if="discussion.has_exam == 1" :to="`/${accessType}/lessons/${id}/quiz-exam/${discussion.id}`" class="button-default !text-[12px] !px-[15px] !py-[8px]">View Questions</nuxt-link>
                        </div>
                    </div>
      
                    
                  </li>
                </ul>
                <div v-if="(Object.keys(lessonDiscussion.getLessonDiscussions).length < 0)" class="py-5 w-full flex justify-center">
                    <h3 class="text-sm font-medium leading-5">
                        No Disucssion Yet For {{ quarter }}
                    </h3>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
    </div>
</template>

<script setup lang="ts">
    import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
    import { useLessonDiscussionStore } from '~~/stores/lessonDiscussion';
    import moment from 'moment';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'},
        id: {type: String, required: true},
    });

    const quarter_list = {
        1: '1st Quarter',
        2: '2nd Quarter',
        3: '3rd Quarter',
        4: '4th Quarter',
    };

    const semester_list = {
        1: '1st Semester',
        2: '2nd Semester',
    };

    const lessonDiscussion = useLessonDiscussionStore();
    
    onMounted(async () => {
        await nextTick(async () => {
            lessonDiscussion.list(props.id);
        })
    });


</script>