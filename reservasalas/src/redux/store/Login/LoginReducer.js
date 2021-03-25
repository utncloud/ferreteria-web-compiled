import {INICIO_SESION, FIN_SESION} from './LoginAction';

const initSesion = ()=> ({
    user: null,
    isSesionActive: false
});

export default function loginReducer(state=initSesion, action){
        switch(action.type){
            case INICIO_SESION:
                console.log("loginReducer INICIO_SESION");
                return{
                    ...state,
                    user: action.data,
                    isSesionActive: true
                };
            case FIN_SESION:
                console.log("loginReducer FIN_SESION");
                return {
                    ...state,
                    user: null,
                    isSesionActive: false
                };
            default:
                return state;
        }
}

export const selectActiveUser = state => state.loginReducer.user;
export const selectActiveValidSesion = state => state.loginReducer.isSesionActive;