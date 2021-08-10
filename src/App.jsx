import './App.css';
import { Sidebar } from './components';
import styled from 'styled-components';
import tw from 'twin.macro';

const Layout = styled.div`
  ${tw`w-3/5 h-full mx-auto border-2 grid grid-cols-4`}
`;

export default function App() {
  return (
    <Layout>
      <Sidebar styles="col-span-1" />
      <div className="col-span-2 border-2 border-red-500 overflow-y-scroll no-scrollbar"></div>
      <div className="col-span-1">Side</div>
    </Layout>
  );
}
