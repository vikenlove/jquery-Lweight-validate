jquery-Lweight-validate
作者：大猫
http://vikenlove.github.io/jquery-Lweight-validate
开源轻量级校验框架：更新信息与BUG修复记录请查看issueList文件
=========================================================================================

如何使用:
<code>
$('#form').myValidate(options)
</code>
<pre>
例:
   	$('#form').myValidate(
			{
				formCall:function(){formCallFunction();},
				isAlert:false,
				formKey:false,
				alterCall:function(msg){callbackFunction(msg);}			
			});	

</pre>

注:options 同校验属性-other config

校验属性-check-type规则：
<pre>
   required:非空校验
   unRequired:非必填项属性
   number：校验数字
   mail：校验Email
   char：英文字符校验
   chinese：中文字符校验
   mobile：手机号码校验
   tell：电话号码-格式支持：+（国家代码）-（区号）-号码-（分机号）
   passWord：密码强度校验-默认长度大小6~20
   confirmPwd：密码确认
   dateYmd：日期格式-例：yyyy-MM-dd
   idCard：身份证号码
   dateCompare：前后日起大小-例：起始日期-结束日期 之间比较
</pre>
校验属性-other config：

<pre>
non-required: check-type规则下 非填写情况下不校验配置
required-message：自定义提示信息
min-max：文本长度校验-例：min-max="1-10" 最小长度为1，最大长度10
         min-message：最小长度提示信息
         max-message：最大长度提示信息
data-callback：文本异步校验回调函数
call-message：异步回调自定义信息
options：
        formCall:表单提交函数(*必配选项*)
        isAlert：是否开启alert弹出方式，true/false 不配置，则等于为false(非必配选项)
        formKey: 是否开启回车键监听,true/false 不配置，则等于为false(非必配选项)
        alterCall:alert 弹出方式自定义回调函数，此方法用于自定义的
                  alert效果 function(msg){callbackFunction(msg);}	（非必配选项）
</pre>

==============
HMTL DEMO:
<pre>
&lt;form id="form"&gt;
	//当文本输入值后，校验其类型，不填则不进行校验
	&lt;div class="control-group"&gt;
		&lt;label class="control-label" for="inputtext"&gt;数字&lt;/label&gt;
		  &lt;div class="controls"&gt;
			&lt;input type="text" id="inputtext" check-type="number" non-required='true'&gt;
							
	        &lt;/div&gt;
	&lt;/div&gt;
        //文本异步调用校验配置
	&lt;div class="control-group"&gt;
	   &lt;label class="control-label" for="inputName"&gt;用户名&lt;/label&gt;
		&lt;div class="controls"&gt;
			&lt;input type="text" id="inputName" check-type="required" 
			data-callback="mycallback()" call-message="用户名名已存在" 
			required-message="用户名不能为空"&gt;
		&lt;/div>
	&lt;/div>
	//非特定规则校验下，当输入后校验，不输入不进行校验配置
	&lt;div class="control-group"&gt;
		&lt;label class="control-label" for="inputtext"&gt;文本&lt;/label&gt;
		 &lt;div class="controls"&gt;
			&lt;input type="text" id="inputtext" check-type="unRequired"
					min-max="3-5" min-message="字符长度不得小于3个字符" 
					max-message="字符长度不得超过5个字符"  
					required-message="文本不能为空！"  &gt;
						
		&lt;/div&gt;
	&lt;/div&gt;			
&lt;/form&gt;
</pre>


