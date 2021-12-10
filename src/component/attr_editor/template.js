/*
 * @Author: kuanggf
 * @Date: 2021-12-10 16:50:58
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-10 17:38:05
 * @Description: file content
 */
import { useState, useEffect } from 'react'
import usePalette from '../../hooks/usePalette'

export default function Template({
  id,
  attr
}) {
  const palette = usePalette()
  const [checked, setChecked] = useState(false)
  const [templateValue, setTemplateValue] = useState('')

  useEffect(() => {
    const map = palette.template[id] || {}
    console.log('okkkk:', palette.template[id])
    if (map[attr] !== undefined) {
      setChecked(true)
      setTemplateValue(map[attr])
    }
  }, [palette, id, attr])

  const handleToggleChecked = () => {
    const template = palette.template
    const nextChcked = !checked
    setChecked(nextChcked)
    if (!nextChcked) {
      delete template[id][attr]
      palette.setTemplate(template)
    } else {
      if (!template[id]) template[id] = {}
      template[id][attr] = ''
      palette.setTemplate(template)
    }
  }

  const handleValueChange = e => {
    const template = palette.template
    setTemplateValue(e.target.value)
    if (!template[id]) template[id] = {}
    template[id][attr] = e.target.value
    console.log('change:', template)
    palette.setTemplate(template)
  }

  return (
    <div className="use-template">
      <label>
        <input type="checkbox" value={checked} onClick={handleToggleChecked}/>
        启用模版
      </label>
      <label style={{display: checked ? 'flex' : 'none'}}>
        <span>模版值</span> <input type="text" value={templateValue} onChange={handleValueChange}/>
      </label>
    </div>
  )
}