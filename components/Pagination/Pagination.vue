<template>
    <div class="flex items-center justify-between py-3 px-2">
        <div v-if="bodyData.data && bodyData.data.length > 0" class="flex flex-1 justify-between sm:hidden">
          <span v-if="bodyData.prev_page_url" @click="emit('selectedPage', bodyData.prev_page_url)" class="cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</span>
          <span v-if="bodyData.next_page_url" @click="emit('selectedPage', bodyData.next_page_url)" class="cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</span>
        </div>
        <div v-if="bodyData.data && bodyData.data.length > 0" class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{bodyData.from}}</span>
              to
              <span class="font-medium">{{bodyData.to}}</span>
              of
              <span class="font-medium">{{bodyData.total}}</span>
              results
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              
        
              <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
              <span v-for="link in bodyData.links" @click="emit('selectedPage', link.url)" :class="`${link.label.split(' ')[1] == 'Previous' ? 'rounded-l-md' : ''} ${link.label.split(' ')[0] == 'Next' ? 'rounded-r-md' : ''}  ${link.active == true ? 'border-indigo-500 bg-indigo-50 text-indigo-600 z-20' : 'bg-white z-10 text-gray-500 border-gray-300 hover:bg-gray-50'}`"  class="cursor-pointer relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20">
                <template v-if="link.label.split(' ')[1] == 'Previous'">
                  <span class="sr-only">Previous</span>
                  <!-- Heroicon name: mini/chevron-left -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                  </svg>
                </template>
                <template v-else-if="link.label.split(' ')[0] == 'Next'">
                  <span class="sr-only">Next</span>
                  <!-- Heroicon name: mini/chevron-right -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  </svg>
                </template>
                <template v-else>
                  {{link.label}}
                </template>
              </span>
              
            </nav>
          </div>
        </div>
      </div>
</template>
<script setup lang="ts">
   defineProps({
        bodyData: {
            type: Object as any,
            require: false,
        }
    })

    const emit = defineEmits(['selectedPage']);
</script>