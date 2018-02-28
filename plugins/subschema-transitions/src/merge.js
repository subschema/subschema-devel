const toMillis = (v) => {
    if (v == null || typeof v === 'number') {
        return v;
    }
    return parseFloat(
        ('' + v).replace(/^(\d*(?:\.\d+?)?)(m?s)$/i, function (a, t, m) {
            switch (m) {
                case 'S':
                case 's':
                    return t * 1000;
                default:
                    return t;
            }
        }));
};

export default function merge(lessCtx) {
    return Object.keys(lessCtx).reduce(function (ret, key) {
        const [all, transitionName] = /^(.+?)(Enter|Leave|Appear|Exit)$/.exec(
            key) || [];

        if (transitionName && !(key in ret)) {

            ret[transitionName] = {
                classNames: {
                    appear      : lessCtx[`${transitionName}Appear`],
                    appearActive: lessCtx[`${transitionName}AppearActive`],
                    enter       : lessCtx[`${transitionName}Enter`],
                    enterActive : lessCtx[`${transitionName}EnterActive`],
                    exit        : lessCtx[`${transitionName}Exit`]
                                  || lessCtx[`${transitionName}Leave`],
                    exitActive  : lessCtx[`${transitionName}ExitActive`]
                                  || lessCtx[`${transitionName}LeaveActive`],
                },
                className : lessCtx[transitionName],
                timeout   : toMillis(lessCtx[`${transitionName}Timeout`])
            };
        }
        return ret;
    }, {});
}
