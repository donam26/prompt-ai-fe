declare module 'masonry-layout' {
  interface MasonryOptions {
    itemSelector?: string;
    columnWidth?: string | number;
    percentPosition?: boolean;
    gutter?: number;
    horizontalOrder?: boolean;
    stamp?: string;
    fitWidth?: boolean;
    originLeft?: boolean;
    originTop?: boolean;
    containerStyle?: string;
    transitionDuration?: string;
    stagger?: number;
    resize?: boolean;
    initLayout?: boolean;
  }

  class Masonry {
    constructor(element: Element | string, options?: MasonryOptions);
    layout(): void;
    destroy(): void;
    reloadItems(): void;
    addItems(elements: Element | Element[] | NodeList): void;
    remove(elements: Element | Element[] | NodeList): void;
    on(eventName: string, listener: (...args: any[]) => void): void;
    off(eventName: string, listener: (...args: any[]) => void): void;
    once(eventName: string, listener: (...args: any[]) => void): void;
  }

  export = Masonry;
}
