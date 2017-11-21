import {expect} from 'chai';
import tutils from '../lib/index';

const {inherits} = tutils;

describe('tutil', function () {
    this.timeout(20000);

    describe('::inherits', function () {
        class A {

        }
        class B extends A {

        }
        class C extends B {

        }
        it('A inherits from A', function () {
            expect(A::inherits(A)).to.be.true;
            expect(A::inherits(null)).to.be.false
        });
        it('B inherits from A', function () {
            expect(B::inherits(A)).to.be.true;
            expect(A::inherits(B)).to.be.false
        });
        it('C inherits from A', function () {
            expect(C::inherits(A)).to.be.true;
            expect(A::inherits(C)).to.be.false
        });
        it('C does not inherit from null', function () {
            expect(C::inherits(null)).to.be.false
        });
        it('C does not inherit from {}', function () {
            expect(C::inherits({})).to.be.false
        });
        it('C does not inherit from Object', function () {
            expect(C::inherits(Object)).to.be.false
        });
    });
});
