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
}

const odir = __dirname;
describe('subschema-dev-optionsmanager', function () {
    let before = [];
    const cwd  = (name) => {
        const ret           = join(__dirname, 'fixtures', name);
        const sourceNodeDir = join(ret, 'node_modules');
        if (isDirectory(sourceNodeDir)) {
            readdirSync(sourceNodeDir).forEach(dir => {
                const sourceDir = join(sourceNodeDir, dir);
                if (isDirectory(sourceDir)) {
                    const dest = join(__dirname, '..', 'node_modules', dir);
                    before.push(dest);
                    if (!existsSync(dest)) {
                        console.log('linking', dir, 'to', dest);
                        symlinkSync(sourceDir, dest);
                    }
                }
            });
        }
        process.chdir(ret);
        return () => ret;
    };

    afterEach(() => {
        before.forEach(f => {
            console.log('unlink ', f);
            unlinkSync(f);
        });
        before = [];
        process.chdir(odir)
    });


    it('should boot', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('boot')
        });
    });

    it('should with plugin', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-plugin')
        });
        expect(om.enabled('whatever')).to.be.true;
    });

    it('should with plugin rc', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-rc')
        });
        expect(om.enabled('metest')).to.be.true;
    });
    it('should with plugin env and rc', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-env'),
            env   : {
                TESTER_PLUGINS     : 'metest',
                METEST_STUFF: "1"

            }
        });
        expect(om.enabled('metest')).to.be.true;
        expect(om.config('metest.stuff')).to.eq(1);
    })
    it('should with plugin env and rc and argv', function () {
        const om = new OptionsManager({
            prefix: 'tester',
            cwd   : cwd('with-env'),
            env   : {
                TESTER_PLUGINS     : 'metest',

            },
            argv:[
                'ignore',
                'this',
                '--metest-stuff=3',
                '--metest-stuff-or="stuff"'
            ]
        });
        expect(om.enabled('metest')).to.be.true;
        expect(om.config('metest.stuff')).to.eq(3);
        expect(om.config('metest.stuffOr')).to.eq('stuff');

    })


});
