import { formError } from '../constants';

const {
  EMAIL_INVALID,
  PASSWORD_INVALID,
  PASSWORD_MATCH,
  LETTERS_ONLY,
  USERNAME_INVALID,
} = formError;

export const signupValidationRules = {
  name: {
    required: true,
    format: {
      regexp: /^[a-zA-Z ]+$/,
      message: LETTERS_ONLY,
    },
  },
  username: {
    required: true,
    format: {
      regexp: /^[a-zA-Z0-9]{3,18}$/,
      message: USERNAME_INVALID,
    },
  },
  email: {
    required: true,
    format: {
      regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: EMAIL_INVALID,
    },
  },
  password: {
    required: true,
    minLen: 8,
    format: {
      regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message: PASSWORD_INVALID,
    },
  },
  confirmPassword: {
    required: true,
    crossFieldEquality: {
      field: 'password',
      message: PASSWORD_MATCH,
    },
  },
  dob: {
    required: true,
  },
};
