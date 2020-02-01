<template>
  <div v-if="isLoggedIn">
  <div class="add-inventory">
    <div>
      <h1 style="font-size:200%; font-weight:bold">Add Item To Inventory:</h1>
      <div class="new-inventory">
        <form v-on:submit.prevent="addInventory()">
          <h1 style="font-size:120%; font-weight:bold"><u>Add New Item</u></h1>
          <div class="left-side">
            <br>
            <p>Size:</p>
            <textarea rows="2" style="width:220px" placeholder="Ex. 215/60R16" v-model="size" required></textarea>
            <br>
            <p>Brand:</p> 
            <textarea rows="2" style="width:220px" v-model="brand" required></textarea>
            <br>
            <p>Unit Price:</p> 
            <textarea rows="2" style="width:220px" v-model="price" required></textarea>
            <br>
          </div>
          <div class="right-side">
            <p>Quantity:</p> 
            <textarea rows="2" style="width:220px" v-model="quantity" required></textarea>
            <br>
            <p>Image:</p> 
            <textarea rows="2" style="width:220px" v-model="image" required></textarea>
            <br>
            <p>Category:</p> 
            <select required v-model="category">
              <option disabled value="">Select Item Category</option>
              <option>New</option>
              <option>Used</option>
              <option>Wheel</option>
            </select>
            
          </div>
          <button style="width:10%; margin-left: 275px; margin-top: 20px">Add</button>
        </form>
      </div>
  </div>
</div>
</div>

</template>
    

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";



@Component({})
export default class AddInventory extends Vue {
  error: string | boolean = false;

    brand: string = "";
    category: string = "";
    image: string = "";
    price: number = 0;
    quantity: number = 0;
    size: string = "";

   addInventory(){
        var self = this;
        axios.post('https://texanotireshop.firebaseio.com/inventory.json', {
            brand: this.brand,
            category: this.category,
            image: this.image,
            price: Number(this.price),
            quantity: Number(this.quantity),
            size: this.size
        })
        .then(function (response) {
        console.log(response);
            self.brand = "",
            self.category = "",
            self.image = "",
            self.price = 0,
            self.quantity = 0,
            self.size = ""
        })
    }

  get isLoggedIn(): boolean {
    return !!this.$store.state.userId;
  }
}
</script>


<style scoped>
    .new-inventory {
        padding-top: 20px;
        padding-left: 150px;
    }

    .add-inventory {
        padding-top: 44px;
        padding-left: 70px;
        float: left;
    }

    .left-side {
        float: left;
    }

    .right-side {
        float: right;
        padding-top: 25px;
        padding-right: 400px;
    }
</style>