import React from 'react';
export const Input = (props:React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring focus:ring-blue-200 ${props.className||''}`}/>;
