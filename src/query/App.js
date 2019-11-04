import {connect} from 'react-redux'
import './App.css'
import React from 'react'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'



function App(props) {
  return (
    <div>
      <Nav />
      <List />
      <Bottom />
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