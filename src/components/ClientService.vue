<template>
  <form id="add_clientService">

    <div class="w-full flex">

      <div class="w-full">

        <div v-if="readonly">
          {{ servicesSearchLabel(_clientService.service) }}
        </div>

        <AutoComplete v-else
                      v-model="_clientService.service"
                      @complete="onComplete"
                      @item-select="onServiceSelected"
                      placeholder="Leistung suchen ..."
                      :suggestions="_services"
                      :forceSelection="true"
                      class="w-full"
                      input-class="w-full"
                      :minLength="2"
                      :autoHighlight="true"
                      :completeOnFocus="true"
                      :field="servicesSearchLabel">

        </AutoComplete>

        <Fieldset v-if="_clientService.service?.code" legend="Info" :collapsed="true" :toggleable="true" class="mt-2 text-sm">
          <p class="mt-0">{{ _clientService.service.interpretation}}</p>
          <p class="mb-0">Limitation: {{ _clientService.service.limitation}}</p>
        </Fieldset>

      </div>

      <div class="w-10rem ml-2" >
        <div class="flex align-items-center" v-if="_clientService.service">

          <div class="" v-if="readonly">{{ _clientService.duration }}</div>

          <InputNumber id="duration"
                       v-else
                       ref="durationInput"
                       v-model="_clientService.duration"
                       inputClass="w-3rem text-center"
                       mode="decimal"
                       :step="1"
                       :min="1"
                       :max="maxDuration"
                       decrementButtonClass="p-button-secondary p-button-text"
                       incrementButtonClass="p-button-secondary p-button-text"
                       incrementButtonIcon="pi pi-plus"
                       decrementButtonIcon="pi pi-minus" />

          <div class="ml-2 text-600">{{ unit }}</div>
        </div>

        <small v-if="! readonly && _clientService.service?.limitation_sitzung" class="text-blue-300 block mt-2">
          Maximal {{ _clientService.service.limitation_sitzung }} {{ unit }}
        </small>

      </div>
    </div>
  </form>
</template>

<script setup>

import {computed, nextTick, watch} from 'vue'
import Fieldset from 'primevue/fieldset'
import AutoComplete from 'primevue/autocomplete'
import InputNumber from 'primevue/inputnumber'
import {truncate} from 'lodash'

const props = defineProps({
  clientService: {type: Object, default: () => ({
      service: null,
      duration: 1,
    })},
  services: {type: Array, required: true},
  index: {type: Number, required: true},
  readonly: {type: Boolean, default: false}
})

let _clientService = $ref(props.clientService)
watch(() => props.clientService, (value) => _clientService = value, {deep: true})

let _services = $ref([])
watch(() => props.services, (value) => _services = value, {deep: true})


function servicesSearchLabel(service) {
  return service.code + ' ' + truncate(service.bezeichnung, {length: 100})
}

const maxDuration = computed(() => {
  return _clientService?.service?.limitation_sitzung ?? 240
})

const emit = defineEmits(['searchServices', 'serviceSelected'])
const durationInput = $ref()

function onComplete(event) {
  emit('searchServices', event.query)
}

function onServiceSelected() {

  nextTick(() => {
    durationInput.$refs.input.$el.select()
    emit('serviceSelected', _clientService)
  })
}

let unit = computed(() => {
  switch (_clientService?.service?.unit) {
    case 'minute':
      return 'Minuten'
    default:
      return ''
  }
})


</script>
