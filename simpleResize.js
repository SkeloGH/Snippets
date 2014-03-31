/*
  SimpleResize: an utility object with very straightforward methods.
  
  SimpleResize.subscribe
    Receives 2 arguments: 
      - a function that will be called after resize happens
      - a boolean to indicate if it will debounce, defaults to false.

    Usage:
      // with debounce
      var resizeToken1 = SimpleResize.subscribe(function(){return 'will occur once'}, true); // returns 1
      // without debounce
      var resizeToken2 = SimpleResize.subscribe(function(){return 'will repeat';}); // returns 2
      //or
      var resizeToken3 = SimpleResize.subscribe(function(){return 'will repeat';}, false); // returns 3
      
  SimpleResize.unsubscribe
    Used to unsubscribe from the resize events after a subscription, receives the subscription token, 
    given when the subscription occurs.

    Usage:
      SimpleResize.unsubscribe(resizeToken2);
      
  
*/
var SimpleResize = {
    debouncedQueue : [],
    undebouncedQueue : [],
    debounceTimeout: 200,//ms
    counter : 0,
    init: function init(){
        this.bindEvents();
    },
    subscribe: function subscribe(cb, withDebounce){
        var subscribeData = {
            cb: cb,
            token: this.counter
        };
        if (withDebounce) {
            this.debouncedQueue.push(subscribeData);
        } else {
            this.undebouncedQueue.push(subscribeData);
        }
        this.counter++;
        return subscribeData.token;
    },
    unsubscribe: function unsubscribe(token){
        for (var i=0;i<this.debouncedQueue.length;i++){
            if (this.debouncedQueue[i].token == token) {
                this.debouncedQueue.splice(this.debouncedQueue[i]);
            }
        }
        for (var j=0;j<this.undebouncedQueue.length;j++){
            if (this.undebouncedQueue[j].token == token) {
                this.undebouncedQueue.splice(this.undebouncedQueue[j]);
            }
        }
    },
    bindEvents: function bindEvents(){
        var simpleResize = this;
        $(window).resize(function onWindowResize(){
            simpleResize.applyUndebounced();
            simpleResize.debounceAndApply();
        });
    },
    applyUndebounced: function applyUndebounced(){
        for(var i=0;i<this.undebouncedQueue.length;i++){
            this.undebouncedQueue[i].cb();
        }
    },
    debounceAndApply: function debounceAndApply(){
        var simpleResize = this;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(function debouncer(){
            for(var i=0;i<simpleResize.debouncedQueue.length;i++){
                simpleResize.debouncedQueue[i].cb();
            }
        }, this.debounceTimeout);
    }
};
SimpleResize.init();
