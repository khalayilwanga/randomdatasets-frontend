import {useSelector,useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from './state/index';
import {useEffect}from 'react';

import Main from './components/main';
import ChartSpinner from './components/chartspinner';
import "./App.css";





export default function App() {
  
  // Initial Set-up
  const state = useSelector((state)=> state);
  

  
  // Adding dispatch to all the actionCreators to enable async functionality
  const dispatch = useDispatch();
  const ac = bindActionCreators(actionCreators,dispatch);
  
  
  // initial GET request
  useEffect( () => {
    const initApp = async() => await ac.initializeState();
    initApp()
      
  },[])

  
  
  return (<div className ="app">
            
            {state.loading?<ChartSpinner/>:<Main state={state} ac={ac} />}
          </div>
    )


   }
