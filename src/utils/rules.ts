import { RegisterOptions, UseFormGetValues } from 'react-hook-form';

type Rules = {
  [key in 'email' | 'password' | 'confirmPassword']?: RegisterOptions;
};

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email'
    },
    maxLength: {
      value: 255,
      message: 'The length of email should be 5 - 255 characters'
    },
    minLength: {
      value: 5,
      message: 'The length of email should be 5 - 255 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 255,
      message: 'The length of password should be 5 - 255 characters'
    },
    minLength: {
      value: 5,
      message: 'The length of password should be 5 - 255 characters'
    }
  },
  confirmPassword: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    maxLength: {
      value: 255,
      message: 'The length of confirm password should be 5 - 255 characters'
    },
    minLength: {
      value: 5,
      message: 'The length of confirm password should be 5 - 255 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value: string) => value === getValues('password') || 'Password confirm do not match'
        : undefined
  }
});
