import  * as types from './types';

/* 
sendAction: fxn
 purpose: discharge actions to reducers from UI Events
 args:- dispatch: useDispatch()
            React hook useDispatch() to discharge actions to reducers
      - type: Str
            type of action to send reducer (all types found in types.js)
      - data :any?
            payload to send( reducer
 return Nothing
*/

const sendAction = (dispatch,type,payload=null) =>{
    dispatch({
        type:type,
        payload:payload
    })

}




/* 
changeGraphNumber: fxn
 purpose: action to increment or decrement the graphnumber in state
 args:- change: Str
            React hook useDispatch() to discharge actions to reducers
      - dispatch: useDispatch()
            see sendAction
      
 return Nothing
*/
const changeGraphNumber =  (change,dispatch) => {
    switch(change){
        case types.INCREMENT_GRAPH_NUMBER:
            sendAction(dispatch,types.INCREMENT_GRAPH_NUMBER)
            return
            
        case types.DECREMENT_GRAPH_NUMBER:
            sendAction(dispatch,types.DECREMENT_GRAPH_NUMBER)
            return
            
        case types.INITIALIZE_GRAPH_NUMBER:   
            sendAction(dispatch,types.INITIALIZE_GRAPH_NUMBER)
            return
            
        default:
            return
    }
}

 /* 
dataRequest: fxn
 purpose: fetches data from backend
 args:- datapoints: Int()
            no. of values fetched for data
      - method: Str
            Http method sent to backend.
     
 return {data:dataValue,color:colorValue}:Object
*/ 
const dataRequest = async (datapoints,method) =>{

    // To deal with wherever the request is made from i.e container at frontend:3000 or 
    // host at localhost:3001 sending to backend:5000 or localhost:5001.
    // See docker-compose.yml for randomdatasets to understand more.
    let host,port;
    if (window.location.host ==="localhost:3001") {
        host="localhost";
        port="5001"
    }else{
        host="backend";
        port="5000"
    }

     
    const data = await fetch(`http://${host}:${port}/charts/n=${datapoints.toString()}`,
            {  
                method:method
            })
            .then(res =>  res.json())
            .then(
                    res =>Object.assign(
                            {},
                            {
                            data:res.data, 
                            color:res.color}
                            ))

    return data

}

 /* 
addDataset: fxn
 purpose: action creator to fetch new data and update  state 
 returns async()=>{}:fxn
*/ 
export const addDataset =  () => {
    
    return async (dispatch,getState)=>{
        
        const res = await dataRequest(getState().dataPoints,'POST')

        if ((getState().graphNumber)> 2 ){
            sendAction(dispatch,types.UPDATE_SECOND_DATASET,res)     
        }

        else{
            sendAction(dispatch,types.UPDATE_FIRST_DATASET,res)
        
       }
       changeGraphNumber(types.INCREMENT_GRAPH_NUMBER,dispatch)
       
    }
}

 /* 
deleteLatestDataset: fxn
 purpose: action creator to delete  data and update  state (if necessary)
 return async()=>{}:fxn
*/ 
export const deleteLatestDataset =  () => {
    return async (dispatch,getState)=>{
       
        const res = await dataRequest(getState().dataPoints,'DELETE')
        
        const num = getState().graphNumber
        if (num <= 0 ){
            return     
        }
        else if (num === 1) {
            sendAction(dispatch,types.DELETE_FIRST_DATASET)
        }
        else if(num === 2||num === 3) {
            sendAction(dispatch,types.DELETE_FIRST_DATASET)
            sendAction(dispatch,types.UPDATE_FIRST_DATASET,res)
        }
        else if(num === 4) {
            sendAction(dispatch,types.DELETE_SECOND_DATASET)
            sendAction(dispatch,types.UPDATE_FIRST_DATASET,res)
        }
        else if(num > 4) {
            sendAction(dispatch,types.DELETE_SECOND_DATASET)
            sendAction(dispatch,types.UPDATE_SECOND_DATASET,res)
        }
       changeGraphNumber(types.DECREMENT_GRAPH_NUMBER,dispatch)

    }
}  
    

 /* 
initializeState: fxn
 purpose: action creator to initialize state the very first time.
 return async()=>{}:fxn
*/ 
export const initializeState =  () => {
    return async (dispatch,getState)=>{
        sendAction(dispatch,types.LOADING)
        
        const res = await dataRequest(getState().dataPoints,'GET')    
        sendAction(dispatch,types.UPDATE_FIRST_DATASET,res)

        // Added especially when initializing after resetting datapoints.
        // Gets rid of any data in the secondDataset

        if(getState().dataset.secondDataSet){
            sendAction(dispatch,types.DELETE_SECOND_DATASET)
        }
        
        try{
            
            changeGraphNumber(types.INITIALIZE_GRAPH_NUMBER,dispatch)
            changeGraphNumber(types.INCREMENT_GRAPH_NUMBER,dispatch)
            sendAction(dispatch,types.NOT_LOADING)

        }catch(err){
            
            console.log(err)
        }
        

    }
} 
 /* 
updateDataPoints: fxn
 purpose: action creator to update datapoints 
 return {type:typeValue,payload:dataPoints}:Object

*/ 
export const updateDataPoints =(dataPoints)=>{
    
    return async(dispatch)=>{
        
        sendAction(dispatch,types.UPDATE_DATAPOINTS,dataPoints);
        sendAction(dispatch,types.UPDATE_DATES,dataPoints);
        
        
    }


}




