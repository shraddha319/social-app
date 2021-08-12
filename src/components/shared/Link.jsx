import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { twColor } from './theme';

export const StyledLink = styled(Link)(
  ({ color = 'primary', underline = 'hover' }) => ({
    ...twColor[color],
    ...(underline === 'hover' ? tw`hover:underline` : tw`underline`),
  })
);
