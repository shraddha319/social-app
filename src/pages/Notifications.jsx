import { Notification } from '../components';

const notifications = [
  {
    from: [
      {
        name: 'Shraddha',
        imageUrl:
          'https://devforum.roblox.com/uploads/default/original/4X/c/e/0/ce087d9a04bba8f904554a3616895f23c4ce67bb.png',
        username: 'shraddha319',
      },
    ],
    kind: 'post',
    content: {
      text:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab dolor nemo veniam eos quas commodi, animi placeat nesciunt in perspiciatis illo! Molestiae rem nisi quia, perferendis dicta delectus. Culpa, eos!',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KcuaRV3w7qWIjCjU8Feke1lTRVk5g6AFvA&usqp=CAU',
    },
  },
  {
    from: [
      {
        name: 'Test',
        imageUrl:
          'https://devforum.roblox.com/uploads/default/original/4X/c/e/0/ce087d9a04bba8f904554a3616895f23c4ce67bb.png',
        username: 'test123',
      },
      {
        name: 'Shraddha',
        imageUrl:
          'https://devforum.roblox.com/uploads/default/original/4X/c/e/0/ce087d9a04bba8f904554a3616895f23c4ce67bb.png',
        username: 'shraddha319',
      },
    ],
    kind: 'following',
    content: {
      text: 'started following you',
    },
  },
];

export default function Notifications() {
  return (
    <div className="border-2 border-t-0 border-gray-100 divide-y-2 divide-gray-100">
      {notifications.map((n) => (
        <Notification notification={n} />
      ))}
    </div>
  );
}
