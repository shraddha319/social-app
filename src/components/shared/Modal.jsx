import styled from 'styled-components';
import tw from 'twin.macro';
import { CloseIcon } from '../../assets/icons';
import { IconButton } from './Button';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Typography } from './Typography';

export const Modal = styled(Component)`
  ${tw`w-screen h-screen fixed inset-0 z-20 flex items-center justify-center`}
  background: rgba(0,0,0,0.3);

  & > div {
    width: 640px;
    height: 640px;
  }
`;

function Component({ children, className, title = '' }) {
  const navigate = useNavigate();

  return ReactDOM.createPortal(
    <div className={className}>
      <div className="bg-white p-2 h-96 rounded-xl space-y-1 divide-y-2 divide-gray-200 shadow-2xl flex flex-col">
        <header className="h-8 flex items-center space-x-2">
          <IconButton
            onClick={() => navigate(-1)}
            variant="action"
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" as="h1">
            {title}
          </Typography>
        </header>
        <main className="flex-grow overflow-y-scroll overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>,
    document.getElementById('modal_root')
  );
}
