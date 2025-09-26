import Link from 'next/link';

export default function ListenOnlineNotFound() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-[#023E8A]">Passage Not Found</h1>
      <p className="text-gray-600 mb-6">
        We couldn&apos;t locate that Bible book or chapter. It may be an invalid reference or not yet available.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/listen-online/Genesis/1" className="bg-[#023E8A] text-white px-5 py-3 rounded-md hover:bg-[#0350b4] transition">
          Go to Genesis 1
        </Link>
        <Link href="/" className="border border-[#023E8A] text-[#023E8A] px-5 py-3 rounded-md hover:bg-[#023E8A] hover:text-white transition">
          Home
        </Link>
      </div>
    </main>
  );
}