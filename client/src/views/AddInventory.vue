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
            <p>Image Url:</p> 
            <textarea rows="2" style="width:220px" v-model="image" required></textarea>
            <br>
            <!-- <v-btn raised @click="onPickFile">Upload Image </v-btn> -->
            <!-- <input type="file" 
                    accept="image/*" 
                    @change="onFilePicked($event)"> -->
            <!-- <img src="imageUrl" height="150"> -->
            <p>Category:</p> 
            <select required v-model="category">
              <option disabled value="">Select Item Category</option>
              <option>New</option>
              <option>Used</option>
              <option>Wheel</option>
            </select>
            
          </div>
          <button style="background-color: #5b8ff6; border-radius: 12px; width:10%; margin-left: 330px; margin-top: 20px">Add</button>
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
    imageUrl: String = "";
    rawImage =  null;

   addInventory(){
        var self = this;

        // if(!this.rawImage){
        //   return;
        // }

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

    onFilePicked(event){
      const files = event.target.files;
      let filename = files[0].name ; 
      console.log("Getting image", filename);
      if(filename.lastIndexOf('.') <= 0){
        return alert("Invalid image");
      }

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () =>{
        this.imageUrl = fileReader.result!.toString();
        console.log("image url", this.imageUrl);
      }, false)
      fileReader.readAsDataURL(files[0]);  
      this.rawImage = files[0];
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