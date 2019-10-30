import React, { useCallback, useMemo } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import "./App.css"
import Header from "../common/Header"
import DepartDate from "./DepartDate"
import HighSpeed from "./HighSpeed"
import Journey from "./Journey"
import Submit from "./Submit"
import { 
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity
} from "./action.js"
import CitySelector from "../common/CitySelector"

function App(props) {
  const {
    from,
    to,
    dispatch,
    cityData,
    isLoadingCityData,
    isCitySelectorVisible,
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
        hideCitySelector
      },
      dispatch
    )
  }, [])
  const citySelectorCbs = useMemo(()=>{
    return bindActionCreators({
      onBack:hideCitySelector,
      fetchCityData,
      onSelect:setSelectedCity
    },dispatch)
  },[])
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
        {...citySelectorCbs}
      />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) { //这里的state就是当前的store里面的state
    return state
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch } //对象的键是dispat，只是传进来的参数，相当于{dispatch:dispatch}
  }
)(App)
