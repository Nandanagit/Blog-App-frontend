'use client';
import React, { useState } from "react";
import { useEffect } from "react";

interface Blog {
  id: number;
  title: string;
  body: string;
  author: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfilePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User>({
    id: 1,
    name: '',
    email: '',
  });
  const [editingUser, setEditingUser] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [editedBlog, setEditedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
    const username = localStorage.getItem('name');
      if (!username) return;
      try {
        const res = await fetch(`https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/auth/profile`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
     const username = localStorage.getItem('name');
      if (!username) return;
      try {
        const res = await fetch(`http://localhost:7000/posts/author/${username}`, {
           headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogSave = async (id: number) => {
    const username = localStorage.getItem('name');
    if (!username) return;
    try {
      const res = await fetch(`http://localhost:7000/posts/update/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBlog),
      });
      if (!res.ok) throw new Error('Failed to update user');
      const data = await res.json();
      setEditingBlogId(null);
      setEditedBlog(null);
      setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...editedBlog } : b));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleUserSave = (id: number) => {
    
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 space-y-8">
      {/* USER PROFILE CARD */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">User Profile</h3>
          {!editingUser ? (
            <button
              className="px-3 py-2 text-sm border border-gray-300 text-black rounded-md hover:bg-gray-50 flex items-center gap-1"
              onClick={() => setEditingUser(true)}
            >
              ✏️ Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="px-3 py-2 text-sm bg-blue-600 text-black rounded-md hover:bg-blue-700 flex items-center gap-1"
                onClick={() => handleUserSave(user.id)}
              >
                💾 Save
              </button>
              <button
                className="px-3 py-2 text-sm bg-red-600 text-black rounded-md hover:bg-red-700 flex items-center gap-1"
                onClick={() => setEditingUser(false)}
              >
                ✕ Cancel
              </button>
            </div>
          )}
        </div>
        <div className="p-6 space-y-3">
          {editingUser ? (
            <>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
              
            </>
          ) : (
            <div className="space-y-1">
              <p className="text-gray-700">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              
            </div>
          )}
        </div>
      </div>

      {/* BLOGS SECTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">User Blogs</h2>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {blog.title}
                </h3>
                {editingBlogId !== blog.id ? (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 text-sm border border-gray-300 text-black rounded-md hover:bg-gray-50 flex items-center gap-1"
                      onClick={() => {
                        setEditingBlogId(blog.id);
                        setEditedBlog(blog);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="px-3 py-2 text-sm bg-red-500 text-black rounded-md hover:bg-red-700 flex items-center gap-1"
                      onClick={async () => {
                        try {
                          await fetch(`http://localhost:7000/posts/delete/${blog.id}`, {
                            method: 'DELETE',
                            headers: {
                              'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
                              'Content-Type': 'application/json',
                            },
                          });
                          setBlogs(prev => prev.filter(b => b.id !== blog.id));
                        } catch (err) {
                          alert('Failed to delete post');
                        }
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 text-sm bg-blue-600 text-black rounded-md hover:bg-blue-700 flex items-center gap-1"
                      onClick={() => handleBlogSave(blog.id)}
                    >
                      💾 Save
                    </button>
                    <button
                      className="px-3 py-2 text-sm bg-red-600 text-black rounded-md hover:bg-red-700 flex items-center gap-1"
                      onClick={() => setEditingBlogId(null)}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6">
                {editingBlogId === blog.id && editedBlog ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedBlog.title}
                      onChange={(e) =>
                        setEditedBlog({ ...editedBlog, title: e.target.value })
                      }
                    />
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                      value={editedBlog.body}
                      onChange={(e) =>
                        setEditedBlog({ ...editedBlog, body: e.target.value })
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-700">{blog.body}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;