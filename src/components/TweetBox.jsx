import { Avatar, IconButton, Button } from './shared';
import { ImageIcon, EmojiIcon } from '../assets/icons';
import avatar from '../assets/avatar.jpeg';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createPost } from '../features/posts/postsSlice';

export default function TweetBox({ styles }) {
  const [tweet, setTweet] = useState('');
  const dispatch = useDispatch();
  const submitTweet = () => {
    if (tweet.length > 0) {
      dispatch(createPost({ text: tweet }));
    }
  };

  return (
    <div className={`flex ${styles}`}>
      <div className="p-3">
        <Avatar src={avatar} alt="profile picture" size="medium" />
      </div>
      <div className="flex-grow flex flex-col px-1 divide-y-2">
        <textarea
          className="w-full flex-grow py-4 px-2 text-lg no-scrollbar resize-none"
          rows="2"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
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
          <Button
            rounded
            variant="solidPrimary"
            size="small"
            onClick={submitTweet}
          >
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
}
