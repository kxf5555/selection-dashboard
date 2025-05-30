import React from 'react';
export const Card = ({children,className}:{children:React.ReactNode,className?:string}) => <div className={`bg-white rounded-2xl shadow-sm ${className||''}`}>{children}</div>;
export const CardContent = ({children,className}:{children:React.ReactNode,className?:string}) => <div className={`p-4 md:p-6 ${className||''}`}>{children}</div>;
