<template>
    <h1>Cart Page</h1>
    <div class="listView">
        <div class="itemLayout" v-for="item in items" :key="item._id">
            <input type="checkbox" v-model="model" :value="isChecked" @click="handleCheckBox" />
            <div class="quantityLayout">
                <h2> {{ item.product.name }} </h2>
                <h4> {{ item.quantity }}  {{ item.measure.name}}</h4> 
            </div>
            <ItemViewButtons :product="item" ></ItemViewButtons>
        </div>
    </div>
 </template>
 
<script>
import { useRoute } from 'vue-router'
import ItemViewButtons from '../components/ItemViewButtons.vue'
export default {
    name: 'CartPage',
    data: () => ({
        error: '',
        items: [],
        isChecked: true,
        selectedItem:{}
    }),
    mounted() {
        fetch(`http://localhost:4000/shoppingLists/${useRoute().params.id}/listItems`)
        .then(response => response.json())
        .then(result => {
                console.log(`All Categories: ${JSON.stringify(result.body)}`);
                this.items = result.body;
                this.selectedItem = this.items[0];
        })
    },
    methods: {
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
 
 