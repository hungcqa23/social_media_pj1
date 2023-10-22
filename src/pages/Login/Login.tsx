import { Link } from 'react-router-dom';
import Button from 'src/components/Button/Button';
import { useForm } from 'react-hook-form';
import { getRules } from 'src/utils/rules';
import Input from 'src/components/Input';

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
      <h1 className='mb-10 text-center text-6xl font-semibold drop-shadow-font'>Instataolao</h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-4' noValidate>
        <div className='flex flex-col'>
          <Input
            autoFocus={true}
            placeholder='Email'
            type='email'
            name='email'
            register={register}
            ruleName={rules.email}
            errorMessage={errors.email?.message}
          />

          <Input
            placeholder='Password'
            type='password'
            name='password'
            register={register}
            ruleName={rules.password}
            errorMessage={errors.password?.message}
          />
          <Link
            to={'/forgot-password'}
            className='self-end text-base font-semibold italic text-black hover:underline'
          >
            Forget password?
          </Link>
        </div>

        <Button className='rounded-lg bg-black px-40 py-5 text-base font-semibold text-white'>
          Log in
        </Button>
      </form>

      <p className='mt-10 text-center font-medium text-gray-500'>
        Don't have an account?{' '}
        <Link to={'/signup'} className='text-base font-semibold italic text-black hover:underline'>
          Sign up
        </Link>
      </p>
    </>
  );
}
