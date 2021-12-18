/*
 * @Author: kuanggf
 * @Date: 2021-12-10 10:55:50
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-18 21:12:54
 * @Description: file content
 */
import clsx from 'clsx'
import { useEffect, useState, useRef } from 'react'
import { getViewByIndex } from '../../core/paletteTool'
import useEdit from '../../hooks/useEdit'
import { usePaletteValue } from '../../hooks/usePalette'

const isPanelElement = (ele, panel) => {
  while (ele.parentNode !== null) {
    if (ele === panel) return true
    ele = ele.parentNode
  }
  return false
}

export default function RelativeSelectPanel({
  css = {},
  onSelect,
  onVisibleChange,
  refInput,
  viewId
}) {
  const edit = useEdit()
  const palette = usePaletteValue()
  const refPanel = useRef(null)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    const handleClick = e => {
      if(!isPanelElement(e.target, refPanel.current) && refInput !== e.target) {
        onVisibleChange(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [onVisibleChange, refInput])

  const handleSelectId = id => {
    setSelectedId(id)
  }

  const handleSelectAttr = (attr) => {
    onSelect && onSelect(selectedId, attr)
  }

  const handleMouseEnter = id => {
    edit.setActiveViewId(id)
  }

  const handleMouseLeave = e => {
    edit.setActiveViewId('')
  }

  const viewIndex = getViewByIndex(palette, viewId)
  const views = palette.views?.filter((item, index) => (index < viewIndex)) || []
  return (
    <div className="relative-select-panel" style={css} ref={refPanel}>
      {views.length === 0 ? <p style={{fontSize: 12, padding: 10}}>相对布局所使用的view，需位于当前view之前</p> : null}
      <div className="relative-id-list">
        {
          views.map(item => (
            <div
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              key={item.id} 
              className={clsx('relative-id-list__item', {
                'relative-id-list__item--active': selectedId === item.id
              })}
              onClick={() => handleSelectId(item.id)}>{item.id}</div>
          ))
        }
      </div>
      <div className="relative-size-list" style={{display: selectedId ? 'block' : 'none'}}>
        <div className="relative-size-list__item" onClick={() => handleSelectAttr('width')}>width</div>
        <div className="relative-size-list__item" onClick={() => handleSelectAttr('height')}>height</div>
        <div className="relative-size-list__item" onClick={() => handleSelectAttr('top')}>top</div>
        <div className="relative-size-list__item" onClick={() => handleSelectAttr('right')}>right</div>
        <div className="relative-size-list__item" onClick={() => handleSelectAttr('bottom')}>bottom</div>
        <div className="relative-size-list__item" onClick={() => handleSelectAttr('left')}>left</div>
      </div>
    </div>
  )
}