import React from "react";
import { expect, into, select } from "subschema-test-support";
import { Select } from 'subschema-plugin-type-select';

describe('types/Select', function () {
    this.timeout(50000);
    var values   = [];
    var onChange = function (e) {
        values.push(e);
    };

    beforeEach(function () {
        values.length = 0;
    });

    it('should create a select', function () {
        const sel = into(<Select
            options={[{ val: 1, label: 'One' }, { val: 2, label: 'Two' }]}
            path="test"
            onChange={onChange}/>);
        expect(values.length).to.eql(0);
        const options = sel.find('option');
        expect(options.length).to.eql(2, 'should have to options');
        expect(options.at(0).prop('value')).to.eql(1);
        expect(options.at(1).prop('value')).to.eql(2);
        select(sel, 1);
        expect(values.length).to.eql(1);
        expect(values[0]).to.eql('2');

    });

    it('should create a multi select', function () {
        const sel = into(<Select multiple={true}
                                 options={[{ val: 1, label: 'One' }, {
                                     val  : 2,
                                     label: 'Two'
                                 }]}
                                 path="test" onChange={onChange}/>);

        expect(sel).to.exist;
        expect(values.length).to.eql(0);
        const options = sel.find('option');
        expect(options).to.have.length(2, 'should have to options');
        expect(options.at(0).prop('value')).to.eql(1);
        expect(options.at(1).prop('value')).to.eql(2);
        select(sel, 1);
        expect(values.length).to.eql(1);
        expect(values[0][0]).to.eql('2');

        select(sel, 0);
        expect(values.length).to.eql(2);
        expect(values[0][0]).to.eql('2');
        expect(values[1][0]).to.eql('1');

    });


});
