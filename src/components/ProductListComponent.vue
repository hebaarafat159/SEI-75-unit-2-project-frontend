<template>
    <div class="listView">
        <div class="card" v-for="product in productsList" :key="product._id">
            <div><img v-bind:src="product.image" alt="" id="proImage"></div>
            <div class="productContent">
                <div class="nameStyle"> {{ product.name }} </div>
                <div v-if="selectedId === product._id">
                   <AddProductComponent :product="product"></AddProductComponent> 
                </div>
                <div v-else>
                    <button class="btn btn-info" v-on:click="addProductToList" id="addIcon" :value="product._id"> Add </button>
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
            isAdded: false,
            selectedId:''
        }),
        props : {
             productsList: Array,
         },
         methods:{
            addProductToList: function(event){
                console.log(`Adding Prduct to list ::: ${event.target.value}`);
                this.selectedId = event.target.value;
            }
         },
         components:{
            AddProductComponent
         }
    }
 </script>
 
 