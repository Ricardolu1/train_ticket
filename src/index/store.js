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
    from:'北京',
    to:'南京',
    isCitySelectorVisible:false,
    currentSelectingLeftCity:false,
    cityData:null,
    isLoadingCityData:false,
    isDateSelectorVisible:false,
    highSpeed:false,
    departDate: Date.now(),
  },
  applyMiddleware(thunk)
)


