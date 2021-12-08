/*
 * @Author: kuanggf
 * @Date: 2021-12-09 00:36:49
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 00:39:07
 * @Description: file content
 */
import { useContext } from 'react'
import paletteContext from '../context/palette'

export default function usePaletteValue() {
  const palette = useContext(paletteContext)

  return palette.value
}

