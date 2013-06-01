jquery-Lweight-validate
作者：大猫
http://vikenlove.github.io/jquery-Lweight-validate
开源轻量级校验框架：更新信息与BUG修复记录请查看issueList文件
=========================================================================================
Lweight-validate API
<pre>
校验规则属性：
"number":校验数字
"required":非空校验
"idCard":身份证号码校验
"mail":电子邮件地址校验
"passWord":6~16位密码长度校验(包含密码强度提示)
"confirmPwd":密码确认校验
"mobile":11位手机号码校验
"dateYmd":YYYY-MM-DD 日期格式校验
"dateCompare":起始日期 小于 结束日期 校验
"unRequired":与mins-max配合，含义同“non-required”

配置属性:
"min-max":文本最小，最大长度校验
"check-type":校验属性KEY
"non-required":文本为空时，校验规则失效，非空时启用
"required-message":自定义提示信息，若不配置，为默认提示信息
"data-callback"配合使用:输去焦点回调函数
"call-message":同data-callback配合使用，回调函数自定义信息

<code>

 &lt;input type="text" id="inputtext" check-type="number" non-required='true'&gt;

&lt;input type="text" id="inputtext" check-type="unRequired" 
  min-max="3-5" min-message="字符长度不得小于3个字符" 
						max-message="字符长度不得超过5个字符"  
						required-message="文本不能为空！" &gt;

</code>

JS使用方式：

  $('#form').myValidate(
			{
				formCall:function(){formCallFunction();},//表单提交函数
				isAlert:true,//是否启用alert
				formKey:false,//是否开启键盘回车事件
				alterCall:function(msg){callbackFunction(msg);}	//自定义alert		
			});						
		});


</pre>
