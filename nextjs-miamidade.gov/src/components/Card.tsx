'use client';

import React from 'react';

// Extend JSX to recognize the custom element
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'ds-mdc-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return <ds-mdc-card
    title={title}
    description={description}
    >
  </ds-mdc-card>;
}


