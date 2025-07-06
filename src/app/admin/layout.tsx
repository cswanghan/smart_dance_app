import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/posts" className="block py-2 px-3 rounded hover:bg-gray-700">
                帖子管理
              </Link>
            </li>
            <li>
              <Link href="/admin/goods" className="block py-2 px-3 rounded hover:bg-gray-700">
                商品管理
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="block py-2 px-3 rounded hover:bg-gray-700">
                订单管理
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block py-2 px-3 rounded hover:bg-gray-700">
                用户管理
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
