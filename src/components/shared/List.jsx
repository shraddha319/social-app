import styled from 'styled-components';
import tw from 'twin.macro';
import { NavLink } from 'react-router-dom';

export const ListX = styled.ul`
  ${tw`flex h-10 border-gray-200`}
`;

export const ListItem = styled.li(({ overrides = {} }) => ({
  ...tw`w-full hover:bg-blue-100 transition-all delay-100 ease-in-out`,
  ...overrides,
}));

export const ListItemLink = styled(NavLink)`
  ${tw`w-full h-full flex items-center justify-center  text-gray-600 font-semibold text-base hover:text-blue-500`}

  &.selected {
    ${tw`text-blue-500`}
  }
`;
