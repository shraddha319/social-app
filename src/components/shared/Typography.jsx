import styled from 'styled-components';
import tw from 'twin.macro';
import { twColor } from './theme';

const twTypography = {
  align: {
    left: tw`text-left`,
    right: tw`text-right`,
    center: tw`text-center`,
    justify: tw`text-justify`,
  },
  display: {
    inline: tw`inline`,
    block: tw`block`,
  },
  variant: {
    h1: tw`text-8xl font-light leading-tight tracking-wide`,
    h2: tw`text-6xl	font-light leading-tight tracking-wide	`,
    h3: tw`text-5xl font-normal leading-tight tracking-wide	`,
    h4: tw`text-4xl	font-normal leading-tight tracking-wide	`,
    h5: tw`text-2xl	font-normal leading-tight tracking-wide	`,
    h6: tw`text-xl	font-medium leading-normal tracking-wide	`,
    subtitle: tw`text-base font-normal leading-relaxed tracking-wide`,
    body: tw`text-base font-normal leading-normal`,
    label: tw`font-semibold`,
  },
};

export const Typography = styled.div(
  ({
    align,
    color,
    display,
    gutterBottom,
    variant,
    uppercase,
    overrides = {},
  }) => ({
    ...tw`transition-all duration-100`,
    ...(align && twTypography.align[align]),
    ...(color && twColor[color]),
    ...(display && twTypography.display[display]),
    ...(variant && twTypography.variant[variant]),
    ...(uppercase && tw`uppercase`),
    ...overrides,

    marginBottom: gutterBottom && '0.35em',
  })
);
