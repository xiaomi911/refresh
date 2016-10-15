(function(){
var myScroll;
    
    
document.addEventListener('touchmove',function(e){
    e.preventDefault();
},false)


//onload,DOMContentLoaded,$(document).ready()
window.addEventListener('DOMContentLoaded',getScroll,false);
    
    
function pullData(direction) {
     setTimeout(function(){
         $.getJSON('test.json',function(data){                
              //console.log(data.data);
             if(data.state==1) {
                 direction=="down" ?  $("#news-lists").prepend(data.data) :  $("#news-lists").append(data.data);
                 myScroll.refresh();
             } 
         
         });
     
     
     },2000)


}

function getScroll() {    
    
    var pullDown=document.getElementById('pullDown');
    var topHeight=pullDown.offsetHeight;  
    var pullUp=document.getElementById('pullUp');
    var bottomHeight=pullUp.offsetHeight; 
   // console.log(topHeight);    
   myScroll=new iScroll("wrapper",{
          vScrollbar:false,
          topOffset:topHeight,
          onRefresh:function(){
              if(pullDown.className.match("loading")) {                  
                  pullDown.className="";
                  pullDown.querySelector('.pullDownLabel').innerHTML="下拉刷新...";

                  
              }
          
          },
          onScrollMove:function() {
             //console.log(this.y);
              if(this.y>5 && !pullDown.className.match("flip"))  {
                  pullDown.className="flip"
                  pullDown.querySelector('.pullDownLabel').innerHTML="松开手开始刷新...";
                  this.minScrollY=0;
              
              }else if(this.y<(this.maxScrollY-5) && !pullUp.className.match("flip")) {                 
                  pullUp.className="flip";
                  pullUp.querySelector('.pullUpLabel').innerHTML="松开手开始刷新...";
              }
          },
        onScrollEnd:function() {
            if(pullDown.className.match("flip")) {
                 pullDown.className="loading";
                 pullDown.querySelector('.pullDownLabel').innerHTML="加载中...";
                 pullData('down');
            
            }else if(pullUp.className.match("flip")) {
                 pullUp.className="loading";
                 pullUp.querySelector('.pullUpLabel').innerHTML="加载中...";
                 pullData('up');
            }
        }
    
    })
}









})()