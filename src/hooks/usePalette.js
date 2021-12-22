/*
 * @Author: kuanggf
 * @Date: 2021-12-09 00:36:49
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-21 15:49:03
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

export function usePaletteTemplate() {
  const palette = usePalette()
  return palette.template
}

export function usePaletteGroups() {
  const palette = usePalette()
  return palette.groups
}