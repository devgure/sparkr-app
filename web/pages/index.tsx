import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Sparkr - Date Smarter</title>
      </Head>
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-pink-600">Sparkr</h1>
        {session ? (
          <>
            <p>Welcome, {session.user?.name}</p>
            <button onClick={() => signOut()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => signIn('google')} className="mt-4 bg-blue-600 text-white px-6 py-3 rounded">
            Sign in with Google
          </button>
        )}
      </div>
    </>
  );
}