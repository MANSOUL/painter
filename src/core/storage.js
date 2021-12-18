/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:13:14
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-18 20:39:23
 * @Description: file content
 */

const KEY = 'PEN_'

const storage = {
  set(name = '', value) {
    localStorage.setItem(`${KEY}${name}`, JSON.stringify(value))
  },
  get(name = '') {
    return JSON.parse(localStorage.getItem(`${KEY}${name}`))
  },
  all() {
    return Object.keys(localStorage)
      .filter(item => item.indexOf(KEY) === 0)
      .map(item => item.replace(KEY, ''))
  }
}

export default storage