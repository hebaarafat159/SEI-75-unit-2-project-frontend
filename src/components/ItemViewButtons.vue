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
        item:{}
    }),
    mounted(){
        this.item = this.product;
        this.item.quantity = this.quantity;
    },
    props : {
        quantity: Number,
        product: Object,
        measure: Object
     },
     methods:{
        saveProduct: function(){
                console.log(`Saving Prduct to list :::::::: ${JSON.stringify(this.item)}`);
                 const list_id = this.$cookies.get('current_list_id');
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
                        // this.item._id = result.body._id;
                        // this.$router.push({name: 'All Books'});
                        //this.$router.replace({name: 'CartView'});
                        this.$router.go();
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

