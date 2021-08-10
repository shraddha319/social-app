import styled from 'styled-components';
import tw from 'twin.macro';

const twAvatar = {
  size: {
    tiny: tw`h-8 w-8 text-lg`,
    small: tw`h-10 w-10 text-xl`,
    medium: tw`h-12 w-12 text-2xl`,
    large: tw`h-14 w-14 text-3xl`,
  },
};

const bg = [
  tw`bg-red-500`,
  tw`bg-green-500`,
  tw`bg-yellow-500`,
  tw`bg-blue-500`,
  tw`bg-purple-500`,
  tw`bg-pink-500`,
];

export const Avatar = styled.img(({ size }) => [
  tw`rounded-full object-contain`,
  twAvatar.size[size],
]);

export const FallbackAvatar = styled.div(({ size }) => {
  const index = Math.trunc(Math.random() * bg.length - 1);
  return [
    tw`rounded-full flex justify-center items-center text-white cursor-default`,
    twAvatar.size[size],
    bg[index],
  ];
});
