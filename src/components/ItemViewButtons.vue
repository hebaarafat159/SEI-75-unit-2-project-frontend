<template>
     <div class="buttonsLyout">
            <button class="btn btn-info" v-on:click="saveProduct" id="saveButtonId"> Save</button>
            <button class="btn btn-info"  v-on:click="removeProduct" id="deleteButtonId">Remove</button>
     </div>
</template>

<script>
export default {
    name: 'ItemViewButtons',
    data:() => ({
        quantityText:'',
        productItemList:{
            item_id:'6526fc20ab61522c28daef25',
            product_id: '6521bb2ff39360ef56c544f2',
            quantity:43,
            measure_id:'6521bc7cf39360ef56c544f6',
            lastUpdatedDate: new Date().getTime(),
            hasBrought:false,
            list_id:'6523ec21549acd91ef6ac71a',
            measure: {
                _id:"6521bd32f39360ef56c544fb",
                name:"Package"
            },
            product: {
                _id:"6521b600f39360ef56c544e5",
                name:"Tomato",
                image:"",
                category_id:"6521b262f39360ef56c544e2",
                description:"",
                measures:["6521ef9ff39360ef56c54501"]
            }
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
            fetch(`http://localhost:4000/shoppingLists/${this.productItemList.list_id}/listItems/add`,{
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
            fetch(`http://localhost:4000/shoppingLists/${this.productItemList.list_id}/listItems/delete`,{
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

