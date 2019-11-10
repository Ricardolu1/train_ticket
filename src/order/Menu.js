import React ,{
  memo
}from 'react'
import './Menu.css'
import PropTypes from 'prop-types'
import classnames from 'classnames'


const MenuItem  = memo(function MenuItem(props) {
  const {
    onPress,
    title, //选项的文案
    value, //唯一代表这个选项的值
    active //当年选项是否被选中
  }=props
  return (
    <li className={classnames({active})} onClick={()=>onPress(value)}>
      {title}
    </li>
  )
})

MenuItem.propTypes={
  onPress:PropTypes.func,
  title:PropTypes.string.isRequired,
  value:PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
  active:PropTypes.bool.isRequired,
}

const Menu  = memo(function Menu(props) {
  const {
    show, //最好把menu组件预先挂载到页面上，然后自己控制它的显示与隐藏，bool
    options, 
    onPress,
    hideMenu
  }=props
  return (
    <div>
      {show && <div className="menu-mask" onClick={()=>hideMenu()}></div>}
      <div className={classnames('menu',{show})}>
        <div className="menu-title"></div>
        <ul>
          {
            options&&
            options.map(option=>{
              return (
                <MenuItem
                  key={option.value}
                  {...option}
                  onPress={onPress}
                />
                )
            })
          }
        </ul>
      </div>
    </div>
  )
})

Menu.propTypes={
  show:PropTypes.bool.isRequired,
  options:PropTypes.array,
  onPress:PropTypes.func,
  hideMenu:PropTypes.func.isRequired,
}

export default Menu