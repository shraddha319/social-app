import styled from 'styled-components';
import tw from 'twin.macro';

const twAvatar = {
  size: {
    tiny: tw`h-8 w-8 text-lg`,
    small: tw`h-10 w-10 text-xl`,
    medium: tw`h-12 w-12 text-2xl`,
    large: tw`h-14 w-14 text-3xl`,
    xl: tw`h-16 w-16 text-4xl`,
    xl2: tw`h-20 w-20 text-6xl`,
    xl3: tw`h-24 w-24 text-8xl`,
  },
};

export const Avatar = styled.img(({ size, border, background }) => [
  tw`rounded-full object-cover`,
  twAvatar.size[size],
  border && tw`border-4 border-white`,
  background && tw`filter brightness-75`,
]);

export const FallbackAvatar = styled.div(({ size, border }) => {
  return [
    tw`rounded-full flex justify-center items-center text-white cursor-default uppercase bg-gray-500`,
    twAvatar.size[size],
    border && tw`border-4 border-white`,
  ];
});
