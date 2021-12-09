/*
 * @Author: kuanggf
 * @Date: 2021-12-09 17:40:00
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 17:43:10
 * @Description: file content
 */
import Index from '../index'
import Login from '../login'
import projectContext from '../../context/project'
import { useState } from 'react'

export default function Main() {
  const [name, setName] = useState(null)

  return (
    <projectContext.Provider value={{
      name,
      setName
    }}>
      {
        name ? <Index /> : <Login />
      }
    </projectContext.Provider>
  )
}