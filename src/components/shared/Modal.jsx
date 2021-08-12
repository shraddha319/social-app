import styled from 'styled-components';
import tw from 'twin.macro';

export const Modal = styled.div`
  ${tw`w-screen h-screen absolute inset-0 z-10 text-red-500`}
  background: rgba(0,0,0,0.3);
`;
