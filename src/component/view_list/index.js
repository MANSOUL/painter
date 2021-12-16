/*
 * @Author: kuanggf
 * @Date: 2021-11-24 14:16:57
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-16 10:46:12
 * @Description: file content
 */
import './index.less'
import { useContext, useCallback } from 'react'
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

function ViewItem({ item, onRemoveView, onMoveUp, onMoveDown, onCopy }) {
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

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx('view-list-item', edit.activeViewId === item.id && 'view-list-item--highlight')} 
      onClick={() => revokeSetAttr(item.id, item.type, item)}>
      <div className="view-list-item__content">
        <p>类型: {TYPE_MAP[item.type]}</p>
        <p>id: {item.id}</p>
      </div>
      <div className="view-list-item__op">
        <button className="view-list-item__button" onClick={(e) => ((e.stopPropagation(), onMoveUp(item.id)))}>上移</button>
        <button className="view-list-item__button" onClick={(e) => ((e.stopPropagation(), onMoveDown(item.id)))}>下移</button>
        <button className="view-list-item__button" onClick={(e) => ((e.stopPropagation(), onCopy(item.id)))}>复制</button>
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

  const memorized = useCallback(type => {
    const config = insertView(palette.value, type)
    const view = config.view
    edit.setActiveViewId(view.id)
    edit.setPalette(config.palette)
    edit.setAttrEditor(true, view.id, view.type, view)
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

  return (
    <div style={css} className="view-list">
      <div className="view-list__scroller">
        {palette.value.views?.map((item, index) => (
          <ViewItem
            key={item.id || index} 
            item={item} 
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onCopy={handleCopy}
            onRemoveView={handleRemoveViewMemorized}/>
        ))}
        <div
          className="view-list-item">
          <div className="view-list-item__title">
            新增
          </div>
          <div className="view-list-item__cards">
            <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_IMAGE)}>图片</div>
            <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_TEXT)}>文本</div>
            <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_QRCODE)}>二维码</div>
            <div className="view-list-item__card" onClick={() => memorized(VIEW_TYPE_RECT)}>矩形</div>
          </div>
        </div>
      </div>
      <div className="view-list__footer">
      </div>
    </div>
  )
}
