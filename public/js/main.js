$(document).ready(function(){

    (function(Spine, $, exports){
        var Coin = Spine.Model.sub();
        Coin.configure("Coin", "name", "symbol");
        Coin.extend(Spine.Model.Local);
        exports.Coin = Coin;
    })(Spine, Spine.$, window);

    (function(Spine, $, exports){
        var CoinApp = Spine.Controller.sub({
            elements: {
                ".coins": "coins"
            },
            init: function(){
                console.log("coinApp");
                Coin.bind("create",  this.proxy(this.addOne));
                Coin.bind("refresh", this.proxy(this.addAll));
                Coin.fetch();
                },
                addOne: function(coin){
                var view = new CoinController({coin: coin});
                this.coins.append(view.render().el);
                },
            
                addAll: function(){
                Coin.each(this.proxy(this.addOne));
                }            
        });
        exports.CoinApp = CoinApp;
    })(Spine, Spine.$, window);

    (function(Spine, $, exports){
        var CoinController = Spine.Controller.sub({
            init: function(){
                console.log("coinApp");
                this.coin.bind("update", this.proxy(this.render));
                this.coin.bind("destroy", this.proxy(this.remove));
                },

            render: function(){
                this.replace($("#coinTemplate").tmpl(this.coin));
                return this;
            },
            
            remove: function(){
                this.el.remove();
                this.release();
            }
        });
        exports.CoinController = CoinController;
    })(Spine, Spine.$, window);

    new CoinApp({"el": $("#coinapp")});
    new Coin({name: "bit"});
    new Coin({name: "eth"});
});

// $(document).ready(function(){
//     var Coin = Spine.Model.sub();
//     Coin.configure("Coin", "name", "symbol");
//     //Coin.extend(Spine.Model.Local);

//     var CoinController = Spine.Controller.sub({
//         init: function(coin){
//             console.log("coinController");
//             this.coin.bind("update", this.proxy(this.render));
//             this.coin.bind("destroy", this.proxy(this.remove));
//             },

//         render: function(){
//             this.replace($("#coinTemplate").tmpl(this.coin));
//             return this;
//         },
        
//         remove: function(){
//             this.el.remove();
//             this.release();
//         }
//     });    
    
//     var CoinApp = Spine.Controller.sub({
//         elements: {
//             ".coins": "coins"
//         },
//         init: function(){
//             console.log("coinApp");
//             Coin.bind("create",  this.proxy(this.addOne));
//             Coin.bind("refresh", this.proxy(this.addAll));
//             Coin.fetch();
//         },
//         addOne: function(coin){
//             var view = new CoinController({coin: coin});
//             this.coins.append(view.render().el);
//         },
        
//         addAll: function(){
//             Coin.each(this.proxy(this.addOne));
//         }            
//     });

//     window.Coin = Coin;
//     new CoinApp({"el": $("#coinapp")});
//     new Coin({name: "bit"});
//     new Coin({name: "eth"});
// });