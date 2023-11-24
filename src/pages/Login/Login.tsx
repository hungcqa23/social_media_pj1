import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { schema } from 'src/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { useMutation } from '@tanstack/react-query';
import authApi from 'src/apis/auth.api';
import { useAppContext } from 'src/contexts/app.contexts';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import { setAccessTokenToLS, setRefreshTokenToLS } from 'src/utils/auth';

interface FormData {
  email: string;
  password: string;
}

const loginSchema = schema.pick(['email', 'password']);

export default function Login() {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  });

  const onSubmit = handleSubmit(data => {
    loginMutation.mutate(data, {
      onSuccess: data => {
        setAccessTokenToLS(data.data?.data?.access_token as string);
        setRefreshTokenToLS(data.data?.data?.refresh_token as string);
        setIsAuthenticated(true);
        navigate('/');
      },
      // Handle error
      onError: (error: unknown) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach(key => {
              setError(key as keyof FormData, {
                message: 'Invalid data',
                type: 'Server'
              });
            });
          }
        }
      }
    });
  });

  return (
    <div>
      <h1 className='lg:md-10 mb-8 text-center text-4xl font-semibold drop-shadow-font md:text-5xl lg:text-6xl'>
        Instacloud
      </h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-4' noValidate>
        <div className='flex flex-col'>
          <Input
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
        Don&apos;t have an account?
        <Link
          to={'/sign-up'}
          className='text-sm font-normal italic text-black hover:underline md:text-base md:font-semibold'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
