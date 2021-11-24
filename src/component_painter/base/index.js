import './index.less'
import { useState, useRef, useContext, useEffect } from 'react'
import clsx from 'clsx'
import editContext from '../../context/edit'

export const VIEW_TYPE_IMAGE = 'image'
export const VIEW_TYPE_TEXT = 'text'
export const VIEW_TYPE_QRCODE = 'qrcode'
export const VIEW_TYPE_RECT = 'rect'

export default function Base({
  id,
  type,
  config = {}
}) {
  const { width, height, top, left, bottom, right } = config.css
  const edit = useContext(editContext)
  const [ css, setCss ] = useState({
    width, height, top, left, bottom, right
  })
  const [ active, setActive ] = useState({
    highlight: false,
    active: false
  })
  const mouse = useRef({
    lock: false,
    prevX: 0,
    prevY: 0
  })
  useEffect(() => {
    const { width, height, top, left, bottom, right } = config.css
    setCss((css) => ({
      ...css,
      width, height, top, left, bottom, right
    }))
  }, [config])

  const handleMouseEnter = () => {
    setActive({
      ...active,
      highlight: true
    })
  }

  const handleMouseDown = e => {
    setActive({
      ...active,
      active: true
    })
    mouse.current = {
      lock: true,
      prevX: e.clientX,
      prevY: e.clientY
    }
  }

  const handleMouseMove = e => {
    if (!mouse.current.lock) return
    const offsetX = e.clientX - mouse.current.prevX
    const offsetY = e.clientY - mouse.current.prevY
    let {top, left} = css
    if (!top) top = 0
    if (!left) left = 0
    top += offsetY
    left += offsetX
    mouse.current = {
      lock: true,
      prevX: e.clientX,
      prevY: e.clientY
    }
    setCss({
      ...css,
      top,
      left
    })
    edit.setViewCss(id, { top, left })
  }

  const handleMouseUp = e => {
    setActive({
      ...active,
      active: false
    })
    mouse.current = {
      lock: false,
      prevX: e.clientX,
      prevY: e.clientY
    }
  }

  const handleMouseLeave = e => {
    setActive({
      ...active,
      highlight: false,
      active: false
    })
    mouse.current = {
      lock: false,
      prevX: e.clientX,
      prevY: e.clientY
    }
  }

  const handleClick = () => {
    edit.setAttrEditor(true, id, type, config)
  }

  return (
    <div 
      className={
        clsx('c_p_base', active.highlight && 'c_p_base--highlight', active.active && 'c_p_base--active')
      }
      style={css}
      onMouseEnter={handleMouseEnter}
      // onMouseDownCapture={handleMouseDown}
      // onMouseMoveCapture={handleMouseMove}
      // onMouseUpCapture={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}></div>
  )
}