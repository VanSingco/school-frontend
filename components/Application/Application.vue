<template>
    <div class="flex justify-center items-center">
        <div class="container">
            <div class="w-full px-2 py-16 sm:px-0">
                <TabGroup>
                  <TabList class="flex space-x-1 rounded-xl bg-white shadow p-1">
                    <Tab
                      v-for="(tab, key, i) in tabs"
                      as="template"
                      :key="key"
                      v-slot="{ selected }"
                    >
                      <button
                        :class="[
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-left p-4',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-white-400 focus:outline-none focus:ring-2',
                          selected
                            ? 'primary-bg shadow text-white'
                            : 'text-gray-600 hover:bg-gray-200/[0.12] hover:text-gray-800',
                        ]"
                      >

                        <div class="flex items-center">
                          <div :class="`mr-3 w-[50px] h-[50px] flex justify-center items-center text-3xl rounded-md ${selected ? 'bg-white/[0.20]' : 'bg-gray-100'}`">
                              {{ i + 1 }}
                          </div>
                          <div>
                            <span class="text-base font-bold">{{ key }}</span>
                            <br>
                            <span>{{ tab.description }}</span>
                          </div>
                        </div>
                      </button>
                    </Tab>
                  </TabList>
            
                  <TabPanels class="mt-10 shadow">
                    <TabPanel
                      v-for="(tab, id) in Object.values(tabs)"
                      :key="id"
                      :class="[
                        'rounded-xl bg-white p-3',
                      ]"
                    >
                      <component :tab="tab" :is="tab.component" />
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
  /**
   * LIST OF TABS OF APPLICATION FORM
  */
  const tabs = ref({
    'Family Information': {
        description: 'Setup Family Information',
        component: resolveComponent('Application/FamilyApplication')
    },
    'Student Information': {
        description: 'Setup Student Information',
        component: resolveComponent('Application/StudentApplication')
    },
    'Review Information': {
        description: 'Review all your information',
        component: resolveComponent('Application/ReviewApplication')
    },
    'Application Fee': {
        description: 'Payment For Application',
        component: resolveComponent('Application/FeeApplication')
    },
  });
  
  </script>
  