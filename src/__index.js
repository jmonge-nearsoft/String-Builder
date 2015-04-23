var StringBuilder = function(){
    var something = 'This is something';
    this.buffer = [];
    // this.buffer['wrapPrefix'] = '';
    // this.buffer['wrapedContent'] = '';
    // this.buffer['sufffix'] = '';
    //buffer['wrapPrefix'] = 'prefix';
    //this.wrapPrefix = buffer['wrapPrefix'];
    // this.buffer['prefix']='';
    // this.buffer['wrapPrefix']='';
    // this.buffer['wrapSufffix']='';
    // this.buffer['wrapedContent']='';

    var testText = 'Test text';

    this.getBuffer= function(){
        return buffer;
    };
    this.setBuffer = function( newBufferValue ){
        buffer = newBufferValue;
    };
};

StringBuilder.prototype.something = this.buffer;
StringBuilder.prototype = {

    cat: function(){
        console.log('Concatenating...');
        // var buffer = this.getBuffer();
        var buffer = this.buffer;

        for(var i=0; i<arguments.length; i++) {
            if(typeof(arguments[i]) == 'function' ){
                arguments[i] = arguments[i].call(arguments[i]);
            }
            if(arguments[i].constructor === Array){
                arguments[i] = arguments[i].toString().replace(/,/g , ' ');
            }
            if('wrapPrefix' in buffer){
                buffer['wrapedContent'] += ' ' + arguments[i].toString();
                console.log('PREFIX present, adding content: '+  arguments[i].toString());
            } else {
                buffer.push(arguments[i]);
                console.log('NO Prefix present, adding content: '+  arguments[i].toString());
            }
        }
        //this.buffer = buffer;
        return this;
    },
    rep: function( string , times){
        // var buffer = this.getBuffer();
        var buffer = this.buffer;
        var stringResult = Array(times+1).join(string+' ');

        this.cat(stringResult);

        return this;
    },
    catIf: function(){
        var validation = arguments[arguments.length - 1];
        var arguments = Array.prototype.slice.call(arguments);

        if(validation == true){
            this.cat(arguments.splice(0, arguments.length - 1));
        }
        return this;
    },
    string: function(){
        // var buffer = this.getBuffer();
        var buffer = this.buffer;
        var wrapContent;
        //testing prefixes
        if('wrapPrefix' in buffer){
            // buffer.push(buffer['wrapPrefix']);
            wrapContent += buffer['wrapPrefix'];
            // delete buffer['wrapPrefix'];
            // buffer.push(buffer['wrapedContent']);
            wrapContent += buffer['wrapedContent'];
            // delete buffer['wrapedContent'];
            // buffer.push(buffer['wrapSufffix']);
            wrapContent += buffer['wrapSufffix'];
            // delete buffer['wrapSufffix'];
        }

        var concatenatedContent = buffer.join(' ');
        concatenatedContent += wrapContent;
        // buffer.splice(0, buffer.length, concatenatedContent);

        // return buffer[0];
        return concatenatedContent;
    },
    wrap: function( prefix, sufffix){

        // var buffer = this.getBuffer();
        var buffer = this.buffer;
        // this.buffer['wrapPrefix'];
        buffer['wrapPrefix'] = prefix;
        // buffer.push({'wrapPrefix' : prefix});
        buffer['wrapSufffix'] = sufffix;
        buffer['wrapedContent'] = '';

        // this.setBuffer(buffer);
        console.log('Setting WRAP');
        return this;
    },
    end: function(){
        var buffer = this.buffer;
        // var buffer = this.getBuffer();

        if('wrapPrefix' in buffer){
            buffer.push(buffer['wrapPrefix']);
            delete buffer['wrapPrefix'];
            buffer.push(buffer['wrapedContent']);
            delete buffer['wrapedContent'];
            buffer.push(buffer['wrapSufffix']);
            delete buffer['wrapSufffix'];

            // this.setBuffer(buffer);

        }

        this.setBuffer(buffer);

        return this;
    },
    prefix: function( prefix ){
        this.buffer['prefix'] = prefix;

        return this;
    },
    sufffix: function( sufffix ){
        this.buffer['sufffix'] = sufffix;

        return this;
    },
    printTestText: function(){
        console.log(this.wrapPrefix);
    }
};



//Testing
function returnString(){
    return 'a string';
}
//
var sex = false;
var sb = new StringBuilder();
//console.log(sb.echoString());
sb.cat('Monge', 'antonio', returnString)
    .rep('this', 3)
    .catIf('wewewe', 1==1)
    // .buffer['kk'] = 'kk';
    .wrap('<script>', '</script>')
    .cat('afterWrap')
    .cat('Again')
    .end()
// .string();