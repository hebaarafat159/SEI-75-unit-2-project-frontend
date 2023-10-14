<template>
    <div class="productAddView" v-bind="item.productObj" :key="product._id">
        <div>
            <p><input type="text" name="quantity" v-model="item.quantity" placeholder="0.0"></p> 
            <select name="item.selectedMeasure" id="item.selectedMeasure" v-model="item.selectedMeasure">    
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
                selectedMeasure: {},
                status:false
            }
        }),
        mounted() {
            // TODO request item object from database
            const list_id = this.$cookies.get('current_list_id','')
            fetch(`http://localhost:4000/shoppingLists/${list_id}/listItems/${this.product._id}`)
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
                            this.selectedMeasure = result.body.measure_id;
                            this.status = result.body.hasBrought;
                        }else{
                            this.item.productObj = this.product;
                            this.selectedMeasure = this.item.productObj.measures[0];
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
                fetch(`http://localhost:4000/shoppingLists/${list_id}/listItems/add`,{
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
                        // this.$router.push({name: 'All Books'});
                    }
                })  
                .catch (error => {
                    console.log(error);
                })
            },
            removeProduct: function(){
                console.log(`Remove Prduct to list :::::::: ${JSON.stringify(this.item)}`);
                const list_id = this.$cookies.get('current_list_id','')
                fetch(`http://localhost:4000/shoppingLists/${list_id}/listItems/delete`,{
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
 
 