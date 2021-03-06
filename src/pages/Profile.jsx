import { Outlet, Link, useParams, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  StyledIcon,
  ListX,
  ListItem,
  ListItemLink,
} from '../components';
import { LocationIcon, LinkIcon } from '../assets/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../features/user/userAPI';
import { resetAuth } from '../features/auth/authSlice';
import { resetUser } from '../features/user/userSlice';
import { resetPosts } from '../features/posts/postsSlice';
import API from '../features/api.config';

const fakeUser = {
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

export default function Profile() {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem('authToken');
    delete API.defaults.headers.common['Authorization'];
    navigate('/');
    dispatch(resetAuth());
    dispatch(resetUser());
    dispatch(resetPosts());
  }

  useEffect(() => {
    (async () => {
      if (user && user.username === username) {
        setProfile(user);
        return;
      }
      setLoader(true);
      try {
        const {
          data: {
            data: { user },
          },
          status,
        } = await getUserByUsername(username);
        if (status === 200) setProfile(user);
      } catch (err) {
        if (err.response) console.log(err.response.data);
      }
      setLoader(false);
    })();
  }, []);

  return (
    <div className="h-full relative">
      {status === 'loading' || loader || !profile ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-full">
            <img
              src={fakeUser.coverUrl}
              alt="cover"
              className="h-46 w-full object-fit"
            />
          </div>
          <div className="flex justify-between items-end py-4 px-4 absolute right-0 left-0 top-28">
            <Avatar src={fakeUser.imageUrl} size="xl3" border />
          </div>
          <div className="mt-14 py-2 px-4 text-gray-900 space-y-2 flex justify-between items-center">
            <div>
              <p className="space-x-2">
                <span className="text-xl font-medium tracking-wide">
                  {profile.name}
                </span>
                <span className="text-gray-500">{`@${profile.username}`}</span>
              </p>
              <p className="text-sm">{profile.bio}</p>
              <ul className="flex text-sm text-gray-500 space-x-4">
                {profile.location && (
                  <li className="flex">
                    <StyledIcon color="disabled" size="xl">
                      <LocationIcon />
                    </StyledIcon>
                    <p>{profile.location}</p>
                  </li>
                )}
                {profile.website && (
                  <li className="flex">
                    <StyledIcon color="disabled" size="xl">
                      <LinkIcon />
                    </StyledIcon>
                    <a href={profile.website}>{profile.website}</a>
                  </li>
                )}
              </ul>
            </div>
            <div className="space-y-2">
              <Link to={{ search: '?action=edit' }} className="block">
                <Button as="div" size="tiny" variant="solidPrimary" rounded>
                  Edit profile
                </Button>
              </Link>
              <Button
                onClick={logoutHandler}
                size="tiny"
                variant="outlinePrimary"
                rounded
              >
                Logout
              </Button>
            </div>
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
        </>
      )}
    </div>
  );
}
