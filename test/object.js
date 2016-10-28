'use strict';

const
	ext = require('../lib/object');


describe('object Extension', () =>
{
    it('typeof', () =>
    {
        let data = [undefined, null, {}, 1, 'test', [], () => {}, Symbol(), new Date(), /test/, new Error()];
        let result = ['undefined', 'null', 'object', 'number', 'string', 'array', 'function', 'symbol', 'date', 'regexp', 'error'];
        data.forEach((val, i) => ext.typeof(val).should.eql(result[i]));
    });

    it('with', () =>
    {
        let data = {a:1};
        ext.with(data, e => e.a = 2).should.eql({a:2});
    });

    it('with result', () =>
    {
        let data = {a:1};
        ext.with(data)(e => !e).should.eql(false);
    });

    it('each with Generator', () => 
    {
        let data = [1, 2, 3];
        ext.each();
    });

    it('clone', () =>
    {
        let data = {a:[{b:1}]};
        let result = ext.clone(data);
        data.should.eql(result);
        data.a[0].b = 2;
        data.should.eql(result);
    })

    it('clone depp', () =>
    {
        let data = {a:{b:{c:1}}};
        let result = ext.cloneDeep(data);
        data.should.eql(result);
        data.a.b = 1;
        data.should.not.eql(result);
    })

    it('mix default(override=true)', () =>
    {
        let dest = {a:1, b:2, arr:[1,2]};
        let src = {a:2, c:3, arr:[2,3]};
        ext.mix(dest, src);
        dest.should.eql({a:2, b:2,c:3,arr:[2,3]});
    });

    it('mix (override=false)', () =>
    {
        let dest = {a:1, b:2};
        let src = {a:2, c:3};
        ext.mix(dest, src, false);
        dest.should.eql({a:1, b:2,c:3});
    });
});