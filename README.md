# 成都二期（平台端）

为便于多端管理、共享组件库，平台端采用 monorepo 架构，通过 pnpm 管理多个 [workspace](https://pnpm.io/workspaces)

## 快速开始

### 准备

推荐使用 vscode 进行开发，克隆工程后根据提示安装开发辅助插件

- bradlc.vscode-tailwindcss
- dbaeumer.vscode-eslint
- esbenp.prettier-vscode
- Vue.volar

根据开发任务，克隆相应子工程（单位端、政府端）到 apps 文件夹

- 平台端 svn://192.168.60.69/security/成都二期2024前端/base/branches/dev
- 单位端 svn://192.168.60.69/security/成都二期2024前端/co/branches/dev
- 政府端 svn://192.168.60.69/security/成都二期2024前端/gov/branches/dev

注意最终目录结构

```
root                             # 平台端工程（svn）
├─ /.vscode                      # vscode 配置文件
├─ /apps                         # 应用
│  ├─ co                         # 单位端工程（svn）
│  ├─ gov                        # 政府端工程（svn）
├─ /packages                     # 共享包
│  ├─ components                 # 组件库
│  ├─ template                   # 代码生成模板
│  ├─ ui                         # ui库
│  ├─ utils                      # 工具库
├─ .editorconfig                 # 编辑器通用配置文件
├─ .eslintignore                 # eslint 忽略目录
├─ .eslintrc.cjs                 # eslint 配置文件
├─ .gitignore                    # git 忽略目录
├─ .prettierignore               # prettier 忽略目录
├─ .prettierrc.cjs               # prettier 配置文件
├─ package.json                  # 依赖包配置文件
├─ pnpm-lock.yaml                # 依赖包锁定配置文件
├─ pnpm-workspace.yaml           # 工作空间配置文件
├─ README.md                     # 说明文档
```

检查本地 nodejs 版本

```
node -v
```

确保本地 nodejs 版本大于 v18.0.0，如果版本过低，请到[官网](https://nodejs.org/en)下载最新版

使用 pnpm 管理依赖包

```
npm i pnpm -g
```

转到平台端根目录，使用 pnpm 安装依赖包（同时会自动安装子工程依赖包）

```
pnpm i
```

### 开发

```
pnpm dev:co        // 单位端
pnpm dev:gov       // 政府端
```

### 构建

```
build:test         // 单位端、政府端测试环境
build:prod         // 单位端、政府端生产环境

build:co:test      // 单位端测试环境
build:co:prod      // 单位端生产环境

build:gov:test     // 政府端测试环境
build:gov:prod     // 政府端生产环境
```

### 提交

子工程由独立 git/svn 仓库管理，需要到子工程目录进行提交

```
cd apps/co
git commit
```

提交规范

- feat：新功能
- fix：修复 bug
- docs：编写文档、编写注释
- style：变更代码格式，不影响代码运行逻辑
- refactor：重构
- chore：变更构建过程或构建工具

```
<type>: <subject>
```
