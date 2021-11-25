/*
 * @Author: kuanggf
 * @Date: 2021-11-03 14:19:52
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-11-25 10:20:16
 * @Description: file content
 */
import { cloneDeep } from 'lodash'

const DEFAULT_VIEWS = {
  image: {
    id: '',
    type: 'image',
    url: '',
    css: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      mode: 'aspectFill',
    },
  },
  text: {
    id: '',
    type: 'text',
    text: '你好世界',
    css: {
      width: 100,
      height: 0,
      top: 0,
      left: 0,
      fontSize: 12,
      color: 'red',
      maxLines: 1,
      lineHeight: 20,
      fontWeight: 'normal',
      textDecoration: 'none',
      textStyle: 'fill',
      background: 'transparent',
      padding: 0,
      textAlign: 'left',
    },
  },
  qrcode: {
    id: '',
    type: 'qrcode',
    content: 'halo',
    css: {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    },
  },
  rect: {
    id: '',
    type: 'rect',
    css: {
      width: 50,
      height: 50,
      top: 0,
      left: 0,
      color: 'green',
    },
  },
}
export function getViewById(palette, id) {
  return palette.views.find((item) => item.id === id)
}

function getViewByIndex(palette, id) {
  return palette.views.findIndex((item) => item.id === id)
}

export function setRootStyle(
  palette,
  {
    width = palette.width,
    height = palette.height,
    top = palette.top,
    left = palette.left,
    background = palette.background,
  }
) {
  width && (palette.width = width)
  height && (palette.height = height)
  top && (palette.top = top)
  left && (palette.left = left)
  background && (palette.background = background)
  return palette
}

export function setViewCss(palette, id, css) {
  const view = getViewById(palette, id)
  if (!view) return palette
  view.css = {
    ...view.css,
    ...css,
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

export function insertView(palette, type) {
  const viewId = `${type}_${Date.now()}`
  const view = cloneDeep(DEFAULT_VIEWS[type])
  view.id = viewId

  palette.views.push(view)
  return { palette, view }
}

export function addUnit(palette, unit = 'px') {
  const unitAttr = [
    'width',
    'height',
    'top',
    'left',
    'right',
    'bottom',
    'borderRadius',
    'borderWidth',
  ]
  const handle = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && unitAttr.includes(key)) {
        if (typeof obj[key] === 'string' && obj[key].indexOf('%') > -1) continue
        obj[key] = `${obj[key]}${unit}`
      }
    }
  }
  handle(palette)
  palette.views.forEach((item) => {
    handle(item.css)
  })
  return palette
}
