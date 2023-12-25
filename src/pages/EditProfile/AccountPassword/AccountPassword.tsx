import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { error } from 'console';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { profileApi } from 'src/apis/profile.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { ErrorResponse } from 'src/types/utils.type';
import { schema } from 'src/utils/rules';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { Schema } from 'yup';

interface FormData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
const changePasswordSchema = schema.pick([
  'password',
  'confirmPassword',
  'currentPassword'
]);
export default function AccountPassword() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema)
  });
  const updatePasswordMutation = useMutation({
    mutationFn: (body: FormData) => profileApi.updatePassword(body)
  });
  const onSubmit = handleSubmit(data => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Update password successfully', {
          position: 'top-right'
        });
        reset();
      },
      onError: (error: unknown) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach(key => {
              setError(key as keyof FormData, {
                message: 'Invalid data',
                type: 'Server'
              });
            });
          }
        }
      }
    });
  });
  return (
    <form onSubmit={onSubmit} noValidate>
      <h2 className='mb-4 text-xl font-semibold'>Your password</h2>
      <>
        <div>
          <label
            htmlFor='current_password'
            className='mb-2 inline-block text-sm font-medium'
          >
            Current password
          </label>
          <Input
            id='current_password'
            type='password'
            placeholder='Current password'
            name={'currentPassword'}
            register={register}
            errorMessage={errors.currentPassword?.message}
          />
        </div>
        <div>
          <label
            htmlFor='new_password'
            className='mb-2 inline-block text-sm font-medium'
          >
            New Password
          </label>
          <Input
            id='new_password'
            type='password'
            placeholder='New password...'
            name={'password'}
            errorMessage={errors.password?.message}
            register={register}
          />
        </div>
        <div>
          <label
            htmlFor='confirm_password'
            className='mb-2 inline-block text-sm font-medium'
          >
            Confirm New password
          </label>
          <Input
            id='confirm_password'
            type='password'
            placeholder='Re-type your password...'
            name={'confirmPassword'}
            errorMessage={errors.confirmPassword?.message}
            register={register}
          />
        </div>
      </>

      <div className='flex w-full items-center justify-center'>
        <Button
          className='h-10 w-24 rounded-lg bg-blue-500 font-medium text-white'
          type='submit'
        >
          Save
        </Button>
      </div>
    </form>
  );
}
