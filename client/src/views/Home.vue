<template>
  <div class="home">
     <div class="carousel-div"> 
      <carousel 
      :autoplay="true" :autoplayTimeout=5000
      :perPage=1 paginationActiveColor="#239CEC"
      paginationColor="#b2ebd1" :speed=300 :loop="true">
        <slide class="VueCarousel-slide">
          <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/canam.jpg?alt=media&token=300f9cc2-4d71-4557-bdab-721e24b8383d">
          <!-- src="../assets/canam.jpg" -->
        </slide>
        <slide class="VueCarousel-slide">
          <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/camaro.jpg?alt=media&token=6811d8e2-6352-4f80-87e4-2d14b3d66581">
          <!-- src="../assets/camaro.jpg" -->
        </slide>
        <slide class="VueCarousel-slide">
          <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/raptor.jpg?alt=media&token=d85da3dc-6ec7-43b9-babd-5408b5137c81">
          <!-- src="../assets/raptor.jpg" -->
        </slide> 
      </carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const { Carousel, Slide } = require('vue-carousel');

@Component({
  components: {
    Carousel,
    Slide
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.VueCarousel-slide {
  position: relative;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  height: 450px;
}

.carousel-div {
  padding-top: 30px;
  align-items: center;
  justify-content: center;
  width: 100%
}

.home {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  width: 90%; 
}

</style>
