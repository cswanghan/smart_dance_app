# 智能舞房 Web 版 (R1) - API 接口规范 (草稿)

本文件作为 R1 阶段核心 API 接口的初步规范，后续将根据实际开发和后端实现进行详细补充和完善，最终可能迁移至 Swagger/OpenAPI 文档。

---

## 认证相关

- `GET /auth/providers`
  - **描述**: 获取支持的认证提供商列表。
  - **认证**: 无需认证。
  - **响应**: `[{ id: string, name: string, type: string }]`

- `POST /oauth/google`
  - **描述**: Google OAuth 登录/注册回调。
  - **认证**: 无需认证。
  - **请求体**: Auth0 返回的授权码。
  - **响应**: `JWT`
- `POST /oauth/email_link`
  - **描述**: 邮箱魔法链接登录/注册。
  - **认证**: 无需认证。
  - **请求体**: `{ email: string }`
  - **响应**: `{ message: string }`

## 用户相关

- `GET /user/profile`
  - **描述**: 获取当前用户资料。
  - **认证**: 需要 JWT。
  - **响应**: `{ id: string, name: string, email: string, ... }`

## 门店与课程

- `GET /studios?cursor=<string>&limit=<number>`
  - **描述**: 获取门店列表，支持分页。
  - **认证**: 可选 JWT。
  - **查询参数**: `cursor` (用于分页), `limit` (每页数量)。
  - **响应**: `{ data: Studio[], nextCursor?: string }`

- `GET /lessons?date=<YYYY-MM-DD>&studioId=<string>`
  - **描述**: 获取指定门店和日期的课程列表。
  - **认证**: 可选 JWT。
  - **查询参数**: `date`, `studioId`。
  - **响应**: `{ data: Lesson[] }`

## 预约与支付

- `POST /bookings`
  - **描述**: 创建课程预约。
  - **认证**: 需要 JWT。
  - **请求体**: `{ lessonId: string, userId: string, ... }`
  - **响应**: `{ bookingId: string, status: "pending" }`

- `POST /payment_intents`
  - **描述**: 处理支付意图（Stripe）。
  - **认证**: 需要 JWT。
  - **请求体**: `{ bookingId: string, paymentMethodId: string, ... }`
  - **响应**: `{ clientSecret: string, status: string }`

## 训练记录

- `GET /records/:id`
  - **描述**: 获取单个训练记录详情。
  - **认证**: 需要 JWT。
  - **响应**: `{ id: string, videoUrl: string, ... }`

## 社区

- `POST /posts`
  - **描述**: 发布新帖子。
  - **认证**: 需要 JWT。
  - **请求体**: `{ content: string, imageUrls: string[], ... }`
  - **响应**: `{ postId: string, ... }`

## 商城

- `PUT /cart`
  - **描述**: 更新购物车内容。
  - **认证**: 需要 JWT。
  - **请求体**: `{ itemId: string, quantity: number }`
  - **响应**: `{ cart: Cart }`

- `POST /checkout_sessions`
  - **描述**: 创建结账会话（Stripe）。
  - **认证**: 需要 JWT。
  - **请求体**: `{ cartId: string, ... }`
  - **响应**: `{ checkoutUrl: string }`

## 管理后台 (Admin Panel)

- `GET /admin/posts`
  - **描述**: 获取帖子列表（用于审核）。
  - **认证**: 需要管理员 JWT。
  - **响应**: `{ data: Post[], ... }`

- `GET /admin/goods`
  - **描述**: 获取商品列表。
  - **认证**: 需要管理员 JWT。
  - **响应**: `{ data: Product[], ... }`

- `POST /admin/goods`
  - **描述**: 创建新商品。
  - **认证**: 需要管理员 JWT。
  - **请求体**: `{ name: string, price: number, ... }`
  - **响应**: `{ productId: string, ... }`

- `PUT /admin/goods/:id`
  - **描述**: 更新商品信息。
  - **认证**: 需要管理员 JWT。
  - **请求体**: `{ name?: string, price?: number, ... }`
  - **响应**: `{ productId: string, ... }`

- `DELETE /admin/goods/:id`
  - **描述**: 删除商品。
  - **认证**: 需要管理员 JWT。
  - **响应**: `{ message: string }`

- `GET /admin/orders`
  - **描述**: 获取订单列表。
  - **认证**: 需要管理员 JWT。
  - **响应**: `{ data: Order[], ... }`

- `GET /admin/users`
  - **描述**: 获取用户列表（用于权限管理）。
  - **认证**: 需要管理员 JWT。
  - **响应**: `{ data: User[], ... }`
