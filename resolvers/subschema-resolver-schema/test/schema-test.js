import { expect } from 'chai';
import { normalizeSchema } from 'subschema-resolver-schema';
import loaderFactory from 'subschema-loader';

describe('resolvers/schema', function () {
    let loader;
    beforeEach(() => {
        loader = loaderFactory();
    });

    it('should normalize with subSchema with loaders', function () {
        loader.addSchema({
            Address: {
                schema: {
                    address: 'Text',
                    city   : 'Text',
                    state  : {
                        type   : 'Select',
                        options: ['CA', 'FL', 'VA', 'IL']
                    },
                    zipCode: {
                        type    : 'Text',
                        dataType: 'number'
                    }
                },
                fields: ['address', 'city', 'state', 'zipCode']
            },
            Contact: {
                schema: {
                    name          : 'Text',
                    primary       : {
                        type     : 'ToggleObject',
                        subSchema: 'Address',
                        template : 'SimpleTemplate'
                    },
                    otherAddresses: {
                        canEdit   : true,
                        canReorder: true,
                        canDelete : true,
                        canAdd    : true,
                        type      : 'List',
                        labelKey  : 'address',
                        itemType  : {
                            type     : 'Object',
                            subSchema: 'Address'
                        }
                    }
                },
                fields: ['name', 'primary', 'otherAddresses']
            }
        });
        const result = normalizeSchema({ subSchema: 'Contact' }, null, {},
            {loader});
        expect(result.fields, 'name', 'primary', 'otherAddresss');
    });

});
