import { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <h1 className='text-center text-6xl font-semibold drop-shadow-font'>Create account</h1>

      <form action='#' className='flex flex-col gap-6' onSubmit={e => e.preventDefault()}>
        <Input
          type='text'
          placeholder='Username'
          onChange={onChangeName}
          value={username}
          isFocus={true}
        />
        <Input type='email' placeholder='Email' onChange={onChangeEmail} value={email} />
        <Input
          type='password'
          placeholder='Password'
          onChange={onChangePassword}
          value={password}
        />
        <Input
          type='password'
          placeholder='Confirm password'
          onChange={onChangeConfirmPassword}
          value={confirmPassword}
        />
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
