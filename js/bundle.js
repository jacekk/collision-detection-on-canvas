!function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e,i){"use strict";function s(){var t=this.crossSize,e=this.ctx;e.lineWidth=this.lineWidth,e.fillStyle=this.getColor("0.15"),e.strokeStyle=this.getColor("0.1"),e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),e.fill(),e.stroke(),e.closePath(),e.strokeStyle=this.getColor("0.3"),e.beginPath(),e.moveTo(this.x-t,this.y),e.lineTo(this.x+t,this.y),e.stroke(),e.beginPath(),e.moveTo(this.x,this.y-t),e.lineTo(this.x,this.y+t),e.stroke()}Object.defineProperty(e,"__esModule",{value:!0}),e.dotDraw=s},function(t,e,i){"use strict";function s(t){var e=this,i=2*this.radius,s=function(t){return e.x!==t.x&&e.y!==t.y},r=function(e){return t.x===e.x&&t.y===e.y},n=[];this.dots.filter(s).filter(function(s){if(t&&r(s))return!1;var o=e.x-s.x,h=e.y-s.y;return!(Math.sqrt(o*o+h*h)>i||(n.push({xDiff:o,yDiff:h}),0))}).forEach(function(t,s){var r=n[s],o=r.xDiff,h=r.yDiff,a=i/Math.sqrt(o*o+h*h);t.x=e.x-o*a,t.y=e.y-h*a,t.checkOtherDots(e)})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var t=this.mouseCircle.x-this.x,e=this.mouseCircle.y-this.y,i=Math.sqrt(t*t+e*e);if(i<this.centersDistance){var s=(this.centersDistance-i)/this.animFactor;this.x-=Math.sin(t/i)*s,this.y-=Math.sin(e/i)*s,this.checkOtherDots()}this.draw()},e.checkOtherDots=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var t=this.mouseCircle.x-this.x,e=this.mouseCircle.y-this.y,i=Math.sqrt(t*t+e*e);if(i<this.centersDistance){var s=(this.centersDistance-i)/this.animFactor;this.x-=Math.sin(t/i)*s,this.y-=Math.sin(e/i)*s}this.draw()}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var t=this.mouseCircle.x-this.x,e=this.mouseCircle.y-this.y,i=Math.sqrt(t*t+e*e);i<this.centersDistance&&(this.x-=3*Math.sin(t/i*i),this.y-=3*Math.sin(e/i*i)),this.draw()}},function(t,e,i){"use strict";function s(){this.calculateNewCoord("x"),this.calculateNewCoord("y"),this.draw()}function r(t){var e=this.mouse[t];if(Math.round(this[t])!==e){var i=Math.floor(e-this[t])/this.animFactor;Math.abs(i)>.05?this[t]+=i:this[t]=e}}Object.defineProperty(e,"__esModule",{value:!0}),e.updateMouseDot=s,e.calculateNewCoord=r},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}function r(t,e){this.x=t,this.y=e,this.ctx=p,this.mouse=g,this.mouseCircle=D,this.dots=C,this.animFactor=12,this.lineWidth=2,this.crossSize=4,this.radius=M,this.centersDistance=Math.abs(M+w)+1,this.getColor=function(t){return"rgba(0, 145, 0, "+t+")"}}function n(t,e){this.x=t,this.y=e,this.ctx=p,this.mouse=g,this.mouseCircle=D,this.dots=C,this.animFactor=12,this.lineWidth=2,this.crossSize=8,this.radius=w,this.getColor=function(t){return"rgba(49, 53, 255, "+t+")"}}function o(){var t=Math.floor(v.width/m-1),e=Math.floor(v.height/m-1);D=new n(g.x,g.y),C=[];for(var i=0;i<t;i++)for(var s=0;s<e;s++){var o=i*m+m,h=s*m+m;C.push(new r(o,h))}}function h(){requestAnimationFrame(h),p.clearRect(0,0,v.width,v.height),D.update(),C.forEach(function(t){t.update()})}var a=i(0),c=i(4),u=i(1),l=s(u),f=i(2),d=s(f),y=i(3),x=s(y),v=document.querySelector("canvas"),p=v.getContext("2d");v.width=innerWidth,v.height=innerHeight;var M=14,m=60,w=50,g={x:innerWidth/2,y:innerHeight/2};addEventListener("mousemove",function(t){g.x=t.clientX,g.y=t.clientY}),addEventListener("resize",function(){v.width=innerWidth,v.height=innerHeight,o()});r.prototype={checkOtherDots:u.checkOtherDots,draw:a.dotDraw,update:function(){switch(location.search.replace("?","")){case"weird":return x.default;case"overlapping":return d.default;default:return l.default}}()},n.prototype={calculateNewCoord:c.calculateNewCoord,draw:r.prototype.draw,update:c.updateMouseDot};var C=void 0,D=void 0;o(),h()}]);