import './index.less'
import { useState, useRef, useContext, useEffect } from 'react'
import clsx from 'clsx'
import editContext from '../../context/edit'
import { usePaletteValue } from '../../hooks/usePalette'
import { getViewById } from '../../core/paletteTool'

export const VIEW_TYPE_IMAGE = 'image'
export const VIEW_TYPE_TEXT = 'text'
export const VIEW_TYPE_QRCODE = 'qrcode'
export const VIEW_TYPE_RECT = 'rect'

export default function Base({
  id,
  type,
  config = {}
}) {
  const { top = 0, left = 0, bottom = 0, right = 0 } = (config.rect || {})
  const paletteValue = usePaletteValue()
  const edit = useContext(editContext)
  const [ css, setCss ] = useState({
    top, 
    left, 
    width: right - left, 
    height: bottom - top
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
    const { top = 0, left = 0, bottom = 0, right = 0 } = (config.rect || {})
    setCss((css) => ({
      ...css,
      top, 
      left, 
      width: right - left, 
      height: bottom - top
    }))
  }, [config])

  const handleMouseEnter = () => {
    setActive({
      ...active,
      highlight: true
    })
    edit.setActiveViewId(id)
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
    edit.setActiveViewId('')
    mouse.current = {
      lock: false,
      prevX: e.clientX,
      prevY: e.clientY
    }
  }

  const handleClick = () => {
    edit.setAttrEditor(true, id, type, getViewById(paletteValue, id) || {})
  }

  return (
    <div 
      className={
        clsx('c_p_base', edit.activeViewId === id && 'c_p_base--highlight', active.active && 'c_p_base--active')
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
