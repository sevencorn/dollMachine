//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        windowWidth:'',
        startXDirection:true,
        animation: '',
        pawerLeft:'50%',
        interval:'',
        goShow: true,
        startImg: true,
        clickTap:true
    },
    onLoad: function () {
        
    },
    onReady:function(){
        let _this = this;
        this.hookHoriMove();
    },
    start:function(){
        let _this = this;
        
        this.setData({
            startImg:false
        })
        
        clearInterval(this.interval)

        this.animation = wx.createAnimation({
            duration:1000
        })
        this.animation.height('240rpx').step();

        this.setData({
            animation:this.animation.export()
        })

        // 成功与否
        _this.successed();
    },
    successed:function(){
        let _this = this;

        setTimeout(function () {
            // 娃娃展示
          let left = _this.data.pawerLeft.substring(0, _this.data.pawerLeft.length-2)
            _this.setData({
                goShow: false,
                pawerLeft: (left-7.5)+'px'
            })
            

             // 抓子降下
            _this.animation.height('33rpx').step();
            _this.setData({
                animation: _this.animation.export()
            })
        }, 1300)



        setTimeout(function () {
            _this.setData({
                goShow: true
            })
        }, 2600)


        setTimeout(function () {
          let left = _this.data.pawerLeft.substring(0, _this.data.pawerLeft.length - 2)
            _this.setData({
                startImg: true,
                // pawerLeft: (left + 7.5) + 'px'
            })
            _this.hookHoriMove();
        }, 2800)

    },
    failed:function(){
        let _this = this;

        // 抓子升起
        setTimeout(function () {
            _this.animation.height('33rpx').step();
            _this.setData({
                animation: _this.animation.export()
            })
        }, 1300)

        // 开启左右移动
        setTimeout(function () {
            _this.setData({
                startImg: true
            })
            _this.hookHoriMove();
        }, 2600)
    },
    hookHoriMove:function(){   
        let _this = this;
        let query = wx.createSelectorQuery();

        query.select(".header").boundingClientRect();
        query.select(".wrapPawer").boundingClientRect();
        query.selectViewport().scrollOffset();  


        let hookLeft;
        let zhuaziwidth;

        query.exec(function (res) {
            _this.windowWidth = res[0].width;
            _this.zhuaziwidth = res[1].width;
            hookLeft = res[1].left - 11.8125;
        })

        _this.interval = setInterval(function () {
            if (_this.startXDirection == false) {
                _this.setData({
                    pawerLeft: (hookLeft--)+'px'
                })
            } else {
                _this.setData({
                    pawerLeft: (hookLeft++) + 'px'
                })
            }

            if (hookLeft - 42 <= 0) {
                _this.startXDirection = true;
            } else if (hookLeft >= (_this.windowWidth - _this.zhuaziwidth - 42)) {
                _this.startXDirection = false;
            }
        }, 10);
       
    }
})
