var chai = require('chai').should(),
    stringBuilder = require('../src/index')
    ;//stringBuilderTester = new stringBuilder();

describe('#getString', function(){

    it('Should return a string', function(){
        var stringBuilderTester = new stringBuilder();
        stringBuilderTester.returnString().should.be.a('string');
        delete stringBuilderTester;
    });
});
describe('#cat', function(){
    it('Should add the provided value to the buffer', function(){
        var stringBuilderTester = new stringBuilder(),
            string = 'Concatenated this string';

        stringBuilderTester.cat(string);
        stringBuilderTester.string().should.be.equal(string);
        delete stringBuilderTester;
    });
});
describe('#string', function(){
    it('Should return buffer\'s content as a sting', function(){
        var stringBuilderTester = new stringBuilder(),
            stringConcatenated = 'first string second string third string';
        stringBuilderTester.cat('first string').cat('second string').cat('third string');
        stringBuilderTester.string().should.be.equal(stringConcatenated);
        delete stringBuilderTester;
    });
});
describe('#rep', function(){
    it('Should repeat the given string a defined number of times', function(){
        var stringBuilderTester = new stringBuilder(),
            string = 'Repeat test',
            times = 3;
        stringBuilderTester.rep(string, times);
        stringBuilderTester.buffer.length.should.be.equal(3);
        delete  stringBuilderTester;
    });
});
describe('#catIf', function(){
    it('Should concatenate on validation true', function(){
        var stringBuilderTester = new stringBuilder(),
            string = 'catIf concatenation string';
        stringBuilderTester.catIf(string, true);
        stringBuilderTester.string().should.be.equal(string);
        delete stringBuilderTester;
    });
});
describe('#end', function(){
    it('Should invalidate last prefix and/or suffix effect', function(){
        var stringBuilderTester =  new stringBuilder(),
            string = 'Test sting';
    })
});