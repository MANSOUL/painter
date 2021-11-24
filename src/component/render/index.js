/*
 * @Author: kuanggf
 * @Date: 2021-11-01 15:15:03
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-11-11 10:05:10
 * @Description: file content
 */
import { useRef, useEffect, useContext } from 'react'
import * as Painter from 'painter-kernel'
import { cloneDeep } from 'lodash'
import paletteContext from '../../context/palette'
import { addUnit } from '../../core/paletteTool'

Painter.initInjection({
  loadImage: async url => {
    return new Promise(resolve => {
      const img = new Image()
      img.onload = function () {
        resolve({
          img,
          height: img.height,
          width: img.width,
        })
      }
      img.src = url
    })
  }
})

export default function Render({
  width, height
}) {
  const ref = useRef(null)
  const palette = useContext(paletteContext)

  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    Painter.clearPenCache()
    console.log('palette content:', addUnit(cloneDeep(palette.value)))
    // draw
    new Painter.Pen(context, addUnit(cloneDeep(palette.value))).paint(() => {
      console.log('ok')
    })
  }, [palette.value])

  return (
    <div>
      <canvas ref={ref} width={width} height={height}></canvas>
    </div>
  )
}