import './index.less'
import { useContext } from 'react'
import paletteContext from '../../context/palette'
import { VIEW_TYPE_IMAGE, VIEW_TYPE_TEXT, VIEW_TYPE_QRCODE, VIEW_TYPE_RECT } from '../../component_painter/base'

const TYPE_MAP = {
  [VIEW_TYPE_IMAGE]: '图片',
  [VIEW_TYPE_TEXT]: '文本',
  [VIEW_TYPE_QRCODE]: '二维码',
  [VIEW_TYPE_RECT]: '矩形',
}

export default function ViewList({
  css = {},
}) {
  const palette = useContext(paletteContext)

  const children = palette.value.views?.map((item, index) => {
    return (
      <div key={item.id || index} className="view-list-item">
        <div className="view-list-item__content">
          <p>类型: {TYPE_MAP[item.type]}</p>
          <p>id: {item.id}</p>
        </div>
        <div className="view-list-item__op">
          <button className="view-list-item__button">移除</button>
        </div>
      </div>
    )
  })

  return (
    <div style={css} className="view-list">
      <div className="view-list__scroller">
        {children}
      </div>
      <div className="view-list__footer">
      </div>
    </div>
  )
}
