"use strict";(self.webpackChunkpastebin_frontend=self.webpackChunkpastebin_frontend||[]).push([[678],{2645:function(e,t,n){n.r(t),n.d(t,{default:function(){return a}});var r=n(7294),l=n(5093),u=function(){var e=(0,r.useState)(""),t=e[0],n=e[1],u=(0,r.useState)(""),a=u[0],o=u[1],c=(0,r.useState)(0),s=c[0],i=c[1],m=(0,r.useState)(""),f=m[0],p=m[1];return r.createElement(r.Fragment,null,r.createElement("center",null,r.createElement("h1",null,"Create Post")),r.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault();var n=JSON.stringify({title:t,message:a,expiresIn:s}),r=new Headers;r.append("Content-Type","application/json"),fetch("http://localhost:9000/post",{method:"POST",headers:r,body:n,redirect:"follow"}).then((function(e){return e.json()})).then((function(e){p(e.message)})).catch((function(e){return console.log("error",e)}))}(e)}},r.createElement("input",{className:[l.G7,l.dt].join(" "),type:"text",placeholder:"Title",value:t,onChange:function(e){return function(e){n(e)}(e.target.value)}}),r.createElement("br",null),r.createElement("textarea",{className:[l.Xb,l.dt].join(" "),rows:5,placeholder:"Post",value:a,onChange:function(e){return function(e){o(e)}(e.target.value)}}),r.createElement("br",null),r.createElement("input",{className:[l.G7,l.dt].join(" "),type:"number",value:s,placeholder:"Seconds to expire after",onChange:function(e){return function(e){i(e)}(e.target.value)}}),r.createElement("br",null),r.createElement("center",null,r.createElement("button",{type:"submit",className:l.yY},"Create Post"))),r.createElement("p",null,f))},a=function(){return r.createElement(r.Fragment,null,r.createElement("div",{className:l.be},r.createElement(u,null),r.createElement("center",null,r.createElement("a",{href:"/viewPost"},"View Post"))))}},5093:function(e,t,n){n.d(t,{G7:function(){return u},Xb:function(){return o},be:function(){return l},dt:function(){return a},yY:function(){return r}});var r="styles-module--btn--EWGzr",l="styles-module--center--6GYRi",u="styles-module--formInput--Q7uPa",a="styles-module--inputBorder--IZGeU",o="styles-module--textAreaInput--H22qi"}}]);
//# sourceMappingURL=component---src-pages-index-js-20490697044186d6e9fd.js.map