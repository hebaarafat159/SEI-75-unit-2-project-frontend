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
        path: '/categories/:id/subcategories',
        component: SubCategoriesPage
    },
    {
        name: 'Products',
        path: '/categories/:id/products',
        component: ProductsPage
    },
    {
        name: 'LoginForm',
        path: '/login',
        component: LoginForm
    }
    // {
    //     name: 'A Book',
    //     path: '/books/:id',
    //     component: SingleBookView
    // },
    // {
    //     name: 'Add Or Edit Book',
    //     path: '/books/addOrUpdate/:id',
    //     component: AddOrUpdateBookView
    // },
    // {
    //     name: 'All Authors',
    //     path: '/authors',
    //     component: AllAuthorsView
    // },
    // {
    //     name: 'An Author',
    //     path: '/authors/:id',
    //     component: SingleAuthorView
    // },
    // {
    //     name: 'LoginForm',
    //     path: '/login',
    //     component: LoginForm
    // }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router