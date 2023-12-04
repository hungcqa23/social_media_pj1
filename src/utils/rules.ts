import { RegisterOptions, UseFormGetValues } from 'react-hook-form';
import { object, InferType, ref } from 'yup';
import * as yup from 'yup';

// type Rules = {
//   [key in 'email' | 'password' | 'confirmPassword' | 'username']?: RegisterOptions;
// };
//Convert Rules type to interface
export interface Rules {
  email?: RegisterOptions;
  password?: RegisterOptions;
  confirmPassword?: RegisterOptions;
  username?: RegisterOptions;
}

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  username: {
    required: {
      value: true,
      message: 'Username is required'
    },
    maxLength: {
      value: 8,
      message: 'The length of username should be less than 8 characters'
    }
  },
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email'
    },
    minLength: {
      value: 5,
      message: 'The length of email should be 5 - 255 characters'
    },
    maxLength: {
      value: 255,
      message: 'The length of email should be 5 - 255 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    minLength: {
      value: 5,
      message: 'The length of password should be 5 - 255 characters'
    },
    maxLength: {
      value: 255,
      message: 'The length of password should be 5 - 255 characters'
    }
  },
  confirmPassword: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    minLength: {
      value: 5,
      message: 'The length of confirm password should be 5 - 255 characters'
    },
    maxLength: {
      value: 255,
      message: 'The length of confirm password should be 5 - 255 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value: string) =>
            value === getValues('password') || 'Password confirm do not match'
        : undefined
  }
});

export const schema = object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .min(5, 'The length of email should be 5 - 255 characters')
    .max(255, 'The length of email should be 5 - 255 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'The length of username should be 5 - 100 characters')
    .max(100, 'The length of username should be 5 - 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'The length of password should be 5 - 255 characters')
    .max(255, 'The length of password should be 5 - 255 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(5, 'The length of confirm password should be 5 - 255 characters')
    .max(255, 'The length of confirm password should be 5 - 255 characters')
    .oneOf([ref('password')], 'Password confirm do not match')
});

export interface Schema extends InferType<typeof schema> {
  confirmPassword: string;
}

//Make rulesType to interface
// export interface rulesType extends Pick<Schema, 'password' | 'confirmPassword'> {}
