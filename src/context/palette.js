/*
 * @Author: kuanggf
 * @Date: 2021-12-07 20:35:30
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-09 01:20:11
 * @Description: file content
 */
import { createContext } from 'react'

export const paletteDefault = {
  width: 269,
  height: 397,
  background: '#f1f1f1',
  views: [
    {
      id: 'image1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1638809264876-63bf0a05f4c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      css: {
        width: 150,
        height: 150,
        top: 10, 
        left: 10,
        mode: 'aspectFill'
      },
    },
    {
      id: 'text1',
      type: 'text',
      text: '500',
      css: {
        // width: 110,
        height: 100,
        top: 170, 
        left: 10,
        fontSize: 14,
        color: 'red',
        maxLines: 10,
        lineHeight: 20,
        fontWeight: 'normal',
        textDecoration: 'none',
        textStyle: 'fill',
        background: 'transparent',
        padding: 1,
        textAlign: 'left'
      },
    },
    {
      id: 'text2',
      type: 'text',
      text: 'kg',
      css: {
        // width: 110,
        // height: 100,
        top: 'calc(text1.top + 2)',
        left: 'calc(text1.left + text1.width + 5)',
        fontSize: 12,
        color: 'green',
        maxLines: 10,
        lineHeight: 20,
        fontWeight: 'normal',
        textDecoration: 'none',
        textStyle: 'fill',
        background: 'transparent',
        padding: 1,
        textAlign: 'left'
      },
    },
    {
      id: 'qrcode1',
      type: 'qrcode',
      content: '12345',
      css: {
        width: 100,
        height: 100,
        top: 250,
        left: '50%',
        // align: 'center',
      },
    },
    {
      id: 'rect1',
      type: 'rect',
      css: {
        width: 100,
        height: 50,
        top: 350,
        left: 10,
        color: 'radial-gradient(rgba(0, 0, 0, 0) 5%, #0ff 15%, #f0f 60%)'
      },
    },
  ]
}

export default createContext(paletteDefault)
