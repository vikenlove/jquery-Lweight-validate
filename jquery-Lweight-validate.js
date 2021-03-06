/* =========================================================
 * jquery-Lightweight-validation.js 
 * Original Idea: (Copyright 2013 Viken)
 * Updated by 大猫 
 * version 1.1.6
 * =========================================================
 * http://vikenlove.github.io/jquery-Lweight-validate
 * http://www.oschina.net/p/jquery-lweight-validate 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.     
 * ========================================================= */
;(function($) {     	
	$.fn.myValidate = function(options) {
		var globalOptions  = $.extend({}, $.fn.defaults, options);
			var $this = this;
			//replace click event by mousedown，because blur and click was run at the same time，blur run before click。
			$this.find('[btn-type=true]').on("mousedown",function(){
				validateClick($this,globalOptions,$(this).attr("btn-val"));
			});
			
			
			if(globalOptions.formKey){
				$(document).keyup(function(event){
				  switch(event.keyCode) {
					case 13:
						validateClick($this,globalOptions);
						break; 
					}
				});
			};
			validateBlur($this,globalOptions);
	};


	var validateClick = function(obj,globalOptions,btnVal){
		globalOptions.eventStatus =  true;
		if(!validateForm(obj,globalOptions)){
			if(globalOptions.formCall != undefined){
				if(btnVal!=undefined){
					globalOptions.formCall(btnVal);
				}else{
					globalOptions.formCall();
				}
			}	
		}	
	};
	
 
  $.fn.defaults = {
        validRules : [
            {name: 'required', validate: function(value) {return ($.trim(value) == ''||$.trim(value).length==0);}, defaultMsg: '请输入内容,字符数不能超过20。'},
			{name: 'unRequired', validate: function(value) {return false;}, defaultMsg: '请输入内容。'},
            {name: 'number', validate: function(value) { return (!/^[0-9]+(\.)?[0-9]*$/.test($.trim(value)));}, defaultMsg: '请输入数字。'},
            {name: 'mail', validate: function(value) {return (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test($.trim(value)));}, defaultMsg: '请输入邮箱地址。'},
            {name: 'char', validate: function(value) {return (!/^[a-z\_\-A-Z]*$/.test($.trim(value)));}, defaultMsg: '请输入英文字符。'},
            {name: 'chinese', validate: function(value) {return (!/^[\u4e00-\u9fff]+$/.test($.trim(value)));}, defaultMsg: '请输入汉字。'},
			{name: 'mobile', validate: function(value) {return (!/^(13|15|18)[0-9]{9}$/.test($.trim(value)));}, defaultMsg: '请输入正确手机号码。'},
			{name: 'tell', validate: function(value) {return checkTel($.trim(value));}, defaultMsg: '请输入正确电话号码格式:区号-号码或手机号。'},
			{name: 'passWord', validate: function(value) {return checkPwd($.trim(value));}, defaultMsg: '密码长度必须在6~20之间。'},
			{name: 'confirmPwd', validate: function(value,objel) {return confirmPwd($.trim(value),objel);}, defaultMsg: '两次密码不一致'},
			{name: 'dateYmd', validate: function(value) {return checkDate($.trim(value));}, defaultMsg: '请输入YYYY--MM--DD格式'},
			{name: 'idCard', validate: function(value) {return checkIdCard($.trim(value));}, defaultMsg: '请输入正确的身份证号码'},
			{name: 'dateCompare', validate: function(value) {return dateCompare();}, defaultMsg: '起始日期不能大于结束日期'},
			{name: 'checkLength', validate: function(value) {return ($.trim(value).length>20);}, defaultMsg: '字符长度不能超过20。'},
			{name: 'url', validate: function(value) {return (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test($.trim(value)))}, defaultMsg: '请输正确的网址。'},
			{name: 'username', validate: function(value) {return (!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test($.trim(value)))}, defaultMsg: '请输入5-20个以字母开头、可带数字、“_”、“.”的字串'}

			
			
        ],
		city : [
			{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",
			23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
			41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",
			52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
			65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}		
		],
		errorCustom : {
				customFlag:false,
				regionText:false
		}
    };
	


			
var validateBlur = function(obj,globalOptions){
	$(obj).find("input,textarea,select").each(function(){
	
	var el = $(this);
	
	var valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' ');
		
		if(valid!==null && valid.length>0){
		
			el.focus(function(){
				globalOptions.eventStatus=false;
				var curTextDiv=el.parent(), curErrorEl = curTextDiv.children('.help-inline');
				
				if(globalOptions.errorCustom.customFlag){
						if(globalOptions.errorCustom.regionText){
							var checkType = el.attr("check-type");
							if(checkType=='passWord' || checkType=="confirmPwd"){
								el.attr("type","password");
							};
								el.val(el.attr("srcValue")).css("color","");
						}else{
							
							el.siblings("."+globalOptions.errorStyle.errorRegion).text("").removeClass(globalOptions.errorStyle.errorClass);
						}					
				}else{
					if(curErrorEl.hasClass('help-inline')){
						curErrorEl.remove();
					}else if(curTextDiv.parent().children('.help-inline').hasClass('help-inline')){
						curTextDiv.parent().children('.help-inline').remove();
					}
				}				
			});
			el.blur(function() { 
				if(el.attr("check-type")=='dateYmd'){
					setTimeout(function(){validateField(el, valid,globalOptions);},500); 
				}else{
					if(!globalOptions.eventStatus){
						validateField(el, valid,globalOptions);						
					}
					
				}
            });
			
			
		}			
	});
		
};				
var validateForm=function(obj,globalOptions){
	
	 var validationError = false;
	$(obj).find("input:visible,textarea:visible,select:visible").each(function(){
	
	var el = $(this);
	var valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' ');
		
		if(valid!==null && valid.length>0){
			if(!validateField(el,valid,globalOptions)){
				validationError=true;
			}
		}
		if(globalOptions.isAlert){
			if(validationError){
				return false;
			}				
		}		
	});
	return validationError;
};


var validateField = function(field,valid,globalOptions){
	 var el = $(field),_elVal=$.trim(el.val());
	
	 var error = false,isNonFlag=false, errorMsg = '',pwdStatus=0,elLength = (_elVal!==null||_elVal!="")?_elVal.length:0;
	 var isNon = (el.attr('non-required')==undefined||el.attr('non-required')=='false')?false:true;
	 var rules = globalOptions.validRules;
		for(var i=0,j=rules.length;i<j;i++){
			var rule = rules[i];
		
			if(valid==rule.name){
				var ruleVal = rule.validate(_elVal,el);
				if(isNon){
					if(elLength > 0){
						if(ruleVal==true||ruleVal==-1){
							error=true;
							errorMsg=(el.attr('required-message')==undefined)?rule.defaultMsg:el.attr('required-message');
							break;
						}else{
							isNonFlag=true;
						}					
					}
				}else if(ruleVal==true||ruleVal==-1){
					error=true;
					errorMsg=(el.attr('required-message')==undefined)?rule.defaultMsg:el.attr('required-message');
					break;
				}	
			}
		}
	if(!error){
	
		if(elLength >0){
			var minMax = (el.attr('min-max')==undefined)?null:el.attr('min-max').split(' ');	
			var _callBack = (el.attr('data-callback')==undefined)?null:el.attr('data-callback').split(' ');
			
			if(minMax!==null && minMax.length>0){
				var min = el.attr('min-max').split('-')[0],max=el.attr('min-max').split('-')[1];
				if(elLength < Number(min)){
					error=true;
					errorMsg=(el.attr('min-message')==undefined)?"文本长度不能小于"+min+"个字符":el.attr('min-message');
				}else if(max != undefined){
					if(elLength > Number(max)){
						error=true;
						errorMsg=(el.attr('max-message')==undefined)?"文本长度不能大于"+max+"个字符":el.attr('max-message');
					}
				}else{
					isNonFlag=true;
				}
			}
			if(!error){
				if(_callBack!==null && _callBack.length>0){
					var _ajaxCallBack = el.attr('data-callback');
					error = eval(_ajaxCallBack);
					if(error){
						errorMsg=(el.attr('call-message')==undefined)?"校验无法通过，请重新输入":el.attr('call-message');
					}
				}	
			}		
		}			
	}
	 
	var curTextDiv=el.parent(), curErrorEl = curTextDiv.children('.help-inline'),uniformDiv=curTextDiv.attr("id");
	



	if(error){
		if(globalOptions.isAlert){
			if(globalOptions.alterCall != undefined){
				globalOptions.alterCall(errorMsg);	
			}else{
				alert(errorMsg);				
			}	
		}else{
			if(uniformDiv!=undefined && uniformDiv.indexOf('uniform-')>-1){
				if(curTextDiv.parent().children('.help-inline').hasClass('help-inline')){
					curTextDiv.parent().data('help-inline',errorMsg);	
				}else{
					if(globalOptions.errorCustom.customFlag){
						el.siblings("."+globalOptions.errorStyle.errorRegion).append(errorMsg);
					}else{
						curTextDiv.parent().append('<span class="help-inline error">'+errorMsg+'</span>');
					}
					
				}						
			}else{

					if(globalOptions.errorCustom.customFlag){
						if(globalOptions.errorCustom.regionText){
								if(el.attr("type")=='password'){
									el.attr("type","text");
								};
								var textValue=el.val();
								el.val(errorMsg).css("color","#cccccc").attr("srcValue",textValue);
						}else{
							el.siblings("."+globalOptions.errorStyle.errorRegion).text(errorMsg);					
						}
	

					}else{
						if(curErrorEl.hasClass('help-inline')){
							curTextDiv.data('help-inline',errorMsg);
						}else{
							curTextDiv.append('<span class="help-inline error">'+errorMsg+'</span>');
						}
					}			
			}		
			//el.removeClass('right').addClass('error');
			removeElStyleClass(el,globalOptions,1);

		}
	}else if(ruleVal > 0){
	
		var pwdStrong = passWordStatus(ruleVal);
		var classpic = classStatus(ruleVal);
		

	if(globalOptions.errorCustom.customFlag){
		
		if(globalOptions.errorCustom.regionText){
				var textValue=el.val();
				if(error){
					el.val(errorMsg).css("color","#cccccc").attr("srcValue",textValue);
				}else{
					el.attr("srcValue",textValue);
				}
				
			}else{
					el.siblings("."+globalOptions.errorStyle.errorRegion).text(pwdStrong);					
			}
	}else{
		if(curErrorEl.hasClass('help-inline')){
				curTextDiv.data('help-inline',pwdStrong);
			}else{		
				curTextDiv.append('<span class="help-inline '+classpic+'">'+pwdStrong+'</span>');
		};

	}
		//el.removeClass('error').removeClass('right');
		removeElStyleClass(el,globalOptions,2);
		
	}else{
		if(!globalOptions.isAlert){
			curErrorEl.remove();
			//isNonFlag==true?el.removeClass('error').addClass('right'):el.removeClass('error').removeClass('right');	
			removeElStyleClass(el,globalOptions,2);
			
				if(globalOptions.errorCustom.regionText){
					el.attr("srcValue",el.val());
				}
			
						
		}
	}
	
	return !error;
};

var removeElStyleClass = function(objel,globalOptions,reomveType){
		if(globalOptions.errorStyle!=undefined){
				var styleOption =globalOptions.errorStyle,$objelProperty;
					if(globalOptions.errorCustom.regionText){
						$objelProperty = objel.parents("."+styleOption.errorRegion);															
					}else{
						$objelProperty = objel.siblings("."+styleOption.errorRegion);					
					};
			
					if(reomveType==1){
						$objelProperty.removeClass(styleOption.rightClass).addClass(styleOption.errorClass);
					}else{
						$objelProperty.removeClass(styleOption.errorClass).addClass(styleOption.rightClass);
					};	
					
					
			}else{					
					if(reomveType==1){
						objel.removeClass('right').addClass('error');
					}else{
						objel.removeClass('error').addClass('right');
					};
			};
};


var trimReplaceHtml = function(value){
	return $.trim(value.replace( /\r\n/g,""));
}
			
var checkIdCard = function(value){ 
	var iSum=0,birthday;
	if(!/^\d{17}(\d|x)$/i.test(value)){
		return true; 
	} 
	value=value.replace(/x$/i,"a"); 
	if($(this).defaults.city[0][parseInt(value.substr(0,2))]==null){
		return true; 
	} 
	birthday=value.substr(6,4)+"-"+Number(value.substr(10,2))+"-"+Number(value.substr(12,2)); 
	var d=new Date(birthday.replace(/-/g,"/")) ;
	if(birthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
		return true; 
	}
	for(var i = 17;i >= 0;i --){
		iSum += (Math.pow(2,i) % 11) * parseInt(value.charAt(17 - i),11) ;
	} 
	if(iSum%11!=1) {
		return true;
	} 
	return false;
}; 
	
	
var dateCompare = function(){
	var $this = $("input[check-type='dateCompare']"),flag=false;
	
	if($this.eq(0).val().length >0 && $this.eq(1).val().length >0){
		if($this.eq(0).val()!=$this.eq(1).val()){
			var startDate = Number($this.eq(0).val().replace(/-/g,'')),endDate=Number($this.eq(1).val().replace(/-/g,''));	
			flag = startDate < endDate?false:true;
		}
	}
	return flag;
};
	
	
	
var checkDate = function(value){
	var r = value.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if(r==null)return true; 
	var d= new Date(r[1], r[3]-1, r[4]); 
		return !(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
};

	
var confirmPwd = function(value,objel) {
    var inputObj = $(objel).parents("form").find("input[type='password']");
    var pwd1="",pwd2="";
    if(inputObj.size()==3){
        pwd1 = $.trim(inputObj.eq(1).val());
        pwd2 = $.trim(inputObj.eq(2).val());
    }else{
        pwd1 = $.trim(inputObj.eq(0).val());
        pwd2 = $.trim(inputObj.eq(1).val());
    }
    return (pwd2.length >= 0?(pwd1 == pwd2?false:true):true);    
};


var checkPwd = function(value){
	if(value.length >= 6 && value.length<=20)
	{		
		if(/[a-zA-Z_]+/.test(value) && /[0-9]+/.test(value) && /\W+/.test(value)) {
				return 4;
		}else if(/[a-zA-Z_]+/.test(value) || /[0-9]+/.test(value) || /\W+/.test(value)) {
			if(/[a-zA-Z_]+/.test(value) && /[0-9]+/.test(value)) {
				return 2;
			}else if(/[a-zA-Z_]+/.test(value) && /\W+/.test(value)) {
				return 2;
			}else if(/[0-9]+/.test(value) && /\W+/.test(value)) {
				return 2;
			}else if(/[a-zA-Z_]+/.test(value) && /[0-9]+/.test(value) && /\W+/.test(value)){
				return 1;
			}
			else{
				return 3;
			}
		}	
	}else{
		return true;
	}
};
//Add BY Loren
var checkTel= function(value){
	var r = value.match(/^(17[0-9]|13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/); 
	var r1 = value.match(/^(\d{3,4}|\d{3,4}-|\s)?\d{8}$/); 
	if(r==null && r1==null)return true; 
	
}

var classStatus = function(i){
	var status ='';
	switch(i){
		case 4:
			status="passWord3";
			break;
		case 2:
			status="passWord2";
			break;
		case 3:
			status="passWord1";
			break;	
	}
	return status;
};

var passWordStatus = function(i){
	var status ='';
	switch(i){
		case 4:
			status="强";
			break;
		case 2:
			status="中";
			break;
		case 3:
			status="弱";
			break;	
	}
	return status;
};
     
})(jQuery);   
