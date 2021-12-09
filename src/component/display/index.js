/*
 * @Author: kuanggf
 * @Date: 2021-11-02 15:44:56
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 11:06:26
 * @Description: file content
 */
import './index.less'
import Image from '../../component_painter/image'
import Text from '../../component_painter/text'
import Qrcode from '../../component_painter/qrcode'
import Rect from '../../component_painter/rect'
import { VIEW_TYPE_IMAGE, VIEW_TYPE_TEXT, VIEW_TYPE_QRCODE, VIEW_TYPE_RECT } from '../../component_painter/base'
import { usePalettePen } from '../../hooks/usePalette'

export default function Display() {
  const pen = usePalettePen()

  const children = pen.views?.map((item, index) => {
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
    if (item.type === VIEW_TYPE_QRCODE) {
      return (
        <Qrcode key={item.id || index} id={item.id} config={item}/>
      )
    }
    if (item.type === VIEW_TYPE_RECT) {
      return (
        <Rect key={item.id || index} id={item.id} config={item}/>
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
