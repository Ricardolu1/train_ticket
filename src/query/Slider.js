import React,{
  memo,
  useState,
  useMemo
} from 'react'
import PropTypes from 'prop-types'
import leftPad  from 'left-pad'
import './Slider.css'



const Slider =memo(function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged,
  }=props

  const[start,setStart] =useState(()=>currentStartHours/24*100)
  const[end,setEnd] =useState(()=>currentEndHours/24*100)
  
  const startPercent= useMemo(()=>{
    if (start>100) {
      return 100
    }
    if (start<0) {
      return 0
    }
    return start
  },[start])

  const endPercent= useMemo(()=>{
    if (end>100) {
      return 100
    }
    if (end<0) {
      return 0
    }
    return end
  },[end])

  const startHours=useMemo(()=>{
    return Math.round(startPercent*24/100)//取整
  },[startPercent])

  const endHours=useMemo(()=>{
    return Math.round(endPercent*24/100)//取整
  },[endPercent])

  const startText = useMemo(()=>{
    return leftPad(startHours,2,'0')+':00'
  },[startHours])

  const endText = useMemo(()=>{
    return leftPad(endHours,2,'0')+':00'
  },[endHours])


  return(
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider">
          <div className="slider-range" style={}></div>
        </div>
      </div>
    </div>
  )
})

Slider.propTypes={
  title:PropTypes.string.isRequired,
  currentStartHours:PropTypes.number.isRequired,
  currentEndHours:PropTypes.number.isRequired,
  onStartChanged:PropTypes.func.isRequired,
  onEndChanged:PropTypes.func.isRequired,
}

export default Slider


















