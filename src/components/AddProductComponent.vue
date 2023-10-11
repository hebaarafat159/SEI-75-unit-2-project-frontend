<template>
    <div class="productAddView" v-bind="product" :key="product._id">
        <div>
            <!-- <input type="number" name="quantity" v-model="this.quantityText" placeholder="0.0">
            <b-dropdown id="dropdown-left" text="Left align" variant="primary" class="m-2">
                <b-dropdown-item href="#">Action</b-dropdown-item>
                <b-dropdown-item href="#">Another action</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
            </b-dropdown> -->
        </div>
        <!-- <p><input type="text" name="measures" v-model="product." placeholder="Book Description"></p> -->
        <div class="buttonsLyout">
            <button class="btn btn-info" v-on:click="saveProduct" id="saveButtonId"> Save</button>
            <button class="btn btn-info"  v-on:click="removeProduct" id="deleteButtonId">Remove</button>
        </div>
    </div>
 </template>
 
 <script>
    export default {
        name: 'AddProductComponent',
        data:() => ({
            quantityText:'',
            productItemList:{
                item_id:'6526a122d8e855bdb8a53e97',
                product_id: '6521bb2ff39360ef56c544f2',
                quantity:3,
                measure_id:'6521bc7cf39360ef56c544f6',
                lastUpdatedDate: new Date().getTime(),
                hasBrought:false,
                list_id:'6523ec21549acd91ef6ac71a'
                // item_id:'',
                // product_id: this.product.id,
                // quantity: this.quantityText,
                // measure_id: this.product.measures[0],
                // lastUpdatedDate: new Date().getTime(),
                // hasBrought:false,
                // list_id:'6523ec21549acd91ef6ac71a'
            }
        }),
        props : {
            quantity: Number,
            product: Object,
            measure: Object
         },
         methods:{
            saveProduct: function(){
                // console.log(`Saving Prduct to list :::::::: ${JSON.stringify(this.productItemList)}`);
                fetch(`http://localhost:4000/shoppingLists/${this.productItemList.list_id}/listItem/add`,{
                    method: "POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
      
                    body: JSON.stringify(this.productItemList)
                })
                .then(response => response.json())
                .then(result => {
                    // console.log(`Saved Or Update Successfully : ${JSON.stringify(result)}` );
                    // // console.log(res.status)
                    if(result.status === 200){
                        console.log(`Saved Successfully : ${JSON.stringify(result.body)}` );
                        console.log(`New Item ID : ${JSON.stringify(result.body._id)}` );
                        this.productItemList.item_id = result.body._id;
                        // this.$router.push({name: 'All Books'});
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
            },
            removeProduct: function(){
                console.log(`Remove Prduct to list :::::::: ${JSON.stringify(this.productItemList)}`);
                fetch(`http://localhost:4000/shoppingLists/${this.productItemList.list_id}/listItem/delete`,{
                    method: "DELETE",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(this.productItemList)
                })
                .then(response => response.json())
                .then(result => {
                    // console.log(`Saved Or Update Successfully : ${JSON.stringify(result)}` );
                    // // console.log(res.status)
                    //console.log(result.status)
                    if(result.status === 200){
                        console.log(`deleted Successfully : ${JSON.stringify(result.body)}` );
                        // this.productItemList = res.body;
                        this.$router.replace({name: 'All Sub Categories'});
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
            }
         }
    }
 </script>

<style>
.productAddView{
    display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   flex-wrap: wrap;
}

.buttonsLyout{
    display: flex;
   flex-direction: row;
   justify-content: space-evenly;
   flex-wrap: wrap;
}
</style>
 
 