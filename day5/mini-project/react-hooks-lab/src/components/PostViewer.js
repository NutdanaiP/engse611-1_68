import React, { useState, useEffect } from 'react';

function PostViewer() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postId = 1; // สมมติว่าเราต้องการดึง post ที่ 1

  useEffect(() => {
    // 1. ฟังก์ชัน Effect ที่จะทำงาน
    console.log('Effect is running!');
    setLoading(true); // เริ่มโหลด

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPost(data); // 2. ได้ข้อมูลแล้ว -> อัปเดต state
        setError(null);
      })
      .catch(error => {
        setError(error.message); // 3. เกิด Error -> อัปเดต state
        setPost(null);
      })
      .finally(() => {
        setLoading(false); // 4. ไม่ว่าจะสำเร็จหรือล้มเหลว -> หยุดโหลด
      });
      
  }, [postId]); // 5. Dependency array

  // 6. แสดงผลตามสถานะต่างๆ
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Lab 2.1: Fetching Data</h2>
      {post && (
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      )}
    </div>
  );
}

export default PostViewer;