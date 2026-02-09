'use client';

import React, {useEffect, useRef} from 'react';


export interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {

    const cardRef = useRef<any>(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.title = title;
            cardRef.current.description = description;
        }
    }, [title, description]);


  return <ds-mdc-card
    ref={cardRef}
    >
  </ds-mdc-card>;
}

