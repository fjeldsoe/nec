(this.webpackJsonpnec=this.webpackJsonpnec||[]).push([[0],{37:function(e,n,t){e.exports=t(63)},63:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),r=t(30),o=t.n(r),i=t(22),l=t.n(i),s=t(31),u=t(9),d=t(12),g=t(5),m=t(19),b=t(3),f=t(6),p=t(66),h=t(1),j=t.n(h),O=(t(29),t(64),t(32)),w=t.n(O);t(54);function v(){const e=Object(g.a)(["\n    width: auto;\n    height: auto;\n    max-width: 100%;\n    max-height: 100%;\n"]);return v=function(){return e},e}const x=f.a.img(v());var E=e=>{const n=e.image,t=e.className,a=e.sizes;return c.a.createElement(x,{className:t,key:n.id,srcSet:(e=>e.downloadUrls.map(e=>{const n=Object(u.a)(Object.entries(e)[0],2),t=n[0],a=n[1],c=t.split("x")[0];return"".concat(a," ").concat(c,"w")}))(n).join(", "),src:Object.values(n.downloadUrls[0])[0],sizes:a,alt:n.metadata.name,loading:"lazy"})};const y={sm:576,md:768,lg:992,xl:1200};function k(e){return"@media (min-width: ".concat(y[e],"px)")}var P=y;function C(){const e=Object(g.a)(["\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n    opacity: ",";\n    transition: opacity 300ms;\n    pointer-events: none;\n\n    &:after {\n        content: '';\n        display: block;\n        height: inherit;\n        width: ","%;\n        background: #54a2e6;\n    }\n"]);return C=function(){return e},e}function I(){const e=Object(g.a)(["\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 3px;\n"]);return I=function(){return e},e}function S(){const e=Object(g.a)(["\n    flex: 0 0 auto;\n    width: calc(50%);\n    max-height: 300px;\n    padding: 5px;\n    overflow: hidden;\n\n    "," {\n        width: calc(33.3%);\n    }\n\n    "," {\n        width: calc(25%);\n    }\n\n    "," {\n        width: calc(20%);\n    }\n"]);return S=function(){return e},e}function D(){const e=Object(g.a)(["\n    display: flex;\n    flex-wrap: wrap;\n    padding: 5px;\n"]);return D=function(){return e},e}const z=f.a.div(D()),F=Object(f.a)(m.b)(S(),k("sm"),k("md"),k("lg")),U=Object(f.a)(E)(I()),A=f.a.div(C(),e=>0===e.uploadProgress||100===e.uploadProgress?0:1,e=>e.uploadProgress||0);var R=function(e){const n=e.images,t=e.uploadProgress;return c.a.createElement(c.a.Fragment,null,c.a.createElement(A,{uploadProgress:t}),c.a.createElement(z,null,n.length?n.map(e=>c.a.createElement(F,{to:"/image/".concat(e.id),key:e.id},c.a.createElement(U,{key:e.id,image:e,sizes:"50vw, (min-width: ".concat(P.sm,"px) 33.3vw, (min-width: ").concat(P.md,"px) 25vw, (min-width: ").concat(P.lg,"px) 20vw")}))):null))},B=t(17);function L(){const e=Object(g.a)(["\n    color: #fff;\n    background: linear-gradient(0deg, rgba(162, 0, 0, 1) 0%, rgba(218, 0, 0, 1) 100%);\n"]);return L=function(){return e},e}function H(){const e=Object(g.a)(["\n    background: ",";\n    color: ",";\n"]);return H=function(){return e},e}function N(){const e=Object(g.a)(["\n    flex: 1 1 50%;\n    font-weight: bold;\n    border: 0;\n"]);return N=function(){return e},e}function Q(){const e=Object(g.a)(["\n    display: flex;\n    height: 60px;\n    border-top: 1px solid rgba(0, 0, 0, 0.2);\n"]);return Q=function(){return e},e}function T(){const e=Object(g.a)(["\n    max-width: 90%;\n    max-height: 90%;\n    object-fit: contain;\n    filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.5));\n"]);return T=function(){return e},e}function _(){const e=Object(g.a)(["\n    flex: 1 1 auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n"]);return _=function(){return e},e}function J(){const e=Object(g.a)(["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    background: ",";\n"]);return J=function(){return e},e}const W=f.a.div(J(),e=>e.gradient),K=f.a.div(_()),V=Object(f.a)(E)(T()),X=f.a.div(Q()),Y=f.a.button(N()),$=Object(f.a)(Y)(H(),({backgroundColor:e})=>e,({fontColor:e})=>e),q=Object(f.a)(Y)(L());var G=e=>{const n=e.history,t=e.image,r=e.removeImage,o=t.metadata.visionData.colors.sort((e,n)=>n.score-e.score).reduce((e,n,t)=>{const a=n.color,c=a.red,r=a.green,o=a.blue;return t<2?[...e,"rgb(".concat(c,", ").concat(r,", ").concat(o,")")]:e},[]),i=Object(u.a)(o,2),l=[i[0],i[1]].sort((e,n)=>Object(B.b)(n)-Object(B.b)(e)),s=Object(u.a)(l,2),g=s[0],m=s[1],b=Object(a.useContext)(te).user,f="radial-gradient(circle, ".concat(g," 0%, ").concat(m," 100%)"),p=["#000","#FFF"].sort((e,n)=>Object(B.a)(m,n)-Object(B.a)(m,e)),h=Object(u.a)(p,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement(W,{gradient:f},c.a.createElement(K,null,c.a.createElement(V,{image:Object(d.a)({},t),sizes:"90vw"})),c.a.createElement(X,null,c.a.createElement($,{backgroundColor:m,fontColor:h,onClick:()=>n.push("/")},"Tilbage"),b&&c.a.createElement(q,{onClick:()=>r(t)},"Slet billede"))))};function M(){const e=Object(g.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 10px;\n    background: #999;\n"]);return M=function(){return e},e}const Z=f.a.div(M());j.a.initializeApp({apiKey:"AIzaSyDHmbdXOUwR8oEHREt-Qc1Pwe6CQYrcQx0",authDomain:"necgallery-9b4b2.firebaseapp.com",databaseURL:"https://necgallery-9b4b2.firebaseio.com",projectId:"necgallery-9b4b2",storageBucket:"necgallery-9b4b2.appspot.com",messagingSenderId:"534201773677"});const ee=j.a.firestore().collection("gallery"),ne=j.a.storage().ref(),te=Object(a.createContext)();function ae(e){e.preventDefault()}function ce(e){return ee.doc(e).delete()}var re=function(){const e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)(!1),i=Object(u.a)(o,2),g=i[0],f=i[1],h=Object(a.useState)(0),O=Object(u.a)(h,2),v=O[0],x=O[1];function E(e){e.preventDefault(),console.log("onDrop");const n=e.dataTransfer.files,t=void 0===n?{}:n;!function(e,n){console.log(e),Promise.all(e.map(e=>new Promise((t,a)=>{const c=Object(p.a)(),r=ne.child("gallery/".concat(c,"/original.jpg")).put(e);r.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;n(t)})),r.then(e=>{t(Object(d.a)(Object(d.a)({},e),{},{id:c}))}).catch(e=>{a(new Error(e.message_))})}))).catch(e=>{alert(e)})}(Object.values(t).reduce((e,n)=>n.type.includes("image")?[...e,n]:e,[]),x)}function y(e){if(!window.confirm("Er du sikker p\xe5 du vil slette billedet?"))return;const n=e.id,t=e.downloadUrls.map(e=>{const n=Object.keys(e);return Object(u.a)(n,1)[0]});Promise.all([t.map(e=>{return t="gallery/".concat(n,"/").concat(e,".jpg"),ne.child(t).delete();var t}),ce(n)]).then((function(){console.log("successfully deleted images")})).catch((function(e){console.log(e)}))}function k(){return(k=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.auth().signOut();case 2:f(!1);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)(()=>{const e=j.a.auth().onAuthStateChanged((function(e){e&&f(e)}));return()=>{e()}},[]),Object(a.useEffect)(()=>{ee.onSnapshot((function(e){const n=[];e.forEach((function(e){const t=e.id,a=e.data();n.push(Object(d.a)({id:t},a)),console.log(a)})),r(n)})),document.addEventListener("drop",E),document.addEventListener("dragover",ae)},[]),c.a.createElement(te.Provider,{value:{user:g}},g&&c.a.createElement(Z,null,c.a.createElement("span",null,"Hej ",g.displayName),c.a.createElement("button",{onClick:function(){return k.apply(this,arguments)}},"Log ud")),c.a.createElement(m.a,null,c.a.createElement(b.d,null,c.a.createElement(b.b,{exact:!0,path:"/",render:e=>c.a.createElement(R,Object.assign({},e,{images:t,uploadProgress:v}))}),c.a.createElement(b.b,{exact:!0,path:"/image/:id",render:e=>{if(t.length){const n=e.match.params.id,a=t.find(e=>e.id===n);return a?c.a.createElement(G,Object.assign({},e,{image:a,removeImage:y})):c.a.createElement(b.a,{to:"/"})}}}),c.a.createElement(b.b,{exact:!0,path:"/login",render:()=>!1===g?c.a.createElement(w.a,{uiConfig:{signInFlow:"popup",signInSuccessUrl:"/",signInOptions:[j.a.auth.FacebookAuthProvider.PROVIDER_ID]},firebaseAuth:j.a.auth()}):c.a.createElement(b.a,{to:"/"})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(re,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}},[[37,1,2]]]);
//# sourceMappingURL=main.3ac9ce08.chunk.js.map