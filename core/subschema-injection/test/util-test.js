import { expect } from 'chai';

import { onlyKeys } from '../lib/util';

describe('onlyKeys', function () {

    it('should return only unique keys', function () {
        expect(onlyKeys(['stuff', 'me'], { stuff: 1, other: 2 },
            { more: 3 }, { me: 4 })).to.eql({ me: 4, stuff: 1 });
    });

});
