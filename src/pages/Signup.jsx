import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Input, Button } from '../components';
import { signupValidationRules, validate } from '../validations';
import { registerUser } from '../features/auth/authSlice';

export default function Signup() {
  const [input, setInput] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });
  const [inputError, setInputError] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    signup: '',
  });
  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'failed' && error.statusCode === 400)
      setInputError(
        error.errors.reduce((errObj, { message, key, type }) => {
          return { ...errObj, [key]: message };
        }, {})
      );
    if (status === 'success' && token) {
      navigate('/feed');
    }
  }, [status, error, token, navigate]);

  function signupHandler() {
    const inputErrors = validate(input, signupValidationRules);
    setInputError(inputErrors);
    if (Object.keys(inputErrors).length === 0) {
      const user = (({ name, username, email, password, dob }) => ({
        name,
        username,
        email,
        password,
        dob,
      }))(input);

      if (status === 'idle' || status === 'failed')
        dispatch(registerUser(user));
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form
        className="w-96 space-y-6 py-6 px-6 border-gray-300 border-2 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <Typography align="left" color="textPrimary" variant="h6" as="h1">
          Create your account
        </Typography>
        <p className="flex space-x-1 w-full">
          <Input>
            <input
              value={input.name}
              type="text"
              id="name"
              placeholder=" "
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
            <label htmlFor="name" name="name">
              Name
            </label>
            <Typography color="error" variant="small" className="p-1">
              {inputError.name}
            </Typography>
          </Input>
          <Input>
            <input
              value={input.username}
              type="text"
              id="username"
              placeholder=" "
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
            <label htmlFor="username" name="username">
              Username
            </label>
            <Typography color="error" variant="small" className="p-1">
              {inputError.username}
            </Typography>
          </Input>
        </p>
        <Input>
          <input
            value={input.email}
            type="email"
            id="email"
            placeholder=" "
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <label htmlFor="email" name="email">
            Email
          </label>
          <Typography color="error" variant="small" className="p-1">
            {inputError.email}
          </Typography>
        </Input>
        <Input>
          <input
            value={input.password}
            type="password"
            id="password"
            placeholder=" "
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <label htmlFor="password" name="password">
            Password
          </label>
          <Typography color="error" variant="small" className="p-1">
            {inputError.password}
          </Typography>
        </Input>
        <Input>
          <input
            value={input.confirmPassword}
            type="password"
            id="confirm_password"
            placeholder=" "
            onChange={(e) =>
              setInput({ ...input, confirmPassword: e.target.value })
            }
          />
          <label htmlFor="confirm_password" name="confirm_password">
            Confirm Password
          </label>
          <Typography color="error" variant="small" className="p-1">
            {inputError.confirmPassword}
          </Typography>
        </Input>
        <Input>
          <input
            value={input.dob}
            type="date"
            id="dob"
            placeholder=" "
            onChange={(e) => setInput({ ...input, dob: e.target.value })}
          />
          <label htmlFor="dob" name="dob">
            Date of Birth
          </label>
          <Typography
            color={inputError.dob ? 'inputError' : ''}
            variant="small"
            className="p-1"
          >
            {inputError.dob ||
              'Confirm your own age, even if this account is for a business, a pet, or something else.'}
          </Typography>
        </Input>
        <Button
          type="submit"
          fullWidth
          rounded
          variant="solidPrimary"
          size="large"
          onClick={signupHandler}
        >
          {status === 'loading' ? 'Loading...' : 'Sign up'}
        </Button>
      </form>
    </div>
  );
}
