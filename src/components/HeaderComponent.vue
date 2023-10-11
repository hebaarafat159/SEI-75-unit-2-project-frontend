<template>
    <header class="header">
        <div>
            <img src="../assets/halty_logo.png" alt="" id="logo" v-on:click="loadHomePage">
        </div>
        <div class="cart" id="cart_id" @click="openCartPage">
            <div><img src="../assets/cart_icon.png" alt="" id="cartIcon"></div>
            <div > {{selectedCartCount}} </div>
            <div v-if="isLoggedIn">
                <select name="list" id="list" v-model="selectedValue">
                    <option :value="null" disabled> Select a category</option>
                    <option v-for="list in userShoppingLists" :key="list.id" 
                    :value="list"> {{ list.name }}</option>
                </select> 
            </div>
            <div v-else>
                <div id="cartName">cart</div> 
            </div>
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
        userObject:null,
        currentList:null,
        userShoppingLists:[],
        selectedValue: '',
        selectedCartCount: 0
    }),
    mounted(){
        if(this.$cookies.isKey('user_session')){
            this.isLoggedIn = true
            this.userObject = decodeCredential(this.$cookies.get('user_session'))
            if(this.userObject!== null){
                console.log(`${this.userObject.email} is logged in ..... `);

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
            this.userObject  = decodeCredential(response.credential)
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
                    this.getUsersList();
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
            if(this.currentList !== null)
            {
                this.$router.replace({path: `/shoppingLists/${this.currentList._id}/listItems`});
            }
        },
        getUsersList: function(){
            this.userObject.emial = 'heba.arafat159@gmail.com'
            fetch(`http://localhost:4000/shoppingLists/${this.userObject.emial}`)
            .then(response => response.json())
            .then(result => {
                    console.log(`User Lists: ${JSON.stringify(result.body)}`);
                    this.userShoppingLists = result.body;
                    this.userShoppingLists.forEach(element => {
                        if(element.isSelected)
                            this.currentList = element;
                    });
                    this.selectedValue = this.currentList.name;
                    this.getCurrentListCount();
            })
        },
        getCurrentListCount: function(){
            if(this.currentList !== null)
            {
                fetch(`http://localhost:4000/shoppingLists/${this.currentList._id}/count`)
                .then(response => response.json())
                .then(result => {
                        console.log(`User Lists: ${JSON.stringify(result.body)}`);
                        this.selectedCartCount = result.body;
                })
            }
        }
    }
   }
</script>