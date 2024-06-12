import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Posts";
import { postsData } from "@/data";

export default function Home() {
  console.log(postsData);
  return (
    <>
      <CategoriesList />
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            authorEmail={"test@email.com"}
            date={post.datepublished}
            thumbnail={post.thumbnail}
            category={post.category}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div>No Posts to be displayed</div>
      )}
    </>
  );
}
