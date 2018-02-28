import less from './transitions.less';
import merge from './merge';

export const transitions      = merge(less);
export const mergeTransitions = merge;

export default {
    transitions
};
