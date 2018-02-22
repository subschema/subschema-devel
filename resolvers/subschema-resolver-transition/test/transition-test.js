import React from 'react';
import { expect } from 'chai';
import { newSubschemaContext } from 'subschema-core';
import transitions from 'subschema-transitions';
import loaderFactory from 'subschema-loader';
import {transition} from 'subschema-resolver-transition';

describe("resolvers/transition", function () {
    let loader;
    before(function () {
        loader = loaderFactory();
        loader.addLoader(transitions);
    });


    it('should resolve transition, slideLeft no appear', function () {
        const timeout                 = 500;
        const { Transition, ...resp } = transition.handleTransition('slideLeft',
            'stuff', {},
            { loader });
        expect(resp).to.eql({
            "timeout"   : {enter: 500, appear: 500, exit: 500},
            "classNames": {
                "enter"       : "transitions__slideLeftEnter___3b_Rw",
                "enterActive" : "transitions__slideLeftEnterActive___1AI3C",
                "appear"      : "transitions__slideLeftAppear___1Hfkk",
                "appearActive": "transitions__slideLeftAppearActive___AfFFk",
                "exit"        : "transitions__slideLeftLeave___3_25V",
                "exitActive"  : "transitions__slideLeftLeaveActive___3H6Pk"
            },
            "className" : "transitions__slideLeftHeight___iynS8"
        });

    });
    it('should resolve transition, slideLeft with appear', function () {
        const timeout                 = 500;
        const { Transition, ...resp } = transition.handleTransition(
            { transition: 'slideLeft', on: ['appear'] }, 'stuff', {},
            { loader });
        expect(resp).to.eql({
            "timeout"   : {enter: 500, appear: 500, exit: 500},
            "classNames": {
                "enter"       : "transitions__slideLeftEnter___3b_Rw",
                "enterActive" : "transitions__slideLeftEnterActive___1AI3C",
                "appear"      : "transitions__slideLeftAppear___1Hfkk",
                "appearActive": "transitions__slideLeftAppearActive___AfFFk",
                "exit"        : "transitions__slideLeftLeave___3_25V",
                "exitActive"  : "transitions__slideLeftLeaveActive___3H6Pk"
            },
            "className" : "transitions__slideLeftHeight___iynS8"
        });

    });
    it('should resolve transition, slideLeft with appear with custom timeout',
        function () {
            const timeout                 = 200;
            const { Transition, ...resp } = transition.handleTransition({
                transition             : 'slideLeft',
                transitionAppearTimeout: timeout,
                on                     : ['appear']
            }, 'stuff', {}, { loader });

            expect(resp).to.eql({
                "timeout": {enter: 500, appear: 500, exit: 500},
                "classNames": {
                    "enter": "transitions__slideLeftEnter___3b_Rw",
                    "enterActive": "transitions__slideLeftEnterActive___1AI3C",
                    "appear": "transitions__slideLeftAppear___1Hfkk",
                    "appearActive": "transitions__slideLeftAppearActive___AfFFk",
                    "exit": "transitions__slideLeftLeave___3_25V",
                    "exitActive": "transitions__slideLeftLeaveActive___3H6Pk"
                },
                "className": "transitions__slideLeftHeight___iynS8"
            });

        });

});
