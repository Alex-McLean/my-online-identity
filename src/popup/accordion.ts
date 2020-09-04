import 'accordion-js/dist/accordion.min.css';
import * as Accordion from 'accordion-js';

export const createAccordions = (options?: Accordion.AccordionOptions): void => {
  new Accordion('.accordion-container', {
    closeOthers: false,
    ...options,
  });
};
