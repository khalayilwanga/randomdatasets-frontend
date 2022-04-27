import * as types from '../types';

const initialState = {
    firstDataSet: null,
    secondDataSet:null
}
const reducer =(state= initialState , action)=> {
    
    
    
    switch(action.type){

        case types.UPDATE_FIRST_DATASET:
            
            return Object.assign (
                {},
                state,
                {firstDataSet:
                    {
                    data:action.payload.data,
                    color:action.payload.color
                    }
                }         
             );
        case types.UPDATE_SECOND_DATASET:
               
            return Object.assign (
                {},
                state,
                {secondDataSet:
                    {
                    data:action.payload.data,
                    color:action.payload.color
                    }
                }         
             );
        case types.DELETE_FIRST_DATASET:
               
            return Object.assign (
                {},
                state,
                {firstDataSet:null}         
             );
            // }
        case types.DELETE_SECOND_DATASET:
            return Object.assign (
                {},
                state,
                {secondDataSet:null}         
             );

        default:
            return state;
    
    }
}
export default reducer;
