'use client';


// Extend JSX to recognize the custom element

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'ds-mdc-accordion': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}   

export default function Accordion() {
  return <ds-mdc-accordion 
  accordion-items="[{header: 'Accordion Item 1', item: 'This is the content for accordion item 1. It can include text,  images,  or other HTML elements as needed.'}, {header: 'Accordion Item 2', item: 'This is the content for accordion item 2. It can include text,  images,  or other HTML elements as needed.'}, {header: 'Accordion Item 3', item: 'This is the content for accordion item 3. It can include text,  images,  or other HTML elements as needed.'}]"></ds-mdc-accordion>;
}


