import Button from 'src/components/Button';
import FilterPost from 'src/components/FilterPost';
import Search from 'src/components/Search';
import Suggested from 'src/pages/Main/SuggestedBar';
import { iconsSvg } from 'src/constants/icons';
import IconProfile from 'src/components/IconProfile';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Datepicker from 'tailwind-datepicker-react';
import { ReactElement, useState } from 'react';
import { useQueryString } from 'src/hooks/useQueryString';
import classNames from 'classnames';
import { Select, Option } from 'src/components/FloatingList/ListPopover';
import { useQuery } from '@tanstack/react-query';
import { postApi } from 'src/apis/post.api';
import { profileApi } from 'src/apis/profile.api';
import List from 'src/components/List';
import countries from 'src/assets/data/country';

interface ITheme {
  background: string;
  todayBtn: string;
  clearBtn: string;
  icons: string;
  text: string;
  disabledText: string;
  input: string;
  inputIcon: string;
  selected: string;
}
interface IIcons {
  prev: () => ReactElement | JSX.Element;
  next: () => ReactElement | JSX.Element;
}

export interface IOptions {
  title?: string;
  autoHide?: boolean;
  todayBtn?: boolean;
  todayBtnText?: string;
  clearBtn?: boolean;
  clearBtnText?: string;
  maxDate?: Date;
  minDate?: Date;
  theme?: ITheme;
  icons?: IIcons;
  datepickerClassNames?: string;
  defaultDate?: Date | null;
  language?: string;
  weekDays?: string[];
  disabledDates?: Date[];
  inputNameProp?: string;
  inputIdProp?: string;
  inputPlaceholderProp?: string;
  inputDateFormatProp?: Intl.DateTimeFormatOptions;
}

const options: IOptions = {
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  clearBtnText: 'Clear',
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-white',
    todayBtn: '',
    clearBtn: 'focus:ring-0',
    icons: '',
    text: '',
    disabledText: 'bg-white',
    input: 'font-medium border-none bg-white',
    inputIcon: '',
    selected: ''
  },
  icons: {
    prev: () => (
      <span>
        <svg
          width='16'
          height='9'
          viewBox='0 0 16 9'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.5 5H3.5C3.22 5 3 4.78 3 4.5C3 4.22 3.22 4 3.5 4H12.5C12.78 4 13 4.22 13 4.5C13 4.78 12.78 5 12.5 5Z'
            fill='black'
          />
          <path
            d='M6 8.5C5.93442 8.5008 5.86941 8.48787 5.80913 8.46203C5.74885 8.4362 5.69465 8.39804 5.65 8.35L2.15 4.85C1.95 4.65 1.95 4.34 2.15 4.14L5.65 0.65C5.85 0.45 6.16 0.45 6.36 0.65C6.56 0.85 6.56 1.16 6.36 1.36L3.21 4.51L6.36 7.66C6.56 7.86 6.56 8.17 6.36 8.37C6.26 8.47 6.13 8.52 6.01 8.52L6 8.5Z'
            fill='black'
          />
        </svg>
      </span>
    ),
    next: () => (
      <span>
        <svg
          width='16'
          height='9'
          viewBox='0 0 16 9'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_829_712)'>
            <path
              d='M3.49988 4.00049L12.4999 4.00049C12.7799 4.00049 12.9999 4.22049 12.9999 4.50049C12.9999 4.78049 12.7799 5.00049 12.4999 5.00049L3.49988 5.00049C3.21988 5.00049 2.99988 4.78049 2.99988 4.50049C2.99988 4.22049 3.21988 4.00049 3.49988 4.00049Z'
              fill='black'
            />
            <path
              d='M9.99988 0.500489C10.0655 0.49969 10.1305 0.512622 10.1907 0.538456C10.251 0.564289 10.3052 0.602452 10.3499 0.650489L13.8499 4.15049C14.0499 4.35049 14.0499 4.66049 13.8499 4.86049L10.3499 8.35049C10.1499 8.55049 9.83988 8.55049 9.63988 8.35049C9.43988 8.15049 9.43988 7.84049 9.63988 7.64049L12.7899 4.49049L9.63988 1.34049C9.43988 1.14049 9.43988 0.830489 9.63988 0.630489C9.73988 0.530489 9.86988 0.480489 9.98988 0.480489L9.99988 0.500489Z'
              fill='black'
            />
          </g>
          <defs>
            <clipPath id='clip0_829_712'>
              <rect
                width='16'
                height='9'
                fill='white'
                transform='matrix(-1 0 0 -1 15.9999 9.00049)'
              />
            </clipPath>
          </defs>
        </svg>
      </span>
    )
  },
  language: 'en',
  disabledDates: [],
  weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Select Date',
  inputDateFormatProp: {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
};

export default function SearchPage() {
  const [show, setShow] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');
  const { type } = useQueryString();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCities, setShowCities] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data: searchData, isLoading } = useQuery({
    queryKey: ['search', { search, type, selectedDate }],
    queryFn: ({ signal }) => {
      const selectDate = selectedDate ? new Date(selectedDate) : undefined;
      selectDate?.setDate(selectDate.getDate() + 1);
      // if (type === 'users') {
      return profileApi.searchUsers(search, type, signal, selectDate);
      // }
      // return postApi.getPosts(search, signal);
    }
  });

  const users = searchData?.data.users || [];
  const posts = searchData?.data.posts || [];
  const handleChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const handleAddFilter = (type: string) => () => {
    searchParams.delete('type');
    if (type !== '') searchParams.set('type', type);
    setSearchParams(searchParams);
  };

  return (
    <>
      <main className='ml-auto max-h-screen w-[calc(100%-4.5rem)] overflow-y-auto overflow-x-hidden lg:w-[calc(100%-14rem)]'>
        <div className='flex w-full justify-center'>
          <div className='w-full max-w-[40rem]'>
            <div className='mb-7 mt-10'>
              <Search query={search} onChange={setSearch} />
            </div>

            {/* Images */}
            <div>
              <div className='mb-4 flex items-center gap-6'>
                <p className='text-sm font-medium uppercase text-gray-500'>
                  Search results:{' '}
                </p>
                <Button
                  className={classNames('flex items-center p-2', {
                    'rounded-full bg-gray-200 ring-black': !type
                  })}
                  onClick={handleAddFilter('')}
                >
                  <img src={`${iconsSvg.posts}`} className='mr-3' alt='' />
                  <span className='text-sm font-medium text-black'>Posts</span>
                </Button>

                <Button
                  className={classNames('flex items-center p-2', {
                    'rounded-full bg-gray-200': type === 'people'
                  })}
                  onClick={handleAddFilter('people')}
                >
                  <img src={`${iconsSvg.cloud}`} className='mr-3' alt='' />
                  <span className='text-sm font-medium text-black'>People</span>
                </Button>
              </div>

              {/* Date filter */}
              {!type && (
                <div className='flex min-h-[2.5rem] items-center'>
                  <p className='text-sm font-normal text-gray-500'>Sort by:</p>

                  <div>
                    <Datepicker
                      options={options}
                      onChange={handleChange}
                      show={show}
                      setShow={handleClose}
                    />
                  </div>
                </div>
              )}

              {/* Country filter */}
              {type === 'people' && (
                <div className='flex min-h-[2.5rem] items-center'>
                  <label
                    htmlFor='country'
                    className='mr-3 text-sm font-normal text-gray-500'
                  >
                    Country:
                  </label>
                  <Select
                    isOpen={showCities}
                    setIsOpen={setShowCities}
                    className='flex py-2 text-sm font-medium text-black focus:outline-none'
                  >
                    <ul className='mt-2 flex max-h-52 w-80 flex-col overflow-y-auto rounded bg-white shadow'>
                      {countries.map(country => (
                        <Option
                          key={country.code}
                          label={country.name}
                          onClick={() => setSelectedCountry(country.name)}
                        />
                      ))}
                    </ul>
                  </Select>
                </div>
              )}
            </div>

            {/* Filter Post */}
            {!type && (
              <List
                listItems={posts}
                mapFn={post => {
                  return <FilterPost key={post._id} post={post} />;
                }}
                as='ul'
                className='mt-4'
              />
            )}

            {type === 'people' && (
              <>
                <List
                  listItems={users}
                  mapFn={user => (
                    <Link
                      to={`/${user._id}`}
                      key={user._id}
                      className={classNames(
                        'flex min-h-[5rem] gap-2 p-2 hover:rounded-lg hover:bg-gray-100 focus:outline-none',
                        {
                          'items-center': !user.quote
                        }
                      )}
                    >
                      <IconProfile
                        className='h-12 w-12 shrink-0'
                        classNameImage='h-12 w-12'
                        isImage
                        src={user.profilePicture}
                      />
                      <div className='flex flex-col'>
                        <span className='text-normal font-medium text-black'>
                          {user.username}
                        </span>
                        <span className='text-normal text-sm font-light text-gray-500'>
                          {user.fullname}
                        </span>
                        <span className='text-sm font-light'>{user.quote}</span>
                      </div>
                    </Link>
                  )}
                  as='ul'
                  className='mt-4 flex flex-col gap-2'
                />

                {isLoading && (
                  <ul className='flex animate-pulse flex-col gap-2'>
                    <div className='flex gap-2 p-2 hover:rounded-lg focus:outline-none'>
                      <div className='h-12 w-12 rounded-full bg-slate-200' />
                      <div className='flex flex-grow flex-col justify-between '>
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                      </div>
                    </div>
                    <div className='flex gap-2 p-2 hover:rounded-lg focus:outline-none'>
                      <div className='h-12 w-12 rounded-full bg-slate-200' />
                      <div className='flex flex-grow flex-col justify-between '>
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                      </div>
                    </div>
                    <div className='flex gap-2 p-2 hover:rounded-lg focus:outline-none'>
                      <div className='h-12 w-12 rounded-full bg-slate-200' />
                      <div className='flex flex-grow flex-col justify-between '>
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                      </div>
                    </div>
                    <div className='flex gap-2 p-2 hover:rounded-lg focus:outline-none'>
                      <div className='h-12 w-12 rounded-full bg-slate-200' />
                      <div className='flex flex-grow flex-col justify-between '>
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                      </div>
                    </div>
                    <div className='flex gap-2 p-2 hover:rounded-lg focus:outline-none'>
                      <div className='h-12 w-12 rounded-full bg-slate-200' />
                      <div className='flex flex-grow flex-col justify-between '>
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                      </div>
                    </div>
                    <div className='flex gap-2 p-2 hover:rounded-lg focus:outline-none'>
                      <div className='h-12 w-12 rounded-full bg-slate-200' />
                      <div className='flex flex-grow flex-col justify-between '>
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                      </div>
                    </div>
                    <div className='flex gap-2 p-2 hover:rounded-lg focus:outline-none'>
                      <div className='h-12 w-12 rounded-full bg-slate-200' />
                      <div className='flex flex-grow flex-col justify-between '>
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                        <div className='h-2 w-full rounded-full bg-slate-200' />
                      </div>
                    </div>
                  </ul>
                )}
              </>
            )}
          </div>

          <Suggested />
        </div>
      </main>
    </>
  );
}
