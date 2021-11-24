/*
 * @Author: kuanggf
 * @Date: 2021-11-04 15:03:49
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-11-11 15:24:02
 * @Description: file content
 */
import './index.less'
import { cloneDeep } from 'lodash'
import { useContext, useRef } from 'react'
import editContext from '../../context/edit'
import { VIEW_TYPE_IMAGE, VIEW_TYPE_TEXT } from '../../component_painter/base'

const numberAttr = [
  'width',
  'height',
  'top',
  'left',
  'right',
  'bottom',
  'fontSize',
  'maxLines',
  'padding'
]
const validateValue = (value, defaultValue, propType, viewType) => {
  if (!numberAttr.includes(propType)) return value
  return Number(value)
}

function FieldInput({ label, value, onChange }) {
  return (
    <div className="field-wrapper">
      <label className="field">
        <span className="field__label">{label}</span>
        <input
          className="field__input"
          type="text"
          defaultValue={value}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

function FieldSelect({ children, label, value, onChange }) {
  return (
    <div className="field-wrapper">
      <label className="field">
        <span className="field__label">{label}</span>
        <select className="field__input" value={value} onChange={onChange}>
          {children}
        </select>
      </label>
    </div>
  )
}

export default function AttrEditor({
  viewId,
  viewType,
  defaultValue,
  visible = false,
  css = {},
}) {
  const edit = useContext(editContext)
  const refValue = useRef(cloneDeep(defaultValue))
  const refViewId = useRef(viewId)
  if (viewId !== refViewId.current) {
    refValue.current = defaultValue
    refViewId.current = viewId
  }
  const value = refValue.current
  const viewCss = value.css || {}
  
  const handleApply = () => {
    edit.setViewProps(viewId, {
      ...value,
      css: {
        ...viewCss
      }
    })
  }

  if (!viewId) return null
  return (
    <div
      className="attr-editor"
      style={{
        display: visible ? 'block' : 'none',
        ...css,
      }}
    >
      <div className="attr-editor__scroller">
      <FieldInput
        key={viewId + '0'}
        label="宽度"
        value={viewCss.width}
        onChange={(e) =>
          (viewCss.width = validateValue(
            e.target.value,
            viewCss.width, 'width'
          ))
        }
      />
      <FieldInput
        key={viewId + '1'}
        label="高度"
        value={viewCss.height}
        onChange={(e) =>
          (viewCss.height = validateValue(
            e.target.value, viewCss.height, 'height'
          ))
        }
      />
      <FieldInput
        key={viewId + '2'}
        label="距上"
        value={viewCss.top}
        onChange={(e) =>
          (viewCss.top = validateValue(
            e.target.value, viewCss.top, 'top'
          ))
        }
      />
      <FieldInput
        key={viewId + '3'}
        label="距左"
        value={viewCss.left}
        onChange={(e) =>
          (viewCss.left = validateValue(
            e.target.value, viewCss.left, 'left'
          ))
        }
      />
      {viewType === VIEW_TYPE_IMAGE ? (
        <FieldInput
          key={viewId + '4'}
          label="URL"
          value={value.url}
          onChange={(e) => (value.url = e.target.value)}
        />
      ) : null}
      {viewType === VIEW_TYPE_IMAGE ? (
        <FieldSelect
          key={viewId + '5'}
          label="模式"
          value={viewCss.mode}
          onChange={(e) => (viewCss.mode = e.target.value)}
        >
          {' '}
          <option value="aspectFill">aspectFill</option>
          <option value="scaleToFill">scaleToFill</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '6'}
          label="字体大小"
          value={viewCss.fontSize}
          onChange={(e) =>
            (viewCss.fontSize = validateValue(
              e.target.value, viewCss.fontSize, 'fontSize'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '7'}
          label="字体颜色"
          value={viewCss.color}
          onChange={(e) =>
            (viewCss.color = validateValue(
              e.target.value, viewCss.color, 'color'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '8'}
          label="最大行数"
          value={viewCss.maxLines}
          onChange={(e) =>
            (viewCss.maxLines = validateValue(
              e.target.value, viewCss.maxLines, 'maxLines'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldSelect
          key={viewId + '9'}
          label="字体粗细"
          value={viewCss.fontWeight}
          onChange={(e) => (viewCss.fontWeight = e.target.value)}
        >
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400 normal</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700 bold</option>
          <option value="800">800</option>
          <option value="900">900</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldSelect
          key={viewId + '10'}
          label="文本修饰"
          value={viewCss.textDecoration}
          onChange={(e) => (viewCss.textDecoration = e.target.value)}
        >
          <option value="none">无</option>
          <option value="underline">underline</option>
          <option value="overline">overline</option>
          <option value="line-through">line-through</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldSelect
          key={viewId + '11'}
          label="文本样式"
          value={viewCss.textStyle}
          onChange={(e) => (viewCss.textStyle = e.target.value)}
        >
          <option value="fill">填充样式</option>
          <option value="stroke">镂空样式</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '12'}
          label="背景颜色"
          value={viewCss.background}
          onChange={(e) =>
            (viewCss.background = validateValue(
              e.target.value, viewCss.background, 'background'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '13'}
          label="间距"
          value={viewCss.padding}
          onChange={(e) =>
            (viewCss.padding = validateValue(
              e.target.value, viewCss.padding, 'padding'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldSelect
          key={viewId + '14'}
          label="对齐方式"
          value={viewCss.textAlign}
          onChange={(e) => (viewCss.textAlign = e.target.value)}
        >
          <option value="left">左对齐</option>
          <option value="center">居中对齐</option>
          <option value="right">右对齐</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '15'}
          label="文本"
          value={value.text}
          onChange={(e) =>
            (value.text = validateValue(
              e.target.value, value.text, 'text'
            ))
          }
        />
      ) : null}
      </div>
      <div className="attr-editor__footer">
        <button className="attr-editor__button">确定</button>
        <button className="attr-editor__button" onClick={handleApply}>
          应用
        </button>
      </div>
    </div>
  )
}
