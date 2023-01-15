<template>
    <div class="mb-4">
        <div v-if="errors.length > 0" class="w-full flex items-center rounded shadow-md overflow-hidden relative dark:bg-red-600 dark:text-gray-100">
            <div class="self-stretch flex items-center px-3 flex-shrink-0 dark:bg-red-700 dark:text-white">
                <Icon name="bi:x-circle-fill" size="30" class="text-white"/>
                
            </div>
            <div class="p-4 flex-1">
                <h3 class="text-xl font-bold">Error</h3>
                <ul class="mt-1 ml-2" style="list-style: disc;">
                    <li v-for="error in errors" class="text-sm dark:text-white">{{ error }}</li>
                </ul>
               
            </div>
            <button class="absolute top-2 right-2" @click="emit('closeError')">
                <Icon name="bi:x-lg" size="20" class="text-red-300 hover:text-white"/>
            </button>
        </div>
        <div v-if="success"  class="w-full flex items-center rounded shadow-md overflow-hidden relative dark:bg-green-600 dark:text-gray-100">
            <div class="self-stretch flex items-center px-3 flex-shrink-0 dark:bg-green-700 dark:text-white">
                <Icon name="bi:check-circle-fill" size="30" class="text-white"/>
            </div>
            <div class="p-4 flex-1">
                <h3 class="text-xl font-bold">Success</h3>
                <p class="text-sm dark:text-white">{{ success }} </p>
            </div>
            <button class="absolute top-2 right-2" @click="emit('closeSuccess')">
                <Icon name="bi:x-lg" size="20" class="text-green-300 hover:text-white"/>
            </button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        errors: {
            type: Array,
            required: true,
        },
        success: {
            type: String,
            required: true,
        }
    });

    const emit = defineEmits(['closeError', 'closeSuccess']);
    
</script>