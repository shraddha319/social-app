import styled from 'styled-components';
import tw from 'twin.macro';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import {
  Sidebar,
  Posts,
  IconButton,
  EditProfile,
  ComposeTweet,
  PrivateRoute,
  Loader,
  ScrollToTop,
} from './components';
import {
  Feed,
  Profile,
  Notifications,
  Bookmarks,
  Home,
  Login,
  Signup,
  Post,
} from './pages';
import { ArrowBack } from './assets/icons';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './features/auth/authSlice';

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

function HomeRoute({ path, ...props }) {
  const { token } = useSelector((state) => state.auth);

  return !token ? <Route {...props} /> : <Navigate replace to="/feed" />;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(loginUser({ authToken: token }));
    }
  }, []);

  function Layout({ children }) {
    return (
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
          {children}
        </Main>
      </AppLayout>
    );
  }

  return auth.status === 'loading' || !user ? (
    <Loader />
  ) : (
    <ScrollToTop>
      <Routes>
        <HomeRoute path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <PrivateRoute
          path="/feed"
          element={
            <Layout>
              <Feed />
            </Layout>
          }
        />
        <PrivateRoute
          path="/feed/:postId"
          element={
            <Layout>
              <Post />
            </Layout>
          }
        />
        <PrivateRoute
          path="/:username"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        >
          <PrivateRoute path="" element={<Posts />} />
          <PrivateRoute path="media" element={<Posts />} />
          <PrivateRoute path="likes" element={<Posts />} />
          <PrivateRoute path="bookmarks" element={<Posts />} />
        </PrivateRoute>
        <PrivateRoute
          path="/notifications"
          element={
            <Layout>
              <Notifications />
            </Layout>
          }
        />
        <PrivateRoute
          path="/bookmarks"
          element={
            <Layout>
              <Bookmarks />
            </Layout>
          }
        />
      </Routes>
      {query.get('action') === 'edit' && (
        <PrivateRoute path="/" element={<EditProfile />} />
      )}
      {query.get('action') === 'compose_tweet' && (
        <PrivateRoute path="/" element={<ComposeTweet />} />
      )}

      <div className="col-span-1"></div>
    </ScrollToTop>
  );
}
