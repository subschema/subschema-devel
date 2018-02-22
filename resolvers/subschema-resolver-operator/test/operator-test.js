import {expect} from 'chai';
import loaderFactory from 'subschema-loader';
import {loadOperator} from 'subschema-resolver-operator';

describe("resolvers/operator", function () {
    const ops = {
        '>': false,
        '<': false,
        '<=': true,
        '>=': true,
        '==': true,
        '!=': false,
        '===': false,
        '!==': true,
        'truthy': false,
        'falsey': true,
        '!/1/': true,
        '/1/': false,
    };

    Object.keys(ops).forEach((key)=> {
        it(`should 0 ${key} ato"0" be ${ops[key]}`, function () {
            expect(loadOperator(key)(0, '0')).to.eql(ops[key], `${key} operator ${ops[key]}`);
        });
    });

    function tobe(val) {
        return val === 'tobe';
    }

    it('should resolve a custom operator', function () {
        const loader = loaderFactory();
        loader.addOperator('tobe', tobe);
        const ctx = {loader};

        expect(loadOperator('tobe', null, null, ctx)('tobe')).to.eql(true, 'is tobe');
        expect(loadOperator('tobe', null, null, ctx)('or not tobe')).to.eql(false, 'is not tobe');

    });

    it('should resolve a regex', function () {


        expect(loadOperator(/^test$/)('test')).to.eql(true, 'is test');
        expect(loadOperator(/^$/)('or not tobe')).to.eql(false, 'is not tobe');

    });
    it('should resolve a function', function () {

        expect(loadOperator(tobe)('tobe')).to.eql(true, 'is tobe');
        expect(loadOperator(tobe)('or not tobe')).to.eql(false, 'is not tobe');

    });

});
