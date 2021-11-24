import './index.css'
import { useState } from 'react'
import Simulator from '../../component/simulator'
import Control from '../../component/control'
import paletteContext, { paletteDefault } from '../../context/palette'

export default function Index() {
  const [ palette, setPalette ] = useState(paletteDefault)
  const handleSetPalette = (value) => {
    setPalette({...value})
  }
  return (
    <div className="layout">
      <paletteContext.Provider value={{
        value: palette,
        setValue: handleSetPalette,
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