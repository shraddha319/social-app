import styled from 'styled-components';
import tw from 'twin.macro';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components';
import { Home } from './pages';
import './App.css';

const Layout = styled.div`
  ${tw`max-w-max h-full mx-auto grid grid-cols-4`}
`;

export default function App() {
  return (
    <Layout>
      <Sidebar styles="col-span-1" />
      <div className="col-span-2 overflow-y-scroll no-scrollbar">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <div className="col-span-1">Side</div>
    </Layout>
  );
}
