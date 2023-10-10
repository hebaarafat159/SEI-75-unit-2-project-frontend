<template>
    <h1>All Categories</h1>
    <CategoryListComponent :list="categories"></CategoryListComponent>
</template>

<script>
    import CategoryListComponent from '../components/CategoryListComponent.vue' 
    const API_URL = 'http://localhost:4000'

    export default {
        name: 'AllCategoriesView',
        data: () => ({
            error: '',
            categories: []
        }),

        mounted() {
            fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(result => {
                    console.log(`All Categories: ${JSON.stringify(result.body)}`);
                    this.categories = result.body;
            })
        },
        methods: {},
        components: {
            CategoryListComponent
        }
    }
</script>

<style>
.listView{
   /* display: flex;
   justify-content: center;
   flex-wrap: wrap; */
   display: flex;
   flex-direction: column;
   gap: 2px;
}

.card{
   border: 1px solid green;
   border-radius: 4px;
   display: flex;
   flex-direction: column;
   gap: 2px;
   padding: 10px;
}

.row{
   background-color: transparent;
   display: flex;
   gap: 2px;
}
</style>