import * as types from '../types'

const reducer =(state =false, action)=> {
    switch(action.type){
        case types.LOADING:
            return true;

        case types.NOT_LOADING:
            return false;
            
        
            
        default:
            return state;
            
    }
}
export default reducer;