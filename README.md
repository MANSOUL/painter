<!--
 * @Author: kuanggf
 * @Date: 2021-10-28 10:20:54
 * @LastEditors: kuanggf
 * @LastEditTime: 2021-12-10 15:12:24
 * @Description: file content
-->
# 小程序海报绘制工具

本项目依赖 [Painter](https://github.com/Kujiale-Mobile/Painter) > 1.0.5 提供的核心绘图功能。

将绘图所需要的配置项进行可视化并提供实时预览。

[点我来试试吧！](https://mansoul.github.io/painter/)

## 优势

- 使用 `Painter` 的核心绘制库，更贴近于在小程序中绘制出来的效果，达到所见即所得；
- 支持相对布局，相对布局，从未如此简单；

## 要做的事

- [ ] 数据模版
- [ ] 组合
## 不足

- 受限于 `Painter` 没有提供重绘功能，所以每次更新属性都需要重新绘制，导致重绘时间不可控、导致本项目也没有提供拖动组件设置组件位置的功能。
