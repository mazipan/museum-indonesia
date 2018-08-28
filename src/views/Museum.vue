<template>
  <div class="museum">
    <h1>List of Museum</h1>
    <label for="province-selection">Select province: </label>
    <select id="province-selection" v-model="selectedProvince">
      <option disabled value="">Please select one</option>
      <option :value="province.kode_wilayah" v-for="province in provinceList" :key="province.kode_wilayah">
        {{ province.nama }}
      </option>
    </select>

    <div v-if="museumList && museumList.length > 0">
      <table>
        <thead>
          <th>
            <td>No</td>
            <td>Name</td>
          </th>
        </thead>
        <tbody>
          <tr v-for="(museum, index) in museumList" :key="museum.museum_id">
            <td>{{ index+1 }}</td>
            <td>{{ museum.nama }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="mapbox__container" class="mapbox__container"></div>
  </div>
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

export default {
  name: 'museum',
  data() {
    return {
      selectedProvince: '',
      provinceList: [],
      museumList: []
    }
  },
  watch: {
    selectedProvince(newValue) {
      if (newValue) {
        fetch(`/museum-indonesia/data/${newValue.trim()}.json`)
          .then(resp => resp.json())
          .then(data => {
            this.museumList = data.data
            this.initMap(this.museumList)
          })
      }
    }
  },
  methods: {
    fetchData() {
      fetch('/museum-indonesia/data/province.json')
        .then(resp => resp.json())
        .then(data => {
          this.provinceList = data.data
        })
    },
    generateMarker(map, museumList) {
      museumList.map(item => {
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.backgroundImage = 'url(https://i.imgur.com/MK4NUzI.png)'
        el.style.width = '32px'
        el.style.height = '40px'

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(item.nama)

        new mapboxgl.Marker(el)
          .setLngLat([item.bujur, item.lintang])
          .setPopup(popup) // sets a popup on this marker
          .addTo(map)
      })
    },
    initMap(museumList) {
      mapboxgl.accessToken =
        'pk.eyJ1IjoibWF6aXBhbiIsImEiOiJjamxjNXl0MWk0bXZuM3FsbXJ4Zno4dzBwIn0.5iwp2hDExpabMN6dIrkdeg'

      const map = new mapboxgl.Map({
        container: 'mapbox__container',
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: 4.0,
        center: [120.0, 1.38994]
      })

      map.addControl(new mapboxgl.NavigationControl())
      this.generateMarker(map, museumList)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.museum {
  text-align: left;
}
.mapbox__container {
  height: 300px;
  width: 100%;
}
</style>
