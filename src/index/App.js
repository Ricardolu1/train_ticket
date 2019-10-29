import React, { useCallback, useMemo } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import "./App.css"
import Header from "../common/Header"
import DepartDate from "./DepartDate"
import HighSpeed from "./HighSpeed"
import Journey from "./Journey"
import Submit from "./Submit"
import { exchangeFromTo, showCitySelector } from "./action.js"
import CitySelector from "../common/CitySelector"

function App(props) {
  const {
    from,
    to,
    dispatch,
    cityData,
    isLoadingCityData,
    isCitySelectorVisible
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    )
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
      />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
  }
)(App)
