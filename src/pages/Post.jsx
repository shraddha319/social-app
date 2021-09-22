import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Loader,
  Avatar,
  IconButton,
  FallbackAvatar,
  Button,
  Input,
  TextArea,
} from '../components';
import {
  ShareIcon,
  BookmarkIcon,
  CommentIcon,
  HeartSolid,
  HeartOutline,
} from '../assets/icons';
import { likePost, commentOnPost } from '../features/posts/postsSlice';
import { getPost } from '../features/posts/postsAPI';
import { useParams } from 'react-router-dom';

export default function Post() {
  const {
    posts: { posts, status },
    user: { user },
  } = useSelector((state) => state);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(posts?.find((post) => post._id === postId));
  const [comment, setComment] = useState('');

  const isPostLiked = (postId, userId) => {
    const { likes } = posts.find((post) => post._id === postId);
    return likes.findIndex((user) => String(user) === String(userId)) === -1
      ? false
      : true;
  };

  const likeHandler = ({ _id }) => {
    const type = isPostLiked(_id, user._id) ? 'dislike' : 'like';
    dispatch(likePost({ postId: post._id, type }));
  };

  const postCommentHandler = () => {
    dispatch(commentOnPost({ postId: post._id, comment }));
    setComment('');
  };

  useEffect(() => {
    (async () => {
      if (post) return;
      try {
        setLoading(true);
        const {
          data: {
            data: { post },
          },
          status,
        } = await getPost(user._id, postId);
        if (status === 200) setPost(post);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [posts, postId, user._id]);

  return loading || status === 'loading' ? (
    <Loader />
  ) : (
    <>
      <div className="space-y-4 py-4">
        <div className="flex items-center px-2">
          <div className="px-2">
            {post.user?.imageUrl ? (
              <Avatar src={post.user?.imageUrl} alt="shraddha" size="small" />
            ) : (
              <FallbackAvatar size="small">
                {post.user.username[0]}
              </FallbackAvatar>
            )}
          </div>
          <div className="p-1">
            <p className="space-x-1">
              <a
                href={`/${post.user.username}`}
                className="text-lg tracking-wide font-medium"
              >
                {post.user?.name}
              </a>
              <span className="text-gray-500">{`@${post.user.username}`}</span>
            </p>
            <p className="text-gray-500">3h ago</p>
          </div>
        </div>
        <div className="space-y-2">
          {post.content?.text && <p className="p-2">{post.content.text}</p>}
          {post.content?.imageUrl && (
            <img
              src={post.content.imageUrl}
              alt={post.user.username}
              className="w-full"
            />
          )}
        </div>
        <ul className="flex m-2 justify-between px-4">
          <li className="flex space-x-1 items-center">
            <IconButton
              onClick={() => likeHandler(post)}
              size="medium"
              variant="secondary"
            >
              {isPostLiked(post._id, user._id) ? (
                <HeartSolid />
              ) : (
                <HeartOutline />
              )}
            </IconButton>
            {posts.find(({ _id }) => _id === post._id).likes.length > 0 && (
              <p className="label text-sm text-gray-500">
                {posts.find(({ _id }) => _id === post._id).likes.length}
              </p>
            )}
          </li>
          <li className="flex space-x-1 items-center">
            <IconButton size="medium" variant="primary">
              <CommentIcon />
            </IconButton>
            {posts.find(({ _id }) => _id === post._id).comments.length > 0 && (
              <p className="label text-sm text-gray-500">
                {posts.find(({ _id }) => _id === post._id).comments.length}
              </p>
            )}
          </li>
          <li>
            <IconButton size="medium" variant="primary">
              <ShareIcon />
            </IconButton>
          </li>
          <li>
            <IconButton size="medium" variant="primary">
              <BookmarkIcon />
            </IconButton>
          </li>
        </ul>
        <div className="my-2 space-y-2">
          {posts
            .find(({ _id }) => _id === post._id)
            .comments.map(({ user, comment }) => (
              <div className="flex">
                <div className="p-3">
                  {user?.imageUrl ? (
                    <Avatar src={user?.imageUrl} alt="shraddha" size="small" />
                  ) : (
                    <FallbackAvatar size="small">
                      {user.username[0]}
                    </FallbackAvatar>
                  )}
                </div>
                <div className="flex-grow flex flex-col px-1 divide-y-2">
                  <TextArea>
                    <textarea
                      disabled
                      id="bio"
                      value={comment}
                      name="bio"
                    ></textarea>
                  </TextArea>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex mt-4">
        <div className="p-3">
          {user?.imageUrl ? (
            <Avatar src={user?.imageUrl} alt="shraddha" size="small" />
          ) : (
            <FallbackAvatar size="small">{user.username[0]}</FallbackAvatar>
          )}
        </div>
        <div className="flex-grow flex flex-col px-1 divide-y-2">
          <TextArea>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="bio"
              name="bio"
              rows="2"
            ></textarea>
          </TextArea>
          <div className="flex items-center justify-end px-1 py-2">
            <Button
              rounded
              variant="solidPrimary"
              size="small"
              disabled={comment.length === 0}
              onClick={postCommentHandler}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
