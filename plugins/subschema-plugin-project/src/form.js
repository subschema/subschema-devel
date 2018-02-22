export default function formTag({ sample, useData, useErrors }) {
    const { props = [] } = sample;

    const propStr = ['schema={schema}'];
    if (useData) {
        propStr.push('value={value}')
    }
    if (useErrors) {
        propStr.push('errors={errors}');
    }

    props && props.forEach(function (v) {
        if (Array.isArray(v)) {
            propStr.push(`${v[0]}={${v[1]}}`);
        } else {
            propStr.push(`${v}={${v}}`);
        }
    });

    return `<Form ${propStr.join(' ')}/>`;
}
