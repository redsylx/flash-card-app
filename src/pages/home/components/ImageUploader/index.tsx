import { ChangeEvent, useRef } from "react";
import useImageUploader from "./store";

export default () => {
  const image = useImageUploader();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      image.setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        image.setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    image.setImage(null);
    image.setPreviewUrl("");
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className="flex items-center">
      <div className="me-4">
        {image.previewUrl ? (
          <img
            src={image.previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover border-2 border-sub rounded-lg"
          />
        ) : (
          <div className="w-32 h-32 border-2 border-sub-alt rounded-lg"></div>
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={inputFileRef}
          className="hidden"
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={handleButtonClick}
            className="bg-sub text-text px-4 py-2 rounded-lg"
          >
            Select Image
          </button>
          {image.previewUrl && (
            <button
              onClick={handleRemoveImage}
              className="bg-error-1 text-bg px-4 py-2 rounded-lg"
            >
              Remove Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};