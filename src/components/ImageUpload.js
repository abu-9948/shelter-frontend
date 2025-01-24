import React, { useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from './ui/button';

const ImageUpload = ({ images, onImageUpload, onRemoveImage, disabled }) => {
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        return () => {
            images.forEach(image => {
                if (image.preview && !image.isExisting) {
                    URL.revokeObjectURL(image.preview);
                }
            });
        };
    }, [images]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const existingImageCount = images.length;
        
        if (files.length + existingImageCount > 5) {
            alert('Maximum 5 images allowed');
            return;
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            isExisting: false
        }));

        onImageUpload(newImages);
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getImageSrc = (image) => {
        if (image.isExisting) {
            return image.url;
        }
        return image.preview;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-gray-900 font-medium">
                    Property Images (Max 5)<span className="text-red-500 ml-1">*</span>
                </label>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || images.length >= 5}
                    className="flex items-center gap-2"
                >
                    <Upload className="w-4 h-4" />
                    Upload Images
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={disabled}
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={getImageSrc(image)}
                            alt={`Property ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                                console.error('Error loading image:', image);
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => onRemoveImage(index)}
                            disabled={disabled}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                                     opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;