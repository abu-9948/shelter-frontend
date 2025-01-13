import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "./ui/tooltip";
import AccommodationPlaceholder from './AccommodationPlaceholder';

const ImageGallery = ({ images = [] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const hasMultipleImages = images.length > 1;

    useEffect(() => {
        if (!hasMultipleImages) return;
        
        const interval = setInterval(() => {
            if (!isFullscreen) {
                setCurrentImageIndex(current => 
                    current === images.length - 1 ? 0 : current + 1
                );
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [hasMultipleImages, images.length, isFullscreen]);

    const handlePrevImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex(current => 
            current === 0 ? images.length - 1 : current - 1
        );
    };

    const handleNextImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex(current => 
            current === images.length - 1 ? 0 : current + 1
        );
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    if (!images.length) {
        return <AccommodationPlaceholder  />;
    }

    return (
        <TooltipProvider>
            <div className="space-y-4">
                {/* Main Image Display */}
                <Card className="relative w-full h-96 overflow-hidden group">
                    <CardContent className="p-0 h-full">
                        <img
                            src={images[currentImageIndex]}
                            alt={`View ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Navigation Controls */}
                        {hasMultipleImages && (
                            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            onClick={handlePrevImage}
                                            className="rounded-full bg-black/50 hover:bg-black/70"
                                        >
                                            <ChevronLeft className="h-4 w-4 text-white" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Previous image</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            onClick={handleNextImage}
                                            className="rounded-full bg-black/50 hover:bg-black/70"
                                        >
                                            <ChevronRight className="h-4 w-4 text-white" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Next image</TooltipContent>
                                </Tooltip>
                            </div>
                        )}

                        {/* Fullscreen Button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => setIsFullscreen(true)}
                                    className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Expand className="h-4 w-4 text-white" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>View fullscreen</TooltipContent>
                        </Tooltip>

                        {/* Image Counter */}
                        {hasMultipleImages && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Thumbnails */}
                {hasMultipleImages && (
                    <ScrollArea className="w-full" type="scroll">
                        <div className="flex gap-2 p-1">
                            {images.map((image, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={`relative flex-none w-20 h-20 p-0 rounded-lg overflow-hidden ${
                                                index === currentImageIndex ? 'ring-2 ring-[#6366F1]' : 'opacity-70 hover:opacity-100'
                                            }`}
                                            onClick={() => handleThumbnailClick(index)}
                                        >
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>View image {index + 1}</TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </ScrollArea>
                )}

                {/* Fullscreen Dialog */}
                <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                    <DialogContent className="max-w-7xl w-full h-[90vh] p-4 bg-black/95">
                        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X className="h-4 w-4 text-white" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                        
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="max-w-full max-h-full overflow-hidden">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`View ${currentImageIndex + 1}`}
                                    className="max-w-full max-h-[80vh] object-contain mx-auto"
                                />
                            </div>
                            
                            {hasMultipleImages && (
                                <>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={handlePrevImage}
                                        className="absolute left-4 rounded-full bg-black/50 hover:bg-black/70"
                                    >
                                        <ChevronLeft className="h-4 w-4 text-white" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={handleNextImage}
                                        className="absolute right-4 rounded-full bg-black/50 hover:bg-black/70"
                                    >
                                        <ChevronRight className="h-4 w-4 text-white" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    );
};

export default ImageGallery;