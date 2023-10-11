<template>
    <div class="listView">
        <div class="card" v-for="product in productsList" :key="product._id">
            <div><img src="../assets/cart_icon.png" alt="" id="proImage"></div>
            <div class="productContent">
                <h2> {{ product.name }} </h2>
                <div v-if="isAdded">
                   <AddProductComponent :product="product"></AddProductComponent> 
                </div>
                <div v-else>
                    <button class="btn btn-info" v-on:click="addProductToList" id="addIcon"> Add </button>
                    <!-- <img src="../assets/add_icon.png" alt="" v-on:click="addProductToList" id="addIcon"> -->
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
 
 