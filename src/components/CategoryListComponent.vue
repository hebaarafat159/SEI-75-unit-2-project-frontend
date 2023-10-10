<template>
   <div class="listView">
       <div class="card" v-for="category in list" :key="category._id">
        <!-- <div v-if="category.isSubCategory"> -->
            <!-- <h2><router-link :to="`/categories/${category._id}/products`" >  {{ category.name }} </router-link></h2> -->
        <!-- </div> -->
        <!-- <div v-else> -->
            <h2><router-link :to="`/categories/${category._id}/subcategories`" >  {{ category.name }} </router-link></h2>
        <!-- </div>      -->
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

