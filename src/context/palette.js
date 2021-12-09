/*
 * @Author: kuanggf
 * @Date: 2021-12-07 20:35:30
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 11:47:04
 * @Description: file content
 */
import { createContext } from 'react'

export const paletteDefault = {
  width: 100,
  height: 100,
  background: '#f1f1f1',
  views: []
}

export default createContext(paletteDefault)
