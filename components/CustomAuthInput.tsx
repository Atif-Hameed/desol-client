'use client';
import React, { useState, ChangeEvent } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// Define the props interface
interface CustomAuthInputProps {
    type: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void; 
    value: string;
    icon: React.ReactNode;
    name: string; 
}

const CustomAuthInput: React.FC<CustomAuthInputProps> = ({
    type,
    placeholder,
    onChange,
    value,
    icon,
    name
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="w-full">
            <div
                tabIndex={0}
                className={`bg-[#CF9FFF0F] w-full py-0.5 flex relative gap-2 justify-between items-center px-3 rounded-lg 
                            border-0 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple`}
            >
                <div className="w-fit text-gray text-xl">
                    {icon}
                </div>
                <input
                    type={showPassword && type === 'password' ? 'text' : type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    name={name}
                    className={`flex-1 py-3 px-1 bg-transparent h-full outline-none placeholder:text-gray`}
                />
                {type === 'password' && (
                    <div
                        className="absolute right-3 cursor-pointer text-gray"
                        onClick={handleTogglePassword}
                    >
                        {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomAuthInput;
