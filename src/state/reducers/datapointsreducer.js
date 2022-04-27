import * as types from '../types'

const reducer =(state =5, action)=> {
    switch(action.type){
        case types.UPDATE_DATAPOINTS:
            return action.payload;

        default:
            return state;
            
    }
}
export default reducer;