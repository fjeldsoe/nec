(this.webpackJsonpnec=this.webpackJsonpnec||[]).push([[0],{124:function(e,t,n){e.exports=n(242)},242:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(35),r=n.n(i),c=n(66),l=n.n(c),s=n(113),d=n(10),p=n(29),m=n(6),g=n(38),u=n(9),b=n(255),h=n(37),f=n.n(h);n(133),n(243),n(135);const w=m.b.img.withConfig({displayName:"Image",componentId:"sc-1ies6rj-0"})(["width:auto;height:auto;max-width:100%;max-height:100%;"]);var y=e=>{const t=e.image,n=e.className,a=e.sizes;return o.a.createElement(w,{className:n,key:t.id,srcSet:(e=>e.downloadUrls.map(e=>{const t=Object(d.a)(Object.entries(e)[0],2),n=t[0],a=t[1],o=n.split("x")[0];return"".concat(a," ").concat(o,"w")}))(t).join(", "),src:Object.values(t.downloadUrls[0])[0],sizes:a,alt:t.metadata.name,loading:"lazy"})};const x={sm:576,md:768,lg:992,xl:1200};function E(e){return"@media (min-width: ".concat(x[e],"px)")}var v=x,j=n(70);const O=m.b.div.withConfig({displayName:"Gallery__Wrapper",componentId:"m682mz-0"})(["flex:1 0 auto;display:flex;flex-wrap:wrap;padding:5px;margin-bottom:50px;"]),I=Object(j.a)(e=>o.a.createElement(O,e)),_=m.b.div.withConfig({displayName:"Gallery__Item",componentId:"m682mz-1"})(["flex:0 0 auto;width:calc(50%);padding:5px;overflow:hidden;height:250px;","{width:calc(33.3%);}","{width:calc(25%);}","{width:calc(20%);}"],E("sm"),E("md"),E("lg")),C=Object(j.b)(e=>o.a.createElement(_,e)),k=Object(m.b)(y).withConfig({displayName:"Gallery__Thumb",componentId:"m682mz-2"})(["width:100%;height:100%;object-fit:cover;border-radius:3px;content-visibility:auto;"]),N=m.b.div.withConfig({displayName:"Gallery__UploadIndicator",componentId:"m682mz-3"})(["position:fixed;top:0;left:0;right:0;height:3px;opacity:",";transition:opacity 300ms;pointer-events:none;&:after{content:'';display:block;height:inherit;width:","%;background:#54a2e6;}"],e=>0===e.uploadProgress||100===e.uploadProgress?0:1,e=>e.uploadProgress||0),S=m.b.div.withConfig({displayName:"Gallery__FooterBar",componentId:"m682mz-4"})(["position:fixed;left:0;right:0;bottom:0px;padding:10px;font-size:12px;background:#333;color:#999;transform:translateY(","%);transition:transform 300ms ease;"],({hideFooter:e})=>e?100:0),D=m.b.button.withConfig({displayName:"Gallery__EmailButton",componentId:"m682mz-5"})(["background:none;border:0;padding:0;margin:0;color:#999;cursor:pointer;"]),B=m.b.button.withConfig({displayName:"Gallery__LoginButton",componentId:"m682mz-6"})(["padding:0;margin:0;background:none;border:0;color:#999;cursor:pointer;"]);var L=function(e){const t=e.images,n=e.uploadProgress,i=e.handleSortEnd,r=e.shouldCancelStart,c=e.user,l=e.signOut,s=Object(u.g)(),p=Object(a.useState)(!1),m=Object(d.a)(p,2),b=m[0],h=m[1];return console.log("render"),Object(a.useEffect)(()=>{let e;function t(t){const n=window.scrollY;n<50||n>=document.documentElement.scrollHeight-window.innerHeight-50?h(!1):(h(n>e),e=window.scrollY)}return window.addEventListener("scroll",t,{passive:!0}),()=>{window.removeEventListener("scroll",t)}},[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(N,{uploadProgress:n}),o.a.createElement(I,{axis:"xy",pressDelay:100,onSortEnd:i,shouldCancelStart:r},t.length?t.map((e,t)=>o.a.createElement(C,{index:t,key:e.id},o.a.createElement(g.b,{to:"/nec/image/".concat(e.id)},o.a.createElement(k,{image:e,sizes:"50vw, (min-width: ".concat(v.sm,"px) 33.3vw, (min-width: ").concat(v.md,"px) 25vw, (min-width: ").concat(v.lg,"px) 20vw")})))):null),o.a.createElement(S,{hideFooter:b},o.a.createElement("span",null,"\xa9 Niels Erik Christiansen"),o.a.createElement("span",null," | "),o.a.createElement(D,{onClick:function(){window.open("mailto:".concat("nechristiansen","@").concat("gmail.com"),"_blank")}},"@ Email"),o.a.createElement("span",null," | "),o.a.createElement(B,{onClick:c?l:function(){s.push("/nec/login")}},c?"Log ud":"Log ind")))},z=n(117),F=n(44),P=n(118),T=n.n(P),A=n(21),G=n(119),W=(n(238),n(122)),R=n(120),U=n.n(R);function Y(){const e=Object(z.a)(["\n    body {\n        &:before {\n            content: '';\n            position: absolute;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            background-image: ",";\n            filter: blur(100px);\n        }\n    }\n\n    .editorWrapper {\n        color: black;\n        margin-bottom: 5px;\n    }\n\n    .editorTextField {\n        height: auto;\n        padding: 10px;\n        background: white;\n    }\n"]);return Y=function(){return e},e}const H=Object(m.a)(Y(),e=>e.gradient),J=m.b.div.withConfig({displayName:"ImageDetails__Wrapper",componentId:"s7hyp6-0"})(["position:relative;display:flex;flex:1 1 auto;flex-direction:column;width:100%;margin:0 auto;"]),K=m.b.div.withConfig({displayName:"ImageDetails__Overlay",componentId:"s7hyp6-1"})(["position:fixed;top:10%;bottom:0;left:0;right:0;display:flex;flex-direction:column;background:linear-gradient(0deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 100%);box-shadow:0 -10px 20px rgba(0,0,0,0.5);transform:translateY(",");transition:transform 300ms ease;"],({active:e})=>e?0:"calc(100% - 60px)"),M=m.b.div.withConfig({displayName:"ImageDetails__OverlayNav",componentId:"s7hyp6-2"})(["display:flex;justify-content:space-between;align-items:center;height:60px;"]),Q=m.b.button.withConfig({displayName:"ImageDetails__Back",componentId:"s7hyp6-3"})(["display:flex;align-items:center;height:inherit;background:none;border:0;padding:0 0 0 20px;color:inherit;font-size:inherit;"]),q=Object(m.b)(U.a).withConfig({displayName:"ImageDetails__BackArrow",componentId:"s7hyp6-4"})(["margin-right:10px;"]),V=m.b.button.withConfig({displayName:"ImageDetails__Toggle",componentId:"s7hyp6-5"})(["margin-right:30px;background:none;border:0;padding:0;color:inherit;height:inherit;font-size:inherit;"]),$=m.b.div.withConfig({displayName:"ImageDetails__ImageWrapper",componentId:"s7hyp6-6"})(["position:relative;flex:1 0 auto;padding:10px;"]),X=Object(m.b)(y).withConfig({displayName:"ImageDetails__DetailedImage",componentId:"s7hyp6-7"})(["flex:none;display:block;margin:0 auto;filter:drop-shadow(0px 20px 20px rgba(0,0,0,0.5));opacity:",";position:absolute;width:calc(100% - 20px);height:calc(100% - 80px);object-fit:contain;transition:opacity 300ms ease;"],({fade:e})=>e?.3:1),Z=m.b.div.withConfig({displayName:"ImageDetails__Description",componentId:"s7hyp6-8"})(["flex:1 1 auto;min-width:1px;padding:10px 20px;overflow:auto;-webkit-overflow-scrolling:touch;@media (min-width:375px){padding:10px 60px;}"]),ee=m.b.div.withConfig({displayName:"ImageDetails__ButtonBar",componentId:"s7hyp6-9"})(["position:relative;flex:none;display:flex;justify-content:center;height:60px;margin:20px 0;"]),te=m.b.button.withConfig({displayName:"ImageDetails__Button",componentId:"s7hyp6-10"})(["flex:1 1 50%;font-weight:bold;border:0;max-width:300px;box-shadow:0 5px 10px rgba(0,0,0,0.2);"]),ne=Object(m.b)(te).withConfig({displayName:"ImageDetails__DeleteButton",componentId:"s7hyp6-11"})(["color:#fff;background:linear-gradient(0deg,rgba(162,0,0,1) 0%,rgba(218,0,0,1) 100%);"]),ae=m.b.div.withConfig({displayName:"ImageDetails__EditorWrappper",componentId:"s7hyp6-12"})(["margin:0 auto;"]),oe=m.b.button.withConfig({displayName:"ImageDetails__SaveButton",componentId:"s7hyp6-13"})(["background:orange;border:none;width:100%;height:40px;font-weight:bold;"]);var ie=e=>{e.history;const t=e.image,n=e.removeImage,i=e.updateDescription,r=t.description,c=t.metadata.visionData.colors,l=c.sort((e,t)=>t.score-e.score).reduce((e,t,n)=>{const a=t.color,o=a.red,i=a.green,r=a.blue;return n<2?[...e,"rgb(".concat(o,", ").concat(i,", ").concat(r,")")]:e},[]),s=Object(d.a)(l,2),m=[s[0],s[1]].sort((e,t)=>Object(F.b)(t)-Object(F.b)(e)),g=Object(d.a)(m,2),u=(g[0],g[1]),b=Object(a.useContext)(he).user,h=T()(c.map(({color:{red:e,green:t,blue:n}})=>"rgb(".concat(e,",").concat(t,",").concat(n,")"))),f=["#000","#FFF"].sort((e,t)=>Object(F.a)(u,t)-Object(F.a)(u,e)),w=(Object(d.a)(f,1)[0],Object(a.useState)(r?A.EditorState.createWithContent(Object(A.convertFromRaw)(r)):A.EditorState.createEmpty())),y=Object(d.a)(w,2),x=y[0],E=y[1],v=Object(a.useState)(!1),j=Object(d.a)(v,2),O=j[0],I=j[1],_=Object(a.useState)(!1),C=Object(d.a)(_,2),k=C[0],N=C[1];return Object(a.useEffect)(()=>{I(!0)},[x]),o.a.createElement(o.a.Fragment,null,o.a.createElement(H,{gradient:h.css("radial")}),o.a.createElement(J,null,o.a.createElement($,{onClick:()=>N(!1)},o.a.createElement(X,{image:Object(p.a)({},t),fade:k})),o.a.createElement(K,{active:k},o.a.createElement(M,null,o.a.createElement(Q,{onClick:()=>window.history.back()},o.a.createElement(q,null)," Tilbage"),o.a.createElement(V,{onClick:()=>N(!k)},k?"Skjul":"Vis"," beskrivelse")),o.a.createElement(Z,null,b&&o.a.createElement(ae,null,o.a.createElement(G.Editor,{editorState:x,onEditorStateChange:E,toolbarClassName:"editorToolbar",wrapperClassName:"editorWrapper",editorClassName:"editorTextField"}),O&&o.a.createElement(oe,{onClick:function(){const e=t.id,n=Object(A.convertToRaw)(x.getCurrentContent());i({id:e,description:n}),I(!1)}},"Gem beskrivelse")),!b&&r&&o.a.createElement("div",{dangerouslySetInnerHTML:{__html:Object(W.a)(Object(A.convertFromRaw)(r))}}),o.a.createElement(ee,null,b&&o.a.createElement(ne,{onClick:()=>n(t)},"Slet billede"))))))},re=n(121),ce=n.n(re);const le=m.b.div.withConfig({displayName:"App__LoggedInBar",componentId:"wphell-0"})(["position:relative;display:flex;justify-content:space-between;align-items:center;padding:10px;background:#333;"]),se=m.b.form.withConfig({displayName:"App__LoginForm",componentId:"wphell-1"})(["width:100%;max-width:500px;padding:20px;margin:0 auto;"]),de=m.b.input.withConfig({displayName:"App__FormInput",componentId:"wphell-2"})(["display:block;width:100%;height:40px;padding:10px;margin-bottom:10px;border:1px solid #999;background:#fff;"]),pe=m.b.button.withConfig({displayName:"App__LoginButton",componentId:"wphell-3"})(["width:100%;height:40px;"]),me=Object(m.b)(g.b).withConfig({displayName:"App__StyledLink",componentId:"wphell-4"})(["display:flex;justify-content:center;align-items:center;height:40px;margin-top:20px;color:#fff;"]);f.a.initializeApp({apiKey:"AIzaSyBPG6_rLNCqJKQaQxRxoL9kiNRrst_SGng",authDomain:"necgallery-9b4b2.firebaseapp.com",databaseURL:"https://necgallery-9b4b2.firebaseio.com",projectId:"necgallery-9b4b2",storageBucket:"necgallery-9b4b2.appspot.com",messagingSenderId:"534201773677",appId:"1:534201773677:web:57fa8d6f25817e60155964"});const ge=f.a.firestore(),ue=ge.collection("gallery"),be=f.a.storage().ref(),he=Object(a.createContext)();function fe(e){e.preventDefault()}function we(e){return ue.doc(e).delete()}var ye=function(){const e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(!1),c=Object(d.a)(r,2),m=c[0],h=c[1],w=Object(a.useState)(0),y=Object(d.a)(w,2),x=y[0],E=y[1],v=Object(a.useState)(""),j=Object(d.a)(v,2),O=j[0],I=j[1],_=Object(a.useState)(""),C=Object(d.a)(_,2),k=C[0],N=C[1];function S(e){e.preventDefault();const t=e.dataTransfer.files,n=void 0===t?{}:t;!function(e,t){Promise.all(e.map(e=>new Promise((n,a)=>{const o=Object(b.a)(),i=be.child("gallery/".concat(o,"/original.jpg")).put(e);i.on("state_changed",(function(e){var n=e.bytesTransferred/e.totalBytes*100;t(n)})),i.then(e=>{n(Object(p.a)(Object(p.a)({},e),{},{id:o}))}).catch(e=>{a(new Error(e.message_))})}))).catch(e=>{alert(e)})}(Object.values(n).reduce((e,t)=>t.type.includes("image")?[...e,t]:e,[]),E)}function D(){return!1===m}function B({oldIndex:e,newIndex:t}){i(n=>ce()(n,e,t))}function z(){ue.orderBy("order").get().then(e=>{i(W(e))})}function F({id:e,description:t}){ue.doc(e).update({description:t}),z()}function P(e){if(!window.confirm("Er du sikker p\xe5 du vil slette billedet?"))return;const t=e.id,n=e.downloadUrls.map(e=>{const t=Object.keys(e);return Object(d.a)(t,1)[0]});Promise.all([n.map(e=>{return n="gallery/".concat(t,"/").concat(e,".jpg"),be.child(n).delete();var n}),we(t)]).then((function(){console.log("successfully deleted images"),z()})).catch((function(e){console.log(e)}))}function T(e){e.preventDefault(),f.a.auth().signInWithEmailAndPassword(O,k).catch((function(e){e.code;const t=e.message;alert(t)}))}function A(){return G.apply(this,arguments)}function G(){return(G=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.auth().signOut();case 2:h(!1);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e){const t=[];return e.forEach(e=>{const n=e.id,a=e.data();t.push(Object(p.a)({id:n},a))}),t}return Object(a.useEffect)(()=>{const e=f.a.auth().onAuthStateChanged((function(e){e&&h(e)}));return()=>{e()}},[]),Object(a.useEffect)(()=>(z(),ue.onSnapshot(e=>{const t=W(e),n=Math.max(...t.map(({order:e})=>e)),a=t.find(({order:e})=>-1===e);a&&i(e=>[...e,Object(p.a)(Object(p.a)({},a),{},{order:n+1})])}),document.addEventListener("drop",S),document.addEventListener("dragover",fe),()=>{document.removeEventListener("drop",S),document.removeEventListener("dragover",fe)}),[]),Object(a.useEffect)(()=>{if(m){const e=ge.batch();Object.entries(n).forEach(([t,n])=>{const a=n.id,o=ue.doc(a);e.update(o,{order:parseInt(t)})}),e.commit().then(()=>{console.log("committed batch")})}},[m,n]),o.a.createElement(he.Provider,{value:{user:m}},m&&o.a.createElement(le,null,o.a.createElement("span",null,"Du er logget ind")),o.a.createElement(g.a,null,o.a.createElement(u.d,null,o.a.createElement(u.b,{exact:!0,path:"/nec",render:e=>o.a.createElement(L,Object.assign({},e,{images:n,user:m,signOut:A,uploadProgress:x,handleSortEnd:B,shouldCancelStart:D}))}),o.a.createElement(u.b,{exact:!0,path:"/nec/image/:id",render:e=>{if(n.length){const t=e.match.params.id,a=n.find(e=>e.id===t);return a?o.a.createElement(ie,Object.assign({},e,{image:a,removeImage:P,updateDescription:F,user:m})):o.a.createElement(u.a,{to:"/nec"})}}}),o.a.createElement(u.b,{exact:!0,path:"/nec/login",render:()=>!1===m?o.a.createElement(se,{onSubmit:T},o.a.createElement(de,{type:"text",placeholder:"Email",value:O,onChange:e=>I(e.target.value)}),o.a.createElement(de,{type:"password",placeholder:"Password",value:k,onChange:e=>N(e.target.value)}),o.a.createElement(pe,null,"Log ind"),o.a.createElement(me,{to:"/nec"},"Tilbage")):o.a.createElement(u.a,{to:"/nec"})}),o.a.createElement(u.a,{to:"/nec"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}},[[124,1,2]]]);
//# sourceMappingURL=main.ea273abe.chunk.js.map