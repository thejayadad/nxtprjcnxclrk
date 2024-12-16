'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import qs from 'query-string';

interface CatItemProps {
    label: string;
    selected?: boolean;
}

const CatItem:  React.FC<CatItemProps>= ({label, selected}) => {
    const router = useRouter()
    const params = useSearchParams()
    const handleClick = useCallback(() => {
        let currentQuery = {}
        if(params){
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }
        if(params?.get('category') === label){
            delete updatedQuery.category
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true})
        router.push(url)
    }, [label, params, router])
  return (
    <div
    onClick={handleClick}
    className={`border-b-2 font-medium text-sm hover:text-neutral-800 transition cursor-pointer
        ${selected ? 'border-b-neutral-800 text-yellow-800' : 'border-transparent'}
        `}
    >
        {label}
    </div>
  )
}

export default CatItem