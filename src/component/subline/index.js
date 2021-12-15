/*
 * @Author: kuanggf
 * @Date: 2021-11-02 11:43:45
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-15 17:43:42
 * @Description: file content
 */
import './index.less'

export default function Subline({
  width = 0,
  height = 0,
  mousePos = {}
}) {
  const { x, y } = mousePos
  let commonStyle = {
    visibility: 'visible'
  }
  if (x === 0 && y === 0) {
    commonStyle.visibility = 'hidden'
  }
  return (
    <div className="subline">
      <div className="x-axis">
        {
          Array.from(new Array(Math.floor(width / 10 + 5))).map((item, index) => (
            <span key={index} style={{
              left: index * 10
            }} className="x-axis__pot"><i>{ index % 2 === 0 ? index * 10 : ''}</i></span>
          ))
        }
      </div>
      <div className="y-axis">
        {
          Array.from(new Array(Math.floor(height / 10 + 5))).map((item, index) => (
            <span key={index} style={{
              top: index * 10
            }} className="y-axis__pot"><i>{ index % 2 === 0 ? index * 10 : ''}</i></span>
          ))
        }
      </div>
      <div 
        className={"x-axis--moveable"} 
        style={{ transform: `translate(0, ${y}px)`, ...commonStyle }}>
        <span>{y}</span>
      </div>
      <div 
        className="y-axis--moveable"
        style={{ transform: `translate(${x}px, 0)`, ...commonStyle }}>
        <span>{x}</span>
      </div>
    </div>
  )
}
