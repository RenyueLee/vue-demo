# 舟山110报警服务平台.管理后台

## 更新记3
### 2020-01-15
- 修改警员头像未正常显示问题
- 调整短信通知详细，部门详细，短信模板详细时间显示格式问题
- 修改网页title图标为公安警徽图标
- 修改导航菜单面板收缩后图标不显示问题
- 报警详细页面添加附件下载

### 2020-01-13
- 添加并修改首页统计图标
- 完成进入子页面返回后，主页保持原状态
- 格式化报警详细页面与受理记录列表中的时间
- 对报警页面，详细页面中的操作按钮加入根据受理状态值显示控制
- 报警详细补充显示事发时间，其他联系方式

### 2020-01-07
- 修改API接口地址为线上测试服务器地址

### 2020-01-06
- 对接API接口，完成后台管理首页面数据动态化展示

### 2020-01-04
- 添加静态首页面

### 2020-01-03
- 调整列表日期显示格式
- 调整列表列宽从原来百分比改为固定宽度

### 2020-01-02
- 修复刷新页面出现404问题
- 调整部分代码
- 统一图片调用地址，修复头像显示问题
- 图形验证码获取失败后，自动刷新验证码并设发送短信验证码按钮为可点击，不用等待60秒

### 2019-12-31
- 短信验证码列表，检索状态添加“发送失败”项
- 修改登录默认手机号

### 2019-12-29
- 去除用户密码修改功能。
- 修改登录页面样式。
- 修改用户登录方式为使用短信验证登录
- element-ui版本改为2.13.0，最新版本，代码获取后请运行：npm install 再调试。

### 2019-12-27
- 解决启用调试时老是打开两个页面。

### 2019-12-26
- 添加修改密码功能

### 2019-12-23
- 添加权限路由，实现根据登录用户所拥有的角色显示左侧菜单及显示可操作按钮

### 2019-12-21
- 规范方法命名，添加表单与更新表单独立。
- 警员头像上传并展示，当前地址暂时固定，后期需要考虑图片地址问题

### 2019-12-19
- 整理优化页面代码，修改部分命名规则
- 解决添加或编辑后，列表数据的刷新先于添加或编辑操保存的问题。

### 2019-12-15
- 用户登录改为通过后台验证，调整用户登录后数据获取。
- 取消requestDebug.js，统一使用request.js，实现所有数据通过调用webapi接口获取，Mock数据通道暂时注销。
- 如想使用Mock数据，请修改view/main.js，将mockXHR()还原。

### 2019-12-14
- 添加权限管理（列表查询，添加/修改，删除）
- 修改警员创建与更新模块，添加权限选择

### 2019-12-12
- 短信模板添加`接收对象`后相应页面调整

### 2019-12-10
- 调整受理记录API方法，调用后端API接口正常显示受理记录列表，并保存。
- 调整报警信息API方法与页面，实现通过调用后端API接口，展示报警信息列表，报警信息检索，报警受理回复，报警分配，报警结果填写，报警信息删除等功能
- 实现通过调用后端API接口展示报警详细页面
- 调整警员API方法与页面，实现通过调用后端API接口，展示警员列表，根据部门与关键字检索警员，警员添加/编辑，删除等功能
- 添加警员时图片上传功能尚未实现，列表页面尚存在，更新或添加数据后刷新列表数据时序问题
### 2019-12-09
- 打通部门前后端操作
- 调整数据返回命名规范

### 2019-12-08
- 为调试方便使后台数据与Mock数据并存，添加requestDebug.js的axios封装，调用后台调试数据的使用requestDebug，不做调试用的任然使用Mock数据
- 打通短信模板前后端操作
- 打通短信通知前后端操作

### 2019-11-30
- 调整报警列表详细页面
- 调整警员详细页面，表单页面

### 2019-11-29

- 添加表单验证
- 删除时提示信息中添加被删除者的关键信息

### 2019-11-28

- 完成报警管理动态化，添加批量分发功能
- 完成报警管理详细页受理警员，受理记录，填写处理结果，人工回复，分发动态化处理
- 实现分页功能
- 插件切换成中文
- 解决部分问题

### 2019-11-27

- 完成短信模板设置管理查询，删除，详细，编辑/添加动态化
- 完成短信通知查询，详细动态化
- 警员管理查询，删除，详细，编辑/添加动态化
- 报警管理查询，删除，分发，回复动态化，未完
- 待实现部分：报警管理，数据分页功能，表单验证，图片展示与上传，枚举类型下拉列表，树状数据等动态化处理

### 2019-11-26

- 完成部门删除，详细，编辑/添加动态化

### 2019-11-25

- 部门管理页面，完成动态查询功能，删除功能未完

### 2019-11-24

- 添加警员详细，警员编辑静态页面
- 添加报警详细中的受理记录静态页面

### 2019-11-23

- 添加短信模板设置详细静态页面，编辑/添加表单页面
- 添加部门设置详细静态页面，编辑/添加表单页面
- 添加短信通知详细静态页面
- 添加报警详细填写处理结果/人工回复静态页面

### 2019-11-22

- 添加报警管理静态列表页
- 添加警员管理静态列表页
- 添加短信通知静态列表页
- 添加系统设置->部门管理静态列表页
- 添加系统设置->短信模板设置静态列表页

## 创建步骤

```bash
# 进入项目目录
cd code

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 参考资料链接

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板,专门针对本项目的文章,算作是一篇文档)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)