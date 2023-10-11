<template>
    <header class="header">
        <div>
            <img src="../assets/halty_logo.png" alt="" id="logo" v-on:click="loadHomePage">
        </div>
        <div class="cart" id="cart_id" @click="openCartPage">
            <div><img src="../assets/cart_icon.png" alt="" id="cartIcon"></div>
            <div id="cartName">cart</div> 
        </div>
        <div>
            <div v-if="isLoggedIn">
        <!-- <h2>Hello {{ userName }}</h2> -->
        <button @click="handleLogOut">Log Out</button>
    </div>
    <div v-else>
        <GoogleLogin :callback="callback" />
    </div>
            <!-- <button ><router-link :to="'/login'" >Login</router-link></button> -->
        </div>
    </header>
</template>

<script>  
import { decodeCredential, googleLogout } from 'vue3-google-login'

export default {
    name: "PagesHeader",
    data: () => ({
        isInit: false,
        isLoggedIn: false,
        userObject:{},
        currentListId:'',
        userShoppingLists:[]
    }),
    mounted(){
        if(this.$cookies.isKey('user_session')){
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userObject = userData; 
            if(userData!== null){
                console.log(`${userData.email} is logged in ..... `);

            }else{
                console.log(`please login ..... `);
            }
        }
    },
    methods:{
        loadHomePage: function(){
            this.$router.replace({name: 'All Categories'});
        },
        callback: function (response) {
            this.isLoggedIn = true
            let userData = decodeCredential(response.credential)
            // TODO delete this line
            console.log(userData);
            this.userObject = userData;
            console.log(`Google User: ${JSON.stringify(this.userObject)}`);
            this.$cookies.set('user_session', response.credential);
            fetch("http://localhost:4000/users/login",{
                  method: "POST",
                  headers:{
                      "Content-Type" : "application/json"
                  },
                  body: JSON.stringify(this.userObject)
              })
              .then(res => 
              {
                  console.log(res.status)
                  if(res.status === 200){
                    console.log('Saved Successfully');
                    // this.$router.push({name: 'All Categories'});
                    this.getUsersList()
                  }
              }).catch (error => {
                console.log(error);
              })
        },
        handleLogOut: function () {
            googleLogout()
            this.$cookies.remove('user_session')
            this.isLoggedIn = false
        },
        openCartPage: function(){
            // TODO remove this line
            this.currentListId = '6523ec21549acd91ef6ac71a'; 
            this.$router.replace({path: `/shoppingLists/${this.currentListId}/listItems`});
        },
        getUsersList: function(){
            this.userObject.emial = 'heba.arafat159@gmail.com'
            fetch(`http://localhost:4000/shoppingLists/${this.userObject.emial}`)
            .then(response => response.json())
            .then(result => {
                    console.log(`User Lists: ${JSON.stringify(result.body)}`);
                    this.userShoppingLists = result.body;
            })
        }
    }
   }
</script>