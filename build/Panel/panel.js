!function(e){function t(e){var t=[];return $.each(e,function(e,n){n.fetchStart<=u&&t.push(n)}),t}function n(){var e;if(chrome&&chrome.devtools){var n=chrome.devtools,o=n.inspectedWindow;o.eval("(function() {var ent = window.performance.getEntries();var result =[];var tmp;for(var key in ent) {tmp={};for(var k in ent[key]) {tmp[k] = ent[key][k]};result.push(tmp);}return JSON.stringify(result);})()",function(n,o){o?document.body.innerHTML="Eval code error : "+o:(e=JSON.parse(n),l(e,$(".all")),l(t(e),$(".beforeonload")))})}else e=window.performance.getEntries(),l(e,$(".all")),l(t(e),$(".beforeonload"))}function o(){if(chrome&&chrome.devtools){var e=chrome.devtools,t=e.inspectedWindow;t.eval("(function() {var ent = window.performance.memory;var result ={};for(var key in ent) {result[key] = ent[key]}return result;})()",function(e,t){t?document.body.innerHTML="Eval code error : "+t:r(e)})}else r(window.performance.memory)}function a(){var e;if(chrome&&chrome.devtools){var t=chrome.devtools,n=t.inspectedWindow;n.eval("window.performance.timing.toJSON()",function(t,n){n?document.body.innerHTML="Eval code error : "+n:(e=t,i(e))})}else e=window.performance.timing,i(e)}function r(e){var t,n="area",o=[],a=[];try{$.each(e,function(e,n){o.push(e),t=n/1024/1024,a.push(parseFloat(t.toFixed(4)))})}catch(r){return document.body.innerHTML=r}t="Memory Used",$(".memory > div.container").highcharts({chart:{type:n,backgroundColor:"rgba(255, 255, 255, 0)"},title:{text:t},xAxis:{categories:o},yAxis:{min:0,title:{text:"MB"}},legend:{reversed:!0},plotOptions:{series:{stacking:"normal",dataLabels:{enabled:!0,style:{color:"#333",fontSize:"20px"},formatter:function(){return this.y+"MB"}}}},series:[{name:"current page",data:a}]})}function i(e){function t(e){return e?e-a:e}var n=["redirect","fetch app catch","dns look up","tcp connect","request","response","dom loaded","dom complete","onload"],o=[],a=e.fetchStart;u=e.loadEventStart-a,o.push([t(e.redirectStart),t(e.redirectEnd)],[t(e.fetchStart),t(e.domainLookupStart)],[t(e.domainLookupStart),t(e.domainLookupEnd)],[t(e.connectStart),t(e.connectEnd)],[t(e.requestStart),t(e.responseStart)],[t(e.responseStart),t(e.responseEnd)],[t(e.domLoading),t(e.domContentLoadedEventEnd)],[t(e.domContentLoadedEventEnd),t(e.domComplete)],[t(e.loadEventStart),t(e.loadEventEnd)]),$(".timing > div.column").highcharts({chart:{type:"columnrange",backgroundColor:"rgba(255, 255, 255, 0)",inverted:!0},title:{text:"Timing line"},xAxis:{categories:n},yAxis:{label:"{value} ms",title:{text:"Time for start and end of event"}},legend:{reversed:!0},plotOptions:{columnrange:{dataLabels:{enabled:!0,formatter:function(){return this.y+"ms"}}}},series:[{name:"current page",data:o}]});var r,i=[];$.each(o,function(e,t){r=[],r.push(n[e]),r.push(t[1]-t[0]),i.push(r)}),$(".timing > div.pie").highcharts({chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1},title:{text:"Pie view for timing"},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %",style:{color:Highcharts.theme&&Highcharts.theme.contrastTextColor||"black"},connectorColor:"silver"}}},series:[{type:"pie",name:"All time percentage",data:i}]})}function s(e){var t=e||"",n=e.lastIndexOf("?");-1!==n&&"?"!==e[n-1]&&(t=t.substring(0,n));var o;return o=t.substr(t.lastIndexOf(".")),t=t.substring(0,e.lastIndexOf(".")),o=t.substr(t.lastIndexOf("/")+1)+o}function d(e){var t=e.initiatorType;if(!t||""===t){var n=e.name;if(n){t=n;var o=n.lastIndexOf("?");-1!==o&&"?"!==n[o-1]&&(t=t.substring(0,o)),t=t.substr(t.lastIndexOf(".")+1)}else t="resource"}return t}function l(e,t){var n,o,a=[],r=[],i=[],l={},c={},m=0,u=0,p=[];$.each(e,function(e,t){if(m++,u+=t.duration,o=d(t),n=c[o],void 0===n){c[o]=a.length,l={drilldown:o,fullName:o,name:o,data:1,y:1},a.push($.extend({},l)),l.data=t.duration,r.push($.extend({},l));var h=t.name,f=s(h),g=h.length<50?h:h.slice(0,30)+"..."+f;l={data:[{fullName:g,name:f,data:t.duration,y:1}],id:o,name:o},i.push($.extend({},l)),p.push(t.duration)}else{var v=a[n].data;v++,a[n].data=v,v=r[n].data,v+=t.duration,r[n].data=v;var h=t.name,f=s(h),g=h.length<50?h:h.slice(0,30)+"..."+f;l={name:f,fullName:g,y:1,data:t.duration},i[n].data.push(l),v=p[n],v+=t.duration,p[n]=v}}),$.each(a,function(e,t){t.y=t.data/m*100}),$.each(r,function(e,t){t.y=t.data/u*100,t.data=t.data.toFixed(4)+"ms"});var h;$.each(i,function(e,t){h=p[e],$.each(t.data,function(e,t){t.y=t.data/h*100,t.data=t.data.toFixed(4)+"ms"})}),$("div.pie-amout",t).highcharts({chart:{type:"pie"},title:{text:"Resources amount detail - total : "+m},subtitle:{text:"Click the slices to view timing details"},plotOptions:{series:{dataLabels:{enabled:!0,format:"{point.name}: {point.y:.1f}%"}}},tooltip:{headerFormat:'<span style="font-size:11px">{series.name}</span><br>',pointFormat:'<span style="color:{point.color};font-weight:bolder;">{point.fullName} </span>: <b>{point.data} </b><br/>'},series:[{name:"Amount of Resource",colorByPoint:!0,data:a}],drilldown:{series:i}}),$("div.pie-duration",t).highcharts({chart:{type:"pie"},title:{text:"Resources duration detail - total : "+parseFloat(u).toFixed(4)+"ms"},subtitle:{text:"Click the slices to view timing details"},plotOptions:{series:{dataLabels:{enabled:!0,format:"{point.name}: {point.y:.1f}%"}}},tooltip:{headerFormat:'<span style="font-size:11px">{series.name}</span><br>',pointFormat:'<span style="color:{point.color};font-weight:bolder;">{point.fullName} </span>: <b>{point.data} </b><br/>'},series:[{name:"Duration of resource",colorByPoint:!0,data:r}],drilldown:{series:i}})}function c(){try{a()}catch(e){$(".timing").html("error in getTiming, Chrome change the type of object PerformanceTiming")}try{o()}catch(e){$(".memory").html("error in getTiming, Chrome change the type of object MemoryInfo")}try{n()}catch(e){$(".resource").html("error in getTiming, Chrome change the type of object PerformanceResourceTiming")}$("article > h3").on("click",function(e){var t=$(e.target),n=$(e.target).parents("article");t.hasClass("help")?n.find("div.help-detail").toggleClass("hide"):(n.find("div").toggle(),n.find("table").toggle())})}var m,u=2e4;e.afterReload=function(e){"reloadcomplete"===e&&(clearTimeout(m),m=setTimeout(function(){c()},2e3))},document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){c()},2e3)})}(window);