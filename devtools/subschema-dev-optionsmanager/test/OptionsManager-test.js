import OptionsManager from '../src/OptionsManager';
import { join } from 'path';
import { expect } from 'chai';
import { existsSync, readdirSync, statSync, symlinkSync, unlinkSync } from 'fs';

const isDirectory = sourceDir => {
    try {
        const s = statSync(sourceDir);
        return s.isDirectory();
    } catch (e) {
        return false;
    }
};


const odir = __dirname;
describe('subschema-dev-optionsmanager', function () {
    const argv   = (...argv) => ['fake-interpreter', 'fake-script'].concat(
        ...argv);
    const afters = [];
    const cwd    = (name) => {
        const ret           = join(__dirname, 'fixtures', name);
        const sourceNodeDir = join(ret, 'node_modules');
        if (isDirectory(sourceNodeDir)) {
            readdirSync(sourceNodeDir).forEach(dir => {
                const sourceDir = join(sourceNodeDir, dir);
                if (isDirectory(sourceDir)) {
                    const dest = join(__dirname, '..', 'node_modules', dir);
                    if (existsSync(dest)) {
                        unlinkSync(dest);
                    }
                    afters.push(() => {
                        existsSync(dest) && unlinkSync(dest)
                    });
                    symlinkSync(sourceDir, dest);
                }
            });
        }
        process.chdir(ret);
        return () => ret;
    };

    afterEach(() => {
        afters.forEach(c => c());
        process.chdir(odir)
    });

    it('should configure boot', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('boot')
        });
    });

    it('should configure with plugin', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-plugin')
        });
        expect(om.enabled('whatever')).to.be.true;
    });

    it('should configure with plugin rc', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-rc')
        });
        expect(om.enabled('metest')).to.be.true;
    });

    it('should configure with plugin env and rc', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-env'),
            env   : {
                TESTER_PLUGINS: 'metest',
                METEST_STUFF  : "1"

            }
        });
        expect(om.enabled('metest')).to.be.true;
        expect(om.config('metest.stuff')).to.eq(1);
    })
    it('should configure with plugin env and rc and argv', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-env'),
            env   : {
                TESTER_PLUGINS: 'metest',

            },
            argv  : argv(
                '--metest-stuff=3',
                '--metest-stuff-or="stuff"'
            )
        });
        expect(om.enabled('metest')).to.be.true;
        expect(om.config('metest.stuff')).to.eq(3);
        expect(om.config('metest.stuffOr')).to.eq('stuff');

    });

    it('should configure with plugin with-disabled', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-disabled'),
            env   : {},
            argv  : argv(
                '--metest-stuff=3',
                '--metest-stuff-or="stuff"'
            )
        });
        expect(om.enabled('metest')).to.be.false;
        expect(om.enabled('enabled')).to.be.true;
    });

    it('should configure with plugin with-webpack', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-webpack'),
            env   : {},
            argv  : argv(
                '--webtest-stuff=3',
                '--webtest-stuff-or="stuff"'
            )
        });
        expect(om.enabled('webtest')).to.be.true;
        const a = {}, b = {};
        expect(om.plugins.get('webtest').plugin(a, b, om)).to.eql([a, b, om])

    });
    it('should configure with plugin with-presets', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-presets'),
            env   : {},
            argv  : argv(
                '--p1-stuff=3',
                '--p2-stuff-or="stuff"',
                '--preset-pp="abc"'
            )
        });
        expect(om.enabled('p1')).to.be.true;
        expect(om.enabled('p2')).to.be.true;

    });
    it('should configure with plugin with-presets and config', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-presets-and-config'),
            env   : {},
            argv  : argv(

            )
        });
        expect(om.enabled('p1')).to.be.eql(true);
        expect(om.enabled('p2')).to.be.eql(true);
        expect(om.config('p1.ppe')).to.be.eql(2);
        expect(om.config('p2.ppe')).to.be.eql(2);

    });
    it('should log from option', function () {
        const calls   = [];
        const capture = (...args) => calls.push(args);

        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-presets-and-config'),
            env   : { TESTER_DEBUG: 12 },
            info  : capture,
            warn  : capture
        });
        om.plugins.get('p1').info('test');
        om.plugins.get('p1').warn('test');
        expect(calls.pop().join(' ')).to.eql('WARN [tester] - p1 test');
        expect(calls.pop().join(' ')).to.eql('INFO [tester] - p1 test');
    });
    it('should only load with-node-env test', function () {
        const calls   = [];
        const capture = (...args) => calls.push(args);

        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-node-env'),
            env   : { NODE_ENV: "test" },
            info  : capture,
            warn  : capture
        });
        expect(om.enabled("webtest")).to.be.true;
    })
});
