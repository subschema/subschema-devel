import {expect} from 'chai';
import expression from '../lib';



describe('expression/function', function () {
    this.timeout(50000);
    it('should parse out functions', function () {
        const expr = expression('{stuff(name)} {other}');
        expect(expr.listen[0]).to.eql('name');
        expect(expr.listen[1]).to.eql('other');
        expect(expr.formatters[0]).to.eql('stuff');
    });
    it('should parse out function with multiple args', function () {
        const expr = expression(`hello { stuff(name, other) } {more}`);
        expect(expr.listen[0]).to.eql('name');
        expect(expr.listen[1]).to.eql('other');
        expect(expr.listen[2]).to.eql('more');
        expect(expr.formatters[0]).to.eql('stuff');

        const res = expr.format({
            more: 1,
            other: true,
            name: 'Joe<b/>'
        }, {
            stuff: function (a, b) {
                return `<h1>${a}-${b}</h1>`;
            }
        });
        expect(res).to.eql("hello &lt;h1&gt;Joe&lt;b/&gt;-true&lt;/h1&gt; 1");
    });

    it('should parse out function with multiple args literal', function () {
        const expr = expression(`hello { join(name, 'huh', "what") } {more}`);
        expect(expr.listen[0]).to.eql('name');
        expect(expr.listen[1]).to.eql('more');
        expect(expr.listen.length).to.eql(2);
        expect(expr.formatters[0]).to.eql('join');
        expect(expr.formatters.length).to.eql(1);
        const res = expr.format({
            more: 1,
            other: true,
            name: 'Joe<b/>'
        }, {
            join:function() {
                return Array.prototype.join.call(arguments, ',');
            }
        });
        expect(res).to.eql('hello Joe&lt;b/&gt;,huh,what 1');
    });


});
