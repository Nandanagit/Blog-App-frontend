'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type TabType = 'posts' | 'users';

interface Post {
  id: string;
  title: string;
  body: string;
  authorId: string;
  createdat: string;
  // Add other post properties as needed
}

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  // Add other user properties as needed
}

interface NewPostData {
  title: string;
  body: string;
}

interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}
export default function AdminHomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newPost, setNewPost] = useState<NewPostData>({ title: '', body: '' });
  const [userUpdates, setUserUpdates] = useState<UpdateUserData>({id:''});

  // Fetch all posts
  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await fetch('https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/admin/posts', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
        },
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    }
  };

  // Create a new post
  const createPost = async (postData: NewPostData): Promise<void> => {
    try {
      const response = await fetch('https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/admin/post', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('Failed to create post');
      await fetchPosts();
      setIsCreatePostModalOpen(false);
      setNewPost({ title: '', body: '' });
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    }
  };

  // Update an existing post
  const updatePost = async (postId: string, updates: { title: string; body: string }): Promise<void> => {
    try {
      const response = await fetch(`https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/admin/post/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update post');
      await fetchPosts();
      setEditingPost(null);
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post');
    }
  };

  // Delete a post
  const deletePost = async (postId: string): Promise<void> => {
    try {
                          await fetch(`https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/admin/post/${postId}`, {
                            method: 'DELETE',
                            headers: {
                              'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
                              'Content-Type': 'application/json',
                            },
                          });
                          setPosts(prev => prev.filter(b => b.id !== postId));
                        } catch (err) {
                          alert('Failed to delete post');
                        }
  };

  // Fetch all users
  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch('https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/admin/users', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      console.log("data",data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    }
  };

  // Update user
  const updateUser = async (_: string, updates: UpdateUserData): Promise<void> => {
    try {
      const response = await fetch(`https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/admin/user/${updates.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update user');
      
      await fetchUsers();
      setEditingUser(null);
      setUserUpdates({id:''});
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    }
  };

  // Delete user
  const deleteUser = async (_id: string): Promise<void> => {
    try {
      const response = await fetch(`https://blog-app-backend-gov349cdq-nandanas-projects-c6b2e22a.vercel.app/api/admin/user/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete user');
      
      setUsers(users.filter(user => user._id !== _id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([fetchPosts(), fetchUsers()]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission for creating/editing posts
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      await updatePost(editingPost.id, { title: newPost.title, body: newPost.body });
      setIsCreatePostModalOpen(false);
      setEditingPost(null);
      setNewPost({ title: '', body: '' });
    } else {
      await createPost(newPost);
    }
  };

  // Handle form submission for editing users
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser && userUpdates) {
      await updateUser(editingUser._id, userUpdates);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Posts
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Users
            </button>
          </nav>
        </div>

 {/* Posts Tab */}
{activeTab === 'posts' && (
  <div className="bg-white shadow rounded-lg p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-black font-semibold">Manage Posts</h2>
      <button
        onClick={() => {
          setEditingPost(null);
          setNewPost({ title: '', body: '' });
          setIsCreatePostModalOpen(true);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create New Post
      </button>
    </div>

    {posts.length === 0 ? (
      <p className="text-gray-500">No posts found.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => {
              const author = users.find(user => user._id === post.authorId);
              return (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{post.body}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{author?.name || 'Unknown'}</div>
                    <div className="text-xs text-gray-500">{author?.email || ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdat).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setNewPost({
                          title: post.title,
                          body: post.body,
                        });
                        setIsCreatePostModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post?')) {
                          deletePost(post.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-black font-semibold mb-6">Manage Users</h2>
            
            {users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.isAdmin
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setUserUpdates({
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                isAdmin: user.isAdmin,
                              });
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          {!user.isAdmin && (
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this user?')) {
                                  deleteUser(user._id);
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Post Modal */}
        {(isCreatePostModalOpen || editingPost) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-black">{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
                <button
                  onClick={() => {
                    setIsCreatePostModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handlePostSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-black mb-1">
                    Content
                  </label>
                  <textarea
                    id="body"
                    rows={6}
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatePostModalOpen(false);
                      setEditingPost(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
            </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-black font-medium">Edit User</h3>
                <button
                  onClick={() => setEditingUser(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUserSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userUpdates.name || ''}
                    onChange={(e) => setUserUpdates({ ...userUpdates, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userUpdates.email || ''}
                    onChange={(e) => setUserUpdates({ ...userUpdates, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAdmin"
                      checked={userUpdates.isAdmin || false}
                      onChange={(e) => setUserUpdates({ ...userUpdates, isAdmin: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
                      Administrator
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
