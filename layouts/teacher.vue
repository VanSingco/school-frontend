<template>
    <div class="relative">
        <div @click="isOpen = !isOpen" class="custom-sidebar absolute w-full h-screen z-3 lg:invisible md:invisible visible"></div>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <div :class="`z-10 flex flex-col h-screen fixed p-3 ${isOpen ? 'w-60' : 'w-16 lg:visible md:visible invisible'} main-sidebar dark:text-gray-100`">
                <div class="space-y-3">
                    <div class="flex items-center justify-between" style="margin-top: 12px">
                      <nuxt-link to="/" class="flex items-center">
                        <template v-if="school.getSchool">
                          <img style="width: 40px;" :src="school.getSchool.logo ? `${api_url + school.getSchool.logo}` : '/public-img/default_logo.png'" alt="Your Company" />
                          <h1 v-if="isOpen" class="ml-3 text-xl primary-heading"><strong>{{school.getSchool.name}}</strong></h1>
                        </template>
                        <template v-else>
                          <img style="width: 40px;" src="/public-img/escuela.png" alt="Your Company" />
                          <h1 v-if="isOpen" class="ml-3 text-xl primary-heading"><strong>Escuela</strong></h1>
                        </template>
                         
                      </nuxt-link>
                        
                    </div>
                    
                    <div class="flex-1">
                        <ul class="pt-6 pb-4 text-sm">
                            <li v-for="(menu, i) in menu_list" :key="i" class="rounded mb-3">
                                <nuxt-link v-if="menu.type == 'menu'" :to="menu.path" class="custom-sidebar__item flex items-center p-2 space-x-3 rounded">
                                  <Icon :name="menu.icon" size="18" />
                                  <span v-if="isOpen" >{{menu.name}}</span>
                                </nuxt-link>
                                <!-- <Disclosure v-else-if="menu.type == 'submenu'" v-slot="{ open }">
                                  <DisclosureButton class="custom-sidebar__item flex items-center justify-between p-2 space-x-3 rounded w-full">
                                    <span class="flex items-center space-x-3">
                                      <Icon :name="menu.icon" size="18" />
                                      <span v-if="isOpen" >{{menu.name}}</span>
                                    </span>
                                    <ChevronUpIcon v-if="isOpen"
                                      :class="!open ? 'rotate-180 transform' : ''"
                                      class="h-4 w-4 text-white mt-1"
                                    />
                                  </DisclosureButton>
                                  <DisclosurePanel class="text-gray-500">
                                   <ul v-if="isOpen" class="pt-2 pb-4 pl-2 text-sm">
                                      <li class="rounded mb-3" v-for="(submenu, i) in menu.submenus" :key="i">
                                        <nuxt-link v-if="submenu.type == 'menu'" :to="submenu.path" class="custom-sidebar__item flex items-center p-2 space-x-3 rounded">
                                          <Icon :name="submenu.icon" size="10"/>
                                          <span v-if="isOpen" >{{submenu.name}}</span>
                                        </nuxt-link>
                                      </li>
                                   </ul>
                                  </DisclosurePanel>
                                </Disclosure>  -->
                            </li> 
                        </ul>
                    </div>
                </div>
            </div> 
        </transition>
        

        <div  :class="`content ${isOpen ? 'lg:ml-60 sm:ml-0' : 'lg:ml-16 sm:ml-0'}`">
            <div class="nav p-3">
                <Disclosure as="nav" class="bg-white shadow-sm rounded-lg" v-slot="{ open }">
                    <div class="mx-auto px-6">
                      <div class="relative flex h-16 items-center justify-between">
                        <div class="absolute inset-y-0 left-0 flex items-center">
                          <!-- Mobile menu button-->
                          <DisclosureButton @click="isOpen = !isOpen" class="z-0 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon class="block h-6 w-6" aria-hidden="true" />
                          </DisclosureButton>
                        </div>
                        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                          
                          <!-- <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                              <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-300 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                            </div>
                          </div> -->
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                          <button type="button" class="rounded-full bg-white p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                
                          <!-- Profile dropdown -->
                          <Menu as="div" class="relative ml-3">
                            <div>
                              <MenuButton class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="sr-only">Open user menu</span>
                                <nuxt-img class="h-8 w-8 rounded-full" src="/public-img/default_profile.png" />
                              </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                  <a href="#" @click="logout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Logout</a>
                                </MenuItem>
                              </MenuItems>
                            </transition>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </Disclosure>
            </div>

        </div>

        <div class="container-lg" :class="`content ${isOpen ? 'lg:ml-60 sm:ml-0' : 'lg:ml-16 sm:ml-0'}`">
          <div class="p-6">
            <slot />
          </div>
        </div>
    </div>
	
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, ChevronUpIcon} from '@heroicons/vue/24/outline'
  import { useUserStore } from "~~/stores/user";
import { useSchoolStore } from "~~/stores/school";

  const isOpen = ref(true);

  const user = useUserStore();
  const config = useRuntimeConfig();
  const router = useRouter();
  const school = useSchoolStore();
  const api_url = config.public.apiBase;

  const menu_list = [
    {name: 'Dashboard', type: "menu", icon: 'ion:home-outline', path: '/teacher/dashboard'},
    {name: 'Sections', type: "menu", icon: 'bi:list-ul', path: '/teacher/sections'},
    {name: 'Schedules', type: "menu", icon: 'bi:calendar4-week', path: '/teacher/schedules'},
    {name: 'Students', type: "menu", icon: 'bi:people', path: '/teacher/students'},
    
  ];

  onMounted(async () => {
    await nextTick(async () => {
      await user.authUser();
    })
  })
    
  async function logout() {
    await user.logoutUser();
    router.push('/super-admin/login');
  }

</script>