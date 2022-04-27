import React, {useRef} from 'react';
import LineChart from './linechart';
import ChartButton from './chartbutton';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";


export default function Main({state, ac}) {

 // Resetting Datapoints
 // NOTE: Any change to datapoints resets everything as if it were the initial GET request
  const currentdataPointsRef = useRef();
  let prevDataPoints = useRef(5)
  
  const initWithDataPoints = async()=>{
    await ac.initializeState()
  }
  const resetDatapoints =  () =>{

    const inputVal = currentdataPointsRef.current.value
    const prevData = parseInt(prevDataPoints.current)
    const dataPoints =inputVal? parseInt(inputVal.toString()):5

    // To avoid unnecessary re-renders
    if (prevData===dataPoints){  
      return;
    }
    ac.updateDataPoints(dataPoints);
    initWithDataPoints()
    prevDataPoints= dataPoints

  }
  

  return (
    <div className="main ">
          <div className="each chart">
            {state.graphNumber>0?<LineChart data={state}/>:<span></span>}
          </div>
           
          
          
          <div className="each datapoints">
            <div className="inputs">
              <label style ={{marginRight:"4px"}}htmlFor='dataPoints' >Enter Desired DataPoints</label>
              <input type='number'  ref={currentdataPointsRef} id='dataPoints' placeholder={state.dataPoints} min='5' max='30'></input>
            
            </div>
            <ChartButton text="Change Datapoints" onclickhandler={()=>{resetDatapoints()}} btntype="info"></ChartButton>
            
          </div>
          
          <div className="each graphnumber">
            <h3 className="item" 
                style={{color:state.graphNumber===4?"red":"black"}}>
                  {state.graphNumber} 
                
            </h3>
            <div className="item">
              <ChartButton text="CREATE" 
                           onclickhandler={()=>{ac.addDataset()}} 
                           btntype="primary">
              </ChartButton>         
              <ChartButton text="DELETE" 
                           onclickhandler={()=>{ac.deleteLatestDataset()}} 
                           btntype="danger">         
              </ChartButton>
            </div>
            
          </div>
          
        
      </div>
  )
}
