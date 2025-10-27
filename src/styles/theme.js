// src/styles/theme.js

/**
 * Phoenix Design - 主题配置文件
 * 这里定义了应用的核心设计变量，用于覆盖Ant Design Vue的默认样式。
 * Ant Design Vue的定制是基于CSS Variables或Less变量。为了在Vite中动态切换
 * 主题（未来可能的需求），我们使用ConfigProvider的theme属性，它基于CSS Variables。
 */

export const phoenixTheme = {
    // token是 antd v4+ 的核心设计变量
    token: {
      // 主色
      colorPrimary: '#0052cc',
  
      // 字体
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
      fontSize: 14,
  
      // 圆角
      borderRadius: 6,
    },
    // components是针对具体组件的定制
    components: {
      Layout: {
        headerBg: '#ffffff', // 顶部导航栏背景
        headerPadding: '0 24px', // 顶部导航栏内边距
      },
      Menu: {
        // 保持暗色菜单，所以不在这里覆盖
      },
      Button: {
        // 按钮的圆角会继承token.borderRadius
      },
    },
  };