'use client';
import React, { ChangeEvent } from 'react';

// Define the props interface
interface CustomCarInputProps {
    type: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: any;
    name: string;
    minLength?: number;
    isRequired: boolean;
    maxLength?: number;
    label: string;
}

const CustomCarInput: React.FC<CustomCarInputProps> = ({
    type,
    placeholder,
    onChange,
    value,
    name,
    minLength,
    isRequired,
    maxLength,
    label
}) => {


    return (
        <div className="w-full">
            <p className='text-gray-800 mb-2 font-medium' >{label}</p>
            <div
                tabIndex={0}
                className={`bg-[#CF9FFF0F] w-full py-0.5 flex relative gap-2 justify-between items-center px-3 rounded-lg 
                            border-0 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple`}
            >
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    name={name}
                    maxLength={maxLength}
                    required={isRequired}
                    minLength={minLength}
                    className={`flex-1 py-3 px-1 bg-transparent h-full outline-none placeholder:text-gray`}
                />
            </div>
        </div>
    );
};

export default CustomCarInput;
