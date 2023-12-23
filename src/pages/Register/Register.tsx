import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import path from 'src/constants/path';
import { getRules } from 'src/utils/rules';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export default function Register() {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>();
  const navigate = useNavigate();

  const rules = getRules(getValues);
  const signUpMutation = useMutation({
    mutationFn: (
      body: Pick<
        FormData,
        'email' | 'password' | 'username' | 'firstName' | 'lastName'
      >
    ) => authApi.registerAccount(body)
  });

  const onSubmit = handleSubmit(
    data => {
      signUpMutation.mutate(
        {
          username: data.username,
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName
        },
        {
          onSuccess: () => {
            reset(),
              toast.success('Register successfully', {
                position: toast.POSITION.TOP_RIGHT
              });
            navigate(path.login);
          }
        }
      );
    },
    data => {
      console.log(data);
    }
  );

  return (
    <>
      <h1 className='mb-8 text-center font-cookie text-4xl font-semibold drop-shadow-font md:mb-10 md:text-5xl lg:-mx-40 lg:text-5xl'>
        Create account
      </h1>

      <form className='flex flex-col' onSubmit={onSubmit} noValidate>
        <div className='flex gap-2'>
          <Input
            type='text'
            placeholder='First Name...'
            name='firstName'
            register={register}
            ruleName={rules.username}
            errorMessage={errors.username?.message}
          />
          <Input
            type='text'
            placeholder='Last Name...'
            name='lastName'
            register={register}
            ruleName={rules.username}
            errorMessage={errors.username?.message}
          />
        </div>

        <Input
          type='text'
          placeholder='Username...'
          name='username'
          register={register}
          ruleName={rules.username}
          errorMessage={errors.username?.message}
        />

        <Input
          type='email'
          placeholder='Email...'
          name='email'
          register={register}
          ruleName={rules.email}
          errorMessage={errors.email?.message}
        />

        <Input
          type='password'
          placeholder='Password...'
          name='password'
          register={register}
          ruleName={rules.password}
          errorMessage={errors.password?.message}
        />

        <Input
          type='password'
          placeholder='Confirm password...'
          name='confirmPassword'
          register={register}
          ruleName={rules.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />

        <Button
          className='flex items-center justify-center gap-1 rounded bg-black px-2 py-3 text-sm font-normal text-white md:px-4 md:py-3 md:text-sm md:font-semibold'
          type='submit'
          isLoading={signUpMutation.isPending}
          disabled={signUpMutation.isPending}
        >
          Create account
        </Button>

        <p className='mt-10 text-center text-sm font-medium text-gray-500'>
          Already have an account?{' '}
          <Link
            to={path.login}
            className='font-medium text-black hover:underline'
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}
