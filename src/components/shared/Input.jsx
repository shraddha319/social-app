import styled from 'styled-components';
import tw from 'twin.macro';

export const Input = styled.div`
  ${tw`relative bg-white`}

  input:focus {
    ${tw`border-blue-500 border-4`}
  }

  input {
    ${tw`w-full h-11 p-4 outline-none border-2 border-gray-300 rounded-md text-gray-700`}
    background: transparent;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  label {
    ${tw`absolute text-base top-2 left-4 transition-all delay-75 ease-in text-gray-700 py-0`}
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    font-size: 0.9rem;
    top: -0.5rem;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
    ${tw`text-blue-500 bg-white`}
  }
`;

export const TextArea = styled.div`
  ${tw`bg-white text-gray-700 border-2 space-y-1 border-gray-300 py-1 px-3 rounded-md`}

  label {
    ${tw`text-gray-900`}
  }

  textarea {
    ${tw`w-full outline-none resize-none`}
  }
`;
