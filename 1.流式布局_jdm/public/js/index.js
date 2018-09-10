window.onload = function(){
    /**
     * 1轮播图
     * 2搜索bar 样式
     * 3倒计时
     */
    searchFunction();
    banner();
    downTime();
}

var searchFunction = function(){
    /***页面滚动 改透明度 */
    /**超过轮播图下的时 高度 */
    const searchBar = document.querySelector('.jd_search')
    const banner = document.querySelector('.jd_banner')
    const BannerHeight = banner.offsetHeight

    /*监听页面滚动 */
    window.addEventListener('scroll',function(){
        //document.body.scrollTop
        var scrollTop = document.documentElement.scrollTop
        var opacity = 0
        if(scrollTop < BannerHeight){
            //透明度逐渐增大
            opacity = scrollTop /BannerHeight *0.85
        }else{
            opacity = 1
        }
        searchBar.style.background='rgba(201, 21, 35,'+ opacity+')'
    })
}
var banner = function(){ 
    /* 手指滑动跟着动，超过1/3松开就biu */
    /*自动轮播无缝 根据索引。touch 滑动结束不超过1/3划回去*/
    const banner = document.querySelector('.jd_banner')
    const bWidth = banner.offsetWidth;
    const imgs = banner.querySelector('ul:first-child')
    const pointBox = banner.querySelector('ul:last-child')
    var points = pointBox.querySelectorAll('li')
    
    //提取轮播图中的公共方法
    const setTranslate = function(translatex){
        imgs.style.transform = 'translateX('+(translatex)+'px)'
        imgs.style.webkitTransform = 'translateX('+(translatex)+'px)'
    }
    const removeTransition = function(){
        imgs.style.transition='none'
        imgs.style.webkitTransition='none'
    }
    const addTransition = function(){
        imgs.style.transition = 'all 1s ease-in-out '
        imgs.style.webkitTransition = 'all 1s ease-in-out '
    }
    /**定义些方法 ，就是--点和索引保持一致 点击 点进入响应图片 滑动清除定时器并移动 */
    var setPoint = function(){
        //获取1-8 --伪数组没有forEach方法
        
        for( var i =0;i<points.length;i++){
            points[i].classList.remove('now')
        }
        points[index-1].classList.add('now')
    }
    //记录手指触摸事件
    var startX = 0
    var distanceX = 0//手指滑动的距离
    var isMove =false //判断是否在滑动
    imgs.addEventListener('touchstart',function(e){
        clearInterval(timeId)
        /*记录起始位置x坐标 */
        startX = e.touches[0].clientX;
        console.log('touchstart')
    })



    /**通过 index 可以解决point */
    var index=1;
    var timeId = setInterval(function(){
        index++//每隔一定时间index++
        //给imagse 设置过度
        addTransition()
        //index ++后 如何去位移？
        setTranslate(-index*bWidth)
        setPoint()
    },2000)
        //无缝 需要判断动画结束后 然后跳到第2张
        // imgs
        imgs.addEventListener('transitionend',function(){
            if(index>=8){
                index=1
                removeTransition();
                setTranslate(-index*bWidth)
                setPoint()
            }
            //当往左滑动也是如此
            else if(index<=0){
                index = 8;
                removeTransition();
                setTranslate(-index*bWidth)
                setPoint()
            }
        })

        imgs.addEventListener('touchmove',function(e){
            //移动过程中的x坐标
            var moveX = e.touches[0].clientX;
            //计算位移量 移动距离减去初始距离
            distanceX = moveX-startX
            var translatex =distanceX+(-index*bWidth)
            removeTransition()//清除过渡再去定位
            setTranslate(translatex)
            isMove = true
        })
        imgs.addEventListener('touchend',function(e){
            if(isMove){
                if(Math.abs(distanceX) > (bWidth/3)){
                    if(distanceX<0){//上一张
                        index++
                    }else{//下一张
                        index--
                    }
                    addTransition()
                    setTranslate(-index*bWidth)
                }else{
                    addTransition()
                    setTranslate(-index*bWidth)
                }
                setPoint()
            }
            startX = 0
            distanceX = 0
            isMove = false
            clearInterval(timeId)
            timeId =setInterval(function(){
                index++//每隔一定时间index++
                //给imagse 设置过度
                addTransition()
                //index ++后 如何去位移？
                setTranslate(-index*bWidth)
                setPoint()
            },2000)
        })
    


}
var downTime = function(){
    var time = 2*60*60;//初始化倒计时
    const spans = document.querySelector('.sk_time').querySelectorAll('span');
    var timer = setInterval(function(){
        time--;
        //用second 来计算
        var h = Math.floor(time/3600)//秒除以60除以60 等于小时
        var m = Math.floor(time%3600/60)//秒除以60就是分针，再看能凑多少小时 就莫3600
        var s = Math.floor(time%60)//秒钟直接莫去60 可以取到余数
        spans[0].innerHTML = Math.floor(h/10)
        spans[1].innerHTML = Math.floor(h%10)
        spans[3].innerHTML = Math.floor(m/10)
        spans[4].innerHTML = Math.floor(m%10)
        spans[6].innerHTML = Math.floor(s/10)
        spans[7].innerHTML = Math.floor(s%10)

        if(time<=0){
            time = 2*60*60
        }
    },1000)
}

