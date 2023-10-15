<template>
   <div class="listView">
       <div class="card" v-for="category in list" :key="category._id">
            <div><img v-bind:src="category.image" alt="" id="catImage"></div>   
            <div><router-link class="nameStyle" :to="`/categories/${category._id}/content`" >  {{ category.name }} </router-link></div>
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