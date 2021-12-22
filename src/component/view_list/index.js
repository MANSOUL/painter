/*
 * @Author: kuanggf
 * @Date: 2021-11-24 14:16:57
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-21 15:45:06
 * @Description: file content
 */
import './index.less'
import { useContext, useCallback, useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import paletteContext from '../../context/palette'
import { VIEW_TYPE_IMAGE, VIEW_TYPE_TEXT, VIEW_TYPE_QRCODE, VIEW_TYPE_RECT } from '../../component_painter/base'
import { copyItem, insertView, moveDown, moveUp, removeView } from '../../core/paletteTool'
import useEdit from '../../hooks/useEdit'

const TYPE_MAP = {
  [VIEW_TYPE_IMAGE]: '图片',
  [VIEW_TYPE_TEXT]: '文本',
  [VIEW_TYPE_QRCODE]: '二维码',
  [VIEW_TYPE_RECT]: '矩形',
}

function ViewItem({ 
  item, 
  group,
  onRemoveView, 
  onMoveUp, 
  onMoveDown, 
  onCopy, 
  onGroupSelect, 
  onGroupMenu,
  onGroupCancel
}) {
  const edit = useEdit()

  const revokeSetAttr = (id, type, config) => {
    edit.setAttrEditor(true, id, type, config)
  }

  const handleMouseEnter = () => {
    edit.setActiveViewId(item.id)
  }

  const handleMouseLeave = e => {
    edit.setActiveViewId('')
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    onRemoveView(item.id)
  }

  const handleClick = e => {
    if (e.altKey) {
      if (!group.includes(item.id)) {
        onGroupSelect(item.id)
      } else {
        onGroupCancel(item.id)
      }
    }
    revokeSetAttr(item.id, item.type, item)
  }

  const handleContextMenu = e => {
    e.preventDefault()
    if (group.includes(item.id)) {
      onGroupMenu(e.clientX, e.clientY)
    }
  }

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
      className={clsx(
        'view-list-item', 
        edit.activeViewId === item.id && 'view-list-item--highlight',
        group.includes(item.id) && 'view-list-item--select'
      )} 
      onClick={handleClick}>
      <div className="view-list-item__content">
        <p>类型: {TYPE_MAP[item.type]}</p>
        <p>id: {item.id}</p>
      </div>
      <div className="view-list-item__op">
        <button 
          className="view-list-item__button"
          style={{background: '#e77911'}}
          onClick={(e) => ((e.stopPropagation(), onMoveUp(item.id)))}>上移</button>
        <button 
          className="view-list-item__button" 
          style={{background: '#e77911'}}
          onClick={(e) => ((e.stopPropagation(), onMoveDown(item.id)))}>下移</button>
        <button 
          className="view-list-item__button"
          style={{background: '#16a144'}}
          onClick={(e) => ((e.stopPropagation(), onCopy(item.id)))}>复制</button>
        <button className="view-list-item__button" onClick={handleRemove}>移除</button>
      </div>
    </div>
  )
}

export default function ViewList({
  css = {},
}) {
  const palette = useContext(paletteContext)
  const edit = useEdit()
  const refSroller = useRef(null)
  const [group, setGroup] = useState([])
  const [menuStyle, setMenuStyle] = useState({ display: 'none' })

  useEffect(() => {
    const handleClick = e => {
      if (!e.altKey) {
        setGroup([])
        setMenuStyle({ display: 'none' })
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const memorized = useCallback(type => {
    const config = insertView(palette.value, type)
    const view = config.view
    edit.setActiveViewId(view.id)
    edit.setPalette(config.palette)
    edit.setAttrEditor(true, view.id, view.type, view)
    setTimeout(() => {
      const dom = refSroller.current
      dom.scrollTop = dom.scrollHeight - dom.clientHeight
    }, 100)
  }, [palette.value, edit])

  const handleRemoveViewMemorized = useCallback(id => {
    const palatteValue = removeView(palette.value, id)
    edit.setPalette(palatteValue)
    edit.setAttrEditor(false)
  }, [palette.value, edit])

  const handleMoveUp = (id) => {
    const palatteValue = moveUp(palette.value, id)
    edit.setPalette(palatteValue)
    edit.setAttrEditor(false)
  }

  const handleMoveDown = (id) => {
    const palatteValue = moveDown(palette.value, id)
    edit.setPalette(palatteValue)
    edit.setAttrEditor(false)
  }

  const handleCopy = (id) => {
    const palatteValue = copyItem(palette.value, id)
    edit.setPalette(palatteValue)
    edit.setAttrEditor(false)
  }

  const handleGroupSelect = (id) => {
    setGroup([
      ...group,
      id
    ])
  }

  const handleGroupCancel = (id) => {
    group.splice(group.findIndex(item => item === id), 1)
    setGroup(group)
  }

  const handleGroupMenu = (x, y) => {
    if (group.length > 1) {
      setMenuStyle({
        display: 'block',
        left: x,
        top: y
      })
    }
  }

  const handleGroupSelection = () => {
    palette.setGroups([
      ...palette.groups,
      [...group]
    ])
    setGroup([])
  }

  return (
    <div style={css} className="view-list">
      <div className="view-list__scroller" ref={refSroller}>
        {palette.value.views?.map((item, index) => (
          <ViewItem
            key={item.id || index} 
            item={item}
            group={group}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onCopy={handleCopy}
            onRemoveView={handleRemoveViewMemorized}
            onGroupSelect={handleGroupSelect}
            onGroupCancel={handleGroupCancel}
            onGroupMenu={handleGroupMenu} />
        ))}
      </div>
      <div className="view-list__footer">
        <div className="view-list-item__cards">
          <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_IMAGE)}>+图片</div>
          <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_TEXT)}>+文本</div>
          <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_QRCODE)}>+二维码</div>
          <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_RECT)}>+矩形</div>
        </div>
      </div>
      <div className="view-list__menu" style={menuStyle}>
        <div onClick={handleGroupSelection}>组合所选view</div>
      </div>
    </div>
  )
}
