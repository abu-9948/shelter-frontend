import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
    const [currentSet, setCurrentSet] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    
    const testimonials = [
        {
            name: "Arun Kumar",
            role: "Data Engineer",
            content: "Found my perfect PG near my workplace within a day.",
            rating: 5,
        },
        {
            name: "Aparna",
            role: "Product Manager",
            content: "Safety was my priority. Found a great verified women's PG.",
            rating: 5,
        },
        {
            name: "Haresh Routhu",
            role: "Product Engineer",
            content: "Easy to find budget-friendly options and connect with roommates.",
            rating: 4,
        },
        {
            name: "Sravya",
            role: "Software Developer",
            content: "Perfect platform to find accommodation near tech parks.",
            rating: 5,
        },
        {
            name: "Abu",
            role: "Produc Engineer",
            content: "Connected with colleagues for shared accommodation.",
            rating: 5,
        },
    ];

    const itemsPerSet = 3;
    const totalSets = Math.ceil(testimonials.length / itemsPerSet);

    useEffect(() => {
        let interval;
        if (!isPaused) {
            interval = setInterval(() => {
                setCurrentSet((prev) => (prev + 1) % totalSets);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPaused, totalSets]);

    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={14}
                        className={`${index < rating ? 'fill-indigo-500 text-indigo-500' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    const getCurrentSetTestimonials = () => {
        const startIndex = currentSet * itemsPerSet;
        return testimonials.slice(startIndex, startIndex + itemsPerSet);
    };

    return (
        <div className="my-16 overflow-hidden px-4 md:px-6 max-w-6xl mx-auto">
            <motion.h2
                className="text-3xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                What Our Users Say
            </motion.h2>

            <div 
                className="relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    key={currentSet}
                    transition={{
                        duration: 0.6,
                        staggerChildren: 0.1,
                        ease: "easeOut"
                    }}
                >
                    {getCurrentSetTestimonials().map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                                        <span className="text-indigo-500 font-semibold">
                                            {testimonial.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-indigo-500">{testimonial.role}</p>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    {renderStars(testimonial.rating)}
                                </div>

                                <p className="text-gray-600 text-sm mb-2">{testimonial.content}</p>
                            </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex justify-center mt-8 gap-2">
                    {[...Array(totalSets)].map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentSet(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentSet === index ? 'bg-indigo-500 w-4' : 'bg-gray-300'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Go to slide set ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestimonialsSection;