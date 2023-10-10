<template>
    <header class="header">
        <div>
            <img src="../assets/halty_logo.png" alt="" id="logo">
        </div>
        <div class="cart" id="cart_id">
            <div><img src="../assets/cart_icon.png" alt="" id="cartIcon"></div>
            <div id="cartName">cart</div> 
        </div>
        <div>
            <button ><router-link :to="'/login'" >Login</router-link></button>
        </div>
    </header>
</template>

<script>
export default {
       name: "PagesHeader",
       data: () => ({
            isInit: false,
            isLoggedIn: false,
            userObject:{}
       })
   }
</script>

<style>
    .header{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 10vh;
        background-color: #2596be;
        color: white;
        font-weight: bold;
        font-size: large;
    }

    .header > div{
        padding: 0 5vh;
    }
    
    .header > div:first-child {
        margin-right: auto;
        padding: 0;
    }

    #logo{
        height: 10vh;
    }

    .cart{
        display: flex;
        flex-direction: row;
        flex-direction: row; 
        justify-content: flex-end;
        align-items: center;  
    }

    #cartIcon{
        height: 5vh;
    }
</style>