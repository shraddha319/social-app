import styled from 'styled-components';
import tw from 'twin.macro';
import { CloseIcon } from '../../assets/icons';
import { IconButton } from './Button';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';

export const Modal = styled(Component)`
  ${tw`w-screen h-screen fixed inset-0 z-20 text-red-500 flex items-center justify-center`}
  background: rgba(0,0,0,0.3);
`;

function Component({ children, className }) {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  return (
    query.get('action') === 'edit' &&
    ReactDOM.createPortal(
      <div className={className}>
        <div className="bg-white w-80 p-2 rounded-2xl space-y-1 divide-y-2 divide-gray-200 shadow-2xl">
          <IconButton
            onClick={() => navigate(-1)}
            variant="action"
            size="small"
          >
            <CloseIcon />
          </IconButton>
          {children}
        </div>
      </div>,
      document.getElementById('modal_root')
    )
  );
}
