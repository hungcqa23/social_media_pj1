import Input from 'src/components/Input';
import { useState } from 'react';
import Button from 'src/components/Button/Button';
import { Form } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <h1 className='-mx-60 text-center text-6xl font-semibold drop-shadow-font'>
        Forgot password?
      </h1>

      <form className='flex w-11/12 flex-col gap-4  self-center' onSubmit={e => e.preventDefault()}>
        <p className='text-xl'>
          Enter the email address you used and we'll send you code to reset your password.
        </p>
        <Input
          placeholder='Enter your email ...'
          type='email'
          required={true}
          onChange={onChangeName}
          value={email}
        />
        <Button
          className='rounded-lg bg-black px-44 py-5 text-base font-semibold text-white'
          type='submit'
        >
          Continue
        </Button>
      </form>
    </>
  );
}
