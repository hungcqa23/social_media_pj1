import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { getRules, schema } from 'src/utils/rules';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import authApi from 'src/apis/auth.api';
import { toast } from 'react-toastify';

interface FormData {
  email: string;
}
const forgotPasswordSchema = schema.pick(['email']);
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordSchema)
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: FormData) => authApi.forgotPassword(body),
    onSuccess: () => {
      toast.success('Forgot password successfully. Please check your email', {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    onError: () => {
      toast.error('Please try again', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const onSubmit = handleSubmit(data => {
    forgotPasswordMutation.mutate(data);
    reset();
  });

  const rules = getRules();

  return (
    <>
      <h1 className='mb-8 text-center text-4xl font-semibold drop-shadow-font md:mb-10 md:text-5xl lg:-mx-40 lg:text-6xl'>
        Forgot password
      </h1>

      <p className='mb-4 text-sm md:text-base'>
        Enter the email address you used and we&apos;ll send you code to reset
        your password.
      </p>

      <form
        className='flex flex-col gap-4  self-center'
        onSubmit={onSubmit}
        noValidate
      >
        <Input
          placeholder='Enter your email ...'
          type='email'
          name='email'
          register={register}
          ruleName={rules.email}
          errorMessage={errors.email?.message}
        />

        <Button
          className='mt-2 rounded-lg bg-black px-4 py-3 text-sm font-normal text-white md:px-5 md:py-4 md:text-base md:font-semibold'
          type='submit'
        >
          Submit
        </Button>
      </form>
    </>
  );
}
