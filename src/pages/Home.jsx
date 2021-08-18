import bg from '../assets/home-bg.jpg';
import { Link } from 'react-router-dom';
import { Button, Typography } from '../components';

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center overflow-hidden	space-x-12">
      <img src={bg} alt="background" />
      <div className="flex flex-col justify-center items-center space-y-6">
        <Typography as="h1" variant="h3" align="center" color="textPrimary">
          Join us now
        </Typography>
        <div className="space-x-4">
          <Link to="/login">
            <Button size="xl3" variant="solidPrimary">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="xl3" variant="outlinePrimary">
              Signup
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
