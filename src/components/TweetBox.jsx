import { Avatar, IconButton, Button } from './shared';
import { ImageIcon, EmojiIcon } from './shared/icons';
import avatar from '../assets/avatar.jpeg';

export default function TweetBox() {
  return (
    <div className="flex">
      <div className="p-3">
        <Avatar src={avatar} alt="shraddha" size="medium" />
      </div>
      <div className="flex-grow flex flex-col px-1 divide-y-2">
        <textarea
          className="w-full flex-grow py-4 px-2 text-lg no-scrollbar resize-none"
          rows="2"
          placeholder="What's happening?"
        />
        <div className="flex items-center justify-between px-1 py-2">
          <ul className="flex">
            <li>
              <IconButton type="file" size="small" variant="primary">
                <label htmlFor="tweet_image">
                  <ImageIcon />
                  <input type="file" id="tweet_image" className="hidden" />
                </label>
              </IconButton>
            </li>
            <li>
              <IconButton size="small" variant="primary">
                <EmojiIcon />
              </IconButton>
            </li>
          </ul>
          <Button rounded variant="solidPrimary" size="small">
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
}
