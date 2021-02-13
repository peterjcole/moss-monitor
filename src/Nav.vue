<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link
              to="/"
              class="text-white text-sm font-medium"
            >
              Moss monitor
            </router-link>
            <!--            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">-->
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                to="/login"
                class="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </router-link>
              <router-link
                to="/about"
                class="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </router-link>
              <router-link
                to="/"
                class="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Charts
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
}
</script>
