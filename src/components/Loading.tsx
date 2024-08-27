import { create } from 'zustand';

const Loading = () => {
  const {isLoading} = useLoading();
  
  if(!isLoading) return (<div></div>);
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-4 h-4 bg-sub rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-sub rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-sub rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;

type LoadingState = {
  isLoading: boolean;
  setLoading: (bool: boolean) => void;
}

const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (bool) => set(() => ({ isLoading: bool })),
}));

export {
  useLoading
}