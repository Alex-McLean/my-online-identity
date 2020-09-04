declare module 'accordion-js' {
  namespace Accordion {
    interface AccordionOptions {
      duration?: number;
      itemNumber?: number;
      aria?: boolean;
      closeOthers?: boolean;
      showItem?: boolean;
      elementClass?: string;
      questionClass?: string;
      answerClass?: string;
      targetClass?: string;
      onToggle?: (element: HTMLElement, accordionElements: HTMLElement[]) => void;
    }
  }

  class Accordion {
    constructor(selector: string, options?: Accordion.AccordionOptions);
    constructor(selectors: string[], options?: Accordion.AccordionOptions);
  }

  export = Accordion;
}
