<template>
    <div class="listView">
        <div class="card" v-for="product in productsList" :key="product._id">
            <div><img src="../assets/cart_icon.png" alt="" id="proImage"></div>
            <div class="addProduct">
                <h2> {{ product.name }} </h2>
                <div v-if="isAdded">
                   <AddProductComponent :product="product"></AddProductComponent> 
                </div>
                <div v-else>
                    <p><button v-on:click="addProductToList" id="addproduct"> + </button></p>
                </div>
            </div>
        </div>
    </div>
 </template>
 
 <script>
    import AddProductComponent from './AddProductComponent.vue'
    export default {
        name: 'ProductListComponent',
        data: () => ({
            isInit: false,
            isLoggedIn: false,
            isAdded: false
        }),
        props : {
             productsList: Array,
         },
         methods:{
            addProductToList: function(){
                console.log('Adding Prduct to list');
                // TODO hide add button
                this.isAdded = true;
                // TODO show adding component view
                // TODO get data from component 
                // TODO send put request tp backend
            }
         },
         components:{
            AddProductComponent
         }
    }
 </script>

<style>
  #proImage{
        height: 20vh;
        width: 20vw;
    }
</style>
 
 