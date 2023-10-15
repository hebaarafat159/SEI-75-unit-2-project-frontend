<template>
    <header class="header">
        <div>
            <img src="../assets/halty_logo.png" alt="" id="logo" v-on:click="loadHomePage">
        </div>
        <div class="cart" id="cart_id">
            <div><img src="../assets/cart_icon.png" alt="" id="cartIcon"  @click="openCartPage"></div>
            <div > {{count}} </div>
            <div v-if="isLoggedIn">
                <select name="currentList" id="currentList" v-model="currentList" :value="currentList?.name" @change="onCartChange">
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
            <button @click="handleLogOut">Log Out</button>
            </div>
            <div v-else>
                <GoogleLogin :callback="callback" />
            </div>
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
        count:0,
        userShoppingLists:[]
    }),
    mounted(){
        if(this.$cookies.isKey('user_session')){
            this.userObject = decodeCredential(this.$cookies.get('user_session'))
            if(this.userObject!== null){
                // console.log(`${this.userObject.email} is logged in ..... `);
                this.isLoggedIn = true
                this.getUsersList();
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
            // console.log(`Google User: ${JSON.stringify(this.userObject)}`);
            this.$cookies.set('user_session', response.credential);
            fetch("http://localhost:4000/users/login",{
                  method: "POST",
                  headers:{
                      "Content-Type" : "application/json"
                  },
                  body: JSON.stringify({email: this.userObject.email, name: this.userObject.name})
              })
              .then(res => 
              {
                //   console.log(res.status)
                  if(res.status === 200){
                    // console.log('Saved Successfully');
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
            this.count = 0;
            this.$cookies.remove('current_list_id');
        },
        openCartPage: function(){
            if(this.currentList !== null)
            {
                this.$cookies.set('current_list_id',this.currentList._id);
                this.$router.replace({path: `/shoppingLists/${this.currentList._id}/listItems`});
            }
        },
        getUsersList: function(){
            fetch(`http://localhost:4000/shoppingLists/${this.userObject.email}`)
            .then(response => response.json())
            .then(result => {
                    // console.log(`User Lists: ${JSON.stringify(result.body)}`);
                    this.userShoppingLists = result.body;
                    if(this.userShoppingLists!== null && this.userShoppingLists.length > 0)
                    {
                        this.userShoppingLists.forEach(element => {
                            if(element.isSelected)
                            {
                                this.currentList = element;
                                this.currentList.name = element.name;
                                this.$cookies.set('current_list_id', this.currentList._id);
                            }
                        });
                        if(this.currentList !== null)
                        {
                            this.count = this.currentList.listItems.length;
                            if(this.count === undefined)
                                this.count = 0;
                        }
                    }else{
                        // save a default list 
                        fetch(`http://localhost:4000/shoppingLists/add/${this.userObject.email}`,{
                            method: "POST",
                            headers:{
                                "Content-Type" : "application/json"
                            },
            
                            body: JSON.stringify({listName: 'MyCart'})
                        })
                        .then(response => response.json())
                        .then(result => {
                            if(result.status === 200){
                                // console.log(`Saved Or Update Successfully : ${JSON.stringify(result.body)}` );
                                // console.log(`New Item ID : ${JSON.stringify(result.body._id)}`);
                                this.currentList = result.body;
                                this.currentList.name = result.body.name;
                                this.$cookies.set('current_list_id',result.body._id);
                                this.count = 0;
                            }
                        })  
                        .catch (error => {
                            console.log(error);
                        })
                    }
            })
        },
        getCurrentListCount: function(){
            if(this.currentList !== null)
            {
                fetch(`http://localhost:4000/shoppingLists/${this.currentList._id}/count`)
                .then(response => response.json())
                .then(result => {
                        // console.log(`User Lists: ${JSON.stringify(result.body)}`);
                        this.selectedCartCount = result.body;
                })
            }
        },
        onCartChange: function(){
            console.log(`Cart Selection changed: ${this.currentList._id} :: ${this.currentList.name}`);
            if(this.currentList !== null)
            {
                this.$cookies.set('current_list_id',this.currentList._id);
                this.count = this.currentList.listItems.length;
            }
        }
    }
   }
</script>