import * as types from '../types'

const reducer =(state =0, action)=> {
    switch(action.type){
        case types.INITIALIZE_GRAPH_NUMBER:
            return 0;

        case types.INCREMENT_GRAPH_NUMBER:
            return state+1;
            
        case types.DECREMENT_GRAPH_NUMBER:
            return state-1;
            
        default:
            return state;
            
    }
}
export default reducer;