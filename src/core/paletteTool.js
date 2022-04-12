/*
 * @Author: kuanggf
 * @Date: 2021-11-03 14:19:52
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-18 21:04:40
 * @Description: file content
 */
import { cloneDeep, uniq } from 'lodash'
import storage from './storage'

const DEFAULT_VIEWS = {
  image: {
    id: '',
    type: 'image',
    url: '',
    css: {
      mode: 'aspectFill',
    },
  },
  text: {
    id: '',
    type: 'text',
    text: '你好世界',
    css: {
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
    },
  },
  rect: {
    id: '',
    type: 'rect',
    css: {
      color: 'green',
      width: 100,
      height: 100
    },
  },
}

export const regNumber  = /^-?\d+$/

export function getViewById(palette, id) {
  if (!palette) return null
  return palette.views.find((item) => item.id === id)
}

export function getViewByIndex(palette, id) {
  if (!palette) return -1
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

export function removeView(palette, id) {
  const index = getViewByIndex(palette, id)
  palette.views.splice(index, 1)
  return palette
}

export function moveUp(palette, id) {
  const index = getViewByIndex(palette, id)
  if (index === 0) return palette
  const item = palette.views.splice(index, 1)
  palette.views.splice(index - 1, 0, ...item)
  return palette
}

export function moveDown(palette, id) {
  const index = getViewByIndex(palette, id)
  if (index === palette.views.length - 1) return palette
  const item = palette.views.splice(index, 1)
  palette.views.splice(index + 1, 0, ...item)
  return palette
}

export function copyItem(palette, id) {
  const view = getViewById(palette, id)
  if (!view) return palette
  const viewCopy = cloneDeep(view)
  const viewId = `${viewCopy.type}_${Date.now()}`
  viewCopy.id = viewId
  palette.views.push(viewCopy)
  return palette
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
    'fontSize',
    'lineHeight'
  ]
  const handle = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && unitAttr.includes(key)) {
        if (key === 'borderRadius' && obj[key]) {
          const arr = obj[key].split(/\s+/)
          obj[key] = arr.join(`${unit} `) + unit
          continue
        } 
        if (
          (typeof obj[key] === 'string' && obj[key].indexOf('%') > -1) 
          || !regNumber.test(obj[key])
        ) continue
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

const isRelative = value => {
  value = `${value}`
  if (!value) return false
  return /^(calc)\((.+)\)$/.test(value)
}


const addGhostNodeForRelative = (data) => {
  const units = ['width', 'height', 'top', 'left']
  const { views } = data
  const relativeParents = []
  const ghostViews = []

  const extractRelativeParent = (value, viewIndex) => {
    const regExtract = /calc\((.+)\)/
    const regRelative = /(image|text|rect|qrcode)_\d+/g
    const matches = value.match(regExtract)
    const entity = matches[1]
    const ids = uniq(entity.match(regRelative))
    ids.forEach(id => {
      const idIndex = getViewByIndex(data, id)
      if (idIndex < viewIndex) return
      if (!relativeParents.includes(id)) {
        relativeParents.push(id)
      }
      value = value.replace(new RegExp(id, 'g'), `ghost_${id}`)
    })
    
    return value
  }

  views.forEach((viewItem, viewIndex) => {
    const { css } = viewItem
    units.forEach(unit => {
      if (isRelative(css[unit])) {
        css[unit] = extractRelativeParent(css[unit], viewIndex)
      }
    })
  })

  relativeParents.forEach(id => {
    let ghostId = `ghost_${id}`
    if (getViewById(data, ghostId)) return
    const view = getViewById(data, id)
    const ghostView = cloneDeep(view)
    ghostView.id = ghostId
    ghostView.css.top = '-9999rpx'
    ghostView.css.left = '-9999rpx'
    ghostView.warn = 'ghost view，勿删！'
    ghostViews.push(ghostView)
  })

  views.unshift(...ghostViews)

  return data
}

const formatOutput = (data) => {
  const units = ['width', 'height', 'top', 'left']
  const { views } = data

  // 删除 css textStyle:fill
  views.forEach(viewItem => {
    const { css } = viewItem
    if (css.textStyle === 'fill') {
      delete css.textStyle
    }
  })

  // 处理calc中的单位
  const addUnitToCalc = (value) => {
    return value.replace(/((\(|\+|-)\s*\d+)/g, `$1rpx`)
  }

  views.forEach((viewItem) => {
    const { css } = viewItem
    units.forEach(unit => {
      if (isRelative(css[unit])) {
        css[unit] = addUnitToCalc(css[unit])
      }
    })
  })

  return data
}

const downloadBlobByLink = (blob, name) => {
  const $a = document.createElement('a')
  $a.download = name
  $a.href = URL.createObjectURL(blob)
  const clickEvent = new MouseEvent('click')
  $a.dispatchEvent(clickEvent)
}

export function download(palette) {
  const blob = new Blob([JSON.stringify(
    addUnit(formatOutput(addGhostNodeForRelative(cloneDeep(palette.value))), 'rpx')
  )], {
    type: 'application/json'
  }, null, 2)
  downloadBlobByLink(blob, `painter-${Date.now()}.json`)
}

export function downloadTemplate(palette) {
  const pen = addUnit(
    formatOutput(addGhostNodeForRelative(cloneDeep(palette.value))), 
    'rpx'
  )
  const template = cloneDeep(palette.template)

  const keys = Object.keys(template)

  keys.forEach(key => {
    const item = template[key]
    const innerKeys = Object.keys(item)
    const view = pen.views.find(o => o.id === key)
    if (!view) return
    innerKeys.forEach(innerKey => {
      const props = innerKey.split('.')
      const value = item[innerKey]
      if (props.length > 1) {
        view.css[props[1]] = value
      } else {
        view[props[0]] = `~${value}~`
      }
    })
  })
  // 替换成模板值
  let stringify = JSON.stringify(pen, null, 2)
  stringify = stringify.replace(/"~(\w+)~"/g, `options.$1`)

  const str = `
function createPen(options) {
return ${stringify}
}
  `
  const blob = new Blob([str], {
    type: 'text/javascript'
  })
  downloadBlobByLink(blob, `painter-${Date.now()}.js`)
  console.log(str)
}

export function importProject(projectName, jsonData) {
  const data = JSON.parse(jsonData)
  data.views.forEach(item => {
    if (!item.id) {
      item.id = `${item.type}_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    }
  })
  storage.set(projectName, data)
}