'use client';

import React from 'react';

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

