import type { Model } from 'dva';
import type { Store } from 'redux';
import type { History } from 'history';
import { OptsI } from '@gmsoft/dva-global-context-plugin';
export interface StateContainer {
    _store: Store<any>;
    _history: History;
    injectModel: (model: Model, replace?: boolean) => Model;
}
interface ArgsI {
    history?: History;
    NODE_ENV?: string;
    onError?: (err: any) => void;
    useThemePlugin?: boolean;
    useGlobalContextPlugin?: boolean;
    globalContextOpts?: OptsI;
}
declare function createStateContainer({ history, NODE_ENV, onError, useThemePlugin, useGlobalContextPlugin, globalContextOpts, }?: ArgsI): StateContainer;
export { createStateContainer as create };
