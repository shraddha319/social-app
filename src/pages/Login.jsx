import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, StyledLink, Input } from '../components';
import { loginValidationRules, validate } from '../validations';
import { loginUser } from '../features/auth/authSlice';
import { useEffect } from 'react';

export default function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [inputError, setInputError] = useState({
    login: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function loginHandler() {
    const errors = validate(input, loginValidationRules);
    setInputError(errors);
    if (Object.keys(errors).length === 0) {
      if (status === 'idle' || status === 'failed') dispatch(loginUser(input));
    }
  }

  useEffect(() => {
    if (status === 'failed' && error.statusCode === 401)
      setInputError({
        email: '',
        password: '',
        login: 'Invalid email/password',
      });

    if (status === 'success') {
      navigate('/feed');
    }
  }, [status, navigate, error]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form
        className="w-80 space-y-8 p-6 border-gray-300 border-2 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <Typography align="center" color="textPrimary" variant="h6" as="h1">
          Login
        </Typography>
        <Typography color="error" variant="body" className="p-1">
          {inputError.login}
        </Typography>
        <Input>
          <input
            type="email"
            id="email"
            placeholder=" "
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <label htmlFor="email" name="email">
            Email
          </label>
          <Typography color="error" variant="body" className="p-1">
            {inputError.email}
          </Typography>
        </Input>
        <Input>
          <input
            type="password"
            id="password"
            placeholder=" "
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <label htmlFor="password" name="password">
            Password
          </label>
          <Typography color="error" variant="body" className="p-1">
            {inputError.password}
          </Typography>
        </Input>
        <Button
          type="submit"
          fullWidth
          rounded
          variant="solidPrimary"
          size="large"
          onClick={loginHandler}
        >
          {status === 'loading' ? 'Loading...' : 'Log In'}
        </Button>
        <p className="space-x-2 flex justify-center text-blue-500">
          <StyledLink to="/">Forgot password?</StyledLink>
          <span>&#8226;</span>
          <StyledLink to="/">Sign up</StyledLink>
        </p>
      </form>
    </div>
  );
}
