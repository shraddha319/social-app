import styled from 'styled-components';
import tw from 'twin.macro';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, Posts, IconButton, EditProfile } from './components';
import {
  Feed,
  Profile,
  Notifications,
  Bookmarks,
  Home,
  Login,
  Signup,
} from './pages';
import { ArrowBack } from './assets/icons';
import './App.css';

const AppLayout = styled.div`
  ${tw`mx-auto grid grid-cols-4`}
  width: 1200px;
`;

const Main = styled.div`
  ${tw`col-span-2 h-full overflow-y-scroll `}
`;

const TopBar = styled.div`
  ${tw`w-full sticky top-0 h-12 p-4 text-lg bg-white shadow flex items-center space-x-4 font-medium z-10`}
`;

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <AppLayout>
        <Sidebar styles="col-span-1" />
        <Main className="no-scrollbar">
          <TopBar>
            {location.pathname !== '/feed' && (
              <>
                <IconButton
                  onClick={(e) => navigate(-1)}
                  variant="primary"
                  size="small"
                >
                  <ArrowBack />
                </IconButton>
                <p>
                  {location.pathname.slice(1).charAt(0).toUpperCase() +
                    location.pathname.slice(2)}
                </p>
              </>
            )}
          </TopBar>
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="" element={<Posts />} />
              <Route path="media" element={<Posts />} />
              <Route path="likes" element={<Posts />} />
              <Route path="bookmarks" element={<Posts />} />
            </Route>
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
          {query.get('action') === 'edit' && (
            <Route path="/" element={<EditProfile />} />
          )}
        </Main>
        <div className="col-span-1">Side</div>
      </AppLayout>
    </Routes>
  );
}
