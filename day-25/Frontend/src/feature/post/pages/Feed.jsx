import Post from "../components/Post";
import "../style/feed.scss";

import { useEffect } from "react";

import { usePost } from "../hooks/usePost";

const Feed = () => {

  const { feed, handleGetFeed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

   

  if (loading || !feed){
    return (<main><h1>Feed is loading...</h1></main>)
   }

     console.log(feed)
    

     

  
  return (
    <main className="feed-page">
      <div className="feed">
         {feed.map(post=>{
            return < Post user={post.user} post={post} />
         })}
      </div>
    </main>
  );
};

export default Feed;
