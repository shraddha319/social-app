import { Button, Typography, StyledLink, Input } from '../components';

export default function Login() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <form className="w-80 space-y-8 p-6 border-gray-300 border-2 rounded-lg">
        <Typography align="center" color="textPrimary" variant="h6" as="h1">
          Login
        </Typography>
        <Input>
          <input type="email" id="email" placeholder=" " />
          <label htmlFor="email" name="email">
            Email
          </label>
        </Input>
        <Input>
          <input type="password" id="password" placeholder=" " />
          <label htmlFor="password" name="password">
            Password
          </label>
        </Input>
        <Button
          type="submit"
          fullWidth
          rounded
          variant="solidPrimary"
          size="large"
        >
          Log in
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
