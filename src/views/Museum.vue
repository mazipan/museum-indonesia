<template>
  <div class="museum">

    <div class="selection">
      <label for="province-selection">Select province: </label>
      <select id="province-selection" v-model="selectedProvince">
        <option disabled value="">Please select province</option>
        <option :value="province.kode_wilayah" v-for="province in provinceList" :key="province.kode_wilayah">
          {{ province.nama }}
        </option>
      </select>
    </div>

    <div v-if="museumList && museumList.length > 0" class="controls">
      <button class="controls__filter">Filter</button>
      <button class="controls__sort" @click="doSort">Sort</button>
      <button class="controls__reset" @click="doReset">Reset</button>
    </div>

    <div v-if="museumList && museumList.length > 0" class="museum__list">
      <div class="museum__card" v-for="(museum, index) in museumList" :key="index">
        {{ index+1 }}.
        {{ museum.nama }}
      </div>
    </div>

    <div v-if="!museumList || museumList.length <= 0" class="empty">
      <img alt="Museum Indonesia logo" src="../assets/logo.png" class="logo">
      <br>
      <small>Not found any data</small>
    </div>

    <div id="mapbox__container" class="mapbox__container"></div>
  </div>
</template>

<script>
export default {
  name: 'museum',
  data () {
    return {
      selectedProvince: '',
      provinceList: [],
      museumList: [],
      museumListOrigin: []
    }
  },
  watch: {
    selectedProvince (newValue) {
      if (newValue) {
        this.museumList = []
        this.museumListOrigin = []
        fetch(`/museum-indonesia/data/${newValue.trim()}.json`)
          .then(resp => resp.json())
          .then(data => {
            this.museumList = [].concat(data.data)
            this.museumListOrigin = [].concat(data.data)
          })
      }
    }
  },
  methods: {
    fetchDataProvince () {
      fetch('/museum-indonesia/data/province.json')
        .then(resp => resp.json())
        .then(data => {
          this.provinceList = data.data
        })
    },
    doSort () {
      this.museumList.sort((a, b) => a.nama < b.nama)
    },
    doReset () {
      this.museumList = [].concat(this.museumListOrigin)
    },
    generateMarker (map, mapboxgl, museumList) {
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
    initMap (museumList) {
      const mapboxgl = () => import(/* webpackChunkName: "mapbox-gl" */ 'mapbox-gl/dist/mapbox-gl.js')
      mapboxgl.accessToken =
        'pk.eyJ1IjoibWF6aXBhbiIsImEiOiJjamxjNXl0MWk0bXZuM3FsbXJ4Zno4dzBwIn0.5iwp2hDExpabMN6dIrkdeg'

      const map = new mapboxgl.Map({
        container: 'mapbox__container',
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: 4.0,
        center: [120.0, 1.38994]
      })

      map.addControl(new mapboxgl.NavigationControl())
      this.generateMarker(map, mapboxgl, museumList)
    }
  },
  mounted () {
    this.fetchDataProvince()
  }
}
</script>

<style lang="scss" scoped>
.museum {
  text-align: left;
  padding-top: .5em;
  &__list{
    margin-top: 1em;
  }
  &__card{
    margin-bottom: 1em;
    padding: 1em;
    background: #fff;
    color: #666;
    box-shadow: 4px 4px 15px 3px rgba(0, 0, 0, 0.08);
    border-radius: .3em;
    border: 1px solid #f5f5f5;
  }
}
.selection{
  display: flex;
  align-items: center;
  label{
    width: 30%;
  }
  select{
    -webkit-appearance: none;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    width: 70%;
  }
}
.controls{
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
  padding: .25em;
  button{
    -webkit-appearance: none;
    background-color: #fff;
    color: #000;
    outline: 0;
    width: 50%;
    padding: 1em;
    border: 1px solid #ddd;
  }
  &__sort, &__reset{
    border-left: 0 !important;
  }
  &__reset{
    width: 20% !important;
  }
}
.mapbox__container {
  height: 300px;
  width: 100%;
}
.empty{
  text-align: center;
  margin-top: 2em;
  .logo{
    width: 100px;
    height: 100px;
  }
}
</style>
