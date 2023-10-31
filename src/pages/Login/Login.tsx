import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getRules, schema } from 'src/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'src/components/Button';
import Input from 'src/components/Input';

interface FormData {
  email: string;
  password: string;
}

const loginSchema = schema.pick(['email', 'password']);

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const rules = getRules();

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });
  return (
    <div>
      <h1 className='lg:md-10 mb-8 text-center text-4xl font-semibold drop-shadow-font md:text-5xl lg:text-6xl'>
        Instataolao
      </h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-4' noValidate>
        <div className='flex flex-col'>
          <Input
            autoFocus={true}
            placeholder='Email'
            type='email'
            name='email'
            register={register}
            errorMessage={errors.email?.message}
            autoComplete='on'
          />

          <Input
            placeholder='Password'
            type='password'
            name='password'
            register={register}
            errorMessage={errors.password?.message}
            autoComplete='current-password'
          />
          <Link
            to={'/forgot-password'}
            className='self-end text-sm font-normal italic text-black hover:underline md:text-base md:font-semibold'
          >
            Forget password?
          </Link>
        </div>

        <Button className='rounded-lg bg-black px-4 py-3 text-sm font-normal text-white md:px-5 md:py-4 md:text-base md:font-semibold'>
          Log in
        </Button>
      </form>

      <p className='mt-10 text-center text-sm font-medium text-gray-500 md:text-base'>
        Don't have an account?{' '}
        <Link
          to={'/signup'}
          className='text-sm font-normal italic text-black hover:underline md:text-base md:font-semibold'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
