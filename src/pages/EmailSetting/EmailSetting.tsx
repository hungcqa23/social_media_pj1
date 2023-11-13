import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Switch from 'src/components/Switch';

type IndividualSwitches = {
  [key: string]: boolean;
};
export default function EmailSetting() {
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [individualSwitches, setIndividualSwitches] = useState<IndividualSwitches>({
    messages: false,
    notifications: false,
    likes: false,
    'follower-requests': false
  });

  const inputObjs = [
    {
      label: 'Messages',
      id: 'messages'
    },
    {
      label: 'Notifications',
      id: 'notifications'
    },
    {
      label: 'Likes',
      id: 'likes'
    },
    {
      label: 'Followers',
      id: 'follower-requests'
    }
  ];

  const handleCheckboxAllChange = () => {
    setIsAllChecked(isAllChecked => !isAllChecked);
    const newIndividualSwitches: IndividualSwitches = {
      messages: !isAllChecked,
      notifications: !isAllChecked,
      likes: !isAllChecked,
      'follower-requests': !isAllChecked
    };

    setIndividualSwitches(newIndividualSwitches);
  };

  const handleIndividualCheckboxChange = (id: string) => {
    setIndividualSwitches(prevIndividualSwitches => ({
      ...prevIndividualSwitches,
      [id]: !prevIndividualSwitches[id]
    }));
  };

  const Links = [
    { name: 'Edit profile', path: '/accounts/profile' },
    { name: 'Email notification', path: '/accounts/emails' },
    { name: 'Push notifications', path: '/accounts/notifications' },
    { name: 'Help', path: '/accounts/help' }
  ];

  return (
    <>
      <h1 className='mb-5 text-xl font-normal'>Push Notifications</h1>

      <div className='flex flex-col gap-3'>
        <div className='flex justify-between'>
          <label>Switch to {isAllChecked ? 'off' : 'on'} all</label>
          <Switch
            id='email'
            checked={isAllChecked}
            handleCheckboxChange={handleCheckboxAllChange}
          />
        </div>

        {inputObjs.map(inputObj => (
          <div className='flex w-1/2 justify-between'>
            <label htmlFor={inputObj.id}>{inputObj.label}</label>
            <Switch
              checked={individualSwitches[inputObj.id]}
              id={inputObj.id}
              handleCheckboxChange={() => handleIndividualCheckboxChange(inputObj.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
