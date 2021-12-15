/*
 * @Author: kuanggf
 * @Date: 2021-12-15 17:21:56
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-15 17:31:10
 * @Description: file content
 */
export const getPosInOffsetCloset = (target, parent) => {
  if (target === parent) return { x: 0, y: 0 }
  let pos = {
    x: 0,
    y: 0
  }
  while (target.offsetParent !== null || target.offsetParent !== parent) {
    pos.x += target.offsetLeft
    pos.y += target.offsetTop
    target = target.offsetParent
    if (target === parent) return pos
  }
  return pos
}