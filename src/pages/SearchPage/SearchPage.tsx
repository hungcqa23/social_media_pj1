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

const countries = [
  { name: 'Argentina', code: 'AR' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Bermuda', code: 'BM' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Bouvet Island', code: 'BV' },
  { name: 'Brazil', code: 'BR' },
  { name: 'British Indian Ocean Territory', code: 'IO' },
  { name: 'Brunei Darussalam', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' },
  { name: 'Cape Verde', code: 'CV' },
  { name: 'Cayman Islands', code: 'KY' },
  { name: 'Central African Republic', code: 'CF' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Christmas Island', code: 'CX' },
  { name: 'Cocos (Keeling) Islands', code: 'CC' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoros', code: 'KM' },
  { name: 'Congo', code: 'CG' },
  { name: 'Congo, The Democratic Republic of the', code: 'CD' },
  { name: 'Cook Islands', code: 'CK' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Cote D"Ivoire', code: 'CI' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Falkland Islands (Malvinas)', code: 'FK' },
  { name: 'Faroe Islands', code: 'FO' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'French Guiana', code: 'GF' },
  { name: 'French Polynesia', code: 'PF' },
  { name: 'French Southern Territories', code: 'TF' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Gibraltar', code: 'GI' },
  { name: 'Greece', code: 'GR' },
  { name: 'Greenland', code: 'GL' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Guadeloupe', code: 'GP' },
  { name: 'Guam', code: 'GU' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guernsey', code: 'GG' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guinea-Bissau', code: 'GW' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
  { name: 'Holy See (Vatican City State)', code: 'VA' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Iran, Islamic Republic Of', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Isle of Man', code: 'IM' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jersey', code: 'JE' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Kiribati', code: 'KI' },
  { name: 'Korea, Democratic People"S Republic of', code: 'KP' },
  { name: 'Korea, Republic of', code: 'KR' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: 'Lao People"S Democratic Republic', code: 'LA' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libyan Arab Jamahiriya', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Macao', code: 'MO' },
  { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Marshall Islands', code: 'MH' },
  { name: 'Martinique', code: 'MQ' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Mayotte', code: 'YT' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Micronesia, Federated States of', code: 'FM' },
  { name: 'Moldova, Republic of', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Montserrat', code: 'MS' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Netherlands Antilles', code: 'AN' },
  { name: 'New Caledonia', code: 'NC' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Niger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Niue', code: 'NU' },
  { name: 'Norfolk Island', code: 'NF' },
  { name: 'Northern Mariana Islands', code: 'MP' },
  { name: 'Norway', code: 'NO' },
  { name: 'Oman', code: 'OM' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Palau', code: 'PW' },
  { name: 'Palestinian Territory, Occupied', code: 'PS' },
  { name: 'Panama', code: 'PA' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Pitcairn', code: 'PN' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Reunion', code: 'RE' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russian Federation', code: 'RU' },
  { name: 'RWANDA', code: 'RW' },
  { name: 'Saint Helena', code: 'SH' },
  { name: 'Solomon Islands', code: 'SB' },
  { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Sudan', code: 'SD' },
  { name: 'Suriname', code: 'SR' },
  { name: 'Svalbard and Jan Mayen', code: 'SJ' },
  { name: 'Swaziland', code: 'SZ' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Syrian Arab Republic', code: 'SY' },
  { name: 'Taiwan, Province of China', code: 'TW' },
  { name: 'Tajikistan', code: 'TJ' },
  { name: 'Tanzania, United Republic of', code: 'TZ' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Togo', code: 'TG' },
  { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Turkmenistan', code: 'TM' },
  { name: 'Turks and Caicos Islands', code: 'TC' },
  { name: 'Tuvalu', code: 'TV' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'United States Minor Outlying Islands', code: 'UM' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Viet Nam', code: 'VN' }
];

export default function SearchPage() {
  const [show, setShow] = useState<boolean>(false);
  const [showCities, setShowCities] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { type } = useQueryString();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
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
              // <ul>
              //   <FilterPost
              //     username='AndreeeHandless'
              //     description={`I'm a software engineer and a serial entrepreneur. I've started and sold
              //       multiple businesses and I'm always looking for new opportunities.`}
              //     likes={10}
              //     comments={5}
              //     date={new Date(Date.now() - 1000 * 60 * 60 * 24).toString()}
              //   />
              //   <FilterPost
              //     username='AndreeeHandless'
              //     date={new Date(Date.now() - 1000 * 60 * 60 * 24).toString()}
              //     description={`I'm a software engineer and a serial entrepreneur. I've started and sold
              //       multiple businesses and I'm always looking for new opportunities.`}
              //     likes={2000}
              //     comments={5000}
              //     image='/src/assets/images/user.jpg'
              //   />
              //   <FilterPost
              //     username='AndreeeHandless'
              //     date={new Date(Date.now() - 1000 * 60 * 60 * 24).toString()}
              //     description={`I'm a software engineer and a serial entrepreneur. I've started and sold
              //       multiple businesses and I'm always looking for new opportunities.`}
              //     likes={2000}
              //     comments={5000}
              //     video='https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
              //   />
              // </ul>
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
                      className='flex min-h-[5rem] gap-2 p-2 hover:rounded-lg hover:bg-gray-100 focus:outline-none'
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
