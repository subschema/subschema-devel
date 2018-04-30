const docs = require.context('.', true, /\.md$/);

module.exports = docs.keys().reduce(function (ret, key) {
    const name = key.replace(/-+?/g, '_').replace(/(?:\.\/)?(.+?)\.md$/, '$1');
    ret[name] = docs(key).default;
    return ret;
}, {});