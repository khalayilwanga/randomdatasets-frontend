 import {combineReducers} from 'redux';
 import graphNumberReducer from './graphnumberreducer';
 import datasetReducer from './datasetreducer';
 import datesReducer from './datesreducer';
 import datapointsReducer from './datapointsreducer';
 import loadingReducer from "./loadingreducer";

 const reducers = combineReducers({
     graphNumber: graphNumberReducer,
     dataset: datasetReducer,
     dataPoints:datapointsReducer,
     dates:datesReducer,
     loading:loadingReducer
     
 })

 export default reducers;
