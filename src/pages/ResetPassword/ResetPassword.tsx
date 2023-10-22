import { useForm } from 'react-hook-form';
import { getRules } from 'src/utils/rules';

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const rules = getRules(getValues);
  const onSubmit = handleSubmit(
    data => {
      console.log(data);
    },
    data => {
      console.log(data);
    }
  );

  return (
    <>
      <p className='text-center text-base font-normal'>
        Enter a new password below to change your password
      </p>
      <form className='flex flex-col gap-6' onSubmit={onSubmit}>
        <div>
          <input
            type='email'
            placeholder='Email'
            className='w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow'
          />
          <p className='ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600'></p>
        </div>

        <div>
          <input
            type='password'
            placeholder='New password'
            className='w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow'
          />
          <p className='ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600'></p>
        </div>
      </form>
    </>
  );
}
