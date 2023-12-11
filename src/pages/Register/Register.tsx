import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>();

  const rules = getRules(getValues);
  const signUpMutation = useMutation({
    mutationFn: (body: FormData) => authApi.registerAccount(body)
  });

  const onSubmit = handleSubmit(
    data => {
      signUpMutation.mutate(data);
    },
    data => {
      console.log(data);
    }
  );

  return (
    <>
      <h1 className='mb-8 text-center text-4xl font-semibold drop-shadow-font md:mb-10 md:text-5xl lg:-mx-40 lg:text-6xl'>
        Create account
      </h1>

      <form className='flex flex-col' onSubmit={onSubmit} noValidate>
        <Input
          type='text'
          placeholder='Username'
          name='username'
          register={register}
          ruleName={rules.username}
          errorMessage={errors.username?.message}
        />

        <Input
          type='email'
          placeholder='Email'
          name='email'
          register={register}
          ruleName={rules.email}
          errorMessage={errors.email?.message}
        />

        <Input
          type='password'
          placeholder='Password'
          name='password'
          register={register}
          ruleName={rules.password}
          errorMessage={errors.password?.message}
        />

        <Input
          type='password'
          placeholder='Confirm password'
          name='confirmPassword'
          register={register}
          ruleName={rules.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />

        <Button
          className='flex items-center justify-center gap-1 rounded-lg bg-black px-4 py-3 text-sm font-normal text-white md:px-5 md:py-4 md:text-base md:font-semibold'
          type='submit'
          isLoading={signUpMutation.isPending}
          disabled={signUpMutation.isPending}
        >
          Create account
        </Button>

        <p className='mt-10 text-center text-sm font-medium text-gray-500 md:text-base'>
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
