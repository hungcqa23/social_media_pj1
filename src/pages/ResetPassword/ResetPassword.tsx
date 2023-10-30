import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { getRules } from 'src/utils/rules';

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const {
    register,
    getValues,
    handleSubmit,
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

  return (
    <>
      <h1 className='mb-8 text-center text-4xl font-semibold drop-shadow-font md:mb-10 md:text-5xl lg:-mx-40 lg:text-6xl'>
        Reset Password
      </h1>

      <p className='mb-4 text-base font-normal'>
        Enter a new password below to change your password
      </p>

      <form className='flex flex-col' onSubmit={onSubmit}>
        <Input
          type='password'
          name='password'
          register={register}
          placeholder='Enter new password...'
          ruleName={rules.password}
          errorMessage={errors.password?.message}
        />

        <Input
          type='password'
          name='confirmPassword'
          register={register}
          placeholder='Confirm password...'
          ruleName={rules.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />

        <Button
          className='w-full rounded-lg bg-black px-4 py-3 text-sm font-normal text-white md:text-base md:font-semibold'
          type='submit'
        >
          Continue
        </Button>
      </form>
    </>
  );
}
