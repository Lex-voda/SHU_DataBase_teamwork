import toast from 'react-hot-toast';

const message = (msg: string): string => toast(msg);
const success = (msg: string): string => toast.success(msg);
const error = (msg: string): string => toast.error(msg);
const loading = (msg: string): string => toast.loading(msg);

export { error, loading, message, success };
