import { useAlert } from '../store';

const Alert = () => {
  const alert = useAlert();
  if(!alert.show) return (<div></div>);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col justify-between bg-bg p-4 rounded-lg w-[300px] min-h-[200px] border-2 border-error-1">
        <div>
        <p className='custom-text-2 font-bold text-error-1'>{alert.title}</p>
        <p className='custom-text-1 text-error-1'>{alert.message}</p>
        </div>
        <button onClick={() => alert.setShow(false)} className='bg-error-1 custom-text-1 text-bg font-bold rounded-md w-[100%] py-2'>Ok</button>
      </div>
    </div>
  );
};

export default Alert;