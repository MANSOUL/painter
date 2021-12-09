/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:55:14
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 17:55:14
 * @Description: file content
 */
import { useContext } from 'react'
import projectContext from '../context/project'

export default function useProject() {
  return useContext(projectContext)
}