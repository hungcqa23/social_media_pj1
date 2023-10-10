import { Form, Link, useSubmit } from 'react-router-dom';
import { useState } from 'react';
import Input from 'src/components/Input';
import Button from 'src/components/Button';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h1 className='text-center text-6xl font-semibold drop-shadow-font'>Instataolao</h1>

      <form action='/submit-action' className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
          <Input
            placeholder='Email'
            type='text'
            isFocus={true}
            required={true}
            value={email}
            onChange={onChangeName}
          />
          <Input
            placeholder='Password'
            type='password'
            required={true}
            value={password}
            onChange={onChangePassword}
          />
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
