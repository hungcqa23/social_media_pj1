import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  register: UseFormRegister<any>;
  ruleName?: RegisterOptions;
  name: string;
}

export default function Input(props: Props) {
  const {
    errorMessage,
    className,
    classNameError = 'ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600',
    classNameInput = 'w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow',
    register,
    name,
    ruleName,
    ...rest
  } = props;

  return (
    <div className={className}>
      <input className={classNameInput} {...register(name, ruleName)} {...rest} />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  );
}
