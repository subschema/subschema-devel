const path    = require('path');
const { env } = process;


if (!(env.BROWSERSLIST_CONFIG || env.BROWSERLIST )) {
    env.BROWSERSLIST_CONFIG = path.resolve(__dirname, 'browserlist');
}
