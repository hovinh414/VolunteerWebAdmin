import { toast } from 'react-toastify';

const notify = (content, type) => {
  if (!['info', 'success', 'warning', 'error'].includes(type)) {
    throw new Error('Invalid notification type.');
  }

  toast(content, {
    position: 'top-right',
    autoClose: 5000,
    theme: 'light',
    type,
  });
};
export default notify

