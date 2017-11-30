import React from 'react';
import Readme from '../README.md';
import { mount } from 'enzyme';
import {expect} from 'chai';

describe('subschema-dev-markdown', function () {
    it('should render README', function () {
        const attachTo = document.createElement('div');
        document.body.appendChild(attachTo);
        const root = mount(<Readme/>, { attachTo });
        expect(root.find('h1').at(0).text()).to.eql('subschema-dev-markdown');

    })
});
