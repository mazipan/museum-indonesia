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
      <button class="controls__filter" title="Search">
        <svg width="30px" height="30px" viewBox="0 0 512 512" class="ion__svg"><path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path></svg>
        Search
      </button>
      <button class="controls__sort" @click="doSort" title="Sort">
        <svg v-if="isAsc" width="30px" height="30px" viewBox="0 0 512 512" class="ion__svg"><path d="M348.3 295.6c-5-5.1-13.3-5.1-18.4-.1L269 356.2V124.9c0-7.1-5.8-12.9-13-12.9s-13 5.8-13 12.9v231.3l-60.9-60.8c-5.1-5-13.3-4.9-18.4.1-5 5.1-5 13.2.1 18.3l83 82.4c1.2 1.1 2.5 2 4.1 2.7 1.6.7 3.3 1 5 1 3.4 0 6.6-1.3 9.1-3.7l83-82.4c5.2-4.9 5.3-13.1.3-18.2z"></path></svg>
        <svg v-if="!isAsc" width="30px" height="30px" viewBox="0 0 512 512" class="ion__svg"><path d="M348.3 216.4c-5 5.1-13.3 5.1-18.4.1L269 155.8v231.3c0 7.1-5.8 12.9-13 12.9s-13-5.8-13-12.9V155.8l-60.9 60.8c-5.1 5-13.3 4.9-18.4-.1-5-5.1-5-13.2.1-18.3l83-82.4c1.2-1.1 2.5-2 4.1-2.7 1.6-.7 3.3-1 5-1 3.4 0 6.6 1.3 9.1 3.7l83 82.4c5.2 4.9 5.3 13.1.3 18.2z"></path></svg>
        Sort
      </button>
      <button class="controls__reset" @click="doReset" title="Reset">
        <svg width="30px" height="30px" viewBox="0 0 512 512" class="ion__svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 336.1c-70.7 0-128-57.3-128-128.1s57.3-128.1 128-128.1v-37c0-6.4 7.1-10.2 12.4-6.7l72.9 52.6c4.9 3.3 4.7 10.6-.4 13.6L268 196.7c-5.3 3.1-12-.8-12-6.9v-41.9c-60.3 0-109.2 49.7-108.1 110.2 1.1 59.1 50.3 106.7 109.5 106 55.9-.7 101.8-43.7 106.3-99 .4-5.2 4.7-9.1 9.9-9.1 5.8 0 10.4 4.9 9.9 10.7-5.4 66-60.4 117.4-127.5 117.4z"></path></svg>
      </button>
      <button class="controls__map" title="Amp">
        <svg width="30px" height="30px" viewBox="0 0 512 512" class="ion__svg"><path d="M280.5 280.5l-49-49c-.9-.9-2.5-.7-3.2.4l-49.5 98.5c-1.1 1.8 1 3.9 2.8 2.8l98.5-49.5c1.1-.7 1.3-2.3.4-3.2z"></path><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm40.6 249.3L137 377.8c-1.8 1.1-3.9-1-2.8-2.8l80.6-159.6c.2-.3.4-.5.7-.7L375 134.2c1.8-1.1 3.9 1 2.8 2.8l-80.6 159.6c-.1.3-.3.5-.6.7z"></path></svg>
      </button>
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
      isAsc: true,
      selectedProvince: '',
      provinceList: [],
      museumList: [],
      museumListOrigin: []
    }
  },
  watch: {
    selectedProvince (newValue) {
      if (newValue) {
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
      this.isAsc = !this.isAsc
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
    border: 1px solid #fed15b;
    width: 70%;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAYAAAARx7TFAAAAAXNSR0IArs4c6QAAAJ1JREFUCB1jzMnJCWdkZBSdPHnyFAYk0NDQwPbmzZuVTExMk5iA4p7//v2bDFScC1OzatUqZqCC5f////cHyikwiYiIJAFNWgIUmARSCKQZDx48OAdIBwJNSZ8yZcp8RpBuoNFMQJ0LgRIxQO4hILYFKsgEOmEmSJ4ZRBw4cOC/l5fXxu/fvysDub5Ak3OAJswAyWEAkIm5ublu6BIADTRHW7YWzxEAAAAASUVORK5CYII=');
    background-position: right 7px center;
    background-repeat: no-repeat;
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
    border: 1px solid #fed15b;
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
      fill: #fed15b;
    }
  }
  &__sort, &__reset, &__map{
    border-left: 0 !important;
  }
  &__reset, &__map{
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
