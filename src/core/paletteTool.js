/*
 * @Author: kuanggf
 * @Date: 2021-11-03 14:19:52
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-11-11 11:42:56
 * @Description: file content
 */
export function getViewById(palette, id) {
  return palette.views.find(item => item.id === id)
}

function getViewByIndex(palette, id) {
  return palette.views.findIndex(item => item.id === id)
}

export function setRootStyle(palette, {
  top = palette.top, 
  left = palette.left, 
  background = palette.background
}) {
  palette.top = top
  palette.left = left
  palette.background = background
  return palette
}

export function setViewCss(palette, id, css) {
  const view = getViewById(palette, id)
  if (!view) return palette
  view.css = {
    ...view.css,
    ...css
  }
  return palette
}

export function setViewProps(palette, id, props) {
  const view = getViewById(palette, id)
  if (!view) return palette
  const index = getViewByIndex(palette, id)
  let newView = { ...view }
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      newView[key] = props[key]
    }
  }
  palette.views[index] = newView
  return palette
}

export function addUnit(palette, unit = 'px') {
  const unitAttr = ['width', 'height', 'top', 'left', 'right', 'bottom', 'borderRadius', 'borderWidth']
  const handle = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && unitAttr.includes(key)) {
        if (typeof obj[key] === 'string' && obj[key].indexOf('%') > -1) continue
        obj[key] = `${obj[key]}${unit}`
      }
    }
  }
  handle(palette)
  palette.views.forEach(item => {
    handle(item.css)
  })
  return palette
}
