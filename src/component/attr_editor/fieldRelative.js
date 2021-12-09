/*
 * @Author: kuanggf
 * @Date: 2021-12-09 09:44:38
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 17:04:45
 * @Description: file content
 */
import './index.less'
import { useEffect, useState } from 'react'
import { usePaletteValue } from '../../hooks/usePalette'

const isRelative = value => {
  value = `${value}`
  if (!value) return false
  const ids = Array.from(new Set(getRelativeIds(value)))
  return value.indexOf('calc(') > -1 && ids.length === 1
}

const getRelativeIds = value => {
  value = `${value}`
  if (!value) return null
  const matches = value.match(/(\w+)(?=\.)/g)
  if (matches) return matches
  return []
}

const getRelativeId = value => {
  const ids = getRelativeIds(value)
  if (ids.length > 0) return ids[0]
  return null
}

const addRelativeToValue = (value, id) => {
  value = `${value}`
  const reg = /(?<!\.)(width|height|top|bottom|left|right)/g
  return `calc(${value.replace(reg, `${id}.$1`)})`
}

const removeRelativeFromValue = value => {
  value = `${value}`
  if (!isRelative(value)) return value
  value = value.trim().replace(/^calc\(|\)$/g, '')
  return value.replace(/\w+\./g, '')
}

export default function FieldRelative({
  label,
  value,
  onChange,
  desc = ''
}) {
  const paletteValue = usePaletteValue()
  const [checked, setChecked] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)
  const [relativeId, setRelativeId] = useState(paletteValue.views[0]?.id || '')
  const views = paletteValue.views

  useEffect(() => {
    setCurrentValue(value)
    setChecked(isRelative(value))
    setRelativeId(getRelativeId(value) || '')
  }, [value])

  const handleChange = e => {
    let { value } = e.target
    setCurrentValue(value)
  }
  
  const handleFocus = () => {
    setCurrentValue(removeRelativeFromValue(currentValue))
  }
  
  const handleBlur = () => {
    let value = currentValue
    if (checked && relativeId) {
      value = addRelativeToValue(currentValue, relativeId)
    }
    setCurrentValue(value)
    onChange({
      target:  {
        value
      }
    })
  }

  const handleRelativeChange = e =>  {
    setRelativeId(e.target.value)
    setCurrentValue('')
  }

  const handleToggleRelative = () => {
    const next = !checked
    if (!next) {
      setCurrentValue('')
    }
    setChecked(next)
  }
  
  return (
    <div className="field-wrapper">
      <div className="field">
        <span className="field__label">{label}</span>
        <div className="field__box">
          <input
            className="field__input"
            type="text"
            value={currentValue || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {
            views.length > 0 ? (
              <p className="field__desc">
                <label>
                  <input type="checkbox" checked={checked} onChange={handleToggleRelative}></input>相对布局
                </label>
                <br/>
                {
                  checked ? (
                    <select value={relativeId} onChange={handleRelativeChange}>
                      {
                        views.map(item => (<option key={item.id}>{item.id}</option>))
                      }
                    </select>
                  ) : null
                }
              </p>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}
