<template>
  <div>
    <NavBar :isSearched="isSearched" @searchDish="searchDish"></NavBar>

    <FoodCard v-for="card in searchData" :card="card"></FoodCard>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import { Tabs, Tab, Cell } from 'vant';
import FoodCard from '@/components/FoodCard';
import { mapGetters } from 'vuex';
import { debounce } from '@/utils';

export default {
  name: 'search',
  data() {
    return {
      isSearched: true,
      active: 0,
      searchData: []
    };
  },
  computed: {
    ...mapGetters(['getDishList'])
  },
  methods: {
    searchDish(value) {
      this.searchData = []
      console.log('value', value);
      for (const key in this.getDishList) {
        console.log(this.getDishList[key].dishList);
        for (let i = 0; i < this.getDishList[key].dishList.length; i++) {
          if (this.getDishList[key].dishList[i].name.indexOf(value) !== -1) {
            this.searchData.push(this.getDishList[key].dishList[i])
          }
        }
      }
      console.log(this.searchData);
    },

  },
  components: {
    NavBar,
    Tabs,
    Tab,
    FoodCard,
    Cell
  },

};
</script>

<style scoped>

</style>
