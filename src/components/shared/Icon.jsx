import { IconContext } from 'react-icons';
import styled from 'styled-components';
import tw from 'twin.macro';
import { twSize, twColor } from './theme';

function IconProvider({ children, props }) {
  return (
    <IconContext.Provider value={props}>
      <div className="flex items-center justify-center">{children}</div>
    </IconContext.Provider>
  );
}

export const Icon = ({ className, children }) => {
  return (
    <IconProvider
      props={{
        className,
      }}
    >
      {children}
    </IconProvider>
  );
};

export const StyledIcon = styled(Icon)(({ size, color }) => [
  tw`block text-center transition-colors duration-500 ease-in-out`,
  twSize[size],
  twColor[color],
]);
