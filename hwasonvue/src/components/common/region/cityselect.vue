<template>
   <div class="city-select">
     <select class="select" v-model="selectedProvince" name="province" >
       <option v-for="(item, index) in provinces"
                      v-if="item.level === 1"
                      :value="item">
         {{ item.name }}
       </option>
     </select>
     <select v-model="selectedCity" name="city">
       <option
         v-for="(item, index) in cities"
         :value="item">
         {{ item.name }}
       </option>
     </select>
     <select v-model="selectedBlock" name="block">
       <option
         v-for="(item, index) in blocks"
         :value="item">
         {{ item.name }}
       </option>
     </select>
   </div>
</template>

<script>
  /**
   *  省 市 区/县城  三联动选择器
   */
  import provinces from '../../../util/provinces.js'

  import Vue from 'vue'
  export default {
    name: 'appregion',

    created() {
      // 数据初始化,默认选中北京市,默认选中第一个;北京市数据为总数据的前18个
      let beijing = this.provinces.slice(0, 19)
        console.log("beijing",beijing)
      this.cities = beijing.filter(ite1m1 => {
        if (ite1m1.level === 2) {
          return true
        }
      })
        console.log("cities",this.cities)
      this.selectedCity = this.cities[0]
      this.blocks = beijing.filter(item2 => {
        if (item2.level === 3) {
          return true
        }
      })
        console.log("blocks",this.blocks)
      this.selectedBlock = this.blocks[0]
    },

    watch: {
      selectedProvince(newVal, oldVal) {
        // 港澳台数据只有一级,特殊处理
        if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
          this.cities = [newVal]
          this.blocks = [newVal]
        } else {
          this.cities = this.provinces.filter(item => {
            if (item.level === 2 && item.sheng && newVal.sheng === item.sheng) {
              return true
            }
          })
        }
        var _this = this
        // 此时在渲染DOM,渲染结束之后再选中第一个
        Vue.nextTick(() => {
          _this.selectedCity = _this.cities[0]
          _this.$emit('input', _this.info)
        })
      },

      selectedBlock() {
        var _this = this
        Vue.nextTick(() => {
          _this.$emit('input', _this.info)
        })
      },

      selectedCity(newVal) {
        // 选择了一个市,要选择区了 di是城市的代表,sheng
        if (newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
          this.blocks = [newVal]
          this.cities = [newVal]
        } else {
          this.blocks = this.provinces.filter(item => {
            if (item.level === 3 && item.sheng && item.sheng == newVal.sheng && item.di === newVal.di && item.name !== '市辖区') {
              return true
            }
          })
        }
        var _this = this
        Vue.nextTick(() => {
          _this.selectedBlock = _this.blocks[0]
          // 触发与 v-model相关的 input事件
          _this.$emit('input', _this.info)
        })
      }
    },

    computed: {
      info() {
        return {
          province: this.selectedProvince,
          city: this.selectedCity,
          block: this.selectedBlock
        }
      }
    },

    data() {
      return {
        selectedProvince: provinces[0],
        selectedCity: 0,
        selectedBlock: 0,
        cities: 0,
        provinces,
        blocks: 0
      }
    }
  }
</script>

<style >
   .select{
    outline:none;
  }

</style>


