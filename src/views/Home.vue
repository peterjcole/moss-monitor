<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <DeviceSelector
          v-if="selectedDevice"
          :devices="devices"
          :selected-device-index="selectedDeviceIndex"
          @selected="index => selectedDeviceIndex = index"
        />
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <apexchart
            type="area"
            :options="chartOptions"
            :series="co2Series"
          />
          <!--          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"/>-->
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { store, mutations } from '@/store'
import DeviceSelector from '@/components/DeviceSelector'

// import exampleData from '@/exampleData'

export default {
  name: 'Home',
  components: { DeviceSelector },
  data: function () {
    return {
      devices: [],
      selectedDeviceIndex: -1,
      airData: [],
      // airData: exampleData,
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'CO2',
          align: 'left',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          title: {
            text: 'CO2 (PPM)',
          },
          labels: {
            formatter (val) {
              return val.toFixed(0)
            }
          },
          decimalsInFloat: 1
        },
        xaxis: {
          type: 'datetime',
        },
      },
    }
  },
  computed: {
    selectedDevice() {
      return this.devices[this.selectedDeviceIndex]
    },
    co2Series() {
      return [{
        data: this.airData.map(timeBlock => {
          return {
            x: timeBlock.timestamp,
            y: timeBlock.sensors.find(sensor => sensor.comp === 'co2').value,
          }
        }),
      }]
    },
  },
  watch: {
    selectedDeviceIndex() {
      if (this.selectedDevice) {
        this.getDeviceData()
      }
    },
  },
  mounted() {
    this.getDevices()
  },
  methods: {
    getDevices() {
      axios.get('https://developer-apis.awair.is/v1/users/self/devices',
        { headers: { Authorization: `Bearer ${store.token}` } })
        .then(res => {
          this.devices = res.data.devices
          this.selectedDeviceIndex = 0
        })
        .catch((error) => {
          if (error.response.status === 403) {
            mutations.clearToken()
            this.$router.push('/login')
          }
        })
    },
    getDeviceData() {
      axios.get(
        `https://developer-apis.awair.is/v1/users/self/devices/${this.selectedDevice.deviceType}/${this.selectedDevice.deviceId}/air-data/15-min-avg`,
        { headers: { Authorization: `Bearer ${store.token}` } })
        .then(res => {
          this.airData = res.data.data
        })
        .catch((error) => {
          if (error.response.status === 403) {
            mutations.clearToken()
            this.$router.push('/login')
          }
        })
    },
  },
}
</script>
