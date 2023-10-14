<template>
    <h1>Cart Page</h1>
    <div class="cartPageHeader">
        <div>
            <button class="btn btn-info" v-on:click="shareList" id="shareButtonId"> Share </button>
            <input type="text" name="sharedEmail" v-model="sharedEmail" placeholder="Share With Email"> 
        </div>
        <!-- <select name="currentList" id="currentList" v-model="currentList" :value="currentList.name">
            <option :value="null" disabled> Select a category</option>
            <option v-for="list in userShoppingLists" :key="list.id" :value="list"> {{ list.name }}</option>
        </select>  -->
        <button class="btn btn-info"  v-on:click="editList" id="editButtonId">Edit</button>
    </div>
    <div class="listView">
        <div class="itemLayout" v-for="item in items" :key="item._id">
            <input type="checkbox" v-model="model" :value="isChecked" @click="handleCheckBox" />
            <div class="quantityLayout">
                <h2> {{ item.product_id.name }} </h2>
                <h4> {{ item.quantity }}  {{ item.measure_id.name}}</h4> 
            </div>
            <ItemViewButtons :product="item" ></ItemViewButtons>
        </div>
    </div>
 </template>
 
<script>
// import { useRoute } from 'vue-router'
import ItemViewButtons from '../components/ItemViewButtons.vue'
export default {
    name: 'CartPage',
    data: () => ({
        error: '',
        items: [],
        isChecked: true,
        selectedItem:{},
        listId : '',
        sharedEmail:''
    }),
    mounted() {
        this.listId = this.$cookies.get('current_list_id','')
        fetch(`http://localhost:4000/shoppingLists/${this.listId}/listItems`)
        .then(response => response.json())
        .then(result => {
                console.log(`List products: ${JSON.stringify(result.body)}`);
                this.items = result.body;
                this.selectedItem = this.items[0];
        })
    },
    methods: {
        shareList: function(){
            // if(this.listId !== null && this.sharedEmail!==)
            console.log(`SHare with : ${this.sharedEmail}` );
            
            fetch(`http://localhost:4000/shoppingLists/${this.listId}/share`,{
                    method: "PUT",
                    headers:{
                        "Content-Type" : "application/json"
                    },
      
                    body: JSON.stringify({sharedEmail:this.sharedEmail})
                })
                .then(response => response.json())
                .then(result => {
                    // console.log(`Saved Or Update Successfully : ${JSON.stringify(result)}` );
                    // // console.log(res.status)
                    if(result.status === 200){
                        console.log(`User Added Successfully : ${JSON.stringify(result.body)}` );
                        // console.log(`Upadted Item ID : ${JSON.stringify(result.body._id)}` );
                        // this.selectedItem.item_id = result.body._id;
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
        },
        editList: function(){

        },
        handleSelectedListChanged:function(){

        },
        handleCheckBox: function(){
            if(this.isChecked)
                this.isChecked = false;
            else
                this.isChecked = true;

            this.selectedItem.hasBrought = this.isChecked;

            console.log(`Check box is chlicked !!!!!! ${this.selectedItem.hasBrought}`);
            
            // TODO remove this line
            this.selectedItem.list_id = '6523ec21549acd91ef6ac71a';

            
            console.log(`Updaaaaaatinggggg Prduct to list :::::::: ${JSON.stringify(this.selectedItem)}`);
            fetch(`http://localhost:4000/shoppingLists/${this.selectedItem.list_id}/listItems/updateStatus`,{
                    method: "PUT",
                    headers:{
                        "Content-Type" : "application/json"
                    },
      
                    body: JSON.stringify(this.selectedItem)
                })
                .then(response => response.json())
                .then(result => {
                    // console.log(`Saved Or Update Successfully : ${JSON.stringify(result)}` );
                    // // console.log(res.status)
                    if(result.status === 200){
                        console.log(`Status Updated Successfully : ${JSON.stringify(result.body)}` );
                        console.log(`Upadted Item ID : ${JSON.stringify(result.body._id)}` );
                        this.selectedItem.item_id = result.body._id;
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
        }
    },
    components:{
        ItemViewButtons
    }
}
</script>
 
 