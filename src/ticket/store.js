import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

import reducers from './reducers'
import thunk from 'redux-thunk'

export default createStore(
  combineReducers(reducers),
  {
    departDate:Date.now(),
    arriveDate:Date.now(),
    departTimeStr:null,
    arriveTimeStr:null,
    departStation:null,
    arriveStation:null,
    trainNumber:null,
    durationStr:null,
    tickets:[], //座次和出票渠道
    isScheduleVisible:false,
    searchParsed:false, //url解析是否完成，，为true时我们才能进行一步数据请求，以及渲染
  },//暂时我们的想到的就这11个state
  applyMiddleware(thunk)
)


