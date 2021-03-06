import './index.less'
import { useState, useRef, useEffect, useCallback } from 'react'
import Render from '../render'
import Subline from '../subline'
import Display from '../display'
import AttrEditor from '../attr_editor'
import ViewList from '../view_list'
import { setViewCss, setViewProps, setRootStyle, download, downloadTemplate } from '../../core/paletteTool'
import editContext from '../../context/edit'
import storage from '../../core/storage'
import { cloneDeep } from 'lodash'
import usePalette from '../../hooks/usePalette'
import useProject from '../../hooks/useProject'
import { getPosInOffsetCloset } from '../../core/domTool'
import Back from '../back'

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
    height: palette.value.height || 100,
    background: palette.value.background || '#f1f1f1'
  }) // 画布尺寸
  const [ratio, setRatio] = useState(1) // 缩放比例
  const [attrEditor, setAttrEditor] = useState({
    ...initialAttrEditor
  }) // 属性编辑
  const [viewListStyle, setViewListStyle] = useState({}) // view 列表
  const [backStyle, setBackStyle] = useState({}) // view 列表
  const [activeViewId, setActiveViewId] = useState('')
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  })

  const memorizedCallback = useCallback(() => {
    const rect = refDeviceWrapper.current.getBoundingClientRect()
    const top = rect.top
    const left = rect.left + Number(device.width) + 40
    setAttrEditor(a => ({
      ...a,
      css: {
        top,
        left
      }
    }))
    setViewListStyle({
      top,
      left: rect.left - 350
    })
    setBackStyle({
      left: rect.left - 350
    })
  }, [device.width])

  useEffect(() => {
    memorizedCallback()
    const handleResize = () => memorizedCallback()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [memorizedCallback])

  const handleDeviceChange = (type, value) => {
    if (type === 'background') {
      setDevice({
        ...device,
        [type]: value
      })
      return
    }
    const regNumber = /^\d+\.?\d*$/
    if (!regNumber.test(value) && value !== '') return
    setDevice({
      ...device,
      [type]: Number(value)
    })
  }
  
  const handleDeviceChangeBlur = () => {
    setTimeout(() => {
      palette.setValue(setRootStyle(palette.value, {
        width: device.width || 0,
        height: device.height || 0,
        background: device.background || '#f1f1f1'
      }))
    }, 0)
  }

  const handleExport = () => {
    download(palette)
  }

  const handleExportTemplate = () => {
    downloadTemplate(palette)
  }

  const handleSaveToLocal = () => {
    storage.set(project.name, cloneDeep(palette.value))
    storage.setTemplate(project.name, cloneDeep(palette.template))
    palette.setIsSavedToLocal(true)
  }

  const handleMouseMove = e => {
    const offsetPos = getPosInOffsetCloset(e.target, refDeviceWrapper.current)
    setMousePos({
      x: e.nativeEvent.offsetX + offsetPos.x,
      y: e.nativeEvent.offsetY + offsetPos.y
    })
  }

  const handleMouseOut = () => {
    setMousePos({
      x: 0,
      y: 0
    })
  }

  return (
    <div className="simulator">
      <div className="tools">
        {/* <button disabled>导入</button> */}
        <button className="tool-button" onClick={handleExport} title="导出为json文件">导出</button>
        <button className="tool-button" onClick={handleExportTemplate} title="导出为返回json的函数">导出模版</button>
        <button className="tool-button" onClick={handleSaveToLocal} title="将当前编辑暂存到本地">
          暂存
          <i style={{display: palette.isSavedToLocal ? 'none' : 'block'}}></i>
        </button>
        {/* <button disabled>复制</button> */}
      </div>
      <div className="device-switch">
        <div>
          <input 
            value={device.width} 
            type="number" 
            onChange={(e) => handleDeviceChange('width', e.target.value)}
            onBlur={handleDeviceChangeBlur}></input>
          <span>x</span>
          <input 
            value={device.height} 
            type="number" 
            onChange={(e) => handleDeviceChange('height', e.target.value)}
            onBlur={handleDeviceChangeBlur}></input>
          &nbsp;
          <input 
            value={device.background}
            onChange={(e) => handleDeviceChange('background', e.target.value)}
            onBlur={handleDeviceChangeBlur}></input>
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
          }}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}>
          <div className="canvas-wrapper">
            <Render width={device.width} height={device.height}/>
          </div>
          <Subline 
            width={device.width} 
            height={device.height}
            mousePos={mousePos}/>
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
        {/* 返回按钮 */}
        <Back css={backStyle}/>
      </editContext.Provider>
    </div>
  )
}