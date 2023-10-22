import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { getRules } from 'src/utils/rules';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit(data => {
    console.log(getValues());
    console.log(data);
  });

  const rules = getRules(getValues);

  return (
    <>
      <h1 className='-mx-60 mb-10 text-center text-6xl font-semibold drop-shadow-font'>
        Forgot password?
      </h1>

      <form className='flex w-11/12 flex-col gap-4  self-center' onSubmit={onSubmit} noValidate>
        <p className='text-xl'>
          Enter the email address you used and we'll send you code to reset your password.
        </p>

        <Input
          placeholder='Enter your email ...'
          type='email'
          name='email'
          register={register}
          ruleName={rules.email}
        />

        <Button
          className='w-full rounded-lg bg-black py-5 text-base font-semibold text-white'
          type='submit'
        >
          Continue
        </Button>
      </form>
    </>
  );
}
