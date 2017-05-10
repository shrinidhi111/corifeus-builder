const should = require('should');

describe('async/await', async  function() {
    it('main', async function() {
        const asyncFunc = async function(){
            return new Promise((resolve) => {
                setTimeout(() => resolve(true), 750);
            })
        }

        let result = await asyncFunc();
        should.equal(result, true)

    })
})