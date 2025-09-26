import type { Metadata } from 'next';
import SearchClient from './search-client'; // .tsx extension not required but ensure path exists

export const metadata: Metadata = {
  title: 'Search Yoruba & English Bible | DaBible Foundation',
  description: 'Search the Yoruba Audio Bible with parallel English text by verse and phrase.',
  robots: { index: true, follow: true }
};

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Search the Bible (Yoruba / English)</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Type a word or phrase in Yoruba or English. Results show verses containing all search terms. Yoruba shown first with English parallel.</p>
      <SearchClient />
    </div>
  );
}
