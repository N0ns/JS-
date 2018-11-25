$(function() {
	
	/*
	 1、用户名验证

	2、注册

	3、登陆

	4、退出

	5、发帖

	6、获取帖子列表

	7、顶贴、彩贴
 
	 * */

	function getcookies(key) {
		//获取cookie的函数
		var cookie = document.cookie; //uid=1; username=malin
		//		console.log(cookie);
		var arr = cookie.split('; '); //["uid=1", "username=malin"]
		//		console.log(arr);
		for(var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('='); //[uid,1] [username,malin]
			if(arr2[0] == key) {
				return arr2[1];
			}
		}

	}

	function update() {
		//刷新面板的状态，根据用户的登陆状态而定的。
		//如果是登陆的：显示退出面板，隐藏注册和登陆面板
		//如果是退出的：显示注册和登陆面板，隐藏退出面板
		var uid = getcookies('uid');
		var name = getcookies('username');
		//		console.log(uid);
		if(uid) {
			//登陆状态
			$('#user').show();
			$('#reg').hide();
			$('#login').hide();
			$('#userinfo').html(name);
		} else {
			$('#user').hide();
			$('#reg').show();
			$('#login').show();
			$('#userinfo').html('');
		}
	}

	update();

	//用户名验证
	/*
	验证用户名
	get
		guestbook/index.php
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	$('#username1').keyup(function() {
		var usn = $('#username1').val();
		$.ajax({
			type: "get",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'verifyUserName',
				'username': usn
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					$('#verifyUserNameMsg').html(data.message).css('color', 'green');
				} else {
					$('#verifyUserNameMsg').html(data.message).css('color', 'red');
				}
			}
		});
	});

	//2、注册
	/*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	$('#btnReg').click(function() {
		var usn = $('#username1').val();
		var psw = $('#password1').val();
		$.ajax({
			type: "post",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'reg',
				'username': usn,
				'password': psw
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					alert(data.message);
				} else {
					alert(data.message);
				}
			}
		});
	});

	//3、登陆
	/*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	$('#btnLogin').click(function() {

		var usn = $('#username2').val();
		var psw = $('#password2').val();
		$.ajax({
			type: "post",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'login',
				'username': usn,
				'password': psw
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					alert(data.message);
				} else {
					alert(data.message);
				}

				update();
			}
		});
	});

	//退出
	/*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/

	$('#logout').click(function() {
		console.log(1233);
		$.ajax({
			type: "get",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'logout'
			},
			success: function(str) {
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					alert(data.message);
				} else {
					alert(data.message);
				}

				update();
			}
		});
	});

	//发帖
	/*
	留言
	post
		guestbook/index.php
			m : index
			a : send
			content : 留言内容
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
					{
						cid : 留言id	
						content : 留言内容 
						uid : 留言人的id
						username : 留言人的名称
						dateline : 留言的时间戳(秒)
						support : 当前这条留言的顶的数量
						oppose : 当前这条留言的踩的数量
					}
				message : 返回的信息 具体返回信息
			}
	*/

	$('#btnPost').click(function() {
		var con = $('#content').val();
		$.ajax({
			type: "post",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'send',
				'content': con
			},
			success: function(str) {
				var dataList = JSON.parse(str);
				//				console.log(data);
				if(!dataList.code) {
					alert(dataList.message);
					$('#content').val('');
					creatData(dataList.data);
				} else {
					alert(dataList.message);
				}
			}
		});
	});

	//封装一个方法：插入新贴
	function creatData(data) {
		var html = '<dl cid="' + data.cid + '"><dt><strong>' + data.username + '</strong> 说 :</dt><dd>' + data.content + '</dd><dd class="t"><a href="javascript:;" class="support">顶(<span>' + data.support + '</span>)</a>| <a href="javascript:;" class="oppose">踩(<span>' + data.oppose + '</span>)</a></dd></dl>';
		$('#list').html($('#list').html() + html);
	}

	/*
		初始化留言列表
		get
			guestbook/index.php
				m : index
				a : getList
				page : 获取的留言的页码，默认为1
				n : 每页显示的条数，默认为5
			返回
				{
					code : 返回的信息代码 0 = 没有错误，1 = 有错误
					data : 返回成功的留言的详细信息
						{
							count:总数量，
							pages：总页码，
							page：第几页内容，
							list：[
									{
										cid : 留言id	
										content : 留言内容 
										uid : 留言人的id
										username : 留言人的名称
										dateline : 留言的时间戳(秒)
										support : 当前这条留言的顶的数量
										oppose : 当前这条留言的踩的数量
									}，
									{}，
									{}
							]
							
						}
					message : 返回的信息 具体返回信息
				}
		*/
	getlist();
	var iPage = 1;

	function getlist() {
		//获取内容
		$.ajax({
			type: "get",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'getList',
				'page': iPage,
				'n': 5
			},
			success: function(str) {
				var dataList = JSON.parse(str);
				console.log(dataList);
				var arr = dataList.data;
				if(!dataList.code) {
					//如果数据库有数据就渲染到页面中
					for(var i = 0; i < arr.list.length; i++) {
						creatData(arr.list[i]);
					}
				} else {
					$('#showMore').hide();
				}
			}
		});
	}

	//加载更多

	$('#showMore').click(function() {
		iPage++;
		getlist();
	});

	//顶贴彩贴 delegate() 专门创建的节点绑定事件
	/*
	顶贴
	get/post
		guestbook/index.php
			m : index
			a : doSupport
			cid:文章的id
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
				data：{
					list:[
						{}
					]
				}
				
			}
	*/

	/*

		踩贴
		get/post
			guestbook/index.php
				m : index
				a : doOppose
				cid:文章的id
			返回
				{
					code : 返回的信息代码 0 = 没有错误，1 = 有错误
					message : 返回的信息 具体返回信息
				}
		*/
	$('#list').delegate('.support', 'click', function() {
		var id = $(this).parent().parent().attr('cid');
		$.ajax({
			type: "get",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'doOppose',
				'cid': id
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				var sp = $('#list dl[cid=' + id + ']').find('.support span').html();
				console.log(sp);
				sp++;
				$('#list dl[cid=' + id + ']').find('.support span').html(sp);
			}
		});
	});

	$('#list').delegate('.oppose', 'click', function() {
		var id = $(this).parent().parent().attr('cid');
		$.ajax({
			type: "get",
			url: "guestbook/index.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'doSupport',
				'cid': id
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				var sp = $('#list dl[cid=' + id + ']').find('.oppose span').html();
				console.log(sp);
				sp++;
				$('#list dl[cid=' + id + ']').find('.oppose span').html(sp);
			}
		});
	});
});