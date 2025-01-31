/**
* DevExtreme (ui/track_bar.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
import Editor, {
    EditorOptions,
} from './editor/editor';

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxTrackBarOptions<TComponent> extends EditorOptions<TComponent> {
    /**
     * The maximum value the UI component can accept.
     */
    max?: number;
    /**
     * The minimum value the UI component can accept.
     */
    min?: number;
}
/**
 * A base class for track bar UI components.
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export default class dxTrackBar<TProperties> extends Editor<TProperties> { }
