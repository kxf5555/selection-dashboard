import React from 'react';
const variants={default:'bg-blue-600 hover:bg-blue-700 text-white',secondary:'bg-blue-100 hover:bg-blue-200 text-blue-700'};
export function Button({variant='default',className,...props}:{variant?:keyof typeof variants}&React.ButtonHTMLAttributes<HTMLButtonElement>){
  return <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${variants[variant]} ${className||''}`} {...props}/>
}
