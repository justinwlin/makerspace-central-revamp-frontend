import { createStore } from 'vuex'
import router from '../router/index.js'
import axios from 'axios'

export default createStore({
  state: {
    username: "",
    password: "",
    loginUserState:false,
    button:false,
    URL:"https://makerspace-central.herokuapp.com"
  },
  mutations: {
    loginPage(state){
       
      
        if(state.username == "admin" && state.password == "admin"){
          
          state.loginUserState = true;
          router.push("/home")
        }else{
          alert("Incorrect username/password");
          state.loginUserState = false;
        }
        console.log('hey we made it')
        
      },
      userUpdate(state,payload){
        state.username=payload
      },
      passwordUpdate(state,payload){
        state.password=payload
      }
  },
  actions: {
    login(context){
      context.commit("loginPage")

      
    },

    async loggedIn(context){
      let user = context.state
      
    
      await axios.post("https://makerspace-central.herokuapp.com/login",{"enteredPass":user.password, "enteredUser":user.username}).then((res)=>{
        user.loginUserState = res.data.result
       
        
      }).catch((err)=>{
        console.log(err,"here")
      })

      if (user.loginUserState){
        router.push("/home")
      }else{
        alert("Incorrect username/password");
      }

    }
  
  },
  getters:{
    user(state){
      return state.username
    },
    pass(state){
      return state.password
    },
    loggedIn(state){
      return state.loginUserState
    }
  },
  modules: {
  },
})
