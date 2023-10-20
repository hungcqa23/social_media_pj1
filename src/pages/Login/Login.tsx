import { Link } from 'react-router-dom';
import Button from 'src/components/Button/Button';
import { useForm } from 'react-hook-form';
import { getRules } from 'src/utils/rules';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>();

  const rules = getRules();

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });
  return (
    <>
      <h1 className='text-center text-6xl font-semibold drop-shadow-font'>Instataolao</h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-12' noValidate>
        <div className='flex flex-col gap-4'>
          <div>
            <input
              type='text'
              className='w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow'
              autoFocus={true}
              placeholder='Email'
              minLength={0}
              maxLength={255}
              {...register('email', rules.email)}
            />
            <p className='ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600'>
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              type='password'
              className='w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow'
              autoComplete='on'
              placeholder='Password'
              minLength={0}
              maxLength={255}
              {...register('password', rules.password)}
            />
            <p className='ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600'>
              {errors.password?.message}
            </p>
          </div>
          <Link
            to={'/forgot-password'}
            className='self-end text-base font-semibold italic text-black hover:underline'
          >
            Forget password?
          </Link>
        </div>

        <Button className='rounded-lg bg-black px-44 py-5 text-base font-semibold text-white'>
          Log in
        </Button>
      </form>

      <p className='-mt-5 text-center font-medium text-gray-500'>
        Don't have an account?{' '}
        <Link to={'/signup'} className='text-base font-semibold italic text-black hover:underline'>
          Sign up
        </Link>
      </p>
    </>
  );
}
