'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ParticleBackground from "../../../../components/ParticleBackground";

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
            const res = await fetch(`http://localhost:7000/posts/id/${id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!res.ok) throw new Error('Failed to fetch post');
            const data = await res.json();
            setPost(data);
        };
        fetchPost();
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen relative bg-black text-white overflow-hidden">
                <ParticleBackground />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-black overflow-hidden">
            <ParticleBackground />
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-full flex flex-col items-center gap-10 px-4">
                    <div className="w-full max-w-4xl bg-rose-100 py-3 text-center">
                        <h2 className="text-lg font-semibold text-black truncate">{post.title}</h2>
                    </div>

                    <div className="w-full max-w-4xl bg-rose-100 min-h-[60vh] p-8 flex flex-col">
                        <p className="text-base text-black mb-6 break-words whitespace-pre-wrap">{post.body}</p>
                        <p className="mt-auto text-sm text-right text-black">by {post.author}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPage;