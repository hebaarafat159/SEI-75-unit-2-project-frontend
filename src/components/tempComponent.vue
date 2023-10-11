<template>
    <div class="listView">
        <div class="card" v-for="product in productsList" :key="product._id">
            <div><img src="../assets/cart_icon.png" alt="" id="proImage"></div>
            <div class="productContent">
                <h2> {{ product.name }} </h2>
                <button class="btn btn-info" v-on:click="addProductToList" id="addIcon"> Add </button>
                <Transition>
                    <div v-if="show">
                        <p>hello</p>
                        <AddProductComponent :product="product"></AddProductComponent> 
                    </div>
                </Transition>
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
 
 