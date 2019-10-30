import React, {useState , useMemo,useEffect} from "react"
import classnames from "classnames"
import PropTypes from 'prop-types'
import "./CitySelector.css"

function CityItem(props) {
  const {
    name,
    onSelect,
  }=props
  return (
    <li className="city-li" onClick={()=>onSelect(name)} key="title">
      {name}
    </li>
  )
}

function CitySection(props) {
  const {
    title,
    cities = [],
    onSelect
  }=props
  return (
    <ul className="city-ul">
      <li className="city-li">
        {title}
      </li>
      {cities.map(city=>{
        return (
          <CityItem 
            key= {city.name} 
            name={city.name} 
            onSelect={onSelect}
          />)
      })}
    </ul>
  )
}

function CityList(props) {
  const {
    sections,
    onSelect
  }=props
  return(
    <div className="city-list">
      <div className="city-cate">
        {
          sections.map(section =>{
            return (
              <CitySection 
                key={section.title}
                title={section.title}
                cities={section.citys}
                onSelect = {onSelect}
              />
            )
          })
        }
      </div>
    </div>
  )
}



export default function CitySelector(props) {
  const { 
          show, 
          cityData, 
          isLoading ,
          onBack,
          fetchCityData,
          onSelect
      } = props
  const [searchKey,setSearchKey] = useState('')
  const key = useMemo(()=>searchKey.trim(),[searchKey])
  useEffect(()=>{
    if (!show || cityData || isLoading) {
      return
    }
    fetchCityData()
  },[show,cityData,isLoading])

  const ontputCitySections = ()=>{
    if (isLoading) {
      return (
        <div>loading</div>
      )
    }
    if (cityData) { 
      return (
        <CityList 
          sections={cityData.cityList}
          onSelect = {onSelect}
        />
      )
    } 
    return <div>error</div>
  }
  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={()=>onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={(e)=>setSearchKey(e.target.value)}
          />
        </div>
        <i className={classnames('search-clean',{
          hidden: key.length===0
        })}
           onClick={()=>setSearchKey('')}
         >
          &#xf063;
        </i>
      </div>
      {ontputCitySections()}
    </div>
  )
}

CitySelector.propTypes = {
  show:PropTypes.bool.isRequired,
  cityData:PropTypes.object,
  isLoading:PropTypes.bool.isRequired,
  onBack:PropTypes.func.isRequired,
  fetchCityData:PropTypes.func.isRequired
}
