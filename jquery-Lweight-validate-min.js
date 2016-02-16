/* =========================================================
 * jquery-Lightweight-validation.js 
 * Original Idea: (Copyright 2013 Viken)
 * Updated by 大猫 
 * version 1.1.3  
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
!function($){var validateClick,validateBlur,validateForm,validateField,removeElStyleClass,trimReplaceHtml,checkIdCard,dateCompare,checkDate,confirmPwd,checkPwd,classStatus,passWordStatus;$.fn.myValidate=function(a){var b=$.extend({},$.fn.defaults,a),c=this;c.find("[btn-type=true]").click(function(){validateClick(c,b);}),b.formKey&&$(document).keyup(function(a){switch(a.keyCode){case 13:validateClick(c,b);}}),validateBlur(c,b);},validateClick=function(a,b){validateForm(a,b)||void 0!=b.formCall&&b.formCall();},$.fn.defaults={validRules:[{name:"required",validate:function(a){return""==$.trim(a)||0==$.trim(a).length||null==$.trim(a);},defaultMsg:"\u8bf7\u8f93\u5165\u5185\u5bb9\u3002"},{name:"unRequired",validate:function(){return !1;},defaultMsg:"\u8bf7\u8f93\u5165\u5185\u5bb9\u3002"},{name:"number",validate:function(a){return !/^[0-9]\d*$/.test($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165\u6570\u5b57\u3002"},{name:"mail",validate:function(a){return !/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740\u3002"},{name:"char",validate:function(a){return !/^[a-z\_\-A-Z]*$/.test($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165\u82f1\u6587\u5b57\u7b26\u3002"},{name:"chinese",validate:function(a){return !/^[\u4e00-\u9fff]+$/.test($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165\u6c49\u5b57\u3002"},{name:"mobile",validate:function(a){return !/^(13|15|18)[0-9]{9}$/.test($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165\u6b63\u786e\u624b\u673a\u53f7\u7801\u3002"},{name:"tell",validate:function(a){return !/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165\u6b63\u786e\u7535\u8bdd\u53f7\u7801\u683c\u5f0f:\u533a\u53f7-\u53f7\u7801\u3002"},{name:"passWord",validate:function(a){return checkPwd($.trim(a));},defaultMsg:"\u5bc6\u7801\u957f\u5ea6\u5fc5\u987b\u57286~20\u4e4b\u95f4\u3002"},{name:"confirmPwd",validate:function(a){return confirmPwd($.trim(a));},defaultMsg:"\u4e24\u6b21\u5bc6\u7801\u4e0d\u4e00\u81f4"},{name:"dateYmd",validate:function(a){return checkDate($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165YYYY--MM--DD\u683c\u5f0f"},{name:"idCard",validate:function(a){return checkIdCard($.trim(a));},defaultMsg:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8eab\u4efd\u8bc1\u53f7\u7801"},{name:"dateCompare",validate:function(){return dateCompare();},defaultMsg:"\u8d77\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"}],city:[{11:"\u5317\u4eac",12:"\u5929\u6d25",13:"\u6cb3\u5317",14:"\u5c71\u897f",15:"\u5185\u8499\u53e4",21:"\u8fbd\u5b81",22:"\u5409\u6797",23:"\u9ed1\u9f99\u6c5f",31:"\u4e0a\u6d77",32:"\u6c5f\u82cf",33:"\u6d59\u6c5f",34:"\u5b89\u5fbd",35:"\u798f\u5efa",36:"\u6c5f\u897f",37:"\u5c71\u4e1c",41:"\u6cb3\u5357",42:"\u6e56\u5317",43:"\u6e56\u5357",44:"\u5e7f\u4e1c",45:"\u5e7f\u897f",46:"\u6d77\u5357",50:"\u91cd\u5e86",51:"\u56db\u5ddd",52:"\u8d35\u5dde",53:"\u4e91\u5357",54:"\u897f\u85cf",61:"\u9655\u897f",62:"\u7518\u8083",63:"\u9752\u6d77",64:"\u5b81\u590f",65:"\u65b0\u7586",71:"\u53f0\u6e7e",81:"\u9999\u6e2f",82:"\u6fb3\u95e8",91:"\u56fd\u5916"}],errorCustom:{customFlag:!1,regionText:!1}},validateBlur=function(a,b){$(a).find("input,textarea,select").each(function(){var a=$(this),c=void 0==a.attr("check-type")?null:a.attr("check-type").split(" ");null!==c&&c.length>0&&(a.focus(function(){var c=a.parent(),d=c.children(".help-inline");b.errorCustom.customFlag?b.errorCustom.regionText?a.val(a.attr("srcValue")).css("color",""):c.siblings(".error-custom").text(""):d.hasClass("help-inline")?d.remove():c.parent().children(".help-inline").hasClass("help-inline")&&c.parent().children(".help-inline").remove();}),a.blur(function(){"dateYmd"==a.attr("check-type")?setTimeout(function(){validateField(a,c,b);},500):validateField(a,c,b);}));});},validateForm=function(a,b){var c=!1;return $(a).find("input:visible,textarea:visible,select:visible").each(function(){var a=$(this),d=void 0==a.attr("check-type")?null:a.attr("check-type").split(" ");return null!==d&&d.length>0&&(validateField(a,d,b)||(c=!0)),b.isAlert&&c?!1:void 0;}),c;},validateField=function(field,valid,globalOptions){var i,j,rule,ruleVal,minMax,_callBack,min,max,_ajaxCallBack,curTextDiv,curErrorEl,uniformDiv,textValue,pwdStrong,classpic,el=$(field),error=!1,isNonFlag=!1,errorMsg="",pwdStatus=0,elLength=el.val().length,isNon=void 0==el.attr("non-required")||"false"==el.attr("non-required")?!1:!0,rules=globalOptions.validRules;for(i=0,j=rules.length;j>i;i++){if(rule=rules[i],valid==rule.name){if(ruleVal=rule.validate(el.val()),isNon){if($.trim(el.val()).length>0){if(1==ruleVal||-1==ruleVal){error=!0,errorMsg=void 0==el.attr("required-message")?rule.defaultMsg:el.attr("required-message");break;}isNonFlag=!0;}}else{if(1==ruleVal||-1==ruleVal){error=!0,errorMsg=void 0==el.attr("required-message")?rule.defaultMsg:el.attr("required-message");break;}}}}return error||el.val().length>0&&(minMax=void 0==el.attr("min-max")?null:el.attr("min-max").split(" "),_callBack=void 0==el.attr("data-callback")?null:el.attr("data-callback").split(" "),null!==minMax&&minMax.length>0&&(min=el.attr("min-max").split("-")[0],max=el.attr("min-max").split("-")[1],elLength<Number(min)?(error=!0,errorMsg=void 0==el.attr("min-message")?"\u6587\u672c\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e"+min+"\u4e2a\u5b57\u7b26":el.attr("min-message")):void 0!=max?elLength>Number(max)&&(error=!0,errorMsg=void 0==el.attr("max-message")?"\u6587\u672c\u957f\u5ea6\u4e0d\u80fd\u5927\u4e8e"+max+"\u4e2a\u5b57\u7b26":el.attr("max-message")):isNonFlag=!0),error||null!==_callBack&&_callBack.length>0&&(_ajaxCallBack=el.attr("data-callback"),error=eval(_ajaxCallBack),error&&(errorMsg=void 0==el.attr("call-message")?"\u6821\u9a8c\u65e0\u6cd5\u901a\u8fc7\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165":el.attr("call-message")))),curTextDiv=el.parent(),curErrorEl=curTextDiv.children(".help-inline"),uniformDiv=curTextDiv.attr("id"),error?globalOptions.isAlert?void 0!=globalOptions.alterCall?globalOptions.alterCall(errorMsg):alert(errorMsg):(void 0!=uniformDiv&&uniformDiv.indexOf("uniform-")>-1?curTextDiv.parent().children(".help-inline").hasClass("help-inline")?curTextDiv.parent().data("help-inline",errorMsg):globalOptions.errorCustom.customFlag?curTextDiv.siblings(".error-custom").append(errorMsg):curTextDiv.parent().append('<span class="help-inline error">'+errorMsg+"</span>"):globalOptions.errorCustom.customFlag?globalOptions.errorCustom.regionText?(textValue=el.val(),el.val(errorMsg).css("color","#cccccc").attr("srcValue",textValue)):curTextDiv.siblings(".error-custom").text(errorMsg):curErrorEl.hasClass("help-inline")?curTextDiv.data("help-inline",errorMsg):curTextDiv.append('<span class="help-inline error">'+errorMsg+"</span>"),removeElStyleClass(el,globalOptions,1)):ruleVal>0?(pwdStrong=passWordStatus(ruleVal),classpic=classStatus(ruleVal),globalOptions.errorCustom.customFlag?trimReplaceHtml(curTextDiv.siblings(".error-custom").text()).length>0?curTextDiv.data("error-custom",pwdStrong):curTextDiv.siblings(".error-custom").append(pwdStrong):curErrorEl.hasClass("help-inline")?curTextDiv.data("help-inline",pwdStrong):curTextDiv.append('<span class="help-inline '+classpic+'">'+pwdStrong+"</span>"),removeElStyleClass(el,globalOptions,2)):globalOptions.isAlert||(curErrorEl.remove(),removeElStyleClass(el,globalOptions,2),globalOptions.errorCustom.regionText&&el.attr("srcValue",el.val())),!error;},removeElStyleClass=function(a,b,c){if(void 0!=b.errorStyle){var d=b.errorStyle;1==c?a.parents("."+d.errorRegion).removeClass(d.rightClass).addClass(d.errorClass):a.parents("."+d.errorRegion).removeClass(d.errorClass).addClass(d.rightClass);}else{1==c?a.removeClass("right").addClass("error"):a.removeClass("error").addClass("right");}},trimReplaceHtml=function(a){return $.trim(a.replace(/\r\n/g,""));},checkIdCard=function(a){var b,c,d,e=0;if(!/^\d{17}(\d|x)$/i.test(a)){return !0;}if(a=a.replace(/x$/i,"a"),null==$(this).defaults.city[0][parseInt(a.substr(0,2))]){return !0;}if(b=a.substr(6,4)+"-"+Number(a.substr(10,2))+"-"+Number(a.substr(12,2)),c=new Date(b.replace(/-/g,"/")),b!=c.getFullYear()+"-"+(c.getMonth()+1)+"-"+c.getDate()){return !0;}for(d=17;d>=0;d--){e+=Math.pow(2,d)%11*parseInt(a.charAt(17-d),11);}return 1!=e%11?!0:!1;},dateCompare=function(){var a,b,c=$("input[check-type='dateCompare']"),d=!1;return c.eq(0).val().length>0&&c.eq(1).val().length>0&&c.eq(0).val()!=c.eq(1).val()&&(a=Number(c.eq(0).val().replace(/-/g,"")),b=Number(c.eq(1).val().replace(/-/g,"")),d=b>a?!1:!0),d;},checkDate=function(a){var b,c=a.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);return null==c?!0:(b=new Date(c[1],c[3]-1,c[4]),!(b.getFullYear()==c[1]&&b.getMonth()+1==c[3]&&b.getDate()==c[4]));},confirmPwd=function(){var a=$("input[type='password']"),b="",c="";return 3==a.size()?(b=$.trim(a.eq(1).val()),c=$.trim(a.eq(2).val())):(b=$.trim(a.eq(0).val()),c=$.trim(a.eq(1).val())),c.length>=0?b==c?!1:!0:!0;},checkPwd=function(a){return a.length>=6&&a.length<=20?/[a-zA-Z]+/.test(a)&&/[0-9]+/.test(a)&&/\W+\D+/.test(a)?1:/[a-zA-Z]+/.test(a)||/[0-9]+/.test(a)||/\W+\D+/.test(a)?/[a-zA-Z]+/.test(a)&&/[0-9]+/.test(a)?2:/\[a-zA-Z]+/.test(a)&&/\W+\D+/.test(a)?2:/[0-9]+/.test(a)&&/\W+\D+/.test(a)?2:3:void 0:!0;},classStatus=function(a){var b="";switch(a){case 1:b="passWord3";break;case 2:b="passWord2";break;case 3:b="passWord1";}return b;},passWordStatus=function(a){var b="";switch(a){case 1:b="\u5f3a";break;case 2:b="\u4e2d";break;case 3:b="\u5f31";}return b;};}(jQuery);
