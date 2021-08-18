import { Button, Avatar, IconButton, Input, TextArea, Modal } from './shared';
import { CameraIcon } from '../assets/icons';

const user = {
  name: 'Shraddha',
  username: 'shraddha319',
  imageUrl:
    'https://devforum.roblox.com/uploads/default/original/4X/c/e/0/ce087d9a04bba8f904554a3616895f23c4ce67bb.png',
  coverUrl:
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c63a017911987.560b3fc509179.png',
  bio: 'Learning web dev',
  location: 'Bangalore, India',
  website: 'https://twitter.com/SShraddha6',
  joined: '',
  stats: {
    followers: 32,
    following: 30,
  },
};

export default function EditProfile() {
  return (
    <Modal title="Edit Profile">
      <form className="my-6">
        <div className="relative w-full">
          <div className="relative">
            <img
              src={user.coverUrl}
              alt="cover"
              className="h-40 w-full object-fit filter brightness-75"
            />
            <IconButton
              className="absolute top-16 left-48"
              size="large"
              variant="overlayLight"
            >
              <CameraIcon />
            </IconButton>
          </div>
          <div className="absolute right-0 left-3 top-32">
            <div className="relative">
              <Avatar background src={user.imageUrl} size="xl" />
              <IconButton
                className="absolute top-5 left-5"
                size="small"
                variant="overlayLight"
              >
                <CameraIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="mt-14 space-y-6 w-4/5 mx-auto">
          <Input>
            <input type="name" id="name" placeholder=" " />
            <label htmlFor="name" name="name">
              Full Name
            </label>
          </Input>
          <TextArea>
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" rows="2"></textarea>
          </TextArea>
          <TextArea>
            <label htmlFor="location">Location</label>
            <textarea id="location" name="location" rows="1"></textarea>
          </TextArea>
          <TextArea>
            <label htmlFor="website">Website</label>
            <textarea id="website" name="website" rows="1"></textarea>
          </TextArea>
          <Input>
            <input type="date" id="dob" placeholder=" " />
            <label htmlFor="dob" name="dob">
              Date of Birth
            </label>
          </Input>
          <p className="flex justify-end">
            <Button size="small" variant="outlinePrimary">
              Save
            </Button>
          </p>
        </div>
      </form>
    </Modal>
  );
}
