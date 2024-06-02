# [Vue 2048](https://game.aiwan.run/2048/)

> 参考 https://github.com/gabrielecirulli/2048

# 技术栈

- Vue3
- TypeScript
- Vite
- UnoCSS
- VueUse

# 思路

## 布局

- container 是 relative,动态生成 absolute button 元素，添加 left 和 top

## 移动

> 以向上为例，x 为 0 的一列

- y = 1, x = 1
- y = 2, x = 2, 1
- y = 3, x = 3, 2, 1
  > 遍历六次，每次取当前的和其上一个比较，是否合并或移动
