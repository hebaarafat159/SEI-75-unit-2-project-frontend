<template>
    <h1>Cart Page</h1>
    <!-- Header View -->
    <div class="cartPageHeader">
        <button class="btn btn-info" v-on:click="back" id="backButtonId"> back </button>
        <div>
            <button class="btn btn-info" v-on:click="shareList" id="shareButtonId"> Share </button>
            <div v-if="isShareMode">
                <div v-if="list?.name === 'MyCart'">
                    <input class="cardListItemDetails" type="text" name="listName" v-model="sharedListName" placeholder="Share List Name">
                </div>
                <input  class="cardListItemDetails" type="text" name="sharedEmail" v-model="sharedEmail" placeholder="Share With Email">
                <button class="btn btn-info" v-on:click="sendShareList" id="sendShareButtonId"> Send </button> 
            </div>
        </div>
    </div>
    <!-- List Items view -->
    <div class="cardListItem" v-for="item in items" :key="item._id">
        
        <!-- check box view -->
        <div>
            <input type="checkbox" v-model="model" :value="item._id" @click="handleCheckBox" />
        </div>
        <!-- item details view -->    
        <div class="quantityLayout">
            <div class="cardListItemName"> {{ item.product_id.name }} </div>
            <div v-if="selectedViewId === item._id && isEditMode">
                <input class="cardListItemDetails" type="text" name="quantity" v-model="item.quantity" placeholder="0.0">
                <div class="cardListItemDetails" id="viewData"> {{ item.measure_id.name}}</div> 
            </div>
            <div v-else>
                <div class="cardListItemDetails"> {{ item.quantity }}  {{ item.measure_id.name}}</div> 
            </div>
        </div>
       
        <!-- edit view -->
        <div v-if="selectedViewId === item._id" id="cartItemButtonsLayout">
            <ItemViewButtons :product="item" :quantity="item.quantity" ></ItemViewButtons> 
        </div>
        <div v-else id="editButtonIdView">
            <button class="btn btn-info"  v-on:click="editList" id="editButtonId" :value="item._id"> Edit </button>
        </div>
    </div>
 </template>
 
<script>
// import { useRoute } from 'vue-router'
import ItemViewButtons from '../components/ItemViewButtons.vue'
import { decodeCredential } from 'vue3-google-login'

export default {
    name: 'CartPage',
    data: () => ({
        error: '',
        items: [],
        isChecked: true,
        selectedItem:{},
        list : {
            id:'',
            name:''
        },
        sharedEmail:null,
        sharedListName:null,
        isEditMode: false,
        isShareMode: false,
        selectedViewId:null,
        selectedViewQuantity:0
    }),
    mounted() {
        this.list.id = this.$cookies.get('current_list_id');
        this.list.name = this.$cookies.get('current_list_name');
        fetch(`${process.env.VUE_APP_URL_APP_PATH}/shoppingLists/${this.list.id}/listItems`)
        .then(response => response.json())
        .then(result => {
                console.log(`List products: ${JSON.stringify(result.body)}`);
                this.items = result.body;
                // this.selectedItem = this.items[0];
        })
    },
    methods: {
        back: function(){
            this.$router.replace({name: 'All Categories'});
        },
        shareList: function(){
            const n = this.$cookies.get('current_list_name');
            console.log(`SHare with : ${this.sharedEmail} , shared list name : ${this.list.name} : ${n}` );
           
            if(this.isShareMode)
                this.isShareMode = false;
            else
                this.isShareMode = true;
        },
        sendShareList: async function(){ 
            // if(this.listId !== null && this.sharedEmail!==)
            if(this.list.name === 'MyCart' && this.sharedListName !== null)
            {
               const userObject = decodeCredential(this.$cookies.get('user_session'))
               const loggedInUserEmail = userObject.email;
               // save a default list 
               await fetch(`${process.env.VUE_APP_URL_APP_PATH}/shoppingLists/add/${loggedInUserEmail}`,{
                            method: "POST",
                            headers:{
                                "Content-Type" : "application/json"
                            },
            
                            body: JSON.stringify({listName: this.sharedListName,sharedEmails:[loggedInUserEmail,this.sharedEmail],items:this.items})
                        })
                        .then(response => response.json())
                        .then(result => {
                            if(result.status === 200){
                                this.list.id = result.body._id;
                                this.list.name = result.body.name;
                                this.$cookies.set('current_list_name',this.list.name);
                                this.$cookies.set('current_list_id',this.list.id);
                            }
                        })  
                        .catch (error => {
                            console.log(error);
                        })
            }
            await fetch(`${process.env.VUE_APP_URL_APP_PATH}/shoppingLists/${this.list.id}/share`,{
                    method: "PUT",
                    headers:{
                        "Content-Type" : "application/json"
                    },
      
                    body: JSON.stringify({sharedEmail:this.sharedEmail})
                })
                .then(response => response.json())
                .then(result => {
                     if(result.status === 200){
                        // console.log(`User Added Successfully : ${JSON.stringify(result.body)}` );
                        this.isShareMode = false;
                        this.isEditMode = false;
                        // this.$router.replace({name: 'All Categories'});
                        this.$router.go();
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
        },
        editList: function(event){
            this.selectedViewId = event.target.value;
            if(this.isEditMode)
                this.isEditMode = false;
            else
                this.isEditMode = true;
        },
        handleCheckBox: function(event){
            // console.log(`Check box is chlicked !!!!!! ${JSON.stringify(event.target.value)}`);
            let selectedProduct = null;
            for(let i=0; i < this.items.length; i++)
            {
                if(this.items[i]._id === event.target.value){
                    selectedProduct = this.items[i];
                    break;
                }
            } 
            console.log(`Check box is chlicked before !!!!!! ${selectedProduct.hasBrought}`);
           
            if(selectedProduct!==null)
            {
                if(selectedProduct.hasBrought)
                    selectedProduct.hasBrought = false;
                else
                    selectedProduct.hasBrought = true;

                // if(this.isChecked)
                //     this.isChecked = false;
                // else
                //     this.isChecked = true;

                // this.selectedItem.hasBrought = this.isChecked;
                
                console.log(`Check box is chlicked after !!!!!! ${selectedProduct.hasBrought}`);
           
                // console.log(`Updaaaaaatinggggg Prduct to list :::::::: ${JSON.stringify(selectedProduct)}`);
                fetch(`${process.env.VUE_APP_URL_APP_PATH}/shoppingLists/${this.list.id}/listItems/updateStatus`,{
                        method: "PUT",
                        headers:{
                            "Content-Type" : "application/json"
                        },
        
                        body: JSON.stringify(selectedProduct)
                    })
                    .then(response => response.json())
                    .then(result => {
                        // console.log(`Saved Or Update Successfully : ${JSON.stringify(result)}` );
                        // // console.log(res.status)
                        if(result.status === 200){
                            console.log(`Status Updated Successfully : ${JSON.stringify(result.body)}` );
                            console.log(`Upadted Item ID : ${JSON.stringify(result.body._id)}` );
                            // selectedProduct = result.body._id;
                            this.$router.go();
                        }
                    })  
                    .catch (error => {
                        console.log(error);
                    })
            }
        }
    },
    components:{
        ItemViewButtons
    }
}
</script>
 
 