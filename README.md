# BCC-Admin

## 使用步骤

### 准备

确认本地 node 版本大于 v18.0.0，如果版本过低，请到[官网](https://nodejs.org/en)下载最新版

```shell
node -v
```

推荐使用 pnpm 管理项目依赖

```shell
npm i pnpm -g
```

推荐使用 vscode 进行开发，请到[官网](https://code.visualstudio.com/)下载最新版

安装项目推荐的 vscode 插件

- bradlc.vscode-tailwindcss
- dbaeumer.vscode-eslint
- esbenp.prettier-vscode
- Vue.volar
- Vue.vscode-typescript-vue-plugin

### 开发

安装依赖

```shell
pnpm i
```

运行项目

```shell
pnpm dev
```

### 检查

代码检查

```shell
pnpm lint:eslint
```

代码格式化

```shell
pnpm lint:prettier
```

样式格式化

```shell
pnpm lint:stylelint
```

### 构建

开发环境

```shell
pnpm build:dev
```

生产环境

```shell
pnpm build:prod
```

测试环境

```shell
pnpm build:test
```

## 目录结构

```
├─ /.husky                       # husky 脚本
├─ /.vscode                      # vscode 配置文件
├─ /build                        # vite 脚本
├─ /public                       # 静态资源
├─ /src
│  ├─ /api                       # 接口
│  ├─ /assets                    # 静态资源
│  ├─ /components                # 全局组件
│  ├─ /config                    # 全局配置
│  ├─ /directives                # 全局指令
│  ├─ /enums                     # 常用枚举类型库
│  ├─ /hooks                     # 常用钩子库
│  ├─ /languages                 # 国际化模块
│  ├─ /layouts                   # 布局
│  ├─ /routers                   # 路由
│  ├─ /stores                    # 存储
│  ├─ /styles                    # 样式
│  ├─ /typings                   # 全局 ts 声明
│  ├─ /utils                     # 常用工具函数库
│  ├─ /views                     # 视图
│  ├─ App.vue                    # 项目入口组件
│  ├─ main.ts                    # 项目入口文件
│  ├─ vite-env.d.ts              # 指定 ts 识别 vue
├─ .editorconfig                 # 编辑器通用配置文件
├─ .env                          # 全局环境配置文件
├─ .env.development              # 开发环境配置文件
├─ .env.production               # 生产环境配置文件
├─ .env.test                     # 测试环境配置文件
├─ .eslintignore                 # eslint 忽略目录
├─ .eslintrc.cjs                 # eslint 配置文件
├─ .gitignore                    # git 忽略目录
├─ .prettierignore               # prettier 忽略目录
├─ .prettierrc.cjs               # prettier 配置文件
├─ .stylelintignore              # stylelint 忽略目录
├─ .stylelintrc.cjs              # stylelint 配置文件
├─ commitlint.config.cjs         # commitlint 配置文件
├─ index.html                    # 入口
├─ lint-staged.config.cjs        # lint-staged 配置文件
├─ package.json                  # 依赖包配置文件
├─ pnpm-lock.yaml                # 依赖包锁定配置文件
├─ postcss.config.js             # postcss 配置文件
├─ README.md                     # 说明文档
├─ tailwind.config.js            # tailwind 配置文件
├─ tsconfig.json                 # ts 配置文件
├─ vite.config.ts                # vite 配置文件
```

## 内置功能/组件/指令

- 切换组件大小（ assembly-size.vue ）
- 切换语言（ language-setting.vue ）
- 全局菜单搜索（ search-menu.vue ）
- 切换主题、布局（ theme-setting.vue ）
- 站内通知（ message-box.vue ）
- 全屏模式（ full-screen.vue ）
- 页面缓存
- 页面标签
- 菜单权限控制
- 按钮权限控制
- 接口请求/取消（ /api ）
- 图表（ /components/echarts-wrap ）
- 表格（ /components/pro-table ）
- 树（ /components/tree-filter ）
- 自定义指令：复制、拖拽、防抖、节流、长按

## 相关插件

### Vue.js

- 官方文档：https://cn.vuejs.org/api/

### Vue Router

- 官方文档：https://router.vuejs.org/zh/

### Pinia

- 官方文档：https://pinia.vuejs.org/zh/

### Element Plus

- 官方文档：https://element-plus.org/zh-CN/component/button.html

### Tailwind CSS

- 官方文档：https://tailwindcss.com/docs/installation

### Apache ECharts

- 官方文档：https://echarts.apache.org/zh/option.html
- 在线示例：https://echarts.apache.org/examples/zh/index.html

### dayjs

- 官方文档：https://day.js.org/docs/en/installation/installation

### 天地图

- 官方文档：http://lbs.tianditu.gov.cn/api/js4.0/guide.html
- 在线示例：http://lbs.tianditu.gov.cn/api/js4.0/examples.html

### wangEditor

- 官方文档：https://www.wangeditor.com/v5/getting-started.html
- 在线示例：https://www.wangeditor.com/demo/index.html

## Geeker-Admin

- 官方文档：https://docs.spicyboy.cn/
- 在线示例：https://admin.spicyboy.cn/
- 代码仓库：https://github.com/HalseySpicy/Geeker-Admin
