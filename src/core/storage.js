/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:13:14
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 17:15:08
 * @Description: file content
 */

const KEY = 'PEN_'

const storage = {
  set(name = '', value) {
    localStorage.setItem(`${KEY}${name}`, JSON.stringify(value))
  },
  get(name = '') {
    return JSON.parse(localStorage.getItem(`${KEY}${name}`))
  }
}

export default storage