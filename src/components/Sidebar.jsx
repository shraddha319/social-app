import styled from 'styled-components';
import tw from 'twin.macro';
import {
  StyledIcon,
  Typography,
  Button,
  IconButton,
  IconLabelButton,
  ListItemLink,
} from './shared';
import {
  HomeIcon,
  NotificationsIcon,
  MailIcon,
  BookmarkIcon,
  UserIcon,
} from '../assets/icons';

const StyledSidebar = styled.div`
  ${tw`h-full bg-white py-2 px-4 space-y-4`}
`;

const Navbar = styled.nav``;

const List = styled.ul`
  ${tw`flex flex-col space-y-2 items-start`}
`;

const ListItem = styled.li`
  ${tw`transition-all duration-100 ease-in-out rounded-full`}

  ${Typography} {
    ${tw`flex-grow`}
  }

  &:hover {
    ${tw`bg-blue-100`}

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

export default function Sidebar({ styles }) {
  return (
    <StyledSidebar className={styles}>
      <Logo>
        <IconButton as="a" href="#" size="large" variant="primary">
          <HomeIcon />
        </IconButton>
      </Logo>
      <Navbar>
        <List>
          <ListItem>
            <ListItemLink to="/feed" end activeClassName="selected">
              <IconLabelButton as="div">
                <StyledIcon size="xl3">
                  <HomeIcon />
                </StyledIcon>
                <Typography variant="label">Home</Typography>
              </IconLabelButton>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink end to="/notifications" activeClassName="selected">
              <IconLabelButton as="div">
                <StyledIcon size="xl3">
                  <NotificationsIcon />
                </StyledIcon>
                <Typography variant="label">Notifications</Typography>
              </IconLabelButton>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink end to="/messages" activeClassName="selected">
              <IconLabelButton as="div">
                <StyledIcon size="xl3">
                  <MailIcon />
                </StyledIcon>
                <Typography variant="label">Messages</Typography>
              </IconLabelButton>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink end to="/bookmarks" activeClassName="selected">
              <IconLabelButton as="div">
                <StyledIcon size="xl3">
                  <BookmarkIcon />
                </StyledIcon>
                <Typography variant="label">Bookmarks</Typography>
              </IconLabelButton>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink end to="/profile" activeClassName="selected">
              <IconLabelButton as="div">
                <StyledIcon size="xl3">
                  <UserIcon />
                </StyledIcon>
                <Typography variant="label">Profile</Typography>
              </IconLabelButton>
            </ListItemLink>
          </ListItem>
        </List>
      </Navbar>
      <Button variant="solidPrimary" size="base" rounded fullWidth>
        Tweet
      </Button>
    </StyledSidebar>
  );
}
