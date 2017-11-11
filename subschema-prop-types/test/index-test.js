import PT from '../lib/index';
import { expect } from 'chai';
import PropTypes from 'prop-types';

describe('subschema-prop-types', function () {

    it('should enumerate proptypes to names', function () {
        const out = PT.propTypesToNames({
            myprop : PT.arrayString,
            myevent: PT.event,
            mystr  : PT.string,
            mycss  : PT.cssClass.isRequired,
            myarr  : PT.arrayString.isRequired
        });
        console.log(JSON.stringify(out));
        expect(out).to.eql({
            "myprop" : "arrayString",
            "myevent": "event",
            "mystr"  : "string",
            "mycss"  : "*cssClass",
            "myarr"  : "*arrayString"
        });

    });

    it('should handle something complex like content', function () {
        const content = [{
            "className": "clz-left",
            "content"  : [{
                "type"   : "h1",
                "content": "Heading stuff {hello}"
            }, {
                "type"   : "p",
                "content": "Super special content"
            }, {
                "type"     : "button",
                "className": "btn btn-primary",
                "content"  : "Activate"
            }]
        }, {
            "className": "clz-right",
            "content"  : [{
                "type"     : "img",
                "className": "super-img",
                "src"      : "about:blank",
                "content"  : false
            }]
        }];
        PropTypes.checkPropTypes(PT.content, { content }, 'content', 'Test',
            function getStack(e) {
                expect(e).to.be.null;
            });

    });
    it('should invalidate something complex like content', function () {
        const content = { className: 1 };
        let stored;
        PropTypes.checkPropTypes(PT.content, { content }, 'content', 'Test',
            () => {
                stored = true;
            });
        expect(stored, 'should  have errorred').to.be.true;
    });
    it('should wrap chains', function () {

        const test = PT.oneOf(["this", "or", "that"], "thisorthat");
        expect(test.displayName).to.eql('thisorthat');
        let stored     = false;
        const getStack = () => stored = true;

        PropTypes.checkPropTypes({ test }, { test: "that" }, 'test',
            'Test',
            getStack);
        expect(stored, 'should not have errorred').to.be.false;
        stored = false;
        PropTypes.checkPropTypes({ test }, { test: "nothtat" }, 'test', 'Test',
            getStack);
        expect(stored, 'should  have errorred').to.be.true;
    })
});
