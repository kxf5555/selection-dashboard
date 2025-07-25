import React from 'react';
export const Table=({children}:{children:React.ReactNode})=><table className='min-w-full divide-y divide-gray-200'>{children}</table>;
export const TableHeader=({children}:{children:React.ReactNode})=><thead className='bg-gray-100'>{children}</thead>;
export const TableBody=({children}:{children:React.ReactNode})=><tbody className='divide-y divide-gray-200'>{children}</tbody>;
export const TableRow=({children}:{children:React.ReactNode})=><tr>{children}</tr>;
export const TableHead=({children}:{children:React.ReactNode})=><th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>{children}</th>;
export const TableCell=({children}:{children:React.ReactNode})=><td className='px-4 py-2 whitespace-nowrap text-sm text-gray-700'>{children}</td>;
