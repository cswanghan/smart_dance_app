'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">智能舞房</h1>
      
      {!user && (
        <a href="/api/auth/login" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Log In
        </a>
      )}

      {user && (
        <div className="text-center">
          <h2 className="text-2xl">Welcome, {user.name}!</h2>
          <p className="mb-4">{user.email}</p>
          <a href="/api/auth/logout" className="px-4 py-2 bg-red-600 text-white rounded-md">
            Log Out
          </a>
        </div>
      )}
    </main>
  );
}
