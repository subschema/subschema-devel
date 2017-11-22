const { cwd } = require('subschema-dev-utils');
const path    = require('path');
const { env } = process;


if (!(env.BROWSERSLIST_CONFIG || env.BROWSERLIST )) {
    env.BROWSERSLIST_CONFIG = path.resolve(__dirname, 'browserslist');
} else if (env.BROWSERSLIST_CONFIG) {
    env.BROWSERSLIST_CONFIG = cwd(env.BROWSERSLIST_CONFIG);
}
