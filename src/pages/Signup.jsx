import { Typography, Input, Button } from '../components';

export default function Signup() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <form className="w-96 space-y-6 py-6 px-6 border-gray-300 border-2 rounded-lg">
        <Typography align="left" color="textPrimary" variant="h6" as="h1">
          Create your account
        </Typography>
        <p className="flex space-x-1 w-full">
          <Input>
            <input type="text" id="name" placeholder=" " />
            <label htmlFor="name" name="name">
              Full name
            </label>
          </Input>
          <Input>
            <input type="text" id="username" placeholder=" " />
            <label htmlFor="username" name="username">
              Username
            </label>
          </Input>
        </p>
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
        <Input>
          <input type="password" id="confirm_password" placeholder=" " />
          <label htmlFor="confirm_password" name="confirm_password">
            Confirm Password
          </label>
        </Input>
        <Input>
          <input type="date" id="dob" placeholder=" " />
          <label htmlFor="dob" name="dob">
            Date of Birth
          </label>
          <Typography variant="small" className="p-1">
            Confirm your own age, even if this account is for a business, a pet,
            or something else.
          </Typography>
        </Input>
        <Button
          type="submit"
          fullWidth
          rounded
          variant="solidPrimary"
          size="large"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
