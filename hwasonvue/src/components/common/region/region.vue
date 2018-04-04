<template>
   <div id="appregion">
     <h6>vue 省市区三联动 demo</h6>
     <city-select v-model="cityInfo"></city-select>
     <h6>v-model的值是 <code>{{ cityInfo }}</code></h6>
     <h6>从v-model得知,你选择了 <i>{{ cityName }}</i></h6>
   </div>
</template>
<script>
  import CitySelect from './cityselect.vue'
  export default {
    data() {
      return {
        cityInfo: '',
      }
    },
    components: {
      CitySelect
    },
    computed: {
      cityName() {
        const names = [];
        this.cityInfo.province && names.push(this.cityInfo.province.name + ' ')
        this.cityInfo.city     && names.push(this.cityInfo.city.name + ' ')
        this.cityInfo.block    && names.push(this.cityInfo.block.name + ' ')
        return names.join('')
      }
    }
  }
</script>
<style>
   input{
    select: none;
  }
</style>
