import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import authApi from 'src/apis/auth.api';
import { setAccessTokenToLS, setProfileToLS } from 'src/utils/auth';
import { ErrorResponse } from 'src/types/utils.type';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { schema } from 'src/utils/rules';
import { useAppContext } from 'src/contexts/app.contexts';
import path from 'src/constants/path';

interface FormData {
  username: string;
  password: string;
}

const loginSchema = schema.pick(['username', 'password']);

export default function Login() {
  const { setIsAuthenticated, setProfile } = useAppContext();
  const navigate = useNavigate();
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
        toast.success('Login successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
        setProfile(data.data.user);
        setTimeout(() => {
          setIsAuthenticated(true);
          navigate('/login');
        }, 2000);
      },

      onError: (error: unknown) => {
        toast.error('Login failed', {
          position: toast.POSITION.TOP_RIGHT
        });
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
      <h1 className='lg:md-10 mb-8 text-center font-cookie text-4xl font-semibold drop-shadow-font md:text-5xl lg:text-6xl'>
        Instacloud
      </h1>

      <form onSubmit={onSubmit} className='flex flex-col gap-4' noValidate>
        <div className='flex flex-col'>
          <Input
            placeholder='Username'
            type='username'
            name='username'
            register={register}
            errorMessage={errors.username?.message}
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
            className='self-end text-sm font-normal italic text-black hover:underline md:font-semibold'
          >
            Forget password?
          </Link>
        </div>

        <Button
          className='flex items-center justify-center gap-1 rounded bg-black px-2 py-3 text-sm font-normal text-white md:px-4 md:py-3 md:text-sm md:font-semibold'
          isLoading={loginMutation.isPending}
          disabled={loginMutation.isPending}
        >
          Login
        </Button>
      </form>

      <p className='mt-10 text-center text-sm font-medium text-gray-500 md:text-sm'>
        Don&apos;t have an account?
        <Link
          to={path.register}
          className='text-sm font-normal text-black hover:underline md:text-sm md:font-semibold'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
