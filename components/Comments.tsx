'use client';
import { useState, useEffect } from 'react';

export function CommentsSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const isAdmin = true;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const handleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  useEffect(() => {
    const savedName = localStorage.getItem('commentAuthorName');
    if (savedName) setAuthorName(savedName);
  }, []);

  useEffect(() => {
    fetch(`/api/v1/blog/${slug}/comments`)
      .then(res => res.json())
      .then(data => setComments(data || []));
  }, [slug]);

  const handleSubmit = async () => {
    if (!authorName.trim() || !commentText.trim()) return;
    setLoading(true);
    localStorage.setItem('commentAuthorName', authorName);
    await fetch(`/api/v1/blog/${slug}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author_name: authorName, comment: commentText, parent_id: null }),
    });
    setCommentText('');
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    const res = await fetch(`/api/v1/blog/${slug}/comments`);
    setComments(await res.json());
  };

  const handleReplySubmit = async (parentId: string) => {
    if (!authorName.trim() || !replyText.trim()) return;
    await fetch(`/api/v1/blog/${slug}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author_name: authorName,
        comment: replyText,
        parent_id: parentId,
      }),
    });
    setReplyText('');
    setReplyTo(null);
    const res = await fetch(`/api/v1/blog/${slug}/comments`);
    setComments(await res.json());
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this comment?')) return;
    await fetch(`/api/v1/blog/comments/${id}`, {
      method: 'DELETE',
    });
    const res = await fetch(`/api/v1/blog/${slug}/comments`);
    setComments(await res.json());
  };

  return (
    <section className="max-w-3xl mx-auto mt-12 px-4">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <input
        type="text"
        placeholder="Your name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-2"
      />
      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-2"
        rows={4}
        placeholder="Write your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#1a4b8c] text-white px-4 py-2 rounded"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
      {success && <p className="text-green-600 mt-2">Thanks for commenting!</p>}

      <div className="mt-6">
        {comments
          .filter(c => !c.parent_id)
          .map((c, idx) => (
            <div key={idx} className="mb-4 border-b pb-2">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white mr-2">
                  {getInitials(c.author_name)}
                </div>
                <p className="font-bold text-gray-700">{c.author_name}
                </p>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 text-sm ml-4"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-600">{c.comment}</p>
              {c.created_at && (
                <p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</p>
              )}
              <button
                onClick={() => handleLike(c.id)}
                className="text-blue-600 text-sm mt-1 mr-2"
              >
                👍 {likes[c.id] || 0}
              </button>
              <button
                onClick={() => setReplyTo(c.id)}
                className="text-blue-600 text-sm mt-1"
              >
                Reply
              </button>

              {replyTo === c.id && (
                <div className="mt-2">
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    rows={2}
                    placeholder="Write your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    onClick={() => handleReplySubmit(c.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Post Reply
                  </button>
                </div>
              )}

              {comments
                .filter(r => r.parent_id === c.id)
                .map((r, rIdx) => (
                  <div key={rIdx} className="ml-6 mt-2 border-l pl-4 border-gray-300">
                    <div className="flex items-center mb-1">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white mr-2">
                        {getInitials(r.author_name)}
                      </div>
                      <p className="font-bold text-gray-700">{r.author_name}
                      </p>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-red-600 text-xs ml-4"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600">{r.comment}</p>
                    {r.created_at && (
                      <p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</p>
                    )}
                    <button
                      onClick={() => handleLike(r.id)}
                      className="text-blue-600 text-xs mt-1 mr-2"
                    >
                      👍 {likes[r.id] || 0}
                    </button>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </section>
  );
}