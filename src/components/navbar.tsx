'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

export function Navbar() {
  const { user, isLoading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-600">智能舞房</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              首页
            </Link>
            <Link
              href="/community"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              社区
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              商城
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile/records"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  训练记录
                </Link>
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  管理后台
                </Link>
                <div className="flex items-center space-x-2">
                  <img
                    src={user.picture || '/default-avatar.png'}
                    alt={user.name || '用户'}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                <a
                  href="/api/auth/logout"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  登出
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {isLoading ? (
                  <span className="text-gray-500">加载中...</span>
                ) : (
                  <a
                    href="/api/auth/login"
                    className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    登录 / 注册
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                社区
              </Link>
              <Link
                href="/shop"
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                商城
              </Link>
              
              {user ? (
                <>
                  <Link
                    href="/profile/records"
                    className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    训练记录
                  </Link>
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    管理后台
                  </Link>
                  <div className="px-3 py-2 border-t">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={user.picture || '/default-avatar.png'}
                        alt={user.name || '用户'}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{user.name}</span>
                    </div>
                    <a
                      href="/api/auth/logout"
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors block text-center"
                    >
                      登出
                    </a>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 border-t">
                  {isLoading ? (
                    <span className="text-gray-500">加载中...</span>
                  ) : (
                    <a
                      href="/api/auth/login"
                      className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors block text-center"
                    >
                      登录 / 注册
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}