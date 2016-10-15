$(function(){
var myScroll;
//阻止默认行为
document.addEventListener("touchmove",function(e){

	e.preventDefault();

},false)
//加载完之后 执行getScroll
window.addEventListener("DOMContentLoaded",getScroll,false);
//渲染数据
function updata(direction){

	setTimeout(function(){

		$.getJSON("test.json",function(data){
			if(data.state==1){
				direction=="down"? $("#news-lists").prepend(data.data) : $("#news-lists").append(data.data);
				myScroll.refresh();

			}
		})

	},500)

}

function getScroll(){
var pullDown=document.getElementById('pullDown');
var topHeight=pullDown.offsetHeight;

var pullUp=document.getElementById('pullUp');
var bottomHeight=pullUp.offsetHeight;

	myScroll=new iScroll("wrapper",{
			vScrollbar:false,
			topOffset:topHeight,
		//Dom元素复位
		onRefresh:function(){
			if(pullDown.className.match("loading")){
				pullDown.className="";
				pullDown.querySelector(".pullDownLabel").innerHTML="下拉刷新……";
			}


		},

		onScrollMove:function(){
			if(this.y>5 && !pullDown.className.match("flip")){
				pullDown.className='flip';
				pullDown.querySelector('.pullDownLabel').innerHTML="松开手开始刷新";
				this.minScrollY=0;
			}else if(this.y<(this.maxScrollY-5) && !pullUp.className.match("flip")){
				pullUp.className="flip";
				pullUp.querySelector('.pullUpLabel').innerHTML="松开手开始刷新";
			}
	;
		},

		onScrollEnd:function(){
			if(pullDown.className.match("flip")){
				pullDown.className='loading';
				pullDown.querySelector(".pullDownLabel").innerHTML="正在加载中……";
				updata("down");
			}else if(pullUp.className.match("flip")){
				pullUp.className="loading";
				pullUp.querySelector('.pullUpLabel').innerHTML="上拉加载更多……";
				updata("up");
			}

		}

	})

}










})