/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:21:32
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 17:58:53
 * @Description: file content
 */
import { useState } from 'react'
import storage from '../../core/storage'
import useProject from '../../hooks/useProject'
import './index.less'

export default function Login() {
  const [projectName, setProjectName] = useState('')
  const project = useProject()

  const handleCreate = () => {
    if (!projectName) alert('输入项目名')
    project.setName(projectName)
  }

  return (
    <div className="login">
      <div className="project-input">
        <input value={projectName} onChange={e => setProjectName(e.target.value.trim())} placeholder="输入项目名" />
        <button onClick={handleCreate}>新建</button>
      </div>
      <div className="project-list-container">
        <div>选择项目</div>
        <ul className="project-list">
          {
            storage.all().map((item, index) => (<li key={index} onClick={() => project.setName(item)}>{item}</li>))
          }
        </ul>
      </div>
    </div>
  )
}