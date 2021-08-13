import styled from 'styled-components';
import tw from 'twin.macro';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar, Posts } from './components';
import { IconButton } from './components';
import { Home, User } from './pages';
import { ArrowBack } from './assets/icons';
import './App.css';

const Layout = styled.div`
  ${tw`h-full mx-auto grid grid-cols-4`}
  width: 1200px;
`;

const TopBar = styled.div`
  ${tw`w-full sticky top-0 h-12 p-4 text-lg bg-white shadow flex items-center space-x-4 font-medium z-10`}
`;

export default function App() {
  const { pathname } = useLocation();
  return (
    <Layout>
      <Sidebar styles="col-span-1" />
      <div className="col-span-2 overflow-y-scroll no-scrollbar">
        <TopBar>
          {pathname !== '/' && (
            <>
              <IconButton variant="primary" size="small">
                <ArrowBack />
              </IconButton>
              <p>
                {pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)}
              </p>
            </>
          )}
        </TopBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<User />}>
            <Route path="" element={<Posts />} />
            <Route path="media" element={<Posts />} />
            <Route path="likes" element={<Posts />} />
            <Route path="bookmarks" element={<Posts />} />
          </Route>
        </Routes>
      </div>
      <div className="col-span-1">Side</div>
    </Layout>
  );
}
