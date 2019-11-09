import {connect} from 'react-redux'
import './App.css'
import React ,{
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense
}from 'react'
import {bindActionCreators} from 'redux'

import URI from 'urijs'
import Header from '../common/Header'
import Nav from '../common//Nav'
import Detail from '../common/Detail'
import Candidate from './Candidate'
// import Schedule from './Schedule' //同步引入

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate, //unix时间戳
  setSearchParsed,
  prevDate,
  nextDate,

  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,

  toggleIsScheduleVisible,
} from './actions'

import dayjs from 'dayjs'
import {h0} from '../common/fp'
import useNav from '../common/useNav'
import {TrainContext} from './context'


const Schedule = lazy(()=>import('./Schedule'))  //异步引入



function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  }=props


  const onBack = useCallback(()=>{
    window.history.back()
  },[])

  useEffect(()=>{
    const queries =  URI.parseQuery(window.location.search)
    const {
      aStation,
      dStation,
      date, //字符串
      trainNumber,
    }=queries
    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setDepartDate(h0(dayjs(date).valueOf()))) //需要一个unix时间戳
    dispatch(setSearchParsed(true)) //url解析完成
  },[])

  useEffect(()=>{
    document.title = trainNumber
  },[trainNumber])


  useEffect(()=>{
    if(!searchParsed){
      return 
    }

    const url = new URI('/rest/ticket')
      .setSearch('data',dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber',trainNumber)
      .toString()

    fetch(url)
      .then(response=>response.json())
      .then(result=>{
        const {
          detail,
          candidates
        }=result

        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr
        }=detail

        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveTimeStr(arriveTimeStr))
        dispatch(setArriveDate(arriveDate))
        dispatch(setDurationStr(durationStr))
        dispatch(setTickets(candidates))
      })
  },[searchParsed,departDate,trainNumber])

  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } = useNav(departDate,dispatch,prevDate,nextDate)
 
  const detailCbs = useMemo(()=>{
    return bindActionCreators({
      toggleIsScheduleVisible
    },dispatch)
  },[])


  if(!searchParsed){
    return null
  }

  
  return(
    <div className="app">
      <div className="header-wrapper">
        <Header 
          title={trainNumber}
          onBack={onBack} //点击返回按钮之后的行为
        />
        </div>
        <div className="nav-wrapper">
          <Nav 
            date={departDate}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
            prev={prev}
            next={next}
          />
        </div>
        <div className="detail-wrapper">
          <Detail 
            departDate={departDate}
            arriveDate={arriveDate}
            departTimeStr={departTimeStr}
            arriveTimeStr={arriveTimeStr}
            trainNumber={trainNumber}
            departStation={departStation}
            arriveStation={arriveStation}
            durationStr={durationStr}
          >
            <span className="left"></span>
            <span 
              className="schedule"
              onClick={()=>detailCbs.toggleIsScheduleVisible()}
            >
              时刻表
            </span>
            <span className="right"></span>
          </Detail>
        </div>

        <TrainContext.Provider value={{trainNumber,departStation,arriveStation,departDate}}>
          <Candidate 
            tickets={tickets}
          />
        </TrainContext.Provider>

        { isScheduleVisible &&
          <div className="mask" onClick={()=>dispatch(toggleIsScheduleVisible())}>
            <Suspense fallback={<div>loading</div>}>
              <Schedule 
                date={departDate}
                trainNumber={trainNumber}
                departStation={departStation}
                arriveStation={arriveStation}
              />
            </Suspense>
        </div>
        }
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