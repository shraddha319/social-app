import Post from './Post';
import { useSelector } from 'react-redux';

// const posts = [
//   {
//     user: {
//       name: 'Shraddha',
//       username: 'shraddha319',
//       imageUrl:
//         'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/164582072/original/1826802722e229166f737070f8c912e8abbc608b/design-your-roblox-avatar-logo.png',
//     },
//     content: {
//       text: "The Internet's own boy",
//       imageUrl:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KcuaRV3w7qWIjCjU8Feke1lTRVk5g6AFvA&usqp=CAU',
//     },
//     stats: {
//       likes: 12,
//       comments: 3,
//     },
//   },
//   {
//     user: {
//       name: 'Tanmay',
//       username: 'tanmay319',
//       imageUrl: null,
//     },
//     content: {
//       text: 'Harry Potter',
//       imageUrl:
//         'https://i.pinimg.com/originals/49/da/d6/49dad62e939773d71b4f4381d8fb1e72.jpg',
//     },
//     stats: {
//       likes: 125,
//       comments: 3,
//     },
//   },
// ];

export default function Posts() {
  const { posts, status } = useSelector((state) => state.posts);
  console.log('feed', posts);

  return (
    <div className="divide-gray-100 divide-y-2 space-y-2">
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'failed' && <h1>something went wrong</h1>}
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </div>
  );
}
