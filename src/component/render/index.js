/*
 * @Author: kuanggf
 * @Date: 2021-11-01 15:15:03
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-16 14:37:01
 * @Description: file content
 */
import { useRef, useEffect } from 'react'
import * as Painter from 'painter-kernel'
import { cloneDeep } from 'lodash'
import { addUnit } from '../../core/paletteTool'
import usePalette from '../../hooks/usePalette'

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
  const palette = usePalette()

  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const pen = addUnit(cloneDeep(palette.value))
    let timer = -1
    Painter.clearPenCache()
    console.log('before draw:', JSON.parse(JSON.stringify(pen)))
    // draw
    new Painter.Pen(context, pen).paint(() => {
      clearTimeout(timer)
      palette.setPen(pen)
      console.log('after draw:', JSON.parse(JSON.stringify(pen)))
    })
    timer = setTimeout(() => palette.setPen(pen), 3000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette.value])

  return (
    <div>
      <canvas ref={ref} width={width} height={height}></canvas>
    </div>
  )
}