import React, { useEffect, useState } from 'react';
import { SideNavigation } from '@cloudscape-design/components';
import { fetchBoardItems } from '../api/board';
import BoardContainer from './BoardContainer';

function Home() {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const loadPopularPosts = async () => {
      const items = await fetchBoardItems();
      const sortedItems = items.sort((a, b) => b.likes - a.likes).slice(0, 5);
      setPopularPosts(sortedItems);
    };

    loadPopularPosts();

    // 20초마다 인기 게시글 업데이트
    const intervalId = setInterval(loadPopularPosts, 20000);

    // 컴포넌트가 언마운트될 때 인터벌 클리어
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideNavigation
        header={{ text: '인기 게시글', href: '#' }}
        items={popularPosts.map((post, index) => ({
          type: 'link',
          text: `${index + 1}. ${post.title} (좋아요: ${post.likes})`,
          href: `#${post.bidx}`
        }))}
      />
      <div style={{ flex: 1 }}>
        <BoardContainer updatePopularPosts={() => {}} />
      </div>
    </div>
  );
}

export default Home;