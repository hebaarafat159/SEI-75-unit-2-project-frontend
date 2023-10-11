import { createWebHistory, createRouter } from 'vue-router'
import CategoriesPage from '../components/CategoriesPage'
import SubCategoriesPage from '../components/SubCategoriesPage'
import ProductsPage from '../components/ProductsPage'
import LoginForm from '../components/LoginForm'

const routes = [
    {
        name: 'All Categories',
        path: '/categories',
        component: CategoriesPage
    },
    {
        name: 'All Sub Categories',
        path: '/categories/:id/content',
        component: SubCategoriesPage
    },
    {
        name: 'Products',
        path: '/categories/:id/content',
        component: ProductsPage
    },
    {
        name: 'LoginForm',
        path: '/login',
        component: LoginForm
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router