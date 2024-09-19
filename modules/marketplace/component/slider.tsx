import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";

import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

// Add prop type definitions for better validation
interface SliderProps {
  updateImage: (image: string) => void;
  slider0: string;
  images: (string | StaticImageData)[];
  visibleCount: number; // Optional prop for the number of visible images
}

const Slider: React.FC<SliderProps> = ({ updateImage, slider0, images, visibleCount}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides: string[] = [slider0, ...images.map(image => typeof image === 'string' ? image : image.src)];

    console.log("Number of slides:", slides);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 ));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
    };

    const handleUpdateImage = (index: number) => {
        if (index >= 0 && index < slides.length) {
            setCurrentIndex(index); // Update currentIndex to prevent overlapping
            updateImage(slides[index]);
        } else {
            console.error("Invalid index in handleUpdateImage.");
        }
    };

    const getDisplayImages = () => {
        // Consistent class styling for images
        const imageClass = "object-cover lg:w-[150px] md:w-[180px] w-[90px] lg:h-[100px] md:h-[131px] h-[95px] rounded-lg cursor-pointer";

        // Determine the images to display, ensuring they are in the correct order
        const maxVisibleImages = 6; // Assuming you want to show 5 images at once
        const slidesLength = slides.length;

        // Get the indexes for the images to display
        const displayIndexes = [];
        for (let i = 0; i < maxVisibleImages; i++) {
            const index = (currentIndex + i) % slidesLength; // Loop back if at the end
            displayIndexes.push(index);
        }

        // Create Image components for display
        return displayIndexes.map((index) => (
            <Image
                key={index}
                src={slides[index]} // Directly access the slide using the index
                width={500}
                height={500}
                alt={`Image ${index + 1}`}
                className={imageClass}
                onClick={() => handleUpdateImage(index)} // Update when clicked
            />
        ));
    };


  return (
    <div className="relative w-full mx-auto">
        <button
            onClick={handlePrev}
            className="px-2 py-2 rounded-full shadow-lg w-fit absolute bg-brand-Light_Sky_Blue-primary top-8 -left-[10px] lg:block hidden cursor-pointer"
            aria-label="Previous slide"
            disabled={currentIndex === 0}
        >
            <ArrowLeft2 size="10" color="#fff" />
        </button>

        <div className="flex w-full justify-evenly gap-x-2 overflow-hidden">
            {getDisplayImages()}
        </div>

        <button
            onClick={handleNext}
            className="px-2 py-2 rounded-full shadow-lg w-fit absolute bg-brand-Light_Sky_Blue-primary top-8 -right-[10px] lg:block hidden cursor-pointer"
            aria-label="Next slide"
            disabled={currentIndex === slides.length - 1}
        >
            <ArrowRight2 size="10" color="#fff" />
        </button>
    </div>
  );
};

export default Slider;
