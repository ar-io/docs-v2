(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1753],{91848:()=>{},58954:()=>{},29122:()=>{},47790:()=>{},73776:()=>{},15340:()=>{},79838:()=>{},99777:()=>{},1344:()=>{},25856:(e,t,r)=>{"use strict";r.r(t),r.d(t,{Code:()=>w,CodeGroup:()=>v,Pre:()=>j});var n=r(95155),i=r(12115),s=r(21506),a=r(43463),l=r(32081),o=r(32193);let d={js:"JavaScript",ts:"TypeScript",javascript:"JavaScript",typescript:"TypeScript",php:"PHP",python:"Python",ruby:"Ruby",go:"Go"};function c(e){let{title:t,language:r}=e;return t||(r&&r in d?d[r]:"Code")}function u(e){return(0,n.jsxs)("svg",{viewBox:"0 0 20 20","aria-hidden":"true",...e,children:[(0,n.jsx)("path",{strokeWidth:"0",d:"M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"}),(0,n.jsx)("path",{fill:"none",strokeLinejoin:"round",d:"M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"})]})}function m(e){let{code:t}=e,[r,s]=(0,i.useState)(0),l=r>0;return(0,i.useEffect)(()=>{if(r>0){let e=setTimeout(()=>s(0),1e3);return()=>{clearTimeout(e)}}},[r]),(0,n.jsxs)("button",{type:"button",className:(0,a.A)("group/button absolute right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",l?"bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20":"bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5"),onClick:()=>{window.navigator.clipboard.writeText(t).then(()=>{s(e=>e+1)})},children:[(0,n.jsxs)("span",{"aria-hidden":l,className:(0,a.A)("pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",l&&"-translate-y-1.5 opacity-0"),children:[(0,n.jsx)(u,{className:"h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400"}),"Copy"]}),(0,n.jsx)("span",{"aria-hidden":!l,className:(0,a.A)("pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300",!l&&"translate-y-1.5 opacity-0"),children:"Copied!"})]})}function h(e){let{tag:t,label:r}=e;return t||r?(0,n.jsxs)("div",{className:"flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 bg-zinc-900 px-4 dark:border-b-white/5 dark:bg-white/1",children:[t&&(0,n.jsx)("div",{className:"dark flex",children:(0,n.jsx)(o.v,{variant:"small",children:t})}),t&&r&&(0,n.jsx)("span",{className:"h-0.5 w-0.5 rounded-full bg-zinc-500"}),r&&(0,n.jsx)("span",{className:"font-mono text-xs text-zinc-400",children:r})]}):null}function x(e){let{children:t,tag:r,label:s,code:a}=e,l=i.Children.only(t);if((0,i.isValidElement)(l)&&(r=l.props.tag??r,s=l.props.label??s,a=l.props.code??a),!a)throw Error("`CodePanel` requires a `code` prop, or a child with a `code` prop.");return(0,n.jsxs)("div",{className:"group dark:bg-white/2.5",children:[(0,n.jsx)(h,{tag:r,label:s}),(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsx)("pre",{className:"overflow-x-auto p-4 text-xs text-white",children:t}),(0,n.jsx)(m,{code:a})]})]})}function p(e){let{title:t,children:r,selectedIndex:l}=e,o=i.Children.count(r)>1;return t||o?(0,n.jsxs)("div",{className:"flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent",children:[t&&(0,n.jsx)("h3",{className:"mr-auto pt-3 text-xs font-semibold text-white",children:t}),o&&(0,n.jsx)(s.wb,{className:"-mb-px flex gap-4 text-xs font-medium",children:i.Children.map(r,(e,t)=>(0,n.jsx)(s.oz,{className:(0,a.A)("border-b py-3 transition ui-not-focus-visible:outline-none",t===l?"border-emerald-500 text-emerald-400":"border-transparent text-zinc-400 hover:text-zinc-300"),children:c((0,i.isValidElement)(e)?e.props:{})}))})]}):null}function g(e){let{children:t,...r}=e;return i.Children.count(t)>1?(0,n.jsx)(s.T2,{children:i.Children.map(t,e=>(0,n.jsx)(s.Kp,{children:(0,n.jsx)(x,{...r,children:e})}))}):(0,n.jsx)(x,{...r,children:t})}let f=(0,l.vt)()(e=>({preferredLanguages:[],addPreferredLanguage:t=>e(e=>({preferredLanguages:[...e.preferredLanguages.filter(e=>e!==t),t]}))})),b=(0,i.createContext)(!1);function v(e){let{children:t,title:r,...a}=e,l=function(e){let t,r,{preferredLanguages:n,addPreferredLanguage:s}=f(),[a,l]=(0,i.useState)(0),o=[...e].sort((e,t)=>n.indexOf(t)-n.indexOf(e))[0],d=e.indexOf(o),c=-1===d?a:d;c!==a&&l(c);let{positionRef:u,preventLayoutShift:m}=(t=(0,i.useRef)(null),r=(0,i.useRef)(),(0,i.useEffect)(()=>()=>{void 0!==r.current&&window.cancelAnimationFrame(r.current)},[]),{positionRef:t,preventLayoutShift(e){if(!t.current)return;let n=t.current.getBoundingClientRect().top;e(),r.current=window.requestAnimationFrame(()=>{let e=t.current?.getBoundingClientRect().top??n;window.scrollBy(0,e-n)})}});return{as:"div",ref:u,selectedIndex:a,onChange:t=>{m(()=>s(e[t]))}}}(i.Children.map(t,e=>c((0,i.isValidElement)(e)?e.props:{}))??[]),o=i.Children.count(t)>1,d="my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10",u=(0,n.jsx)(p,{title:r,selectedIndex:l.selectedIndex,children:t}),m=(0,n.jsx)(g,{...a,children:t});return(0,n.jsx)(b.Provider,{value:!0,children:o?(0,n.jsx)(s.fu,{...l,className:d,children:(0,n.jsxs)("div",{className:"not-prose",children:[u,m]})}):(0,n.jsx)("div",{className:d,children:(0,n.jsxs)("div",{className:"not-prose",children:[u,m]})})})}function w(e){let{children:t,...r}=e;if((0,i.useContext)(b)){if("string"!=typeof t)throw Error("`Code` children must be a string when nested inside a `CodeGroup`.");return(0,n.jsx)("code",{...r,dangerouslySetInnerHTML:{__html:t}})}return(0,n.jsx)("code",{...r,children:t})}function j(e){let{children:t,...r}=e;return(0,i.useContext)(b)?t:(0,n.jsx)(v,{...r,children:t})}},71713:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var n=r(95155),i=r(12115);let s=e=>{let{src:t,title:r,description:i}=e;return t?(0,n.jsxs)("div",{className:"flex flex-col items-center",children:[(0,n.jsx)("img",{src:t,alt:r||"Diagram",className:"max-w-full h-auto"}),(r||i)&&(0,n.jsxs)("p",{className:"text-center text-sm mt-2",children:[r&&(0,n.jsx)("strong",{children:r}),r&&i&&": ",i]})]}):(console.error("Diagram component requires a valid src string."),null)};r(19461);let{connect:a}=r(52854);async function l(e){let t="arweave.net",r=/^[a-zA-Z0-9-_]{43}$/,n=/^[^.\s]+$/,i=/^(https?:\/\/)[\w.-]+(\/.*)?$/,s=e;try{if(r.test(e))console.log("Transaction ID detected"),s=await a(e);else if(n.test(e))console.log("ArNS name detected"),s=await a(e);else if(i.test(e)){let l=e.match(i),o=l?.[0],d=l?.[2]||"";if(o?.includes(t)){let e=d.split("/").filter(Boolean),t=e[0];if(r.test(t))s=await a(t,e.slice(1).join("/"));else if(n.test(o.split(".")[0])){let e=o.split(".")[0];s=await a(e,d)}}}else console.log("Input did not match any known category")}catch(r){console.error("Error processing string:",r),s=`https://${t}/${e}`}return s;async function a(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return r.test(e)?`https://${t}/${e}/${i}`:n.test(e)?`https://${e}.${t}/${i}`:`https://${t}/${e}`}}let o=e=>{let{src:t,title:r,description:a}=e,[o,d]=(0,i.useState)(null);return((0,i.useEffect)(()=>{(async()=>{d(await l(t))})()},[t]),o)?(0,n.jsx)(s,{src:o,title:r,description:a}):(0,n.jsxs)("div",{className:"text-center",children:["Loading image from the Permaweb via ",(0,n.jsx)("a",{href:"/learn/concepts/wayfinder",children:"Wayfinder"}),"..."]})}},92179:(e,t,r)=>{"use strict";r.r(t),r.d(t,{Heading:()=>h});var n=r(95155),i=r(12115),s=r(67396),a=r(8586),l=r(18839),o=r(32193),d=r(53539);function c(e){return(0,n.jsx)("svg",{viewBox:"0 0 20 20",fill:"none",strokeLinecap:"round","aria-hidden":"true",...e,children:(0,n.jsx)("path",{d:"m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3"})})}function u(e){let{tag:t,label:r}=e;return t||r?(0,n.jsxs)("div",{className:"flex items-center gap-x-3",children:[t&&(0,n.jsx)(o.v,{children:t}),t&&r&&(0,n.jsx)("span",{className:"h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"}),r&&(0,n.jsx)("span",{className:"font-mono text-xs text-zinc-400",children:r})]}):null}function m(e){let{id:t,inView:r,children:i}=e;return(0,n.jsxs)(s.default,{href:`#${t}`,className:"group text-inherit no-underline hover:text-inherit",children:[r&&(0,n.jsx)("div",{className:"absolute ml-[calc(-1*var(--width))] mt-1 hidden w-[var(--width)] opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]",children:(0,n.jsx)("div",{className:"group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600",children:(0,n.jsx)(c,{className:"h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-white"})})}),i]})}function h(e){let{children:t,tag:r,label:s,level:o,anchor:c=!0,...h}=e;o=o??2;let x=`h${o}`,p=(0,i.useRef)(null),g=(0,l.Y)(e=>e.registerHeading),f=(0,a.W)(p,{margin:`${(0,d.i)(-3.5)}px 0px 0px 0px`,amount:"all"});return(0,i.useEffect)(()=>{2===o&&g({id:h.id,ref:p,offsetRem:r||s?8:6})}),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u,{tag:r,label:s}),(0,n.jsx)(x,{ref:p,className:r||s?"mt-2 scroll-mt-32":"scroll-mt-24",...h,children:c?(0,n.jsx)(m,{id:h.id,inView:f,children:t}):t})]})}},18839:(e,t,r)=>{"use strict";r.d(t,{T:()=>c,Y:()=>u});var n=r(95155),i=r(12115),s=r(79124),a=r(32081),l=r(53539);let o=(0,i.createContext)(null),d=i.useLayoutEffect;function c(e){let t,r,{sections:c,children:u}=e,[m]=(0,i.useState)(()=>(0,s.y)()(e=>({sections:c,visibleSections:[],setVisibleSections:t=>e(e=>e.visibleSections.join()===t.join()?{}:{visibleSections:t}),registerHeading:t=>{let{id:r,ref:n,offsetRem:i}=t;return e(e=>({sections:e.sections.map(e=>e.id===r?{...e,headingRef:n,offsetRem:i}:e)}))}})));return t=(0,a.Pj)(m,e=>e.setVisibleSections),r=(0,a.Pj)(m,e=>e.sections),(0,i.useEffect)(()=>{function e(){let{innerHeight:e,scrollY:n}=window,i=[];for(let t=0;t<r.length;t++){let{id:s,headingRef:a,offsetRem:o=0}=r[t];if(!a?.current)continue;let d=(0,l.i)(o),c=a.current.getBoundingClientRect().top+n;0===t&&c-d>n&&i.push("_top");let u=r[t+1],m=(u?.headingRef?.current?.getBoundingClientRect().top??1/0)+n-(0,l.i)(u?.offsetRem??0);(c>n&&c<n+e||m>n&&m<n+e||c<=n&&m>=n+e)&&i.push(s)}t(i)}let n=window.requestAnimationFrame(()=>e());return window.addEventListener("scroll",e,{passive:!0}),window.addEventListener("resize",e),()=>{window.cancelAnimationFrame(n),window.removeEventListener("scroll",e),window.removeEventListener("resize",e)}},[t,r]),d(()=>{m.setState({sections:c})},[m,c]),(0,n.jsx)(o.Provider,{value:m,children:u})}function u(e){let t=(0,i.useContext)(o);return(0,a.Pj)(t,e)}},32193:(e,t,r)=>{"use strict";r.d(t,{v:()=>o});var n=r(95155),i=r(43463);let s={small:"",medium:"rounded-lg px-1.5 ring-1 ring-inset"},a={emerald:{small:"text-emerald-500 dark:text-emerald-400",medium:"ring-emerald-300 dark:ring-emerald-400/30 bg-emerald-400/10 text-emerald-500 dark:text-emerald-400"},sky:{small:"text-sky-500",medium:"ring-sky-300 bg-sky-400/10 text-sky-500 dark:ring-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400"},amber:{small:"text-amber-500",medium:"ring-amber-300 bg-amber-400/10 text-amber-500 dark:ring-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400"},rose:{small:"text-red-500 dark:text-rose-500",medium:"ring-rose-200 bg-rose-50 text-red-500 dark:ring-rose-500/20 dark:bg-rose-400/10 dark:text-rose-400"},zinc:{small:"text-zinc-400 dark:text-zinc-500",medium:"ring-zinc-200 bg-zinc-50 text-zinc-500 dark:ring-zinc-500/20 dark:bg-zinc-400/10 dark:text-zinc-400"}},l={GET:"emerald",POST:"sky",PUT:"amber",DELETE:"rose"};function o(e){let{children:t,variant:r="medium",color:o=l[t]??"emerald"}=e;return(0,n.jsx)("span",{className:(0,i.A)("font-mono text-[0.625rem] font-semibold leading-6",s[r],a[o][r]),children:t})}},53539:(e,t,r)=>{"use strict";function n(e){return e*parseFloat(window.getComputedStyle(document.documentElement).fontSize)}r.d(t,{i:()=>n})}}]);