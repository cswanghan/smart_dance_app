# 智能舞房 Web 版 (Smart Dance App)

一个基于 Next.js 的智能舞房平台，提供课程预约、社区交流、商城购物和管理后台等功能。

## 🌟 功能特色

### 核心功能
- **课程预约**: 门店浏览、课程日历、在线预约
- **用户认证**: 基于 Auth0 的 Google OAuth 和邮箱登录
- **支付系统**: 集成 Stripe 的安全支付流程
- **训练记录**: 上传和管理个人训练视频
- **社区平台**: 发帖、点赞、瀑布流社交体验
- **电商商城**: 商品购买、购物车、订单管理
- **管理后台**: 内容审核、商品管理、用户管理

### 技术亮点
- **响应式设计**: 适配桌面端和移动端
- **无限滚动**: 优化大数据列表性能
- **实时更新**: 使用 SWR 实现数据同步
- **视频处理**: 集成 Mux 视频上传和播放
- **类型安全**: 完整的 TypeScript 支持

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/cswanghan/smart_dance_app.git
   cd smart_dance_app
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   
   创建 `.env.local` 文件并配置以下环境变量：
   ```env
   # Auth0 配置
   AUTH0_SECRET='your-auth0-secret'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
   AUTH0_CLIENT_ID='your-client-id'
   AUTH0_CLIENT_SECRET='your-client-secret'

   # Stripe 配置
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY='pk_test_...'
   STRIPE_SECRET_KEY='sk_test_...'

   # 其他配置
   NEXT_PUBLIC_API_URL='http://localhost:3000/api'
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

   应用将在 [http://localhost:3000](http://localhost:3000) 启动

## 📦 项目结构

```
smart_dance_app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # 管理后台页面
│   │   ├── api/               # API 路由
│   │   ├── community/         # 社区页面
│   │   ├── profile/           # 用户资料页面
│   │   ├── shop/              # 商城页面
│   │   └── studio/            # 门店页面
│   ├── components/            # 可复用组件
│   ├── hooks/                 # 自定义 React Hooks
│   ├── lib/                   # 工具函数
│   └── types/                 # TypeScript 类型定义
├── docs/                      # 项目文档
├── reference/                 # 设计稿和参考资料
├── PLAN.md                    # 项目执行计划
└── README.md                  # 项目说明文档
```

## 🛠 技术栈

### 前端技术
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: SWR (数据获取)
- **UI 组件**: 自定义组件 + Tailwind

### 后端技术
- **API**: Next.js API Routes
- **认证**: Auth0
- **支付**: Stripe
- **视频**: Mux (计划中)

### 开发工具
- **构建工具**: Next.js 内置
- **代码检查**: ESLint
- **包管理**: npm
- **版本控制**: Git

## 📱 页面导航

### 用户端
- **首页** (`/`) - 门店列表和推荐
- **门店详情** (`/studio/[id]`) - 课程日历和预约
- **个人资料** (`/profile`) - 用户信息和训练记录
- **社区** (`/community`) - 社交动态和发帖
- **商城** (`/shop`) - 商品浏览和购买
- **反馈** (`/feedback`) - 用户反馈提交

### 管理端
- **管理面板** (`/admin`) - 数据总览
- **用户管理** (`/admin/users`) - 用户列表和权限
- **订单管理** (`/admin/orders`) - 订单查看和处理
- **商品管理** (`/admin/goods`) - 商品 CRUD 操作
- **内容管理** (`/admin/posts`) - 帖子审核和管理

## 🔧 开发指南

### 可用脚本

```bash
# 开发模式
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

### API 接口

项目 API 遵循 RESTful 设计原则，详细接口文档请参考 [`docs/api-spec.md`](./docs/api-spec.md)

### 环境变量

完整的环境变量配置说明：

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `AUTH0_SECRET` | Auth0 会话密钥 | ✅ |
| `AUTH0_BASE_URL` | 应用基础 URL | ✅ |
| `AUTH0_ISSUER_BASE_URL` | Auth0 域名 | ✅ |
| `AUTH0_CLIENT_ID` | Auth0 客户端 ID | ✅ |
| `AUTH0_CLIENT_SECRET` | Auth0 客户端密钥 | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公钥 | ✅ |
| `STRIPE_SECRET_KEY` | Stripe 私钥 | ✅ |

## 🚢 部署

### Vercel 部署 (推荐)

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 一键部署

### Docker 部署

```bash
# 构建镜像
docker build -t smart-dance-app .

# 运行容器
docker run -p 3000:3000 smart-dance-app
```

## 📋 开发进度

详细的开发计划和进度追踪请查看 [`PLAN.md`](./PLAN.md)

当前阶段: **第五阶段 - 测试与上线** ✅

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件

## 📞 联系方式

- **项目作者**: Han Wang
- **GitHub**: [@cswanghan](https://github.com/cswanghan)
- **项目链接**: [https://github.com/cswanghan/smart_dance_app](https://github.com/cswanghan/smart_dance_app)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师！

---

**智能舞房 Web 版** - 让舞蹈学习更智能，让社区连接更紧密 💃🕺