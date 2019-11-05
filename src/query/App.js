import {connect} from 'react-redux'
import './App.css'
import React , {useCallback,useEffect}from 'react'
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
  nextDate
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
    highSpeed,
    searchParsed,
    dispatch,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
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
  },[])

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
  },[
      from,
      to,
      departDate,
      highSpeed,
      searchParsed,
      orderType,
      onlyTickets,
      checkedTicketTypes,
      checkedTrainTypes,
      checkedDepartStations,
      checkedArriveStations,
      departTimeStart,
      departTimeEnd,
      arriveTimeStart,
      arriveTimeEnd
  ])

  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } =useNav(departDate,dispatch,prevDate,nextDate)

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