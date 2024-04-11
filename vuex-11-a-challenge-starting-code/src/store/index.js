import { createStore } from "vuex";
import productModule from "./product";
import cartModule from "./cart/index,js";

const store = createStore({
    modules: {
        products: productModule,
        cart: cartModule
    },
    state() {
        return {
            isLoggedIn: false,
        }
    },
    mutations: {
        updateLoginStatus(state) {
            state.isLoggedIn = !state.isLoggedIn;
        }
    },
    actions: {
        toggleLogin(context) {
            context.commit('updateLoginStatus');
        }
    },
    getters: {
        loginStatus(state) {
            return state.isLoggedIn;
        }
    }
})

export default store;