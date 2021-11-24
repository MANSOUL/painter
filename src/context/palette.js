import { createContext } from 'react'

export const paletteDefault = {
  width: 269,
  height: 397,
  background: '#f1f1f1',
  views: [
    {
      id: 'image-1',
      type: 'image',
      url: 'http://10.3.22.111:9999/2.png',
      css: {
        width: 150,
        height: 150,
        top: 10, 
        left: 10,
        mode: 'aspectFill'
      },
    },
    {
      id: 'text-1',
      type: 'text',
      text: '床前明月光，疑是地上霜，举头望明月，低头思故乡',
      css: {
        width: 110,
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
      id: 'qrcode-1',
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
      id: 'rect-1',
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
