import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from 'src/components/Button/Button';
import Input from 'src/components/Input';
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
    watch,
    getValues,
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

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <h1 className='text-center text-6xl font-semibold drop-shadow-font'>Create account</h1>

      <form className='flex flex-col gap-6' onSubmit={onSubmit}>
        <Input
          type='text'
          placeholder='Username'
          onChange={onChangeName}
          value={username}
          isFocus={true}
        />
        <Input type='email' placeholder='Email' onChange={onChangeEmail} value={email} />

        <input
          type='password'
          className='w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow'
          autoComplete='on'
          placeholder='Password'
          minLength={0}
          maxLength={255}
          {...register('password', rules.password)}
        />
        <div>
          <input
            type='password'
            className='w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow'
            autoComplete='on'
            placeholder='Confirm password'
            minLength={0}
            maxLength={255}
            {...register('confirmPassword', {
              ...rules.confirmPassword,
              validate: value => getValues('password') === value || 'Password confirm do not match'
            })}
          />
          <p className='ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600'>
            {errors.confirmPassword?.message}
          </p>
        </div>

        <Button className='font-semibol bg-black text-white '>Create account</Button>

        <p className='text-base font-medium text-gray-400'>
          Already have an account?{' '}
          <Link to={'/'} className='font-medium text-black hover:underline'>
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}
