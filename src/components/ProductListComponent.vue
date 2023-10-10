<template>
    <div class="listView">
        <div class="card" v-for="product in productsList" :key="product._id">
            <h2> {{ product.name }} </h2>
             <!-- <h2><router-link :to="`/categories/${product._id}/content`" >  {{ category.name }} </router-link></h2> -->
        </div>
    </div>
 </template>
 
 <script>
    export default {
        name: 'ProductListComponent',
        props : {
             productsList: Array
         }
    }
 </script>
 
 