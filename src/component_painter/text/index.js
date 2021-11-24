/*
 * @Author: kuanggf
 * @Date: 2021-11-10 17:37:49
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-11-10 17:38:00
 * @Description: file content
 */
import Base from '../base'

export default function Image({ config, id }) {
  return (
    <Base 
      id={id}
      type="text"
      config={config}>
    </Base>
  )
}
