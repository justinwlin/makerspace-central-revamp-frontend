import { createStore } from 'vuex'
import router from '../router/index.js'
export default createStore({
  state: {
    username: "",
    password: "",
    loginUserState:false
  },
  mutations: {
    loginPage(state){
        var pass = process.env.VUE_APP_PASSWORD;
        var user = process.env.VUE_APP_USER_NAME;
        
        if(state.username == user && state.password == pass){
          
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
