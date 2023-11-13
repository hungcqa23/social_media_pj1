import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
  register?: UseFormRegister<any>;
  ruleName?: RegisterOptions;
  name?: string;
}

export default function Input(props: Props) {
  const {
    errorMessage,
    className,
    classNameError = 'ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600',
    classNameInput = 'block w-full rounded-lg border lg:px-5 lg:py-4 px-4 py-3 text-sm md:text-base md:font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow font-normal',
    register,
    name,
    ruleName,
    ...rest
  } = props;

  const registerResult = register && name ? register(name, ruleName) : null;

  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  );
}
