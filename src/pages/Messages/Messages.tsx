import Button from 'src/components/Button';
import MessageUser from 'src/pages/Messages/MessageUser';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import List from 'src/components/List';
import conversationApi from 'src/apis/conversation.api';
import { IMessageData } from 'src/types/conversation.type';
import { useContext } from 'react';
import { AppContext } from 'src/contexts/app.contexts';
import { ChatSocket } from 'src/socket/chatSocket';
import { User } from 'src/types/user.type';
import SearchBox from 'src/components/SearchBox';
import { orderBy } from 'lodash';
import { useQuery } from '@tanstack/react-query';

export default function Messages() {
  const { profile } = useContext(AppContext);
  const navigate = useNavigate();
  const { data: conversationsData } = useQuery({
    queryKey: ['conversations'],
    queryFn: conversationApi.getAllConversations
  });

  const conversations = orderBy(
    conversationsData?.data.conversations || [],
    'createdAt',
    'desc'
  );

  const getConversations = async () => {
    ChatSocket.conversation(profile as User, conversations);
  };
  getConversations();

  const handleClick = (item: IMessageData) => {
    if (profile?._id === item.receiverId) {
      navigate(`/messages/${item.senderId}`);
    } else {
      navigate(`/messages/${item.receiverId}`);
    }
  };

  return (
    <>
      <div className='ml-[4.5rem] flex h-screen bg-slate-200'>
        <div className='h-full min-w-[22rem] max-w-[22rem] basis-96 border-r bg-white'>
          <div className='flex items-center justify-between px-6 pb-3 pt-9'>
            <p className='text-lg font-bold text-black'>{profile?.username}</p>
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

          <div className='absolute z-20 flex min-w-[22rem] items-baseline px-6 py-3'>
            <SearchBox />
          </div>

          {List<IMessageData>({
            listItems: conversations ?? [],
            mapFn: (item, index) => (
              <MessageUser
                key={index}
                item={item}
                onClick={() => handleClick(item)}
              />
            ),
            className:
              'h-[calc(100%-9.5rem)] overflow-y-auto w-full relative z-10 top-20'
          })}
        </div>

        <div className='flex-grow bg-white'>{<Outlet />}</div>
      </div>
    </>
  );
}
