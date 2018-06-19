// 23.封装一个代替getElementById()方法
    function byId(id){
      return typeof(id) ==="string"?document.getElementById(id):id;
    }
          //声明为全局变量
          //26.取当前显示图片  定义变量类选择器为banner下的div
   var index = 0,
        timer = null,
      
        pics = byId("banner").getElementsByTagName("div"), 
        // 29.定义dots下的span标签
        dots = byId("dots").getElementsByTagName("span"),
        //定义图片长度
       
       // 34.获取上一张  下一张的
       prev =byId("prev"),
       next =byId("next"),
	   menu = byId("menu-content");
	     console.log(pics);
	   console.log(menu);
	   //getElementsByClassName这个方法在ie8及以下浏览器是不支持的，不能使用。
	   var menuItems = menu.getElementsByClassName("menu-item");
	   console.log(menuItems);
      var len = pics.length;
	  //57获取sub-menu盒子
	  var subMenu = byId("sub-menu");
	  //59
	  var innerBox = subMenu.getElementsByClassName("inner-box");

    // console.log(byId("main"));
    // 24.创建slideImg（）方法;1.鼠标滑过图片 清除定时器。2.鼠标离开图片，定时器继续
    function slideImg(){ 
      var main = byId("main");
      //鼠标悬停在图片上
      main.onmouseover = function(){
        // 28.鼠标悬停在图片上清除定时器
        if(timer) clearInterval(timer);

      }
      //25.鼠标离开图片 间歇调用，绑定main一级大图
	   main.onmouseout = function(){
           timer = setInterval(function(){
             index++;
            if(index>=len){
              index=0
            }
            // console.log(index);
              // 切换图片
              changeImg();

            },3000);}
      // 27.自动调用鼠标离开图片自动切换
      main.onmouseout(); 
      // 30.获取当前小圆点对应图片的索引号
      //31将当前index改变成当前span的id值，调用切换图片
          for(var d=0;d<len;d++){
           dots[d].id=d;
           dots[d].onclick=function(){
            index=this.id;
            changeImg();

           } 
      }
      // 35.下一张点击事件
      next.onclick = function(){
        index++;
        if(index >= len) index=0;
        changeImg();
      }
      // 36.上一张点击事件
      prev.onclick = function () {
         index--;
         if(index < 0) index=len-1;
         changeImg();
	 //54.导航菜单
	 //遍历主菜单，且绑定事件
	  
      }
	  //57鼠标对应每个主菜单找到相应子菜单
	  //61.给每个主菜单加阴影(主菜单：menuItems)  (子菜单)
	   for(var m=0;m<menuItems.length;m++){
		   //对每一个menu-item定义data-index(自定义的)属性，作为索引
		   menuItems[m].setAttribute("data-index",m);
		   menuItems[m].onmouseover = function(){
			  subMenu.className = "sub-menu";
			  var idx = this.getAttribute("data-index");
			  for(var j=0;j<innerBox.length;j++){
				  //遍历所有子菜单，将每一个隐藏
				  innerBox[j].style.display = 'none';
				  menuItems[j].style.background ='none';
		     }
			  menuItems[idx].style.background ='rgba(0,0,0,0.1)';
			  innerBox[idx].style.display = 'block';
              //alert("hello");
			  //console.log(menuItems);
			  //5
		 }
		 }
		 // 鼠标离开整个menu.绑定menu事件，
		   //58鼠标离开主菜单，隐藏子菜单
		 menu.onmouseout = function(){
			 //鼠标滑过.menu盒子,就将subMenu类的className换成sub-menu hide给隐藏起来
			 subMenu.className = "sub-menu hide";
			 
			 }
			 //59.鼠标悬停在子菜单上，显示子菜单
	     subMenu.onmouseover = function(){
			 this.className = "sub-menu";
			 }
			 //60.鼠标离开子菜单，隐藏子菜单
			 subMenu.onmouseout = function(){
			 this.className = "sub-menu hide";
			 }
			 
		 
	}
      // 26切换图片
       // 不管元素上有咩有类，className属性设置的类会重写元素上的类
       // pics[index].className='slide-active';c重写了类
       // 遍历banner下的div,将其隐藏，根据index索引找到当前div,将其显示出来
       // pics[index].className='slide-active';
       // console.log(index);
     function changeImg(){
      //32.遍历dots下的所有span,将类给清除，
      for(var i=0;i<len;i++){

        pics[i].style.display ='none';
        dots[i].className="";
        }
        //33.根据index索引找到当前div和当前span,将其显示出来，设为当前
        pics[index].style.display = 'block';
        dots[index].className ="active";

     }
    // 25.调用slideImag()方法
	
    slideImg();