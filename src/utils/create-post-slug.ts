import { postService } from "@services/post.service";
import slug from "slug";

const createPostSlug = async (title: string) => {
  let newSlug = slug(title);
  let keepTrying = true;
  let postCount = 1;

  while (keepTrying) {
    const post = await postService.getPostBySlug(newSlug);
    if (!post) {
      keepTrying = false;
    } else {
      newSlug = slug(`${title} ${++postCount}`);
    }
  }
  return newSlug;
};

export { createPostSlug };
