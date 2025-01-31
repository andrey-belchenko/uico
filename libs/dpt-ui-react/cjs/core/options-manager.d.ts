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

import type { IConfigNode, ITemplate } from './configuration/config-node';
import { DXTemplateCollection } from './types';
export declare function unscheduleGuards(): void;
export declare function scheduleGuards(): void;
declare class OptionsManager {
    private readonly guards;
    private instance;
    private isUpdating;
    private currentConfig;
    private subscribableOptions;
    private independentEvents;
    constructor();
    setInstance(instance: unknown, config: IConfigNode, subscribableOptions: string[], independentEvents: string[]): void;
    getInitialOptions(rootNode: IConfigNode): Record<string, unknown>;
    getTemplateOptions(rootNode: IConfigNode): Record<string, ITemplate>;
    update(config: IConfigNode, dxtemplates: DXTemplateCollection): void;
    onOptionChanged(e: {
        name: string;
        fullName: string;
        value: unknown;
    }): void;
    get isInstanceSet(): boolean;
    dispose(): void;
    private isOptionSubscribable;
    private isIndependentEvent;
    private callOptionChangeHandler;
    private wrapOptionValue;
    private addGuard;
    execGuards(): void;
    private resetOption;
    private setValue;
}
export { OptionsManager, };
