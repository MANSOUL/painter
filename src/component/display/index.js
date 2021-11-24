/*
 * @Author: kuanggf
 * @Date: 2021-11-02 15:44:56
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-11-11 09:59:59
 * @Description: file content
 */
import './index.less'
import { useContext } from 'react'
import paletteContext from '../../context/palette'
import Image from '../../component_painter/image'
import Text from '../../component_painter/text'
import { VIEW_TYPE_IMAGE, VIEW_TYPE_TEXT } from '../../component_painter/base'

export default function Display() {
  const palette = useContext(paletteContext)

  const children = palette.value.views?.map((item, index) => {
    if (item.type === VIEW_TYPE_IMAGE) {
      return (
        <Image key={item.id || index} id={item.id} config={item}/>
      )
    }
    if (item.type === VIEW_TYPE_TEXT) {
      return (
        <Text key={item.id || index} id={item.id} config={item}/>
      )
    }
    return null
  })

  return (
    <div className="display">
      {children}
    </div>
  )
}
