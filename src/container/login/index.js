/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:21:32
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 17:58:53
 * @Description: file content
 */
import { useState } from 'react'
import isJSON from 'is-json'
import storage from '../../core/storage'
import useProject from '../../hooks/useProject'
import './index.less'
import { importProject } from '../../core/paletteTool'

export default function Login() {
  const [projectName, setProjectName] = useState('')
  const [popupVisible, setPopupVisible] = useState(false)
  const [json, setJson] = useState('')
  const project = useProject()

  const handleCreate = () => {
    if (!projectName) {
      alert('输入项目名')
      return
    }
    project.setName(projectName)
  }

  const handleToggleImport = () => {
    setPopupVisible(!popupVisible)
  }

  const handleConfirmImport = () => {
    if (!projectName) {
      alert('输入项目名')
      return
    }
    if(!isJSON(json)) {
      alert('输入正确JSON')
      return
    }
    importProject(projectName, json)
    project.setName(projectName)
  }

  return (
    <div className="login">
      <div className="project-input">
        <input value={projectName} onChange={e => setProjectName(e.target.value.trim())} placeholder="输入项目名" />
        <button onClick={handleCreate}>新建</button>
        <button onClick={handleToggleImport}>导入</button>
      </div>
      <div className="project-list-container">
        <div>选择项目</div>
        <ul className="project-list">
          {
            storage.all().map((item, index) => (<li key={index} onClick={() => project.setName(item)}>{item}</li>))
          }
        </ul>
      </div>
      <div className="popup" style={{display: popupVisible ? 'flex' : 'none'}}>
        <div className="popup-op">
          <button onClick={handleToggleImport}>X</button>
        </div>
        <div className="popup__box">
          <input value={projectName} onChange={e => setProjectName(e.target.value.trim())} placeholder="请输入项目名" className="popup-input"/>
          <textarea value={json} onChange={e => setJson(e.target.value)} placeholder="请输入不带单位的JSON数据" className="popup-textarea"></textarea>
          <div className="popup-confirm">
            <button onClick={handleConfirmImport}>确认</button>
          </div>
        </div>
      </div>
    </div>
  )
}