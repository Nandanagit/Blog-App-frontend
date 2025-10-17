'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Post {
    id: string;
    title: string;
    body: string;
    author: string;
}

const PostPage = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        
        console.log("hiiii",id);
        if (!id) return;
        const fetchPost = async () => {
            const res = await fetch(`http://localhost:7000/posts/${id}`, {
              headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt_token'),
                'Content-Type': 'application/json',
              },
            });
            if (!res.ok) throw new Error('Failed to fetch post');
            const data = await res.json();
            setPost(data);
        };
        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>by {post.author}</p>
            
        </div>
    );
};

export default PostPage;        