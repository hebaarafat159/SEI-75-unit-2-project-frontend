import { createWebHistory, createRouter } from 'vue-router'
import CategoriesPage from '../components/CategoriesPage'
import SubCategoriesPage from '../components/SubCategoriesPage'
import ProductsPage from '../components/ProductsPage'
import LoginForm from '../components/LoginForm'
import CartPage from '../components/CartPage'

const routes = [
    {
        name: 'All Categories',
        path: '/',
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
    },
    {
        name: 'CartView',
        
        path: '/shoppingLists/:id/listItems',
        component: CartPage
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router