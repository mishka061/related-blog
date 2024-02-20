(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var o=n.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&!t;)t=o[r--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".textAreaSubmit"),t=document.querySelector(".textAreaCommit"),n=document.querySelector(".new-blog-comments");e.addEventListener("click",(function(o){o.preventDefault();const r=new FormData;r.append("comment",t.value);let l=e.getAttribute("data-id");fetch(`/blog/${l}/comments`,{method:"POST",body:r}).then((e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.text()})).then((e=>{n.innerHTML+=e,t.value=""})).catch((e=>{console.error("Fetch error:",e)}))}))})),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelectorAll(".adminChangeRole");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(){let n=e[t].dataset.id,o=document.querySelector(`#select_${n}`),r=document.querySelector(`#role_${n}`),l=o.value,c=new FormData;c.append("role",l),c.append("id",n),fetch("/profile/administrator",{method:"POST",body:c}).then((e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.text()})).then((()=>{r.innerHTML=l})).catch((e=>{console.error("Fetch error:",e)}))}))})),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelectorAll(".approvedBlogBtn"),t=document.querySelector(".noArrBlogs"),n=document.querySelector(".titleModerator");for(let o=0;o<e.length;o++)o>0?(t.style.display="block",n.style.display="none"):(t.style.display="none",n.style.display="block"),e[o].addEventListener("click",(function(t){t.preventDefault();let n=e[o].previousElementSibling,r=n.previousElementSibling.dataset.id,l=new FormData;l.append("blogId",r),l.append("status",n.value),fetch("/profile/moderator",{method:"POST",body:l}).then((e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`)})).then((()=>{let t=e[o].closest("#profileAllconteiner");t?t.remove():console.error("id block not found in DOM");let n=document.querySelector(`.profile-all-conteiner[data-id="${r}"]`);if(n){let e=n.querySelector(".waiting-status");e.textContent="Одобрено",e.style.color="rgb(3, 216, 3)"}else console.error("Comment blog not found in DOM")}))}))})),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelectorAll(".deleteComment");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(n){n.preventDefault();let o=e[t].previousElementSibling,r=o.previousElementSibling.dataset.id,l=new FormData;l.append("blogId",r),l.append("comments",o.value),fetch("/profile/moderator",{method:"POST",body:l}).then((e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`)})).then((()=>{let n=e[t].closest(".blog-read-comments");n?n.remove():console.error("Comment block not found in DOM")}))}))})),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelectorAll(".rejectBlog"),t=document.querySelector(".noArrBlogs"),n=document.querySelector(".titleModerator");for(let o=0;o<e.length;o++)e[o].addEventListener("click",(function(r){o>0?(t.style.display="block",n.style.display="none"):(t.style.display="none",n.style.display="block"),r.preventDefault();let l=e[o].previousElementSibling,c=e[o].previousElementSibling.dataset.status,a=e[o].previousElementSibling.dataset.id,i=new FormData;i.append("blogId",a),i.append("rejectComment",l.value),i.append("status",c),fetch("/profile/moderator",{method:"POST",body:i}).then((e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`)})).then((()=>{let t=e[o].closest("#profileAllconteiner");t?t.remove():console.error("id block not found in DOM");let n=document.querySelector(`.profile-all-conteiner[data-id="${a}"]`);if(n){let e=n.querySelector(".waiting-status");e.textContent="Черновик",e.style.color="grey"}else console.error("Comment blog not found in DOM")}))}))})),document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".exitToken").addEventListener("click",(function(e){e.preventDefault(),console.log("exitToken click"),document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",window.location.href="/"}))})),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelector(".submitHeader"),t=document.querySelector(".searhSelectHeader"),n=document.querySelector(".main-content");e.addEventListener("click",(function(e){e.preventDefault();let o=new FormData;o.append("action","search"),o.append("category",t.value),fetch("/category/",{method:"POST",body:o}).then((e=>e.text())).then((e=>{n.innerHTML="",n.innerHTML=e,document.title="Категория- "+t.value})).catch((e=>{console.error("Fetch error:",e)}))}))})),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelectorAll(".submitCategoryHome"),t=document.querySelector(".main-content");for(let n=0;n<e.length;n++)e[n].addEventListener("click",(function(o){o.preventDefault();let r=e[n].previousElementSibling.value,l=new FormData;l.append("action","search"),l.append("category",r),fetch("/category/",{method:"POST",body:l}).then((e=>e.text())).then((e=>{t.innerHTML="",t.innerHTML=e,document.title="Категория- "+r})).catch((e=>{console.error("Fetch error:",e)}))}))}));let t=document.querySelector(".pagination"),n=document.querySelectorAll(".home-conteiner"),o=12,r=1;function l(e){let n=document.createElement("button");n.textContent=e,n.classList.add("paginationBtn"),1===e&&n.classList.add("paginationAddClass"),n.addEventListener("click",(()=>{r=e,c()})),t.appendChild(n)}function c(){for(let e=0;e<n.length;e++)n[e].style.display=e<(r-1)*o||e>=r*o?"none":"block";document.querySelectorAll(".paginationBtn").forEach((e=>{e.classList.remove("paginationAddClass")})),document.querySelector(".paginationBtn:nth-child("+r+")").classList.add("paginationAddClass")}for(let e=0;e<n.length;e+=o)l(e/o+1);c(),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelector(".submitFindStatus"),t=document.querySelector(".status-select"),n=document.querySelector(".statusSearch"),o=document.querySelector("#profileContent");e.addEventListener("click",(function(e){e.preventDefault();let r=t.value,l=new FormData;l.append("status",r),fetch(`/profile/author/status?status=${r}`,{method:"POST",body:l}).then((e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.text()})).then((e=>{o.innerHTML="",o.style.display="none",n.innerHTML=e})).catch((e=>{console.error("Fetch error:",e)}))}))})),document.addEventListener("DOMContentLoaded",(function(){let e=document.querySelector(".profilePagination"),t=document.querySelectorAll(".profile-all-conteiner"),n=10,o=1;function r(t){let n=document.createElement("button");n.textContent=t,n.classList.add("paginationContentBtn"),1===t&&n.classList.add("profilePaginationAddClass"),n.addEventListener("click",(()=>{o=t,l()})),e.appendChild(n)}function l(){for(let e=0;e<t.length;e++)t[e].style.display=e<(o-1)*n||e>=o*n?"none":"block";document.querySelectorAll(".paginationContentBtn").forEach((e=>{e.classList.remove("profilePaginationAddClass")})),document.querySelector(".paginationContentBtn:nth-child("+o+")").classList.add("profilePaginationAddClass")}for(let e=0;e<Math.ceil(t.length/n);e++)r(e+1);l()}));let a=document.getElementById("passwordInput"),i=document.getElementById("confirmPasswordInput"),d=document.getElementById("confirmPasswordError"),s=document.getElementById("emailInput"),u=document.getElementById("loginInput");i.addEventListener("input",(function(){let e=a.value,t=i.value;d.style.display=e===t||""===t?"none":"block"})),s.addEventListener("input",(async function(){let e=s.value;try{await fetch(`/check-email?email=${e}`)}catch(e){console.error(e)}})),u.addEventListener("input",(async function(){let e=u.value;try{await fetch(`/check-login?login=${e}`)}catch(e){console.error(e)}}));let p=document.getElementById("passwordCheckbox1");p.addEventListener("change",(function(){f("passwordInput",p)}));let m=document.getElementById("passwordCheckbox2");function f(e,t){document.getElementById(e).type=t.checked?"text":"password"}m.addEventListener("change",(function(){f("confirmPasswordInput",m)}))})();