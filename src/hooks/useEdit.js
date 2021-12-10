/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:55:14
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-10 14:22:18
 * @Description: file content
 */
import { useContext } from 'react'
import editContext from '../context/edit'

export default function useEdit() {
  return useContext(editContext)
}