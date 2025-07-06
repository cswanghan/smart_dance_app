# 智能舞房 **Web 版** PRD

> **文档版本**：v0.4.2 | 最后更新：{{自动生成}}
>
> 本版本仅对排版与重复内容做**整理修复**，不改变业务需求。

---

## 1 项目背景

* 为北美「智能舞房」共享空间构建一套 **无需微信生态** 的统一入口；首要目标是快速上线 **Web 核心功能**（R1），后续再联动智能硬件（R2）。
* 终端形态：移动网页 + 桌面响应式 + PWA。

---

## 2 版本规划概览

| 阶段              | 交付目标        | 主要功能                                                   | 技术重点                                                |
| --------------- | ----------- | ------------------------------------------------------ | --------------------------------------------------- |
| **R1 (Web 核心)** | 4 个月上线      | 账号体系（Google / 邮箱）、门店 & 课程浏览、在线预约 & 支付、训练记录查看、社区分享、商城电商 | Next.js SSR + Auth0 + Stripe；CDN 与 SEO；邮件 / Push 通知 |
| **R2 (IoT 扩展)** | R1 上线后 3 个月 | 智能门锁扫码 / 刷脸开门、镜面 AI 实时反馈、设备管理后台                        | IoT 网关、WS 实时流、摄像头人脸比对、设备 OTA                        |

> **说明**：本文档主体仅覆盖 **R1**；R2 概要见附录。

---

## 3 R1 用户使用动线

> 表中 API 前缀均为 `/api/v1`；除首次获取 provider 列表外，所有请求需带 `Authorization: Bearer <JWT>`。
>
> **Legend**：📱 移动端 🖥️ 桌面 🔁 页面内刷新 ➡️ 路由跳转

| #  | 场景        | UI 节点                         | 用户动作      | 主要 API / 事件                              | 本地 & 远端状态                | 结果 / 跳转                       |
| -- | --------- | ----------------------------- | --------- | ---------------------------------------- | ------------------------ | ----------------------------- |
| 1  | 首次访问      | 📱 Landing Modal / 🖥️ Header | 点击 Log In | `GET /auth/providers`                    | –                        | 弹出 Auth0 登录窗口                 |
| 2  | Google 登录 | Auth0 登录页                     | 选账户       | `POST /oauth/google`                     | 写 `jwt`                  | ➡️ `/home`；拉取 `/user/profile` |
| 3  | 邮箱魔法链接    | Auth0 登录页                     | 输入邮箱      | `POST /oauth/email_link`                 | 邮件发送 link                | 点击后写 `jwt`；➡️ `/home`         |
| 4  | 门店列表      | Home → StudioList             | 下拉        | `GET /studios?cursor`                    | `studios[]` 追加           | 🔁 列表增加                       |
| 5  | 地图弹窗      | Home → Map Btn                | 点击        | set `isMap=true`                         | –                        | 右侧 Mapbox Drawer              |
| 6  | 课程查看      | StudioDetail → Classes Tab    | 切日期       | `GET /lessons`                           | `lessons[]` 替换           | 🔁 列表刷新                       |
| 7  | 课程预约      | LessonCard → Book             | 点击        | `POST /bookings`                         | `booking.status=pending` | 弹出支付 Drawer                   |
| 8  | 支付        | Payment Drawer                | 填卡 → Pay  | Stripe Element + `POST /payment_intents` | `booking.status=paid`    | ➡️ 成功页 + Toast                |
| 9  | 训练记录      | Profile → Records             | 点卡片       | `GET /records/:id`                       | 缓存 record                | 详情页播放视频                       |
| 10 | 分享社区      | RecordDetail → Share          | 点击        | `POST /posts`                            | `posts[]` prepend        | 社区刷新                          |
| 11 | 商城加购      | Shop Grid → ➕                 | 点击        | `PUT /cart`                              | `cart.items`++           | Badge +1                      |
| 12 | 购物结算      | Cart Drawer → Checkout        | 点击        | `POST /checkout_sessions`                | `order.status=paid`      | ➡️ 订单成功页 + 邮件                 |
| 13 | 深色模式      | Header Toggle                 | 点击        | set `isDark`                             | –                        | 立即切换主题                        |

---

## 4 用户角色与核心场景（R1）

| 角色      | 主要任务                     | 相关页面                            |
| ------- | ------------------------ | ------------------------------- |
| 舞者      | 登录 / 预约 / 训练记录 / 社区 / 商城 | Home、Studio、Lesson、Shop、Profile |
| 教练      | 查看排期、学员、回复评论             | Coach Dashboard (R1.1)          |
| **管理员** | 帖子审核、商品 & 库存、订单售后        | **Admin Panel** (R1)            |
| 运营      | 门店 / 课程配置、对账             | SaaS Admin (既有系统)               |

---

## 5 产品整体架构（R1）

```ascii
Front‑end (Next.js 14)  ──SSR/SSG──▶  CDN
          ⇅ fetch
BFF (GraphQL Apollo) ───▶  SaaS Core (NestJS)
          ⇅ REST
Stripe Webhook  ◀───────┘
Auth0 Callback  ◀───────┘
Push (OneSignal) ─▶ Browser
```

---

## 6 功能模块说明（R1）

> 仅列 R1 范围；R2 扩展见附录。

### 6.1 首页 Home

* **组件**：门店探索、地图 Drawer、社区 Feed、Banner Carousel
* **状态管理**：React Context + SWR

```ascii
┌────────────────────────────────────────────┐
│ Header: Logo · Search · Avatar             │
├────────────────────────────────────────────┤
│ Banner Carousel (1–3)                      │
├────────────────────────────────────────────┤
│ Studio Card  (∞ scroll)                    │
├────────────────────────────────────────────┤
│ Floating Map Button ⊕ (bottom‑right)       │
└────────────────────────────────────────────┘
```

### 6.2 门店 & 课程

```ascii
┌────────────────────────────────────────────┐
│ Header: ← Back · Studio Name               │
├────────────────────────────────────────────┤
│ Date Strip (7 days, today highlight)       │
├────────────────────────────────────────────┤
│ Lesson Card                                │
│  Title | Time | Seats | $ | Book btn       │
└────────────────────────────────────────────┘
```

### 6.3 训练记录

```ascii
┌────────────────────────────────────────────┐
│ Header: 我的训练记录                        │
├────────────────────────────────────────────┤
│ Record Card Grid/List (∞ scroll)           │
└────────────────────────────────────────────┘
```

### 6.4 社区 Posts

```ascii
┌────────────────────────────────────────────┐
│ Header: 社区 | 热门 | 发布🖋                │
├────────────────────────────────────────────┤
│ Masonry Feed (2–3 cols)                    │
│  Thumb ♥128 💬12 … (∞)                    │
└────────────────────────────────────────────┘
```

### 6.5 商城 Shop

```ascii
┌────────────────────────────────────────────┐
│ Header: 商城 · 🔍                          │
├────────────────────────────────────────────┤
│ ◄ Category Sidebar                         │
└──┬──────────────────────────────────────────┘
   │ Product Grid + Cart Drawer (right)       │
   └──────────────────────────────────────────┘
```

### 6.6 Admin Panel

```ascii
┌────────────────────────────────────────────┐
│ Side Nav (Posts / Goods / Orders / Users)  │
├────────────────────────────────────────────┤
│ Top Bar: Filters · Search · Bulk Actions   │
├────────────────────────────────────────────┤
│ Data Table (shadcn/ui)                     │
└────────────────────────────────────────────┘
```

> **核心 API**：`/admin/posts` 帖子审核、`/admin/goods` 商品 CRUD、`/admin/orders` 订单、`/admin/users` 权限。

---

## 7 数据模型（R1）

* `devices`、`access_logs` 等 IoT 相关表移至 R2；其余沿用 v0.2。

---

## 8 第三方服务（R1）

| 场景 | 服务商       | 备注                            |
| -- | --------- | ----------------------------- |
| 登录 | Auth0     | Google OAuth、Email Magic Link |
| 支付 | Stripe    | Checkout Session / Webhook    |
| 视频 | Mux       | Web Playback                  |
| 推送 | OneSignal | Web Push                      |
| 邮件 | SendGrid  | 动态模板                          |
| 地图 | Mapbox    | GL JS                         |

---

## 9 非功能需求

* **性能**：首屏 LCP < 2.5 s；Lighthouse ≥ 90
* **可用性**：API 月可用 ≥ 99.5 %
* **安全**：PCI‑DSS SAQ‑A；JWT RS256
* **SEO**：SSR + OpenGraph

---

## 10 MVP 验收标准（R1）

1. 登录：Google & 邮箱均成功；JWT 可刷新
2. 预约 & 支付：从创建到成功回调完整
3. 训练记录：上传 & 播放
4. 社区：发帖、点赞、审核
5. 商城：下单、邮件通知、订单查询

---

## 11 里程碑（R1）

| 周    | 交付               | 说明              |
| ---- | ---------------- | --------------- |
|  W0  | Kickoff          | Repo & CI/CD    |
|  W2  | 设计稿 & API 冻结     | Figma / Swagger |
|  W4  | Auth + Studio 列表 | 浏览门店 & 登录       |
|  W6  | 课程预约 + Stripe    | 基线链路 OK         |
|  W8  | 训练记录 + 社区 α      | 视频上传 & Feed     |
|  W9  | Admin α          | 只读列表            |
|  W10 | Shop + Cart      | 电商链路 OK         |
|  W12 | Admin β          | 审核 & 商品 CRUD    |
|  W14 | Beta 公测          | 50 用户；性能优化      |
|  W16 | 正式上线             | 含 Admin v1.0    |

---

## 12 附录：R2 (IoT 扩展) 概览

* 蓝牙门锁 + 摄像头；镜面一体机 (Ubuntu + RTX3050)
* 关键流：刷脸注册、自动开门、实时评分 (WebRTC)
* 安全：离线密码、边缘计算

*R2 详规将在 R1 上线前 4 周启动撰写。*

---

> 如需进一步调整，请在 Canvas 或 GitHub Issues 留言。

