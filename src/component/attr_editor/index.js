/*
 * @Author: kuanggf
 * @Date: 2021-11-04 15:03:49
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-16 14:35:18
 * @Description: file content
 */
import './index.less'
import { cloneDeep } from 'lodash'
import { useContext, useState, useCallback, useEffect } from 'react'
import editContext from '../../context/edit'
import { VIEW_TYPE_IMAGE, VIEW_TYPE_TEXT, VIEW_TYPE_QRCODE, VIEW_TYPE_RECT } from '../../component_painter/base'
import FieldRelative from './fieldRelative'
import Template from './template'

const validateValue = (value, defaultValue, propType, viewType) => {
  return value
}

function FieldInput({ label, value, onChange, desc = '', id, attr}) {
  return (
    <div className="field-wrapper">
      <label className="field">
        <span className="field__label">{label}</span>
        <div className="field__box">
          <input
            className="field__input"
            type="text"
            value={value || ''}
            onChange={onChange}
          />
          {desc ? <p className="field__desc">{desc}</p> : null}
          <Template id={id} attr={attr}/>
        </div>
      </label>
    </div>
  )
}

function FieldSelect({ children, label, value, onChange, desc = '' }) {
  return (
    <div className="field-wrapper">
      <label className="field">
        <span className="field__label">{label}</span>
        <div className="field__box">
          <select className="field__input" value={value} onChange={onChange}>
            {children}
          </select>
          <p className="field__desc">{desc}</p>
        </div>
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
  const [value, setValue] = useState(cloneDeep(defaultValue))
  const viewCss = value.css || {}

  useEffect(() => {
    setValue(cloneDeep(defaultValue))
  }, [defaultValue])
  
  const handleSetValue = useCallback((attr, attrValue) => {
    setValue((value) => ({
      ...value,
      [attr]: attrValue
    }))
  }, [])

  const handleSetCss = useCallback((attr, attrValue) => {
    setValue((value) => {
      console.log('editing:', value)
      const css = {  ...value.css }
      if (attrValue === '') {
        delete css[attr]
      } else {
        css[attr] = attrValue
      }
      return {
        ...value,
        css
      }
    })
  }, [])

  const handleApply = () => {
    console.log('edited:', value, viewCss)
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
      <FieldRelative
        key={viewId + '0'}
        label="??????"
        value={viewCss.width}
        desc="???????????????????????????: calc(id0.width + 10)"
        id={viewId}
        attr="css.width"
        onChange={
          (e) => handleSetCss('width', validateValue(
            e.target.value,
            viewCss.width, 'width'
          ))
        }
      />
      <FieldRelative
        key={viewId + '1'}
        label="??????"
        value={viewCss.height}
        desc="???????????????????????????: calc(id0.width + 10)"
        id={viewId}
        attr="css.height"
        onChange={
          (e) => handleSetCss('height', validateValue(
            e.target.value, viewCss.height, 'height'
          ))
        }
      />
      <FieldRelative
        key={viewId + '2'}
        label="??????"
        value={viewCss.top}
        desc="???????????????????????????: calc(id0.top + 10)"
        id={viewId}
        attr="css.top"
        onChange={
          (e) => handleSetCss('top', validateValue(
            e.target.value, viewCss.top, 'top'
          ))
        }
      />
      <FieldRelative
        key={viewId + '3'}
        label="??????"
        value={viewCss.left}
        desc="???????????????????????????: calc(id0.left + id0.width + 10)"
        id={viewId}
        attr="css.left"
        onChange={(e) =>
          handleSetCss('left', validateValue(
            e.target.value, viewCss.left, 'left'
          ))
        }
      />
      <FieldRelative
        key={viewId + '30'}
        label="??????"
        value={viewCss.bottom}
        desc="???????????????????????????: calc(id0.bottom + 10)"
        id={viewId}
        attr="css.bottom"
        onChange={
          (e) => handleSetCss('bottom', validateValue(
            e.target.value, viewCss.bottom, 'bottom'
          ))
        }
      />
      <FieldRelative
        key={viewId + '31'}
        label="??????"
        value={viewCss.right}
        desc="???????????????????????????: calc(id0.right + id0.width + 10)"
        id={viewId}
        attr="css.right"
        onChange={(e) =>
          handleSetCss('right', validateValue(
            e.target.value, viewCss.right, 'right'
          ))
        }
      />
      {/* ???????????? */}
      <FieldInput
        key={viewId + '17'}
        label="??????"
        value={viewCss.rotate}
        id={viewId}
        attr="css.rotate"
        onChange={(e) =>
          handleSetCss('rotate', validateValue(
            e.target.value, viewCss.rotate, 'rotate'
          ))
        }
      />
      <FieldInput
        key={viewId + '18'}
        label="??????"
        value={viewCss.borderRadius}
        id={viewId}
        attr="css.borderRadius"
        onChange={(e) =>
          handleSetCss('borderRadius', validateValue(
            e.target.value, viewCss.borderRadius, 'borderRadius'
          ))
        }
      />
      <FieldInput
        key={viewId + '19'}
        label="????????????"
        value={viewCss.borderWidth}
        id={viewId}
        attr="css.borderWidth"
        onChange={(e) =>
          handleSetCss('borderWidth', validateValue(
            e.target.value, viewCss.borderWidth, 'borderWidth'
          ))
        }
      />
      <FieldInput
        key={viewId + '20'}
        label="????????????"
        value={viewCss.borderColor}
        id={viewId}
        attr="css.borderColor"
        onChange={(e) =>
          handleSetCss('borderColor', validateValue(
            e.target.value, viewCss.borderColor, 'borderColor'
          ))
        }
      />
      <FieldSelect
          key={viewId + '21'}
          label="????????????"
          value={viewCss.borderStyle}
          onChange={(e) => handleSetCss('borderStyle', e.target.value)}
        >
        <option value="solid">solid</option>
        <option value="dashed">dashed</option>
        <option value="dotted">dotted</option>
      </FieldSelect>
      <FieldInput
        key={viewId + '22'}
        label="??????"
        value={viewCss.shadow}
        desc="??????: 5px 5px 5px #aaa"
        id={viewId}
        attr="css.shadow"
        onChange={(e) =>
          handleSetCss('shadow', validateValue(
            e.target.value, viewCss.shadow, 'shadow'
          ))
        }
      />
      {/* end ???????????? */}
      {viewType === VIEW_TYPE_IMAGE ? (
        <FieldInput
          key={viewId + '4'}
          label="URL"
          value={value.url}
          id={viewId}
          attr="url"
          onChange={(e) => handleSetValue('url', e.target.value)}
        />
      ) : null}
      {viewType === VIEW_TYPE_IMAGE ? (
        <FieldSelect
          key={viewId + '5'}
          label="??????"
          value={viewCss.mode}
          onChange={(e) => handleSetCss('mode', e.target.value)}
        >
          {' '}
          <option value="aspectFill">aspectFill</option>
          <option value="scaleToFill">scaleToFill</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '6'}
          label="????????????"
          value={viewCss.fontSize}
          id={viewId}
          attr="css.fontSize"
          onChange={(e) =>
            handleSetCss('fontSize', validateValue(
              e.target.value, viewCss.fontSize, 'fontSize'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '25'}
          label="??????"
          value={viewCss.lineHeight}
          id={viewId}
          attr="css.lineHeight"
          onChange={(e) =>
            handleSetCss('lineHeight', validateValue(
              e.target.value, viewCss.lineHeight, 'lineHeight'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '7'}
          label="????????????"
          value={viewCss.color}
          id={viewId}
          attr="css.color"
          onChange={(e) =>
            handleSetCss('color', validateValue(
              e.target.value, viewCss.color, 'color'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '8'}
          label="????????????"
          value={viewCss.maxLines}
          id={viewId}
          attr="css.maxLines"
          onChange={(e) =>
            handleSetCss('maxLines', validateValue(
              e.target.value, viewCss.maxLines, 'maxLines'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldSelect
          key={viewId + '9'}
          label="????????????"
          value={viewCss.fontWeight}
          onChange={(e) => handleSetCss('fontWeight', e.target.value)}
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
          label="????????????"
          value={viewCss.textDecoration}
          onChange={(e) => handleSetCss('textDecoration', e.target.value)}
        >
          <option value="none">???</option>
          <option value="underline">underline</option>
          <option value="overline">overline</option>
          <option value="line-through">line-through</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldSelect
          key={viewId + '11'}
          label="????????????"
          value={viewCss.textStyle}
          onChange={(e) => handleSetCss('textStyle', e.target.value)}
        >
          <option value="fill">????????????</option>
          <option value="stroke">????????????</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '12'}
          label="????????????"
          value={viewCss.background}
          id={viewId}
          attr="css.background"
          onChange={(e) =>
            handleSetCss('background', validateValue(
              e.target.value, viewCss.background, 'background'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '13'}
          label="??????"
          value={viewCss.padding}
          id={viewId}
          attr="css.padding"
          onChange={(e) =>
            handleSetCss('padding', validateValue(
              e.target.value, viewCss.padding, 'padding'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldSelect
          key={viewId + '14'}
          label="????????????"
          value={viewCss.textAlign}
          onChange={(e) => handleSetCss('textAlign', e.target.value)}
        >
          <option value="left">?????????</option>
          <option value="center">????????????</option>
          <option value="right">?????????</option>
        </FieldSelect>
      ) : null}
      {viewType === VIEW_TYPE_TEXT ? (
        <FieldInput
          key={viewId + '15'}
          label="??????"
          value={value.text}
          id={viewId}
          attr="text"
          onChange={(e) =>
            handleSetValue('text', validateValue(
              e.target.value, value.text, 'text'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_QRCODE ? (
        <FieldInput
          key={viewId + '16'}
          label="??????"
          value={value.content}
          id={viewId}
          attr="content"
          onChange={(e) =>
            handleSetValue('content', validateValue(
              e.target.value, value.content, 'content'
            ))
          }
        />
      ) : null}
      {viewType === VIEW_TYPE_RECT ? (
        <FieldInput
          key={viewId + '26'}
          label="??????"
          value={viewCss.color}
          id={viewId}
          attr="css.color"
          onChange={(e) =>
            handleSetCss('color', validateValue(
              e.target.value, value.color, 'color'
            ))
          }
        />
      ) : null}
      </div>
      <div className="attr-editor__footer">
        {/* <button className="attr-editor__button">??????</button> */}
        <button className="attr-editor__button" onClick={handleApply}>
          ??????
        </button>
      </div>
    </div>
  )
}
