import React,{

} from 'react'
import {connect} from 'react-redux'
import './App.css'

import Header from '../common/Header'
import Account from './Account'
import Choose from './Choose'
import Passengers from './Passengers'
import Ticket from './Ticket'

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch,
  }=props

  return(
    <div>

    </div>
  )
}


export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch}
  }
)(App)