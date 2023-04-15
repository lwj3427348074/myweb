(function(){"use strict";var t={2189:function(t,e,n){var i=n(4574),o=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"row"},[e("Banner")],1),e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-2 col-xs-offset-2"},[e("div",{staticClass:"list-group"},[e("router-link",{staticClass:"list-group-item",attrs:{"active-class":"active",to:"/about"}},[t._v("About")]),e("router-link",{staticClass:"list-group-item",attrs:{"active-class":"active",to:"/home"}},[t._v("Home")])],1)]),e("div",{staticClass:"col-xs-6"},[e("div",{staticClass:"panel"},[e("div",{staticClass:"panel-body"},[e("router-view")],1)])])])])},r=[],s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"col-xs-offset-2 col-xs-8"},[e("div",{staticClass:"page-header"},[e("h2",[t._v("Vue Router Demo")]),e("button",{on:{click:t.back}},[t._v("后退")]),e("button",{on:{click:t.forword}},[t._v("前进")]),e("button",{on:{click:t.go}},[t._v("go")])])])},l=[],a={name:"Banner",methods:{back(){this.$router.back()},forword(){this.$router.forward()},go(){this.$router.go(3)}}},u=a,c=n(9917),v=(0,c.Z)(u,s,l,!1,null,null,null),p=v.exports,f={name:"App",components:{Banner:p}},h=f,m=(0,c.Z)(h,o,r,!1,null,null,null),d=m.exports,_=n(5848),g=function(){var t=this,e=t._self._c;return e("h2",[t._v("我是About的内容")])},b=[],w={name:"About"},x=w,k=(0,c.Z)(x,g,b,!1,null,null,null),y=k.exports,C=function(){var t=this,e=t._self._c;return e("div",[e("h2",[t._v("Home组件内容")]),e("div",[e("ul",{staticClass:"nav nav-tabs"},[e("li",[e("router-link",{staticClass:"list-group-item",attrs:{"active-class":"active",to:"/home/news"}},[t._v("News")])],1),e("li",[e("router-link",{staticClass:"list-group-item",attrs:{replace:"","active-class":"active",to:"/home/message"}},[t._v("Message")])],1)]),e("div",[e("keep-alive",{attrs:{include:"News"}},[e("router-view")],1)],1)])])},Z=[],O={name:"Home",mounted(){}},$=O,A=(0,c.Z)($,C,Z,!1,null,null,null),P=A.exports,j=function(){var t=this;t._self._c;return t._m(0)},S=[function(){var t=this,e=t._self._c;return e("ul",[e("li",[t._v("news001 "),e("input",{attrs:{type:"text"}})]),e("li",[t._v("news002 "),e("input",{attrs:{type:"text"}})]),e("li",[t._v("news003 "),e("input",{attrs:{type:"text"}})])])}],E={name:"news"},B=E,H=(0,c.Z)(B,j,S,!1,null,null,null),M=H.exports,T=function(){var t=this,e=t._self._c;return e("div",[e("ul",t._l(t.messageList,(function(n){return e("li",{key:n.id},[e("router-link",{attrs:{to:{name:"detail",params:{id:n.id,title:n.title}}}},[t._v(" "+t._s(n.title))]),t._v("    "),e("button",{on:{click:function(e){return t.pushShow(n)}}},[t._v("push查看")]),e("button",{on:{click:function(e){return t.replaceShow(n)}}},[t._v("replace查看")])],1)})),0),e("hr"),e("router-view")],1)},q=[],D=(n(5988),n(8911)),I={name:"Message",computed:{},data(){return{messageList:[{id:(0,D.x0)(),title:"消息001"},{id:(0,D.x0)(),title:"消息002"},{id:(0,D.x0)(),title:"消息003"}]}},mounted(){console.log(this.$router)},methods:{pushShow(t){this.$router.push({name:"detail",params:{id:t.id,title:t.title}})},replaceShow(t){this.$router.replace({name:"detail",params:{id:t.id,title:t.title}})}}},L=I,N=(0,c.Z)(L,T,q,!1,null,null,null),z=N.exports,F=function(){var t=this,e=t._self._c;return e("ul",[e("li",[t._v("消息编号："+t._s(this.$route.params.id))]),e("li",[t._v("消息标题："+t._s(this.$route.params.title))])])},R=[],V={name:"Detail",mounted(){}},G=V,J=(0,c.Z)(G,F,R,!1,null,null,null),K=J.exports;const Q=new _.ZP({mode:"history",routes:[{name:"guanyu",path:"/about",component:y,meta:{isAuth:!0,title:"关于"}},{name:"zhuye",path:"/home",component:P,meta:{isAuth:!0,title:"主页"},children:[{name:"xinwen",path:"news",component:M,meta:{title:"新闻"},beforeEnter(t,e,n){console.log("我是新闻独享前置路由守卫我来自：",e,"我要去：",t),(t.meta.isAuth||"atguigu"===localStorage.getItem("school"))&&n()}},{name:"xinxi",path:"message",component:z,meta:{title:"信息"},children:[{name:"detail",path:"detail/:id/:title",component:K,meta:{title:"详情"},props(t){return{id:t.query.id,title:t.query.title}}}]}]}]});Q.beforeEach(((t,e,n)=>{console.log("我是前置路由守卫我来自：",e,"我要去：",t),(t.meta.isAuth||"atguigu"===localStorage.getItem("school"))&&n()})),Q.afterEach(((t,e)=>{console.log("我是后置路由守卫我来自：",e,"我要去：",t),document.title=t.meta.title||"硅谷"}));var U=Q;i.ZP.config.productionTip=!1,i.ZP.use(_.ZP),new i.ZP({render:t=>t(d),router:U}).$mount("#app")}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,i,o,r){if(!i){var s=1/0;for(c=0;c<t.length;c++){i=t[c][0],o=t[c][1],r=t[c][2];for(var l=!0,a=0;a<i.length;a++)(!1&r||s>=r)&&Object.keys(n.O).every((function(t){return n.O[t](i[a])}))?i.splice(a--,1):(l=!1,r<s&&(s=r));if(l){t.splice(c--,1);var u=o();void 0!==u&&(e=u)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[i,o,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var o,r,s=i[0],l=i[1],a=i[2],u=0;if(s.some((function(e){return 0!==t[e]}))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(a)var c=a(n)}for(e&&e(i);u<s.length;u++)r=s[u],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(c)},i=self["webpackChunk_7_guthub"]=self["webpackChunk_7_guthub"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(2189)}));i=n.O(i)})();
//# sourceMappingURL=app.93c66c7b.js.map