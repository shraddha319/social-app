import styled from 'styled-components';
import tw from 'twin.macro';
import { twSize } from './theme';

const twButton = {
  solidPrimary: tw`text-white bg-blue-500 hover:bg-blue-400`,
  solidSecondary: tw`text-white bg-red-500 hover:bg-red-400`,
  outlinePrimary: tw`text-blue-500 bg-white border-2 border-blue-400 hover:(bg-blue-100 border-blue-500)`,
  outlineSecondary: tw`text-red-500 bg-white border-2 border-red-400 hover:(bg-red-100 border-red-500)`,
};

export const Button = styled.button(
  ({ variant, size, fullWidth, rounded, overrides }) => [
    tw`px-4 py-2 tracking-wider font-semibold rounded transition-colors duration-100 ease-in-out`,
    twButton[variant],
    twSize[size],
    fullWidth && tw`w-full`,
    rounded && tw`rounded-full`,
    overrides,
  ]
);

export const IconLabelButton = styled(Button)`
  ${tw`flex items-center space-x-2`}
`;

const twIconButton = {
  variant: {
    primary: tw`text-blue-500 hover:bg-blue-100`,
    secondary: tw`text-red-500 hover:bg-red-100`,
    action: tw`text-gray-500 hover:(text-blue-500 bg-blue-100)`,
    disabled: tw`text-gray-400 disabled:opacity-50`,
    overlayLight: tw`text-white transition ease-in-out delay-75 hover:(transform scale-125)`,
  },
  size: {
    small: tw`text-xl h-8 w-8`,
    medium: tw`text-2xl h-10 w-10`,
    large: tw`text-3xl h-12 w-12`,
  },
};

export const IconButton = styled.button(({ variant, size }) => [
  tw`rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out`,
  twIconButton.variant[variant],
  twIconButton.size[size],
]);
