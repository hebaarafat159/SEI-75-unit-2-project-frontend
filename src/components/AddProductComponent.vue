<template>
    <div class="productAddView" v-bind="item.productObj" :key="product._id">
        <div>
            <input class="inputTextStyle" type="text" name="quantity" v-model="item.quantity" placeholder="0.0">
            <select class="inputTextStyle" name="item.measure_id" id="item.measure_id" v-model="item.measure_id">    
                <option :value="null" disabled> Select a measure</option>
                <option v-for="measure in item.productObj.measures" :key="measure._id" :value="measure" > 
                    {{ measure.name }}
                </option>
            </select>
        </div>
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
            item:{
                _id:'-1',
                productObj: {},
                quantity: 0,
                measure_id: {},
                status:false
            }
        }),
        mounted() {
            // TODO request item object from database
            const list_id = this.$cookies.get('current_list_id','')
            fetch(`${process.env.VUE_APP_URL_APP_PATH}/shoppingLists/${list_id}/listItems/${this.product._id}`)
                .then(response => response.json())
                .then(result => {
                    if(result.status === 200){
                        console.log(`List Item : ${JSON.stringify(result.body)}` );
                        // console.log(`New Item ID : ${JSON.stringify(result.body.)}`);
                        if(result.body !== null)
                        {
                            this.item._id = result.body._id;
                            this.item.productObj = this.product;
                            this.item.quantity = result.body.quantity;
                            this.measure_id = result.body.measure_id;
                            this.status = result.body.hasBrought;
                        }else{
                            this.item.productObj = this.product;
                            this.measure_id = this.item.productObj.measures[0];
                        }
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
            
        },
        props : {
             product: Object,
        },
        methods:{
            saveProduct: function(){
                console.log(`Saving Prduct to list :::::::: ${JSON.stringify(this.item)}`);
                const list_id = this.$cookies.get('current_list_id','')
                fetch(`${process.env.VUE_APP_URL_APP_PATH}/shoppingLists/${list_id}/listItems/add`,{
                    method: "POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
      
                    body: JSON.stringify(this.item)
                })
                .then(response => response.json())
                .then(result => {
                    if(result.status === 200){
                        console.log(`Saved Or Update Successfully : ${JSON.stringify(result.body)}` );
                        console.log(`New Item ID : ${JSON.stringify(result.body._id)}`);
                        this.item._id = result.body._id;
                        this.$router.go();//push({name: 'All Books'});
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
            },
            removeProduct: function(){
                console.log(`Remove Prduct to list :::::::: ${JSON.stringify(this.item)}`);
                const list_id = this.$cookies.get('current_list_id','')
                fetch(`${process.env.VUE_APP_URL_APP_PATH}/shoppingLists/${list_id}/listItems/delete`,{
                    method: "DELETE",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(this.item)
                })
                .then(response => response.json())
                .then(result => {
                    // console.log(`Saved Or Update Successfully : ${JSON.stringify(result)}` );
                    // // console.log(res.status)
                    //console.log(result.status)
                    if(result.status === 200){
                        console.log(`deleted Successfully : ${JSON.stringify(result.body)}` );
                        // this.productItemList = res.body;
                        // this.$router.replace({name: 'All Sub Categories'});
                        this.$router.go();
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
 
 