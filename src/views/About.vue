<template>
  <div class="about">
    <label for="province-selection">Province: </label>
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
  </div>
</template>

<script>
export default {
  name: 'map',
  data () {
    return {
      selectedProvince: '',
      provinceList: [],
      museumList: []
    }
  },
  watch: {
    selectedProvince (newValue) {
      console.log(newValue)
      if (newValue) {
        fetch(`/museum-indonesia/data/${newValue.trim()}.json`)
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
            this.museumList = data.data
          })
      }
    }
  },
  methods: {
    fetchData () {
      fetch('/museum-indonesia/data/province.json')
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          this.provinceList = data.data
        })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
