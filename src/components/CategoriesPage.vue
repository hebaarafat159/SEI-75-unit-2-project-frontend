<template>
    <h1>All Categories</h1>
    <CategoryListComponent :list="categories"></CategoryListComponent>
</template>

<script>
    import CategoryListComponent from '../components/CategoryListComponent.vue' 
    const API_URL =process.env.VUE_APP_URL_APP_PATH// 'http://localhost:4000'

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
                    // console.log(`All Categories: ${JSON.stringify(result.body)}`);
                    this.categories = result.body;
            })
        },
        methods: {},
        components: {
            CategoryListComponent
        }
    }
</script>