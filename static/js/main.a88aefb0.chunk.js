(this.webpackJsonpnec=this.webpackJsonpnec||[]).push([[0],{124:function(e,t,a){e.exports=a(242)},242:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(35),r=a.n(i),c=a(66),l=a.n(c),d=a(113),s=a(10),p=a(29),m=a(6),g=a(38),u=a(9),b=a(255),h=a(37),f=a.n(h);a(133),a(243),a(135);const w=m.b.img.withConfig({displayName:"Image",componentId:"sc-1ies6rj-0"})(["width:auto;height:auto;max-width:100%;max-height:100%;"]);var x=e=>{const t=e.image,a=e.className,n=e.sizes;return o.a.createElement(w,{className:a,key:t.id,srcSet:(e=>e.downloadUrls.map(e=>{const t=Object(s.a)(Object.entries(e)[0],2),a=t[0],n=t[1],o=a.split("x")[0];return"".concat(n," ").concat(o,"w")}))(t).join(", "),src:Object.values(t.downloadUrls[0])[0],sizes:n,alt:t.metadata.name,loading:"lazy"})};const y={sm:576,md:768,lg:992,xl:1200};function E(e){return"@media (min-width: ".concat(y[e],"px)")}var v=y,j=a(70);const O=m.b.div.withConfig({displayName:"Gallery__Wrapper",componentId:"m682mz-0"})(["flex:1 0 auto;display:flex;flex-wrap:wrap;padding:5px;"]),I=Object(j.a)(e=>o.a.createElement(O,e)),_=m.b.div.withConfig({displayName:"Gallery__Item",componentId:"m682mz-1"})(["flex:0 0 auto;width:calc(50%);padding:5px;overflow:hidden;","{width:calc(33.3%);}","{width:calc(25%);}","{width:calc(20%);}"],E("sm"),E("md"),E("lg")),C=Object(j.b)(e=>o.a.createElement(_,e)),k=Object(m.b)(x).withConfig({displayName:"Gallery__Thumb",componentId:"m682mz-2"})(["width:100%;height:100%;object-fit:cover;border-radius:3px;"]),N=m.b.div.withConfig({displayName:"Gallery__UploadIndicator",componentId:"m682mz-3"})(["position:fixed;top:0;left:0;right:0;height:3px;opacity:",";transition:opacity 300ms;pointer-events:none;&:after{content:'';display:block;height:inherit;width:","%;background:#54a2e6;}"],e=>0===e.uploadProgress||100===e.uploadProgress?0:1,e=>e.uploadProgress||0),S=m.b.div.withConfig({displayName:"Gallery__FooterBar",componentId:"m682mz-4"})(["margin:auto 10px 10px;border-radius:5px;padding:10px;font-size:12px;background:#333;color:#999;"]),D=m.b.button.withConfig({displayName:"Gallery__EmailButton",componentId:"m682mz-5"})(["background:none;border:0;padding:0;margin:0;color:#999;cursor:pointer;"]),B=m.b.button.withConfig({displayName:"Gallery__LoginButton",componentId:"m682mz-6"})(["padding:0;margin:0;background:none;border:0;color:#999;cursor:pointer;"]);var z=function(e){const t=e.images,a=e.uploadProgress,n=e.handleSortEnd,i=e.shouldCancelStart,r=e.user,c=e.signOut,l=Object(u.g)();return o.a.createElement(o.a.Fragment,null,o.a.createElement(N,{uploadProgress:a}),o.a.createElement(I,{axis:"xy",pressDelay:100,onSortEnd:n,shouldCancelStart:i},t.length?t.map((e,t)=>o.a.createElement(C,{index:t,key:e.id},o.a.createElement(g.b,{to:"/nec/image/".concat(e.id)},o.a.createElement(k,{image:e,sizes:"50vw, (min-width: ".concat(v.sm,"px) 33.3vw, (min-width: ").concat(v.md,"px) 25vw, (min-width: ").concat(v.lg,"px) 20vw")})))):null),o.a.createElement(S,null,o.a.createElement("span",null,"\xa9 Niels Erik Christiansen"),o.a.createElement("span",null," | "),o.a.createElement(D,{onClick:function(){window.open("mailto:".concat("nechristiansen","@").concat("gmail.com"),"_blank")}},"@ Email"),o.a.createElement("span",null," | "),o.a.createElement(B,{onClick:r?c:function(){l.push("/nec/login")}},r?"Log ud":"Log ind")))},L=a(117),P=a(44),F=a(118),T=a.n(F),A=a(21),G=a(119),W=(a(238),a(122)),R=a(120),U=a.n(R);function J(){const e=Object(L.a)(["\n    body {\n        &:before {\n            content: '';\n            position: absolute;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            background-image: ",";\n            filter: blur(100px);\n        }\n    }\n\n    .editorWrapper {\n        color: black;\n        margin-bottom: 5px;\n    }\n\n    .editorTextField {\n        height: auto;\n        padding: 10px;\n        background: white;\n    }\n"]);return J=function(){return e},e}const K=Object(m.a)(J(),e=>e.gradient),M=m.b.div.withConfig({displayName:"ImageDetails__Wrapper",componentId:"s7hyp6-0"})(["position:relative;display:flex;flex:1 1 auto;flex-direction:column;width:100%;margin:0 auto;"]),Q=m.b.div.withConfig({displayName:"ImageDetails__Overlay",componentId:"s7hyp6-1"})(["position:fixed;top:10%;bottom:0;left:10px;right:10px;display:flex;flex-direction:column;background:linear-gradient(0deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0.6) 100%);border-top-left-radius:20px;border-top-right-radius:20px;box-shadow:0 -10px 20px rgba(0,0,0,0.5);transform:translateY(",");transition:transform 300ms ease;"],({active:e})=>e?0:"calc(100% - 60px)"),q=m.b.div.withConfig({displayName:"ImageDetails__OverlayNav",componentId:"s7hyp6-2"})(["display:flex;justify-content:space-between;align-items:center;height:60px;"]),H=m.b.button.withConfig({displayName:"ImageDetails__Back",componentId:"s7hyp6-3"})(["display:flex;align-items:center;height:inherit;background:none;border:0;padding:0 0 0 20px;color:inherit;font-size:inherit;"]),V=Object(m.b)(U.a).withConfig({displayName:"ImageDetails__BackArrow",componentId:"s7hyp6-4"})(["margin-right:10px;"]),Y=m.b.button.withConfig({displayName:"ImageDetails__Toggle",componentId:"s7hyp6-5"})(["margin-right:30px;background:none;border:0;padding:0;color:inherit;height:inherit;font-size:inherit;"]),$=m.b.div.withConfig({displayName:"ImageDetails__ImageWrapper",componentId:"s7hyp6-6"})(["position:relative;flex:1 0 auto;padding:10px;"]),X=Object(m.b)(x).withConfig({displayName:"ImageDetails__DetailedImage",componentId:"s7hyp6-7"})(["flex:none;display:block;margin:0 auto;filter:drop-shadow(0px 20px 20px rgba(0,0,0,0.5));opacity:",";position:absolute;width:calc(100% - 20px);height:calc(100% - 80px);object-fit:contain;transition:opacity 300ms ease;"],({fade:e})=>e?.3:1),Z=m.b.div.withConfig({displayName:"ImageDetails__Description",componentId:"s7hyp6-8"})(["flex:1 1 auto;min-width:1px;padding:10px 20px;overflow:auto;-webkit-overflow-scrolling:touch;@media (min-width:375px){padding:10px 60px;}"]),ee=m.b.div.withConfig({displayName:"ImageDetails__ButtonBar",componentId:"s7hyp6-9"})(["position:relative;flex:none;display:flex;justify-content:center;height:60px;margin:20px 0;"]),te=m.b.button.withConfig({displayName:"ImageDetails__Button",componentId:"s7hyp6-10"})(["flex:1 1 50%;font-weight:bold;border:0;max-width:300px;box-shadow:0 5px 10px rgba(0,0,0,0.2);"]),ae=Object(m.b)(te).withConfig({displayName:"ImageDetails__DeleteButton",componentId:"s7hyp6-11"})(["color:#fff;background:linear-gradient(0deg,rgba(162,0,0,1) 0%,rgba(218,0,0,1) 100%);"]),ne=m.b.div.withConfig({displayName:"ImageDetails__EditorWrappper",componentId:"s7hyp6-12"})(["margin:0 auto;"]),oe=m.b.button.withConfig({displayName:"ImageDetails__SaveButton",componentId:"s7hyp6-13"})(["background:orange;border:none;width:100%;height:40px;font-weight:bold;"]);var ie=e=>{e.history;const t=e.image,a=e.removeImage,i=e.updateDescription,r=t.description,c=t.metadata.visionData.colors,l=c.sort((e,t)=>t.score-e.score).reduce((e,t,a)=>{const n=t.color,o=n.red,i=n.green,r=n.blue;return a<2?[...e,"rgb(".concat(o,", ").concat(i,", ").concat(r,")")]:e},[]),d=Object(s.a)(l,2),m=[d[0],d[1]].sort((e,t)=>Object(P.b)(t)-Object(P.b)(e)),g=Object(s.a)(m,2),u=(g[0],g[1]),b=Object(n.useContext)(he).user,h=T()(c.map(({color:{red:e,green:t,blue:a}})=>"rgb(".concat(e,",").concat(t,",").concat(a,")"))),f=["#000","#FFF"].sort((e,t)=>Object(P.a)(u,t)-Object(P.a)(u,e)),w=(Object(s.a)(f,1)[0],Object(n.useState)(r?A.EditorState.createWithContent(Object(A.convertFromRaw)(r)):A.EditorState.createEmpty())),x=Object(s.a)(w,2),y=x[0],E=x[1],v=Object(n.useState)(!1),j=Object(s.a)(v,2),O=j[0],I=j[1],_=Object(n.useState)(!1),C=Object(s.a)(_,2),k=C[0],N=C[1];return Object(n.useEffect)(()=>{I(!0)},[y]),o.a.createElement(o.a.Fragment,null,o.a.createElement(K,{gradient:h.css("radial")}),o.a.createElement(M,null,o.a.createElement($,{onClick:()=>N(!1)},o.a.createElement(X,{image:Object(p.a)({},t),fade:k})),o.a.createElement(Q,{active:k},o.a.createElement(q,null,o.a.createElement(H,{onClick:()=>window.history.back()},o.a.createElement(V,null)," Tilbage"),o.a.createElement(Y,{onClick:()=>N(!k)},k?"Skjul":"Vis"," beskrivelse")),o.a.createElement(Z,null,b&&o.a.createElement(ne,null,o.a.createElement(G.Editor,{editorState:y,onEditorStateChange:E,toolbarClassName:"editorToolbar",wrapperClassName:"editorWrapper",editorClassName:"editorTextField"}),O&&o.a.createElement(oe,{onClick:function(){const e=t.id,a=Object(A.convertToRaw)(y.getCurrentContent());i({id:e,description:a}),I(!1)}},"Gem beskrivelse")),!b&&r&&o.a.createElement("div",{dangerouslySetInnerHTML:{__html:Object(W.a)(Object(A.convertFromRaw)(r))}}),o.a.createElement(ee,null,b&&o.a.createElement(ae,{onClick:()=>a(t)},"Slet billede"))))))},re=a(121),ce=a.n(re);const le=m.b.div.withConfig({displayName:"App__LoggedInBar",componentId:"wphell-0"})(["position:relative;display:flex;justify-content:space-between;align-items:center;padding:10px;background:#333;"]),de=m.b.form.withConfig({displayName:"App__LoginForm",componentId:"wphell-1"})(["width:100%;max-width:500px;padding:20px;margin:0 auto;"]),se=m.b.input.withConfig({displayName:"App__FormInput",componentId:"wphell-2"})(["display:block;width:100%;height:40px;padding:10px;margin-bottom:10px;border:1px solid #999;background:#fff;"]),pe=m.b.button.withConfig({displayName:"App__LoginButton",componentId:"wphell-3"})(["width:100%;height:40px;"]),me=Object(m.b)(g.b).withConfig({displayName:"App__StyledLink",componentId:"wphell-4"})(["display:flex;justify-content:center;align-items:center;height:40px;margin-top:20px;color:#fff;"]);f.a.initializeApp({apiKey:"AIzaSyBPG6_rLNCqJKQaQxRxoL9kiNRrst_SGng",authDomain:"necgallery-9b4b2.firebaseapp.com",databaseURL:"https://necgallery-9b4b2.firebaseio.com",projectId:"necgallery-9b4b2",storageBucket:"necgallery-9b4b2.appspot.com",messagingSenderId:"534201773677",appId:"1:534201773677:web:57fa8d6f25817e60155964"});const ge=f.a.firestore(),ue=ge.collection("gallery"),be=f.a.storage().ref(),he=Object(n.createContext)();function fe(e){e.preventDefault()}function we(e){return ue.doc(e).delete()}var xe=function(){const e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],i=t[1],r=Object(n.useState)(!1),c=Object(s.a)(r,2),m=c[0],h=c[1],w=Object(n.useState)(0),x=Object(s.a)(w,2),y=x[0],E=x[1],v=Object(n.useState)(""),j=Object(s.a)(v,2),O=j[0],I=j[1],_=Object(n.useState)(""),C=Object(s.a)(_,2),k=C[0],N=C[1];function S(e){e.preventDefault();const t=e.dataTransfer.files,a=void 0===t?{}:t;!function(e,t){Promise.all(e.map(e=>new Promise((a,n)=>{const o=Object(b.a)(),i=be.child("gallery/".concat(o,"/original.jpg")).put(e);i.on("state_changed",(function(e){var a=e.bytesTransferred/e.totalBytes*100;t(a)})),i.then(e=>{a(Object(p.a)(Object(p.a)({},e),{},{id:o}))}).catch(e=>{n(new Error(e.message_))})}))).catch(e=>{alert(e)})}(Object.values(a).reduce((e,t)=>t.type.includes("image")?[...e,t]:e,[]),E)}function D(){return!1===m}function B({oldIndex:e,newIndex:t}){i(a=>ce()(a,e,t))}function L(){ue.orderBy("order").get().then(e=>{i(W(e))})}function P({id:e,description:t}){ue.doc(e).update({description:t}),L()}function F(e){if(!window.confirm("Er du sikker p\xe5 du vil slette billedet?"))return;const t=e.id,a=e.downloadUrls.map(e=>{const t=Object.keys(e);return Object(s.a)(t,1)[0]});Promise.all([a.map(e=>{return a="gallery/".concat(t,"/").concat(e,".jpg"),be.child(a).delete();var a}),we(t)]).then((function(){console.log("successfully deleted images"),L()})).catch((function(e){console.log(e)}))}function T(e){e.preventDefault(),f.a.auth().signInWithEmailAndPassword(O,k).catch((function(e){e.code;const t=e.message;alert(t)}))}function A(){return G.apply(this,arguments)}function G(){return(G=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.auth().signOut();case 2:h(!1);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e){const t=[];return e.forEach(e=>{const a=e.id,n=e.data();t.push(Object(p.a)({id:a},n))}),t}return Object(n.useEffect)(()=>{const e=f.a.auth().onAuthStateChanged((function(e){e&&h(e)}));return()=>{e()}},[]),Object(n.useEffect)(()=>(L(),ue.onSnapshot(e=>{const t=W(e),a=Math.max(...t.map(({order:e})=>e)),n=t.find(({order:e})=>-1===e);n&&i(e=>[...e,Object(p.a)(Object(p.a)({},n),{},{order:a+1})])}),document.addEventListener("drop",S),document.addEventListener("dragover",fe),()=>{document.removeEventListener("drop",S),document.removeEventListener("dragover",fe)}),[]),Object(n.useEffect)(()=>{if(m){const e=ge.batch();Object.entries(a).forEach(([t,a])=>{const n=a.id,o=ue.doc(n);e.update(o,{order:parseInt(t)})}),e.commit().then(()=>{console.log("committed batch")})}},[m,a]),console.log(m),o.a.createElement(he.Provider,{value:{user:m}},m&&o.a.createElement(le,null,o.a.createElement("span",null,"Du er logget ind")),o.a.createElement(g.a,null,o.a.createElement(u.d,null,o.a.createElement(u.b,{exact:!0,path:"/nec",render:e=>o.a.createElement(z,Object.assign({},e,{images:a,user:m,signOut:A,uploadProgress:y,handleSortEnd:B,shouldCancelStart:D}))}),o.a.createElement(u.b,{exact:!0,path:"/nec/image/:id",render:e=>{if(a.length){const t=e.match.params.id,n=a.find(e=>e.id===t);return n?o.a.createElement(ie,Object.assign({},e,{image:n,removeImage:F,updateDescription:P,user:m})):o.a.createElement(u.a,{to:"/nec"})}}}),o.a.createElement(u.b,{exact:!0,path:"/nec/login",render:()=>!1===m?o.a.createElement(de,{onSubmit:T},o.a.createElement(se,{type:"text",placeholder:"Email",value:O,onChange:e=>I(e.target.value)}),o.a.createElement(se,{type:"password",placeholder:"Password",value:k,onChange:e=>N(e.target.value)}),o.a.createElement(pe,null,"Log ind"),o.a.createElement(me,{to:"/nec"},"Tilbage")):o.a.createElement(u.a,{to:"/nec"})}),o.a.createElement(u.a,{to:"/nec"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(xe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}},[[124,1,2]]]);
//# sourceMappingURL=main.a88aefb0.chunk.js.map