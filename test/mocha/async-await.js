const should = require('should');

describe('async/await', async  function() {
    it('main', async () => {
        const asyncFunc = async () => {
            return new Promise((resolve) => {
                setTimeout(() => resolve(true), 750);
            })
        }
        let result = await asyncFunc();
        should.equal(result, true)
    })
})