<template>
  <div class="home container">
    <div class="top">
      <el-carousel :interval="4000" height="200px">
        <el-carousel-item v-for="(item, index) in carousels" :key="index">
          <el-image :src="item.img" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainc">
      <h3 class="text-center">最新</h3>
      <div class="content-box">
        <wall-card 
        v-for="(item,index) in wallList" 
        :key="index" 
        :data="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {wallNewList} from '@/api/wall';
import banner1 from '@/assets/banner1.jpg';
import banner2 from '@/assets/banner2.jpg';
import WallCard from '@/components/WallCard';
export default {
  name: "Home",
  components: {
    WallCard
  },
  data() {
    return {
      wallList:[],
      carousels: [
        {
          img:banner1,
        },
        {
          img:banner2,
        },
      ],
    };
  },
  mounted(){
    this.fetch()
  },
  methods: {
    fetch(){
      wallNewList().then(res => {
        // console.log('[ res ] >', res)
        if(res.code === 20000) {
          this.wallList = res.data;
        }
      }).catch(()=>{})
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  padding: 2rem 0;
  .el-image {
    width: 100%;
  }
}
.mainc {
  .text-center {
    text-align: center;
  }
  .content-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
