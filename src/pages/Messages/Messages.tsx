import Button from 'src/components/Button';
import MessageUser from 'src/components/MessageUser';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import List from 'src/components/List';

interface MessageUser {
  newMessage?: boolean;
  isActive?: boolean;
  userAvatar?: string;
}
const messagesUsers: MessageUser[] = [
  {
    newMessage: true
  },
  {
    isActive: true
  },
  {
    userAvatar:
      'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    newMessage: true
  },
  {
    isActive: true
  },
  {},
  {},
  {},
  {}
];
export default function Messages() {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/messages/${id}`);
  };
  return (
    <>
      <div className='ml-[4.5rem] flex h-screen bg-slate-200'>
        <div className='h-full min-w-[16rem] basis-96 border-r bg-white'>
          <div className='flex items-center justify-between px-6 pb-3 pt-9'>
            <p className='text-lg font-bold text-black'>anhungwindy</p>
            <Button className='h-6 w-6'>
              <img src='/src/assets/icons/addMessages.svg' alt='' />
            </Button>
          </div>

          <div className='flex items-baseline justify-between px-6 py-3'>
            <span className='text-base font-bold text-black'>Messages</span>
            <Link
              className='text-[0.8125rem] font-semibold text-gray-500'
              to='requests'
            >
              Requests
            </Link>
          </div>

          {List<MessageUser>({
            listItems: messagesUsers,
            mapFn: (item, index) => (
              <MessageUser
                key={index}
                {...item}
                onClick={() => handleClick(index)}
              />
            ),
            className: 'h-[calc(100%-9.5rem)] overflow-y-auto'
          })}
        </div>

        <div className='flex-grow bg-white'>{<Outlet />}</div>
      </div>
    </>
  );
}
