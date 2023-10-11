<template>
   <div class="listView">
       <div class="card" v-for="category in list" :key="category._id">
            <div><img src="../assets/cart_icon.png" alt="" id="catImage"></div>   
            <h2><router-link :to="`/categories/${category._id}/content`" >  {{ category.name }} </router-link></h2>
       </div>
   </div>
</template>

<script>
   export default {
       name: 'CategoryListComponent',
       props : {
            list: Array
        }
   }
</script>