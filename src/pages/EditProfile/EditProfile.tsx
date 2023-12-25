import IconProfile from 'src/components/IconProfile';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi } from 'src/apis/profile.api';
import Spinner from 'src/components/Spinner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'src/components/Input';
import { ProfileSchema, profile } from 'src/utils/rules';
import { Select, Option } from 'src/components/FloatingList/ListPopover';
import { toast } from 'react-toastify';
import { convertFileToBase64 } from 'src/utils/file';
import InputFile from 'src/components/InputFile/InputFile';
import { useAppContext } from 'src/contexts/app.contexts';
import { setProfileToLS } from 'src/utils/auth';
import countries from 'src/assets/data/country';

type FormData = Pick<
  ProfileSchema,
  'facebook' | 'twitter' | 'location' | 'youtube' | 'quote' | 'work' | 'school'
>;

const profileSchema = profile.pick([
  'facebook',
  'twitter',
  'youtube',
  'location',
  'quote',
  'work',
  'school'
]);
export default function EditProfile() {
  const { setProfile } = useAppContext();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getCurrentProfile
  });
  const profile = profileData?.data.user;
  const [file, setFile] = useState<File>();
  const updateProfileMutation = useMutation({
    mutationFn: (
      data: FormData & {
        country?: string;
      }
    ) => profileApi.updateProfile(data)
  });
  const uploadProfileMutation = useMutation({
    mutationFn: (data: { image: string }) => profileApi.uploadImageProfile(data)
  });

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  const methods = useForm<FormData>({
    defaultValues: {},
    resolver: yupResolver<FormData>(profileSchema)
  });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCities, setShowCities] = useState<boolean>(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setValue
  } = methods;

  const [valueText, setValueText] = useState<string>('');

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 150) {
      setValueText(inputValue);
    }
  };

  useEffect(() => {
    if (profile) {
      setValue('facebook', profile?.social.facebook);
      setValue('twitter', profile?.social.twitter);
      setValue('location', profile?.location);
      setValue('quote', profile?.quote);
      setValue('work', profile?.work);
      setValue('school', profile?.school);
      setSelectedCountry(profile?.location);
      setValueText(profile?.quote || '');
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async data => {
    try {
      if (file) {
        const image = await convertFileToBase64(file);
        await uploadProfileMutation.mutateAsync({ image });
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        facebook: undefined,
        twitter: undefined,
        youtube: undefined,
        quote: valueText,
        country: selectedCountry || undefined
      });
      setProfile(res.data.user);
      setProfileToLS(res.data.user);
      setTimeout(() => {
        // location.reload();
      }, 1000);

      toast.success('Update profile successfully!');
    } catch (error) {
      toast.error('Update failed!');
    }
  });

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };

  return (
    <form className='flex flex-col items-center' onSubmit={onSubmit}>
      <h1 className='mb-5 text-xl font-semibold'>Edit profile</h1>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          <div className='flex flex-col items-center gap-2'>
            <div className='relative'>
              <IconProfile
                className='flex justify-center'
                classNameImage='h-24 w-24'
                isImage
                src={previewImage || profile?.profilePicture}
              />
              {file && (
                <button
                  className='absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border bg-white'
                  onClick={() => setFile(undefined)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 384 512'
                    className='h-4 fill-gray-600'
                  >
                    <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
                  </svg>
                </button>
              )}
            </div>
            <p className='font-medium'>{profile?.username}</p>

            <InputFile onChange={handleChangeFile} />
          </div>

          <div className='mt-4 flex w-[24rem] flex-col gap-4'>
            {/* <div className='flex text-sm font-normal'>
              <span className='text-base font-medium text-black'>Website</span>
              <div className='ml-2 flex flex-grow flex-col gap-4'>
                <div className='flex'>
                  <img
                    src='/src/assets/icons/facebook.svg'
                    alt=''
                    className='mr-4 h-8 w-8'
                  />
                  <Input
                    className='flex-grow'
                    type='text'
                    classNameInput='h-9 w-full max-w-sm rounded border outline-none'
                    register={register}
                    name='facebook'
                  />
                </div>

                <div className='flex'>
                  <img
                    src='/src/assets/icons/twitter.svg'
                    alt=''
                    className='mr-4 h-8 w-8'
                  />
                  <Input
                    className='flex-grow'
                    type='text'
                    classNameInput='p-2 h-9 w-full max-w-sm  rounded border outline-none'
                    register={register}
                    name='twitter'
                  />
                </div>

                <div className='flex'>
                  <img
                    src='/src/assets/icons/youtube.svg'
                    alt=''
                    className='mr-4 h-8 w-8'
                  />
                  <Input
                    className='flex-grow'
                    type='text'
                    classNameInput='p-2 h-9 w-full max-w-sm  rounded border outline-none'
                    register={register}
                    name='youtube'
                  />
                </div>
              </div>
            </div> */}

            <div className='flex justify-between text-sm font-normal'>
              <span className='w-18 shrink-0 text-base font-medium text-black'>
                Quote
              </span>

              <textarea
                className='h-16 w-full max-w-sm rounded border px-2 py-1 outline-none'
                onChange={onChangeTextarea}
                value={valueText}
              />
            </div>
            <span className='ml-3 self-end'>{valueText.length}/150</span>

            <div className='flex justify-between text-sm font-normal'>
              <span className='w-18 shrink-0 text-base font-medium text-black'>
                Work
              </span>

              <Input
                className='flex-grow'
                type='text'
                classNameInput='p-2 h-9 w-full max-w-sm  rounded border outline-none'
                register={register}
                name='work'
              />
            </div>

            <div className='flex justify-between text-sm font-normal'>
              <span className='w-18 shrink-0 text-base font-medium text-black'>
                School
              </span>

              <Input
                className='flex-grow'
                type='text'
                classNameInput='p-2 h-9 w-full max-w-sm  rounded border outline-none'
                register={register}
                name='school'
              />
            </div>

            <div className='flex justify-between text-sm font-normal'>
              <span className='w-18 shrink-0 text-base font-medium text-black'>
                Location
              </span>

              <div className='h-9 w-full max-w-sm rounded border p-2'>
                <Select
                  isOpen={showCities}
                  setIsOpen={setShowCities}
                  className='flex w-full justify-center text-sm font-medium text-black'
                  label={selectedCountry}
                >
                  <ul className='mt-2 flex max-h-52 w-80 flex-col overflow-y-auto rounded bg-white shadow'>
                    {countries.map(country => {
                      return (
                        <Option
                          key={country.code}
                          label={country.name}
                          onClick={() => setSelectedCountry(country.name)}
                          isSelectedOption={selectedCountry === country.name}
                        />
                      );
                    })}
                  </ul>
                </Select>
              </div>
            </div>
          </div>

          <div className='mt-2 flex justify-center'>
            <button className='h-10 w-24 rounded-lg bg-sky-500 font-medium text-white'>
              Save
            </button>
          </div>
        </>
      )}
    </form>
  );
}
