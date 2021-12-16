import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: toast.POSITION.BOTTOM_LEFT
}

const success = (message: string, options: ToastOptions = {}) => {
  toast(message, {
    ...defaultOptions,
    ...options,
    type: 'success'
  });
}

const info = (message: string, options: ToastOptions = {}) => {
  toast(message, {
    ...defaultOptions,
    ...options,
    type: 'info'
  });
}

const error = (message: string, options: ToastOptions = {}) => {
  toast(message, {
    ...defaultOptions,
    ...options,
    type: 'error'
  });
}

export const Toast = {
  success,
  info,
  error
}