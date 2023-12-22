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
    .min(4, 'The length of username should be 4 - 20 characters')
    .max(20, 'The length of username should be 4 - 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'The length of password should be 4 - 255 characters')
    .max(255, 'The length of password should be 4 - 255 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(4, 'The length of confirm password should be 4 - 255 characters')
    .max(255, 'The length of confirm password should be 4 - 255 characters')
    .oneOf([ref('password')], 'Password confirm do not match')
});

export interface Schema extends InferType<typeof schema> {
  confirmPassword: string;
}

export const profile = yup.object({
  facebook: yup.string().max(100, 'Độ dài tối đa là 100 ký tự'),
  youtube: yup.string().max(100, 'Độ dài tối đa là 100 ký tự'),
  twitter: yup.string().max(100, 'Độ dài tối đa là 100 ký tự'),
  quote: yup.string().max(150, 'Độ dài tối đa là 150 ký tự'),
  work: yup.string().max(100, 'Độ dài tối đa là 100 ký tự'),
  school: yup.string().max(100, 'Độ dài tối đa là 100 ký tự'),
  location: yup.string().max(100, 'Độ dài tối đa là 100 ký tự'),
  password: schema.fields['password'] as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
});

export type ProfileSchema = yup.InferType<typeof profile>;
