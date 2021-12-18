/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:13:14
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-18 20:53:12
 * @Description: file content
 */

const KEY = 'PEN_'
const KEY_TEMPLATE = 'PEN_TEMPLATE_'

const storage = {
  set(name = '', value) {
    localStorage.setItem(`${KEY}${name}`, JSON.stringify(value))
  },
  get(name = '') {
    return JSON.parse(localStorage.getItem(`${KEY}${name}`))
  },
  all() {
    return Object.keys(localStorage)
      .filter(item => item.indexOf(KEY) === 0 && item.indexOf(KEY_TEMPLATE) === -1)
      .map(item => item.replace(KEY, ''))
  },
  setTemplate(name = '', value) {
    localStorage.setItem(`${KEY_TEMPLATE}${name}`, JSON.stringify(value))
  },
  getTemplate(name = '') {
    return JSON.parse(localStorage.getItem(`${KEY_TEMPLATE}${name}`))
  }
}

export default storage