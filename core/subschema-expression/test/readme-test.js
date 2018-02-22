import { expect } from 'chai';
import expression from '../lib';
import loscape from 'lodash/escape';

describe('expression/Readme', function () {

    it('should exec example 1', function () {

        const exprObj = expression('hello {world}');

        const str = exprObj.format({
            world: 'Joe'
        });

        expect(str).to.eql('hello Joe');
    });
    it('should exec example 2', function () {
        const exprObj = expression(
            'hello {comma(you, "me")} and {uppercase(world)}');

        const str = exprObj.format({
            world: 'Joe',
            you  : 'Bob'
        }, {
            uppercase: function (f) {
                return f == null ? '' : f.toUpperCase()
            },
            comma    : function () {
                return Array.prototype.join.call(arguments, ', ');
            }
        });

        expect(str).to.eql('hello Bob, me and JOE');
    });

    it('should exec example 3', function () {

        const exprObj = expression(
            'hello {uppercase(name.first)} and {name.last}');

        const str = exprObj.format({
            name: {
                first: 'Joe',
                last : 'Bob'
            }
        }, {
            uppercase: function (f) {
                return f == null ? '' : f.toUpperCase()
            }
        });
        //str is hello JOE and Bob
        expect(str).to.eql('hello JOE and Bob');
    });

    it('should exec example 4', function () {


        const exprObj    = expression(
            'hello {uppercase(name.first)} and {name.last}');
        const formatters = {
            uppercase(f) {
                return f == null ? '' : f.toUpperCase()
            }
        };

        //str is hello JOE and Bob
        expect(exprObj.format({
            name: {
                first: 'Joe',
                last : 'Bob'
            }
        }, formatters)).to.eql('hello JOE and Bob')

        //str is hello BILLY and Joe
        expect(exprObj.format({
            name: {
                first: 'Billy',
                last : 'Joe'
            }
        }, formatters)).to.eql('hello BILLY and Joe')
    });
    it('should exec example 5', function () {


        const exprObj    = expression('hello {h1(name.first)}');
        const formatters = {
            h1(f) {
                return `--<h1>${f == null ? '' : loscape(
                    f.toUpperCase())}</h1>--`;
            }
        };
        const str        = exprObj.format({
            name: {
                first: 'Joe<b/>',
                last : 'Bob'
            }
        }, formatters);
        //str is hello <h1>JOE</h1>
        expect(str).to.eql('hello <h1>JOE&lt;B/&gt;</h1>');
    })
});
