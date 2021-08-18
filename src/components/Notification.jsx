import styled from 'styled-components';
import tw from 'twin.macro';
import { Avatar } from './shared';
import { Link } from 'react-router-dom';

export default function Notification({
  notification: { from, kind, content },
}) {
  return (
    <div className="w-full h-32 overflow-hidden px-8 py-2 hover:bg-gray-100">
      <Link to="/">
        <ul className="flex flex-row space-x-2 my-2">
          {from.map((user) => (
            <li>
              <Link to={`/user/${user.username}`}>
                <Avatar size="tiny" src={user.imageUrl} />
              </Link>
            </li>
          ))}
        </ul>
        <p>
          {kind === 'post'
            ? `${from[0].name} added a new post.`
            : `${from[0].name} and ${
                from.length - 1
              } other started following you.`}
        </p>
        {kind === 'post' && (
          <p className="mt-2 text-sm text-gray-500 overflow-hidden">
            {content.text}
          </p>
        )}
      </Link>
    </div>
  );
}
