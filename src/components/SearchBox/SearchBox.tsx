import { useEffect, useRef, useState } from 'react';
import { searchUsers } from 'src/apis/user.api';
import { User } from 'src/types/user.type';
import MessageUser from '../MessageUser';
import List from '../List';
import ChatUser from '../ChatUser';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [result, setResult] = useState<User[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const handleClick = (item: User) => {
    navigate(`/messages/${item._id}`);
  };

  const getUsers = async (query: string) => {
    try {
      const users: User[] = (await searchUsers(query)) as User[];
      setResult(users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value !== '') {
      getUsers(value);
    } else {
      setResult([]);
    }
  };

  const handleClickOutside = (event: { target: any }) => {
    const { target } = event;
    if (searchBoxRef.current) {
      if (!searchBoxRef.current.contains(target)) {
        setIsFocused(false);
      }
    }
  };
  return (
    <div
      className='flex max-h-[40rem] w-full flex-col rounded-3xl border border-slate-300 bg-white px-6 py-3 focus-within:border-slate-700 focus-within:drop-shadow-xl'
      ref={searchBoxRef}
    >
      <div className='flex w-full flex-col gap-4 overflow-y-auto'>
        <div className='z-1 sticky top-0 flex w-full flex-row items-center justify-between bg-white py-2 focus-within:border-b-2'>
          <svg
            className='w-[10%]'
            width='21'
            height='21'
            viewBox='0 0 21 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19.7266 17.8047C20.0781 18.1953 20.0781 18.7812 19.6875 19.1328L18.5938 20.2266C18.2422 20.6172 17.6562 20.6172 17.2656 20.2266L13.3984 16.3594C13.2031 16.1641 13.125 15.9297 13.125 15.6953V15.0312C11.7188 16.125 10 16.75 8.125 16.75C3.63281 16.75 0 13.1172 0 8.625C0 4.17188 3.63281 0.5 8.125 0.5C12.5781 0.5 16.25 4.17188 16.25 8.625C16.25 10.5391 15.5859 12.2578 14.5312 13.625H15.1562C15.3906 13.625 15.625 13.7422 15.8203 13.8984L19.7266 17.8047ZM8.125 13.625C10.8594 13.625 13.125 11.3984 13.125 8.625C13.125 5.89062 10.8594 3.625 8.125 3.625C5.35156 3.625 3.125 5.89062 3.125 8.625C3.125 11.3984 5.35156 13.625 8.125 13.625Z'
              fill='#A2A2A2'
            />
          </svg>

          <input
            type='text'
            className='w-[85%] border-none bg-transparent outline-none'
            onFocus={() => setIsFocused(true)}
            value={searchTerm}
            onChange={handleInputChange}
            placeholder='Search users'
          />
        </div>
        {result.length > 0 && isFocused && (
          <div>
            {List<User>({
              listItems: result,
              mapFn: (item: User, index: number) => (
                <ChatUser
                  key={index}
                  item={item}
                  onClick={() => handleClick(item)}
                />
              ),
              className: 'h-fit w-full'
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
