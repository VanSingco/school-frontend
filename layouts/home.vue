<template>
    <div>
        <Disclosure as="nav" class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white " v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <!-- Mobile menu button-->
                  <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                    <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                  </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div class="flex flex-shrink-0 items-center">
                    <template v-if="school.getSchool">
                      <nuxt-img class="block h-10 w-auto lg:hidden" :src="school.getSchool.logo ? `${api_url + school.getSchool.logo}` : '/public-img/default_logo.png'" />
                      <nuxt-img class="hidden h-10 w-auto lg:block" :src="school.getSchool.logo ? `${api_url + school.getSchool.logo}` : '/public-img/default_logo.png'" />
                    </template>
                    <template v-else>
                      <img class="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                      <img class="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                    </template>
                    
                  </div>
                  <div class="hidden sm:ml-6 sm:block">
                    <div class="flex space-x-4">
                      <nuxt-link  v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">     
                    <nuxt-link to="/login" class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Login</nuxt-link>
                </div>
              </div>
            </div>
        
            <DisclosurePanel class="sm:hidden">
              <div class="space-y-1 px-2 pt-2 pb-3">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
              </div>
            </DisclosurePanel>
        </Disclosure>
        <div class="bg-gray-100">

            <div class="grid grid-cols-1 justify-content-center">
                <div class="container-lg">
                    <slot />
                </div>
            </div>
        </div>
       
    </div>
  </template>
  
<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { getSubDomain } from '~~/composable/custom';
  import { useUserStore } from '~~/stores/user';
  import { useSchoolStore } from "~~/stores/school";

  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'About', href: '/about', current: false },
    { name: 'Contact', href: '/contact', current: false },
  ]

    const user = useUserStore();
    const subdomain = getSubDomain();
    const school = useSchoolStore();
    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;
    const base_url = config.public.baseUrl;

    onMounted(async () => {
      await nextTick(async () => {
        if (subdomain !== config.public.domainName) {
          await school.getBySubdomain(subdomain);
        }

        await user.authUser();


      })
    })
  </script>