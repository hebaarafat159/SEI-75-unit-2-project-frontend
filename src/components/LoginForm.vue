<template>
    <h1>Login page</h1>
    <div v-if="isLoggedIn">
        <!-- <h2>Hello {{ userName }}</h2> -->
        <button @click="handleLogOut">Log Out</button>
    </div>
    <div v-else>
        <GoogleLogin :callback="callback" />
    </div>
</template>

<script>
import { decodeCredential, googleLogout } from 'vue3-google-login'
  
export default {
    name: "LoginForm",
    data: () => ({
        isInit: false,
        isLoggedIn: false,
        userObject:{}
    }),
    mounted(){
        if(this.$cookies.isKey('user_session')){
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userObject = userData; 
        }
    },
    methods: {
        callback: function (response) {
            this.isLoggedIn = true
            let userData = decodeCredential(response.credential)
            // TODO delete this line
            console.log(userData);
            this.userObject = userData;
            console.log(`Google User: ${JSON.stringify(this.userObject)}`);
            this.$cookies.set('user_session', response.credential);
            fetch(`${process.env.VUE_APP_URL_APP_PATH}/users/login`,{
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
                    // this.$router.push({name: 'All Books'});
                  }
              }).catch (error => {
                console.log(error);
              })
        },
        handleLogOut: function () {
            googleLogout()
            // this.$cookies.remove('user_session')
            this.isLoggedIn = false
        }
    }
}
</script>