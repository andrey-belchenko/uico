/**
* DevExtreme (core/dom_adapter.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface DomAdapter {
  getActiveElement(element?: HTMLElement | null): HTMLElement;
  getDocument(): Document;
  getDocumentElement(): HTMLDocument & {
    scrollLeft: number;
    scrollTop: number;
    clientWidth: number;
    scrollHeight: number;
    offsetHeight: number;
    clientHeight: number;
  };
  isNode(node: unknown): boolean;
  getBody(): HTMLBodyElement;
  getRootNode(element: HTMLElement): Document | DocumentFragment;
  isElementNode(element: unknown): boolean;
  createElement(tagName: string, context?: Document): HTMLElement;
  createDocumentFragment(): DocumentFragment;
  setClass(element: HTMLElement, className: string, isAdd: boolean): void;
  removeElement(element: HTMLElement): void;
  inject(obj: Record<string, unknown>): void;
  setStyle(element: HTMLElement, name: string, value: string): void;
  insertElement(parentElement: HTMLElement, newElement: HTMLElement, nextSiblingElement?: HTMLElement): void;
}

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
declare const domAdapter: DomAdapter;
export default domAdapter;
