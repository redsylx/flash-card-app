import { create } from 'zustand';

type ImageUploaderState = {
  image: File | null;
  previewUrl: string;
  setImage: (image: File | null) => void;
  setPreviewUrl: (url: string) => void;
}

const useImageUploader = create<ImageUploaderState>((set) => ({
  image: null,
  previewUrl: '',
  
  setImage: (image: File | null) => set({ image }),
  setPreviewUrl: (url: string) => set({ previewUrl: url }),
}));

export default useImageUploader;