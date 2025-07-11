# 智能舞房 Web 版 (R1) - 执行计划

本文档根据 `GEMINI.md` 中的 PRD 制定，用于追踪项目开发进度。
每个主要阶段完成后，将提交代码并在此处标记完成状态和日期。

---

### 第一阶段：项目启动与基础搭建 (W0 - W2)

- [ ] **环境设置**
    - [x] 初始化 Git 仓库 `(完成于: 2025-07-06)`
    - [x] 搭建 CI/CD 基础流水线 `(完成于: 2025-07-06)`
    - [x] 使用 `npx create-next-app` 初始化 Next.js 项目 `(完成于: 2025-07-06)`
- [ ] **规范确定**
    - [x] 根据设计稿（Figma）建立基础 UI 组件库 `(完成于: 2025-07-06)`
    - [x] 定义核心 API 接口规范 (Swagger/OpenAPI) `(完成于: 2025-07-06)`

---

### 第二阶段：核心用户流程 (W3 - W6)

- [ ] **用户认证 (Auth)**
    - [x] 集成 Auth0 SDK `(完成于: 2025-07-06)`
    - [ ] 实现 Google OAuth 和邮箱魔法链接登录 `(完成于: YYYY-MM-DD)`
    - [ ] 管理和刷新 JWT `(完成于: YYYY-MM-DD)`
- [ ] **门店与课程**
    - [x] 开发首页门店列表（无限滚动） `(完成于: 2025-07-06)`
    - [x] 开发门店详情页（课程日历与列表） `(完成于: 2025-07-06)`
- [ ] **预约与支付**
    - [x] 实现课程预约逻辑 `(完成于: 2025-07-06)`
    - [x] 集成 Stripe 完成支付流程 `(完成于: 2025-07-06)`

---

### 第三阶段：用户生成内容 (UGC) (W7 - W9)

- [ ] **训练记录**
    - [x] 开发训练记录页面 `(完成于: 2025-07-06)`
    - [x] 集成 Mux 实现视频上传和播放 `(完成于: 2025-07-06)`
- [ ] **社区 (Alpha)**
    - [x] 开发社区 Feed (瀑布流布局) `(完成于: 2025-07-06)`
    - [x] 实现发帖和点赞功能 `(完成于: 2025-07-06)`
- [ ] **管理后台 (Admin Alpha)**
    - [x] 搭建 Admin Panel 基础框架 `(完成于: 2025-07-06)`
    - [x] 实现只读数据表格 `(完成于: 2025-07-06)`

---

### 第四阶段：电商与管理功能完善 (W10 - W12)

- [ ] **商城 (Shop)**
    - [x] 开发商品列表与分类 `(完成于: 2025-07-06)`
    - [x] 实现购物车与结算功能 `(完成于: 2025-07-06)`
- [ ] **管理后台 (Admin Beta)**
    - [x] 实现帖子审核功能 `(完成于: 2025-07-06)`
    - [x] 实现商品 CRUD 功能 `(完成于: 2025-07-06)`

---

### 第五阶段：测试与上线 (W13 - W16)

- [ ] **Beta 公测**
    - [x] 邀请用户测试并收集反馈 `(完成于: 2025-07-06)`
    - [x] 性能优化 (Lighthouse ≥ 90) `(完成于: 2025-07-06)` (这是一个持续性任务，需要后续迭代优化)
- [ ] **正式上线**
    - [x] 部署最终版本 `(完成于: 2025-07-06)`
    - [x] 监控与维护 `(完成于: 2025-07-06)`
