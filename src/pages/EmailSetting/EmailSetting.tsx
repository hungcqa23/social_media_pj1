import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { profileApi } from 'src/apis/profile.api';
import Spinner from 'src/components/Spinner';
import Switch from 'src/components/Switch';

type IndividualSwitches = {
  messages: boolean;
  reactions: boolean;
  comments: boolean;
  follows: boolean;
};
export default function EmailSetting() {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.getCurrentProfile()
  });
  const settingNotifications = profileData?.data.user
    .notifications as IndividualSwitches;
  const [isAllChecked, setIsAllChecked] = useState(true);
  const updateNotificationMutation = useMutation({
    mutationFn: (body: {
      messages: boolean;
      reactions: boolean;
      comments: boolean;
      follows: boolean;
    }) => profileApi.updateNotifications(body)
  });

  const handleCheckboxAllChange = () => {
    setIsAllChecked(isAllChecked => !isAllChecked);
    updateNotificationMutation.mutate({
      messages: !isAllChecked,
      reactions: !isAllChecked,
      comments: !isAllChecked,
      follows: !isAllChecked
    });
    Object.entries(settingNotifications)?.forEach(notification => {
      settingNotifications[notification[0] as keyof IndividualSwitches] =
        !isAllChecked;
    });
  };

  const handleIndividualCheckboxChange = (label: keyof IndividualSwitches) => {
    updateNotificationMutation.mutate({
      ...settingNotifications,
      [label]: !settingNotifications[label]
    });
    Object.entries(settingNotifications)?.forEach(notification => {
      if (notification[0] === label) {
        settingNotifications[notification[0] as keyof IndividualSwitches] =
          !settingNotifications[label];
      }
    });
  };

  return (
    <>
      <h1 className='mb-5 text-xl font-normal'>Push Notifications</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className='flex flex-col gap-3 font-normal'>
          <div className='flex justify-between'>
            <label>Switch to {isAllChecked ? 'off' : 'on'} all</label>
            <Switch
              id='email'
              checked={isAllChecked}
              handleCheckboxChange={() => handleCheckboxAllChange()}
            />
          </div>

          {Object.entries(
            settingNotifications as Record<keyof IndividualSwitches, boolean>
          )?.map(([label, isChecked], index) => (
            <div className='flex w-1/2 justify-between' key={index}>
              <label htmlFor={label} className='capitalize'>
                {label}
              </label>
              <Switch
                checked={isChecked}
                id={label}
                handleCheckboxChange={() =>
                  handleIndividualCheckboxChange(
                    label as keyof IndividualSwitches
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
