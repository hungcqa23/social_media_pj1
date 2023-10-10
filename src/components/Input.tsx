import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

interface Props {
  value: string;
  placeholder: string;
  className?: string;
  isFocus?: boolean;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props) {
  const { placeholder, className, isFocus, type, required, value, onChange } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={
        className
          ? className
          : 'w-full rounded-lg border p-4 text-base font-medium text-gray-700 outline-none focus:text-gray-700 focus:shadow'
      }
      required={required ? required : false}
      value={value}
      minLength={0}
      maxLength={255}
      autoFocus={isFocus ? isFocus : false}
      onChange={onChange}
      autoComplete='current-password'
    />
  );
}