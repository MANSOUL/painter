import './index.less'
import { useContext } from 'react'
import clsx from 'clsx'
import paletteContext from '../../context/palette'
import { VIEW_TYPE_IMAGE, VIEW_TYPE_TEXT, VIEW_TYPE_QRCODE, VIEW_TYPE_RECT } from '../../component_painter/base'
import editContext from '../../context/edit'

const TYPE_MAP = {
  [VIEW_TYPE_IMAGE]: '图片',
  [VIEW_TYPE_TEXT]: '文本',
  [VIEW_TYPE_QRCODE]: '二维码',
  [VIEW_TYPE_RECT]: '矩形',
}


function ViewItem({ item }) {
  const edit = useContext(editContext)

  const revokeSetAttr = (id, type, config) => {
    edit.setAttrEditor(true, id, type, config)
  }

  const handleMouseEnter = () => {
    edit.setActiveViewId(item.id)
  }

  const handleMouseLeave = e => {
    edit.setActiveViewId('')
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
        <button className="view-list-item__button">移除</button>
      </div>
    </div>
  )
}

export default function ViewList({
  css = {},
}) {
  const palette = useContext(paletteContext)

  return (
    <div style={css} className="view-list">
      <div className="view-list__scroller">
        {palette.value.views?.map((item, index) => (
          <ViewItem key={item.id || index} item={item}/>
        ))}
      </div>
      <div className="view-list__footer">
      </div>
    </div>
  )
}
