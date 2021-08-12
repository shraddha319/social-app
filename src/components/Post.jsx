import { Avatar, IconButton, FallbackAvatar } from './shared';
import {
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  CommentIcon,
} from '../assets/icons';

export default function Post({ user, content, stats }) {
  return (
    <div className="space-y-2 py-4">
      <div className="flex items-center px-2">
        <div className="px-2">
          {user.imageUrl ? (
            <Avatar src={user.imageUrl} alt="shraddha" size="small" />
          ) : (
            <FallbackAvatar size="small">{user.name[0]}</FallbackAvatar>
          )}
        </div>
        <div className="p-1">
          <p className="space-x-1">
            <a
              href={`/user/${user.username}`}
              className="text-lg tracking-wide font-medium"
            >
              {user.name}
            </a>
            <span className="text-gray-500">{`@${user.username}`}</span>
          </p>
          <p className="text-gray-500">3h ago</p>
        </div>
      </div>
      <div className="space-y-2">
        {content?.text && <p className="p-2">{content.text}</p>}
        {content?.imageUrl && (
          <img src={content.imageUrl} alt={user.username} className="w-full" />
        )}
      </div>
      <ul className="flex justify-between px-4">
        <li className="flex space-x-1 items-center">
          <IconButton size="medium" variant="primary">
            <HeartIcon />
          </IconButton>
          <p className="label text-sm text-gray-500">{stats.likes}</p>
        </li>
        <li className="flex space-x-1 items-center">
          <IconButton size="medium" variant="primary">
            <CommentIcon />
          </IconButton>
          <p className="label text-sm text-gray-500">{stats.comments}</p>
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
