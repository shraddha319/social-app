import styled from 'styled-components';
import tw from 'twin.macro';
import { StyledIcon, Typography, Link, Button, IconButton } from '../shared';
import {
  HomeIcon,
  NotificationsIcon,
  MailIcon,
  BookmarkIcon,
  UserIcon,
} from '../shared/icons';

const StyledSidebar = styled.div`
  ${tw`h-full bg-white rounded py-2 px-4 space-y-4`}
`;

const Navbar = styled.nav``;

const ListItems = styled.ul`
  ${tw`list-none flex flex-col space-y-1`}
`;

const ListItem = styled.li`
  ${tw`h-auto px-3 py-2 transition-all duration-500 ease-in-out`}

  ${Typography} {
    ${tw`flex-grow font-medium justify-self-start text-gray-700`}
  }

  &:hover {
    ${tw`bg-blue-100 rounded-full`}

    ${Typography}, ${StyledIcon} {
      ${tw`text-blue-500`}
    }
  }
`;

const Logo = styled.div`
  ${tw`m-2`}
  ${IconButton} {
    ${tw`text-4xl w-14 h-14`}
  }
`;

const StyledLink = styled(Link)`
  ${tw`flex flex-row space-x-2`}
`;

export default function Sidebar({ styles }) {
  return (
    <StyledSidebar className={styles}>
      <Logo>
        <IconButton as="a" href="#" size="large" variant="primary">
          <HomeIcon />
        </IconButton>
      </Logo>
      <Navbar>
        <ListItems>
          <ListItem>
            <StyledLink href="#">
              <StyledIcon size="xl3" color="action">
                <HomeIcon />
              </StyledIcon>
              <Typography>Home</Typography>
            </StyledLink>
          </ListItem>
          <ListItem as="a" href="#">
            <StyledLink href="#">
              <StyledIcon size="xl3" color="action">
                <NotificationsIcon />
              </StyledIcon>
              <Typography>Notifications</Typography>
            </StyledLink>
          </ListItem>
          <ListItem as="a" href="#">
            <StyledLink href="#">
              <StyledIcon size="xl3" color="action">
                <MailIcon />
              </StyledIcon>
              <Typography>Messages</Typography>
            </StyledLink>
          </ListItem>
          <ListItem as="a" href="#">
            <StyledLink href="#">
              <StyledIcon size="xl3" color="action">
                <BookmarkIcon />
              </StyledIcon>
              <Typography>Bookmarks</Typography>
            </StyledLink>
          </ListItem>
          <ListItem as="a" href="#">
            <StyledLink href="#">
              <StyledIcon size="xl3" color="action">
                <UserIcon />
              </StyledIcon>
              <Typography>Profile</Typography>
            </StyledLink>
          </ListItem>
        </ListItems>
      </Navbar>
      <Button variant="solidPrimary" size="base" rounded fullWidth>
        Tweet
      </Button>
    </StyledSidebar>
  );
}
