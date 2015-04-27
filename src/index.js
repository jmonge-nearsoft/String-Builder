var StringBuilder = function(){

    this.buffer = [];
    this.buffer['prefixes'] = [];
    this.buffer['suffixes'] = [];
    this.buffer['suspend'] = false;
};

StringBuilder.prototype = {

    cat: function(){

        var concatenatedString = [],
            prefSufLenght = this.buffer['prefixes'].length,
            prefixesIndex= prefSufLenght - 1,
            suffixesIndex ;

        for(var i=0; i<=arguments.length -1; i++) {
            if(typeof(arguments[i]) == 'function' ){
                arguments[i] = arguments[i].call(arguments[i]);
                concatenatedString.push(arguments[i]);
            }
            if(arguments[i].constructor === Array){
                for(var j = 0 ; j <= arguments[i].length ; j++){
                    if(typeof arguments[i][j] != 'undefined'){
                        concatenatedString.push(arguments[i][j]);
                    }
                }
            } else {
                concatenatedString.push(arguments[i]);
            }

            if(this.buffer['suspend'] === false) {
                for(suffixesIndex = 0 ; suffixesIndex <= prefSufLenght -1 ; suffixesIndex++){
                    concatenatedString.splice(0, 0, this.buffer['prefixes'][prefixesIndex]);
                    concatenatedString.push(this.buffer['suffixes'][suffixesIndex]);
                    prefixesIndex--;
                }
            }

        }

        this.buffer.push(concatenatedString);
        return this;
    },
    rep: function( string , times){

        for(var i =0 ; i<=times - 1 ; i++){
            //this.buffer.push(string);
            this.cat(string);
        }

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

        var concatenatedContent = this.buffer.join(' ').replace(/,/g , '');

        return concatenatedContent;
    },
    wrap: function( prefix, sufffix){

        if(prefix.constructor === Array){
            for(var i = 0 ; i<=prefix.length - 1 ; i++){
                this.buffer.prefixes.push(prefix[i]);
            }
        } else {
            this.buffer.prefixes.push(prefix);
        }

        if(sufffix.constructor === Array){
            for(var i = 0 ; i<=sufffix.length - 1 ; i++){
                this.buffer.suffixes.splice(0,0,sufffix[i]);
            }
        } else {
            this.buffer.suffixes.splice(0,0,sufffix);
        }

        return this;
    },
    end: function(deep){

        deep = deep || 1;

        if(this.buffer['suspend'] === true){
            this.buffer['suspend'] = false;
            return this;
        }
        for (var i = 0; i < deep; i++) {
            this.buffer['prefixes'].pop();
            this.buffer['suffixes'].splice(0, 1);
        }

        return this;
    },
    prefix: function( prefix ){
        this.wrap(prefix, ['']);

        return this;
    },
    suffix: function( suffix ){
        this.wrap([''], suffix);

        return this;
    },
    each: function(argumentsArray, callback){
        for(var i = 0; i <= argumentsArray.length - 1 ; i++){
            callback.call(this,argumentsArray[i], i, argumentsArray);
        }
    },
    suspend: function(){

        this.buffer['suspend'] = true;

        return this;
    },
    when: function(expression, thenArgs, otherwiseArgs) {

        return (expression) ? this.cat.call(this, thenArgs) : this.cat.call(this, otherwiseArgs);

    },
    returnString: function(){
        return 'This is a string';
    }
};

module.exports = StringBuilder;