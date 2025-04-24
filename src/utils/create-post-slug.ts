import { postService } from "@services/post.service";
import slugify from "slugify";

const createPostSlug = async (title: string) => {
  let newSlug = slugify(title);
  let keepTrying = true;
  let postCount = 1;

  while (keepTrying) {
    const post = await postService.getPostBySlug(newSlug);
    if (!post) {
      keepTrying = false;
    } else {
      newSlug = slugify(`${title} ${++postCount}`);
    }
  }
  return newSlug;
};

export { createPostSlug };
