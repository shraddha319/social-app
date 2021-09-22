import { Avatar, IconButton, FallbackAvatar } from './shared';
import {
  ShareIcon,
  BookmarkIcon,
  CommentIcon,
  HeartSolid,
  HeartOutline,
} from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';

export default function Post({ _id, user: author, content, likes, comments }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isPostLiked = (likes, userId) => {
    return likes.findIndex((user) => String(user) === String(userId)) === -1
      ? false
      : true;
  };

  const likeHandler = () => {
    const type = isPostLiked(likes, user._id) ? 'dislike' : 'like';
    dispatch(likePost({ postId: _id, type }));
  };

  return (
    <div className="space-y-2 py-4">
      <div className="flex items-center px-2">
        <div className="px-2">
          {author?.imageUrl ? (
            <Avatar src={author?.imageUrl} alt="shraddha" size="small" />
          ) : (
            <FallbackAvatar size="small">{author.username[0]}</FallbackAvatar>
          )}
        </div>
        <div className="p-1">
          <p className="space-x-1">
            <a
              href={`/${author.username}`}
              className="text-lg tracking-wide font-medium"
            >
              {author?.name}
            </a>
            <span className="text-gray-500">{`@${author.username}`}</span>
          </p>
          <p className="text-gray-500">3h ago</p>
        </div>
      </div>
      <Link to={`/feed/${_id}`} className="space-y-2">
        {content?.text && <p className="p-2">{content.text}</p>}
        {content?.imageUrl && (
          <img
            src={content.imageUrl}
            alt={author.username}
            className="w-full"
          />
        )}
      </Link>
      <ul className="flex justify-between px-4">
        <li className="flex space-x-1 items-center">
          <IconButton onClick={likeHandler} size="medium" variant="secondary">
            {isPostLiked(likes, user._id) ? <HeartSolid /> : <HeartOutline />}
          </IconButton>
          {likes.length > 0 && (
            <p className="label text-sm text-gray-500">{likes.length}</p>
          )}
        </li>
        <li className="flex space-x-1 items-center">
          <IconButton size="medium" variant="primary">
            <CommentIcon />
          </IconButton>
          {comments.length > 0 && (
            <p className="label text-sm text-gray-500">{comments.length}</p>
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
    </div>
  );
}
