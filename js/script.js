/* 获取 DOM 元素 */
var g = function(id){
	return document.getElementById(id);
}


/* 时间轴对象构造器 */
var Timeline = function(){
	this.order = []; // 动画序列
	this. add = function(timeout, func, log){
		this.order.push({
			timeout: timeout,
			func: func,
			log: log
		})
	}
	this.start = function(ff){
		for(var s in this.order){
			(function(me){
				var fn = me.func;
				var timeout = me.timeout;
				var log = me.log;
				timeout = Math.max(timeout-(ff||0), 0);

				setTimeout(fn,timeout);
				setTimeout(function(){
					console.log('timeout->',timeout,'log->',log);
				},timeout)
			})(this.order[s])
		}
	}
}

// 初始的场景 
var s1 = new Timeline();

// 粽子展开场景
var s2 = new Timeline();

// 粽子旋转场景
var s3 = new Timeline();

s1.add(1, function(){
	g('zongzi-box').className = 'zongzi-box rock';

	g('c_shengzi').onclick = function(){
		s2.start();
		g('c_shengzi').onclick = function(){}
	}
},'粽子抖动');

s2.add(1, function(){
	g('zongzi-box').className = 'zongzi-box';
	g('text').className = 'text in';
},'粽子停止抖动，左侧文字入场');

// 绳子的解开动画

s2.add(100, function(){
	g('c_shengzi').className = 'c_shengzi sz2';
}, '绳子解开步骤1');
s2.add(500, function(){
	g('c_shengzi').className = 'c_shengzi sz3';
}, '绳子解开步骤2');
s2.add(1000, function(){
	g('c_shengzi').className = 'c_shengzi sz4';
}, '绳子解开步骤3');
s2.add(1500, function(){
	g('c_shengzi').className = 'c_shengzi sz0';
}, '绳子解开步骤4');

// 粽叶动画
s2.add(2000, function(){
	g('c_zongzi').className = 'c_zongzi out';
	g('c_zongzi_meat').className = 'c_zongzi_meat in';
	g('c_left_ye').className = 'c_left_ye in';
	g('c_right_ye').className = 'c_right_ye in';
	g('caption').className = 'caption rock';

}, '粽子隐藏，粽子肉进来，粽叶展开');
s2.add(3000, function(){
	g('c_left_ye').className = 'c_left_ye out';
	g('c_right_ye').className = 'c_right_ye out';
	g('c_bottom_ye').className = 'c_bottom_ye in';
	g('c_t_1').className = 'c_t_1 c_t_in v0';
	g('c_t_2').className = 'c_t_1 c_t_in m0';
	s3.start();
}, '粽叶完全展开，粽子底页进来，文字进来');

// 粽子肉旋转动画

s3.add(1000,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v1';
},'粽子肉旋转');
s3.add(1200,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v2';
	g('c_t_1').className = 'c_t_1 c_t_in v2';
	g('c_t_2').className = 'c_t_2 c_t_in m2';
},'粽子肉旋转');
s3.add(1400,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v3';
	g('c_t_1').className = 'c_t_1 c_t_in v3';
	g('c_t_2').className = 'c_t_2 c_t_in m3';
},'粽子肉旋转');
s3.add(1600,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v4';
	g('c_t_1').className = 'c_t_1 c_t_in v4';
	g('c_t_2').className = 'c_t_2 c_t_in m4';
},'粽子肉旋转');
s3.add(1800,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v0';
	g('c_t_1').className = 'c_t_1 c_t_in m0';
	g('c_t_2').className = 'c_t_2 c_t_in v0';
},'粽子肉旋转');
s3.add(3000,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v4';
	g('c_t_1').className = 'c_t_1 c_t_in v4';
	g('c_t_2').className = 'c_t_2 c_t_in m4';
},'粽子肉旋转');
s3.add(3200,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v3';
	g('c_t_1').className = 'c_t_1 c_t_in v3';
	g('c_t_2').className = 'c_t_2 c_t_in m3';
},'粽子肉旋转');
s3.add(3400,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v2';
	g('c_t_1').className = 'c_t_1 c_t_in v2';
	g('c_t_2').className = 'c_t_2 c_t_in m2';
},'粽子肉旋转');
s3.add(3600,function(){
	g('c_zongzi_meat').className = 'c_zongzi_meat in v1';
	g('c_t_1').className = 'c_t_1 c_t_in v0';
	g('c_t_2').className = 'c_t_2 c_t_in m0';
},'粽子肉旋转');
s3.add(5000,function(){
	s3.start();
},'粽子肉旋转');

// s1.start();

//注释选项
// 图片加载器
var imgs = ['img/zzr_1.png','img/zzr_2.png','img/zzr_3.png','img/zzr_4.png'];

var imgs_onload = function(){
	imgs.pop();
	if(imgs.length == 0){
		s1.start();
	}
}
for(var s in imgs){
	var img = new Image;
	img.onload = imgs_onload;
	img.src = imgs[s]
}