/*
 * @Author: kuanggf
 * @Date: 2021-12-09 09:44:38
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-10 14:18:50
 * @Description: file content
 */
import './index.less'
import { useEffect, useRef, useState } from 'react'
import { usePaletteValue } from '../../hooks/usePalette'
import RelativeSelectPanel from './relativeSelectPanel'

const isRelative = value => {
  value = `${value}`
  if (!value) return false
  return value.indexOf('calc(') > -1
}

const addRelativeToValue = (value, id) => {
  if (isRelative(value)) return value
  return `calc(${value})`
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
  const [selectPanelCss, setSelectedPanelCss] = useState({})
  const refInput = useRef(null)
  const refSelectionStart = useRef(0)
  const views = paletteValue.views

  useEffect(() => {
    const timer = setTimeout(() => {
      refInput.current.style.height = 'inherit'
      refInput.current.style.height = refInput.current.scrollHeight + 'px'
    })
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setCurrentValue(value)
    setChecked(isRelative(value))
  }, [value])

  const setInputHeight = () => {
    refInput.current.style.height = 'inherit'
    refInput.current.style.height = refInput.current.scrollHeight + 'px'
    setSelectPanelStyle()
  }

  const setSelectPanelStyle = () => {
    if (checked) {
      const box = refInput.current.getBoundingClientRect()
      setSelectedPanelCss({
        display: 'flex',
        top: box.bottom + 5,
        left: box.left
      })
    }
  }

  const handleChange = e => {
    let { value } = e.target
    setCurrentValue(value)
    setInputHeight()
  }
  
  const handleFocus = () => {
    setSelectPanelStyle()
  }
  
  const handleBlur = () => {
    let value = currentValue
    if (checked) {
      value = addRelativeToValue(currentValue)
    }
    setCurrentValue(value)
    onChange({
      target:  {
        value
      }
    })
    refSelectionStart.current = refInput.current.selectionStart
  }

  const handleToggleRelative = () => {
    const next = !checked
    if (!next) {
      setCurrentValue('')
    }
    setChecked(next)
  }

  const handleSelectRelative = (id, attr) => {
    const value = `${id}.${attr}`
    const nextVal = currentValue.slice(0, refSelectionStart.current) + value + currentValue.slice(refSelectionStart.current)
    const nextSelectionStart = refSelectionStart.current + value.length
    setCurrentValue(nextVal)
    setTimeout(() => {
      setInputHeight()
      refInput.current.focus()
      refInput.current.setSelectionRange(nextSelectionStart, nextSelectionStart)
    })
  }

  const handleToggleSelectRelative = (visible) => {
    setSelectedPanelCss({
      display: visible ? 'flex' : 'none'
    })
  }
  
  return (
    <div className="field-wrapper">
      <div className="field">
        <span className="field__label">{label}</span>
        <label className="field__box">
          <textarea
            ref={refInput}
            className="field__textarea"
            type="text"
            style={{width: '100%'}}
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
              </p>
            ) : null
          }
        </label>
        <RelativeSelectPanel 
          css={selectPanelCss} 
          onSelect={handleSelectRelative}
          onVisibleChange={handleToggleSelectRelative}
          refInput={refInput.current}/>
      </div>
    </div>
  )
}
