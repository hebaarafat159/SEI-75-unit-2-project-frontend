<template>
    <div class="productAddView" v-bind="product" :key="product._id">
        <div>
            <b-form-textarea id="textarea" v-model="text" placeholder="0.0" rows="1" max-rows="1"></b-form-textarea>
            <pre class="mt-3 mb-0">{{ text }}</pre>
        </div>
        <!-- <p><input type="text" name="quantity" v-model="quantity" placeholder="0.0"></p> -->
        <b-dropdown id="dropdown-offset" offset="25" text="measure" class="m-2">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
        </b-dropdown>
        <!-- <p><input type="text" name="measures" v-model="product." placeholder="Book Description"></p> -->
        <p><button v-on:click="saveProduct"> save </button></p>
        <p><button v-on:click="saveProduct"> remove </button></p>
    </div>
 </template>
 
 <script>
    export default {
        name: 'AddProductComponent',
        props : {
            quantity: Number,
            product: Object,
            measure: Object
         },
         methods:{
            saveProduct: function(){
                console.log('Saving Prduct to list');
                // TODO hide add button
                
                // TODO show adding component view
                // TODO get data from component 
                // TODO send put request tp backend
            },
            removeProduct: function(){
                console.log('Remove Prduct to list');
            }
         }
    }
 </script>

 
 
 
 