# Battery Run Time Calculator - UI设计文档

## 1. 项目概述

这是一个专为苹果手机设计的PWA（Progressive Web App）应用，用于计算电池运行时间。应用采用响应式设计，能够自动适配iPhone 14到17的所有屏幕尺寸。

## 2. 页面结构

### 2.1 HTML结构

```html
<body>
    <div class="app-container">
        <!-- 标题区 -->
        <div class="header">
            Battery Run Time Calculator
        </div>
        
        <!-- 按键区 -->
        <div class="button-area">
            <div class="button">Calc</div>
            <div class="button">DfTime</div>
            <div class="button">DfCost</div>
            <div class="button">DfLoad</div>
        </div>
        
        <!-- 子屏幕区域 -->
        <div class="subscreen-area">
            <div>
                <div id="subscreen-content">[子屏幕内容将在此显示]</div>
            </div>
        </div>
        
        <!-- 注脚区 -->
        <div class="footer">
            <span id="timestamp"></span> (c) 2026
        </div>
    </div>
</body>
```

## 3. 布局设计

### 3.1 整体布局

- 使用Flexbox布局，垂直排列各个区域
- 采用`app-container`作为根容器，确保整体布局的一致性
- 子屏幕区域使用`flex: 1`占据剩余空间

### 3.2 区域详解

#### 3.2.1 标题区 (`.header`)
- 背景颜色：`#81C784`（浅绿色）
- 文字颜色：白色
- 内边距：12px
- 文字对齐：居中
- 字体大小：16px
- 字体权重：600

#### 3.2.2 按键区 (`.button-area`)
- 布局：水平Flex布局，四个按键平均分布
- 内边距：8px 16px
- 按键间距：16px
- 背景颜色：白色
- 底部边框：1px solid #e0e0e0

##### 按键 (`.button`)
- 布局：`flex: 1`，平均占据空间
- 内边距：4px 8px
- 背景颜色：透明
- 边框：无
- 文字对齐：居中
- 字体大小：14px
- 字体权重：500
- 文字颜色：#666
- 点击效果：文字颜色变为#2196F3

##### 激活状态 (`.button.active`)
- 文字颜色：#2196F3
- 底部边框：2px solid #2196F3

#### 3.2.3 子屏幕区域 (`.subscreen-area`)
- 布局：`flex: 1`，占据剩余空间
- 背景颜色：白色
- 边距：0
- 边框圆角：0
- 阴影：无
- 内容对齐：居中
- 字体大小：18px
- 字体权重：500
- 文字颜色：#333
- 垂直滚动：启用 (`overflow-y: auto`)
- 触摸滚动：启用 (`-webkit-overflow-scrolling: touch`)
- 最小高度：0（确保flex子项能够正确收缩）
- 滚动行为：`overscroll-behavior: contain`（确保不影响下拉刷新）

##### 子屏幕背景颜色
- Calc：`#FFCDD2`（浅红）
- DfTime：`#BBDEFB`（浅蓝）
- DfCost：`#FFF3E0`（浅黄）
- DfLoad：`#E0E0E0`（浅灰）

#### 3.2.4 注脚区 (`.footer`)
- 内边距：11px
- 文字对齐：居中
- 字体大小：11px
- 文字颜色：#666（深灰色）

## 4. 响应式设计

### 4.1 视口设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
```

### 4.2 媒体查询

#### 4.2.1 移动设备通用设置 (max-width: 768px)
- body：`height: 100%; min-height: 100vh; position: relative;`
- app-container：`display: flex; flex-direction: column; min-height: 100vh; height: 100%;`
- subscreen-area：`flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;`

#### 4.2.2 小屏幕设备 (max-width: 320px)
- 标题区：字体大小12px，内边距9px
- 按键：字体大小10px，内边距4px 6px
- 子屏幕：字体大小16px
- 注脚区：字体大小9px，内边距8.4px

#### 4.2.3 中等屏幕设备 (321px - 375px)
- 标题区：字体大小14px，内边距10.5px
- 按键：字体大小12px，内边距4px 8px
- 子屏幕：字体大小18px
- 注脚区：字体大小10px，内边距9.8px

#### 4.2.4 大屏幕设备 (376px - 428px)
- 标题区：字体大小16px，内边距12px
- 按键：字体大小14px，内边距4px 8px
- 子屏幕：字体大小20px
- 注脚区：字体大小11px，内边距11.2px

#### 4.2.5 平板设备和普通浏览器 (min-width: 429px)
- body：`max-width: 428px; margin: 0 auto; border: 1px solid #e0e0e0; box-shadow: 0 0 10px rgba(0,0,0,0.1);`
- 标题区：字体大小16px，内边距12px
- 按键：字体大小14px，内边距4px 8px
- 子屏幕：字体大小20px
- 注脚区：字体大小11px，内边距11px

## 5. 颜色方案

| 元素 | 颜色值 | 描述 |
|------|-------|------|
| 背景色 | #f5f5f5 | 页面背景 |
| 标题区背景 | #81C784 | 浅绿色 |
| 标题区文字 | #FFFFFF | 白色 |
| 按键区背景 | #FFFFFF | 白色 |
| 按键文字 | #666666 | 深灰色 |
| 按键激活文字 | #2196F3 | 蓝色 |
| 按键激活边框 | #2196F3 | 蓝色 |
| 子屏幕背景 | #FFFFFF | 白色 |
| 子屏幕文字 | #333333 | 深灰色 |
| 注脚区文字 | #666666 | 深灰色 |
| Calc子屏幕 | #FFCDD2 | 浅红 |
| DfTime子屏幕 | #BBDEFB | 浅蓝 |
| DfCost子屏幕 | #FFF3E0 | 浅黄 |
| DfLoad子屏幕 | #E0E0E0 | 浅灰 |

## 6. 字体设置

- 字体族：`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- 标题区：12-16px，600权重
- 按键：10-14px，500权重
- 子屏幕：16-20px，500权重
- 注脚区：9-11px，默认权重

## 7. 交互逻辑

### 7.1 按键点击
- 点击按键时，移除所有按键的`active`类
- 为当前点击的按键添加`active`类
- 移除所有子屏幕类
- 根据按键文本添加对应的子屏幕类
- 更新子屏幕内容为"[按键文本] 子屏幕"

### 7.2 页面加载
- 默认显示Calc子屏幕
- 默认将Calc按键设置为active状态
- 生成并显示时间戳
- 初始调整子屏幕高度

### 7.3 窗口大小变化
- 重新调整子屏幕高度

## 8. PWA相关设置

### 8.1 元标签

```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#81C784">
<link rel="apple-touch-icon" href="icons/icon.svg">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Battery Calculator">
```

### 8.2 Service Worker

```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker 注册成功:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker 注册失败:', error);
            });
    });
}
```

## 9. 时间戳功能

- 使用localStorage存储时间戳，确保同一版本的应用时间戳保持固定
- 时间戳格式：`年-月-日 时:分:秒`（中文格式）
- 仅在首次加载时生成时间戳
- 时间戳显示在注脚区

## 10. 下拉刷新功能

- body：`overscroll-behavior: auto; overflow-y: auto;`
- subscreen-area：`overscroll-behavior: contain;`
- 确保在移动设备上能够通过下拉动作刷新页面

## 11. 安全区域处理

```css
@supports (padding: max(0px)) {
    body {
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
    }
}
```

- 确保内容不会被刘海屏或系统导航栏遮挡

## 12. 代码结构

### 12.1 CSS结构
- 全局重置样式
- body基础样式
- 安全区域处理
- 移动设备通用设置
- 各个区域的样式
- 响应式媒体查询

### 12.2 JavaScript结构
- PWA安装检测
- 时间戳生成和存储
- 子屏幕高度调整
- 页面加载初始化
- 窗口大小变化监听
- 按键点击事件处理
- Service Worker注册

## 13. 关键点总结

1. **响应式设计**：适配iPhone 14到17的所有屏幕尺寸
2. **禁止左右滑动**：通过`overflow-x: hidden`实现
3. **下拉刷新**：通过`overscroll-behavior`和`overflow-y: auto`实现
4. **安全区域**：通过`env(safe-area-inset)`确保内容不被遮挡
5. **时间戳**：使用localStorage确保同一版本时间戳固定
6. **动态高度调整**：通过JavaScript实时计算并调整子屏幕高度
7. **PWA特性**：支持添加到主屏幕，离线访问
8. **Flexbox布局**：使用Flexbox实现灵活的布局结构
9. **触摸优化**：启用`-webkit-overflow-scrolling: touch`提高触摸滚动体验
10. **视觉一致性**：统一的颜色方案和字体设置

## 14. 浏览器兼容性

- 支持所有现代浏览器
- 针对苹果Safari浏览器进行了优化
- 支持PWA特性

## 15. 性能优化

- 轻量级CSS，避免不必要的样式
- 高效的JavaScript代码
- 响应式图片处理
- Service Worker缓存策略

## 16. 维护建议

- 如需添加新功能，保持现有的代码结构和命名约定
- 确保所有新添加的元素都遵循响应式设计原则
- 测试所有屏幕尺寸的显示效果
- 定期更新Service Worker缓存策略

---

此文档详细记录了Battery Run Time Calculator应用的用户界面设计，包括布局、样式、交互逻辑等所有细节。通过遵循此文档，可以在另一个项目中100%复现当前的用户界面。