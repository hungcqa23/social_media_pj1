import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { useQueryString } from 'src/hooks/useQueryString';
import { clearLS } from 'src/utils/auth';
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
  const { token } = useQueryString();
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation({
    mutationFn: (body: {
      password: string;
      confirmPassword: string;
      token: string;
    }) => authApi.resetPassword(body)
  });

  const rules = getRules(getValues);
  const onSubmit = handleSubmit(
    data => {
      resetPasswordMutation.mutate(
        { ...data, token: token || '' },
        {
          onSuccess: data => {
            clearLS();
            toast.success('Reset password successfully', {
              position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(() => {
              navigate('/login');
            });
          },
          onError: () => {
            toast.error('Reset password failed. Please try again', {
              position: toast.POSITION.TOP_RIGHT
            });
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
          classNameError='ml-1 mt-1 min-h-[3rem] text-sm font-medium text-red-600'
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
