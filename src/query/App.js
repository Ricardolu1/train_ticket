import {connect} from 'react-redux'
import './App.css'
import React , {
  useCallback,
  useEffect,
  useMemo
}from 'react'

import {bindActionCreators } from 'redux'

import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'
import Header from '../common/Header'
import URI from 'urijs'
import {
  setFrom,
  setTo,
  setHighSpeed,
  setSearchParsed,
  setDepartDate,

  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,

  prevDate,
  nextDate,

  toggleHighSpeed,
  toggleIsFiltersVisible,
  toggleOnlyTickets,
  toggleOrderType,

  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,


} from './action'
import dayjs from 'dayjs'
import {h0} from '../common/fp'
import useNav from '../common/useNav'


function App(props) {
  const { 
    trainList, //array
    from,
    to,
    departDate,
    highSpeed, //布尔值
    searchParsed,
    dispatch,
    orderType, //这是一个枚举值
    onlyTickets, //布尔值
    isFiltersVisible, //代表综合删选浮层是否显示
    ticketTypes,//array
    trainTypes,//array 代表不定项选择的所有选项
    departStations,//array 代表不定项选择的所有选项
    arriveStations,//array 代表不定项选择的所有选项
    checkedTicketTypes, //都是对象
    checkedTrainTypes, //都是对象
    checkedDepartStations, //都是对象
    checkedArriveStations, //都是对象
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  }=props
  const onBack = useCallback(()=>{
    window.history.back()
  },[])

  useEffect(()=>{
    const queries = URI.parseQuery(window.location.search)
    const {
      from,
      to,
      date,
      highSpeed
    }=queries
    dispatch(setFrom(from))
    dispatch(setTo(to))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))
    dispatch(setHighSpeed(highSpeed==='true'))
    dispatch(setSearchParsed(true))
  },[dispatch])

  useEffect(()=>{
    if (!searchParsed) {
      return
    }
    const url = new URI('/rest/query')
      .setSearch('from',from)
      .setSearch('to',to)
      .setSearch('date',dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed',highSpeed)
      .setSearch ('orderType',orderType)
      .setSearch ('onlyTickets',onlyTickets)
      .setSearch ('checkedTicketTypes',Object.keys(checkedTicketTypes).join())
      .setSearch ('checkedTrainTypes',Object.keys(checkedTrainTypes).join())
      .setSearch ('checkedDepartStations',Object.keys(checkedDepartStations).join())
      .setSearch ('checkedArriveStations',Object.keys(checkedArriveStations).join())
      .setSearch ('departTimeStart',departTimeStart)
      .setSearch ('departTimeEnd',departTimeEnd)
      .setSearch ('arriveTimeStart',arriveTimeStart)
      .setSearch ('arriveTimeEnd',arriveTimeEnd)
      .toString()
    fetch(url)
      .then(response=>response.json())
      .then(result=>{
        const {
          dataMap:{
            directTrainInfo:{
              trains,
              filter:{
                ticketType,
                trainType,
                depStation,
                arrStation
              }
            }
          }
        }=result
        dispatch(setTrainList(trains))
        dispatch(setTicketTypes(ticketType))
        dispatch(setTrainTypes(trainType))
        dispatch(setDepartStations(depStation))
        dispatch(setArriveStations(arrStation))
      })
  },[from, to, departDate, highSpeed, searchParsed, orderType, onlyTickets, checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations, departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd, dispatch])

  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } =useNav(departDate,dispatch,prevDate,nextDate)

  const bottomCbs = useMemo(()=>{
    return bindActionCreators({
      toggleHighSpeed,
      toggleIsFiltersVisible,
      toggleOnlyTickets,
      toggleOrderType,
      setCheckedTicketTypes,
      setCheckedTrainTypes,
      setCheckedDepartStations,
      setCheckedArriveStations,
      setDepartTimeStart,
      setDepartTimeEnd,
      setArriveTimeStart,
      setArriveTimeEnd,
    },dispatch)
  },[dispatch])
  if (!searchParsed) {
    return null
  }

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from}→${to}`} onBack={onBack}/>
      </div>
      <Nav 
        date={departDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prev={prev}
        next={next}
      />
      <List 
        list={trainList}
      />
      <Bottom 
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        {...bottomCbs}
      />
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