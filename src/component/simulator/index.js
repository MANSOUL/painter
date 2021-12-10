import './index.less'
import { useState, useRef, useEffect, useCallback } from 'react'
import Render from '../render'
import Subline from '../subline'
import Display from '../display'
import AttrEditor from '../attr_editor'
import ViewList from '../view_list'
import { setViewCss, setViewProps, setRootStyle, download } from '../../core/paletteTool'
import editContext from '../../context/edit'
import storage from '../../core/storage'
import { cloneDeep } from 'lodash'
import usePalette from '../../hooks/usePalette'
import useProject from '../../hooks/useProject'

const initialAttrEditor = {
  visible: false,
  id: '',
  type: '',
  defaultValue: {},
  css: {}
}

export default function Simulator() {
  const project = useProject()
  const palette = usePalette()
  const refDeviceWrapper = useRef(null)
  const [device, setDevice] = useState({
    width: palette.value.width || 100,
    height: palette.value.height || 100
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
      left: rect.left - 330
    })
  }, [device.width])

  useEffect(() => {
    memorizedCallback()
    const handleResize = () => memorizedCallback()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [memorizedCallback])

  const handleDeviceChange = (type, value) => {
    const regNumber = /^\d+\.?\d*$/
    if (!regNumber.test(value) && value !== '') return
    setDevice({
      ...device,
      [type]: value
    })
  }
  
  const handleDeviceSizeBlur = () => {
    setTimeout(() => {
      palette.setValue(setRootStyle(palette.value, {
        width: device.width || 0,
        height: device.height || 0
      }))
    }, 0)
  }

  const handleExport = () => {
    console.log('download:', JSON.stringify(palette.value))
    download(palette)
  }

  const handleSaveToLocal = () => {
    storage.set(project.name, cloneDeep(palette.value))
  }

  return (
    <div className="simulator">
      <div className="tools">
        <button disabled>导入</button>
        <button onClick={handleExport}>导出</button>
        <button onClick={handleSaveToLocal}>暂存</button>
        <button disabled>复制</button>
      </div>
      <div className="device-switch">
        <div>
          <input 
            value={device.width} 
            type="number" 
            onChange={(e) => handleDeviceChange('width', e.target.value)}
            onBlur={handleDeviceSizeBlur}></input>
          <span>x</span>
          <input 
            value={device.height} 
            type="number" 
            onChange={(e) => handleDeviceChange('height', e.target.value)}
            onBlur={handleDeviceSizeBlur}></input>
        </div>
        <div>
          <select disabled value={ratio} onChange={(e) => setRatio(e.target.value)}>
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
          setPalette: (value) => palette.setValue(value),
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
          <Subline width={device.width} height={device.height}/>
          
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