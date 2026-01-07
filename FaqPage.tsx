
import React, { useState } from 'react';
import { FAQS } from '../constants';

interface AccordionItemProps {
    item: {
        question: string;
        answer: string;
    };
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-light-neutral">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-5 px-6"
            >
                <span className="text-lg font-medium text-light-text">{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-text/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-light-text/80 pb-5 px-6">{item.answer}</p>
            </div>
        </div>
    );
};


const FaqPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-light-text">Frequently Asked Questions</h1>
                <p className="max-w-2xl mx-auto text-light-text/70 mt-4">Find answers to common questions about our platform, privacy, and services.</p>
            </div>

            <div className="max-w-3xl mx-auto bg-dark-neutral rounded-xl shadow-lg border border-light-neutral/50 overflow-hidden">
                {FAQS.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        item={faq}
                        isOpen={openIndex === index}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FaqPage;