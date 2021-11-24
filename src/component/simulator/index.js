import './index.less'
import { useState, useContext, useRef, useEffect, useCallback } from 'react'
import Render from '../render'
import Subline from '../subline'
import Display from '../display'
import AttrEditor from '../attr_editor'
import ViewList from '../view_list'
import { setViewCss, setViewProps, setRootStyle } from '../../core/paletteTool'
import editContext from '../../context/edit'
import paletteContext from '../../context/palette'

const initialAttrEditor = {
  visible: false,
  id: '',
  type: '',
  defaultValue: {},
  css: {}
}

export default function Simulator() {
  const palette = useContext(paletteContext)
  const refDeviceWrapper = useRef(null)
  const [device, setDevice] = useState({
    width: 269,
    height: 397
  }) // 画布尺寸
  const [ratio, setRatio] = useState(1) // 缩放比例
  const [attrEditor, setAttrEditor] = useState({
    ...initialAttrEditor
  }) // 属性编辑
  const [viewListStyle, setViewListStyle] = useState({}) // view 列表
  const [activeViewId, setActiveViewId] = useState('')

  const memorizedCallback = useCallback(() => {
    const rect = refDeviceWrapper.current.getBoundingClientRect()
    const top = rect.top
    const left = rect.left + device.width + 20
    setAttrEditor(a => ({
      ...a,
      css: {
        top,
        left
      }
    }))
    setViewListStyle({
      top,
      left: rect.left - 320
    })
  }, [])

  useEffect(() => {
    const handleResize = () => memorizedCallback()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    memorizedCallback()
  }, [device])

  const handleDeviceChange = (type, value) => {
    const regNumber = /^\d+\.?\d*$/
    if (!regNumber.test(value) && value !== '') return
    if (!value) value = 0
    setDevice({
      ...device,
      [type]: Number(value)
    })
    setTimeout(() => {
      palette.setValue(setRootStyle(palette.value, {
        [type]: Number(value)
      }))
    }, 0)
  }

  return (
    <div className="simulator">
      <div className="device-switch">
        <div>
          <input 
            value={device.width} 
            type="number" 
            onChange={(e) => handleDeviceChange('width', e.target.value)}></input>
          <span>x</span>
          <input 
            value={device.height} 
            type="number" 
            onChange={(e) => handleDeviceChange('height', e.target.value)}></input>
        </div>
        <div>
          <select value={ratio} onChange={(e) => setRatio(e.target.value)}>
            <option value={1}>100%</option>
            <option value={1.25}>125%</option>
            <option value={1.5}>150%</option>
          </select>
        </div>
      </div>
      <editContext.Provider value={{
          activeViewId,
          setViewCss: (id, css) => palette.setValue(setViewCss(palette.value, id, css)),
          setViewProps: (id, props) => palette.setValue(setViewProps(palette.value, id, props)),
          setAttrEditor: (visible = false, id, type, defaultValue, pos) => {
            if (!visible) {
              setAttrEditor({ ...initialAttrEditor, css: attrEditor.css })
              return
            }
            setAttrEditor({
              ...attrEditor,
              visible,
              id,
              type,
              defaultValue
            })
          },
          setActiveViewId: id => setActiveViewId(id)
        }}>
        <div 
          className="device" 
          ref={refDeviceWrapper}
          style={{
            width: device.width,
            height: device.height
          }}>
          <div className="canvas-wrapper">
            <Render width={device.width} height={device.height}/>
          </div>
          <Subline />
          
          <Display />
        </div>
        {/* View 列表 */}
        <ViewList css={viewListStyle}/>
        {/* 属性编辑器 */}
        <AttrEditor
          viewId={attrEditor.id}
          viewType={attrEditor.type}
          defaultValue={attrEditor.defaultValue}
          visible={attrEditor.visible}
          css={attrEditor.css}/>
      </editContext.Provider>
    </div>
  )
}