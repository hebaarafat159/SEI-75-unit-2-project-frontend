<template>
        <button class="btn btn-info" v-on:click="back" id="backButtonId"> back </button>
        <div v-if="isProducts">
            <h1>All Products</h1>
            <ProductListComponent :productsList="products"></ProductListComponent>
        </div>
        <div v-else>
            <h1>All SubCategory</h1>
            <CategoryListComponent :list="categories"></CategoryListComponent>
        </div>    
</template>

<script>
    import CategoryListComponent from '../components/CategoryListComponent.vue' 
    import ProductListComponent from './ProductListComponent.vue'
    const API_URL = process.env.VUE_APP_URL_APP_PATH//'http://localhost:4000'
    import { useRoute } from 'vue-router'
    export default {
        name: 'AllCategoriesView',
        data: () => ({
            error: '',
            categories: [],
            products:[],
            isProducts: false
        }),

        mounted() {
            
            fetch(`${API_URL}/categories/${useRoute().params.id}/content`)
           .then(response => response.json())
           .then(result => {
            console.log(`COntent Result :::::  = ${JSON.stringify(result)}`)
                console.log(`Content Body: ${JSON.stringify(result.body)}`);
                console.log(`Content Message: ${JSON.stringify(result.message)}`);
                 
                if(result.message === "products")
                {
                    this.isProducts = true;
                    this.products = result.body;
                }else
                {
                    this.isProducts = false;
                    this.categories = result.body;
                }
           })
        },
        methods: {
            back: function(){
                this.$router.replace({name: 'All Categories'});
            },
        },
        components: {
            CategoryListComponent,
            ProductListComponent
        }
    }
</script>