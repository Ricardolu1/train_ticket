import React,{
  memo
} from 'react'
import './Passengers.css'
import PropTypes from 'prop-types'

const Passenger = memo(function Passenger(props) {
  const {
    id,
    name,
    followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    onRemove,
    onUpdate
  }=props
  return (
    <li className="passenger">
      <i className="delete" onClick={()=>onRemove(id)}>
        -
      </i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label>
          <input type="text" className="input name" 
                 placeholder="乘客姓名" value={name}
                 onChange={(e)=>onUpdate(id,{name:e.target.value})}
          />
          <label className="ticket-type">
            {ticketType==='adult'?'成人票':'儿童票'}
          </label>
        </li>
      </ol>
    </li>
  )
})

Passenger.propTypes={
  id:PropTypes.number.isRequired,
  name:PropTypes.string.isRequired,
  followAdult:PropTypes.number, //另个一成人的id，对儿童有效，并不一定存在
  ticketType:PropTypes.string.isRequired, //判断是成人还是儿童
  licenceNo:PropTypes.string,  
  gender:PropTypes.string,
  birthday:PropTypes.string,
  onRemove:PropTypes.func.isRequired,
  onUpdate:PropTypes.func.isRequired,
}

const Passengers = memo(function Passengers(props) {
  const{
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger
  }=props

  return (
    <div className="passengers">
      <ul>
        {
          passengers.map(passenger=>{
            return (
              <Passenger {...passenger} 
                key={passenger.id} 
                onRemove={removePassenger}
                onUpdate={updatePassenger}
            />)
          })
        }
      </ul>
      <section className="add">
        <div className="adult" onClick={()=>createAdult()}>添加成人</div>
        <div className="child" onClick={()=>createChild()}>添加儿童</div>

      </section>
    </div>
  )
})

Passengers.propTypes = {
  passengers:PropTypes.array.isRequired,
  createAdult:PropTypes.func.isRequired,
  createChild:PropTypes.func.isRequired,
}

export default Passengers