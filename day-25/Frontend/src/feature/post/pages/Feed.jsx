import Post from "../components/Post";
import "../style/feed.scss";

import { useEffect } from "react";

import { usePost } from "../hooks/usePost";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { feed, handleGetFeed, loading , handleLike , handleUnLike } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        {feed.map((post, id) => {
          return <Post key={id} user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />;
        })}
      </div>
    </main>
  );
};

export default Feed;
