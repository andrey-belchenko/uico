/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

import { ReactNode } from 'react';
import { ITemplate } from './configuration/config-node';
interface DXTemplate {
    render: RenderFunc;
}
type RenderFunc = (arg: RenderArgs) => HTMLElement;
interface TemplateArgs {
    data: any;
    index?: number;
    onRendered: () => void;
}
export interface RenderArgs {
    model?: any;
    container: any;
    index?: any;
    onRendered?: () => void;
}
export interface UpdateLocker {
    lock: () => void;
    unlock: () => void;
}
export type DXTemplateCollection = Record<string, DXTemplate>;
export interface TemplateWrapperProps {
    templateFactory: TemplateFunc;
    data: any;
    index: number;
    container: HTMLElement;
    onRendered: () => void;
    onRemoved: () => void;
}
export type TemplateFunc = (arg: TemplateArgs) => JSX.Element | ReactNode;
export type UpdateTemplateFunc = (onUpdated: () => void) => void;
export interface InitArgument {
    createDXTemplates: DXTemplateCreator;
    clearInstantiationModels: () => void;
    updateTemplates: UpdateTemplateFunc;
}
export interface TemplateManagerUpdateContext {
    onUpdated: () => void;
}
export type DXTemplateCreator = (templateOptions: Record<string, ITemplate>) => DXTemplateCollection;
export interface TemplateManagerProps {
    init: (args: InitArgument) => void;
}
export interface TemplateInstantiationModel {
    templateKey: string;
    componentKey: string;
    index: any;
    onRendered: () => void;
    onRemoved: () => void;
}
export type GetRenderFuncFn = (templateKey: string) => RenderFunc;
export interface DXRemoveCustomArgs {
    isUnmounting: boolean;
}
export {};
