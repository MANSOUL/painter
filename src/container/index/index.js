/*
 * @Author: kuanggf
 * @Date: 2021-12-09 09:42:42
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 11:02:57
 * @Description: file content
 */
import './index.css'
import { useState } from 'react'
import Simulator from '../../component/simulator'
import Control from '../../component/control'
import paletteContext, { paletteDefault } from '../../context/palette'

export default function Index() {
  const [ palette, setPalette ] = useState(paletteDefault)
  const [ pen, setPen ] = useState({})
  const handleSetPalette = (value) => {
    setPalette({...value})
  }
  return (
    <div className="layout">
      <paletteContext.Provider value={{
        value: palette,
        setValue: handleSetPalette,
        pen,
        setPen
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