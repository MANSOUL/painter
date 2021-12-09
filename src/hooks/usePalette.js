/*
 * @Author: kuanggf
 * @Date: 2021-12-09 00:36:49
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 11:07:13
 * @Description: file content
 */
import { useContext } from 'react'
import paletteContext from '../context/palette'

export default function usePalette() {
  const palette = useContext(paletteContext)
  return palette
}

export function usePaletteValue() {
  const palette = usePalette()
  return palette.value
}

export function usePalettePen() {
  const palette = usePalette()
  return palette.pen
}