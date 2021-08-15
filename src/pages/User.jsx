import { Outlet, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  StyledIcon,
  ListX,
  ListItem,
  ListItemLink,
} from '../components';
import { LocationIcon, LinkIcon } from '../assets/icons';

const user = {
  name: 'Shraddha',
  username: 'shraddha319',
  imageUrl:
    'https://devforum.roblox.com/uploads/default/original/4X/c/e/0/ce087d9a04bba8f904554a3616895f23c4ce67bb.png',
  coverUrl:
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c63a017911987.560b3fc509179.png',
  bio: 'Learning web dev',
  location: 'Bangalore, India',
  website: 'https://twitter.com/SShraddha6',
  joined: '',
  stats: {
    followers: 32,
    following: 30,
  },
};

export default function User() {
  return (
    <div className="h-full relative">
      <div className="w-full">
        <img
          src={user.coverUrl}
          alt="cover"
          className="h-46 w-full object-fit"
        />
      </div>
      <div className="flex justify-between items-end py-4 px-4 absolute right-0 left-0 top-28">
        <Avatar src={user.imageUrl} size="xl3" border />
        <Link to={{ search: '?action=edit' }}>
          <Button as="div" size="tiny" variant="outlinePrimary" rounded>
            Edit profile
          </Button>
        </Link>
      </div>
      <div className="mt-14 py-2 px-4 text-gray-900 space-y-2">
        <p className="space-x-2">
          <span className="text-xl font-medium tracking-wide">{user.name}</span>
          <span className="text-gray-500">{`@${user.username}`}</span>
        </p>
        <p className="text-sm">{user.bio}</p>
        <ul className="flex text-sm text-gray-500 space-x-4">
          <li className="flex">
            <StyledIcon color="disabled" size="xl">
              <LocationIcon />
            </StyledIcon>
            <p>{user.location}</p>
          </li>
          <li className="flex">
            <StyledIcon color="disabled" size="xl">
              <LinkIcon />
            </StyledIcon>
            <a href={user.website}>{user.website}</a>
          </li>
        </ul>
      </div>
      <nav className="my-4 border-b-2 border-gray-200">
        <ListX>
          <ListItem>
            <ListItemLink to="" activeClassName="selected" end>
              Tweets
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="media" activeClassName="selected" end>
              Media
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="likes" activeClassName="selected" end>
              Likes
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="bookmarks" activeClassName="selected" end>
              Bookmarks
            </ListItemLink>
          </ListItem>
        </ListX>
      </nav>
      <Outlet />
    </div>
  );
}
