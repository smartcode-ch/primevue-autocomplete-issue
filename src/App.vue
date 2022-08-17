<template>
  <div class="mx-auto mt-5" style="max-width: 60rem">
    <form @submit.prevent="" id="services_form">

      <div>

        <div v-for="(clientService, index) in form.client_services" class="flex align-items-start mt-3">

          <ClientService
              :services="_services"
              :index="index"
              :client-service="clientService"
              @search-services="searchServices"
              class="w-full" />

          <div class="w-3rem flex justify-content-end">
            <Button v-if="form.client_services.length > 1"
                    @click="form.client_services.splice(index, 1); searchServices()"
                    class="p-button-outlined p-button-rounded p-button-sm p-button-danger"
                    icon="pi pi-minus" />
          </div>
        </div>

        <div v-if="_services.length > 0" class="mt-3 flex">
          <Button @click="addClientService"
                  class="p-button-rounded p-button-outlined p-button-success"
                  icon="pi pi-plus" />
        </div>
      </div>

    </form>
  </div>
</template>

<script setup>

import Button from 'primevue/button'
import ClientService from './components/ClientService.vue'
import {onMounted} from 'vue'

let _services = $ref([])

const form = $ref({
  client_services: [{service: null, duration: 1}],
})

onMounted(() => searchServices())

async function searchServices() {

  const response = await fetch('/services.json')

  _services = await response.json()

}

function addClientService() {
  form.client_services.push({
    service: null,
    duration: 1,
  })
}
</script>
