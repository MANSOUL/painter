/*
 * @Author: kuanggf
 * @Date: 2021-12-09 09:42:42
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-10 17:18:03
 * @Description: file content
 */
import './index.css'
import { useState } from 'react'
import Simulator from '../../component/simulator'
import paletteContext, { paletteDefault } from '../../context/palette'
import useProject from '../../hooks/useProject'
import storage from '../../core/storage'

export default function Index() {
  const project = useProject()
  const [ palette, setPalette ] = useState(storage.get(project.name) || paletteDefault)
  const [ pen, setPen ] = useState({})
  const [ template, setTemplate ] = useState({})
  const handleSetPalette = (value) => {
    setPalette({...value})
  }
  return (
    <div className="layout">
      <paletteContext.Provider value={{
        value: palette,
        setValue: handleSetPalette,
        pen,
        setPen,
        template,
        setTemplate
      }}>
        <div className="layout__left">
          <Simulator />
        </div>
        <div className="layout__right">
          {/* <Control /> */}
        </div>
      </paletteContext.Provider>
    </div>
  )
}