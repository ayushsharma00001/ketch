const outerFlash = document.querySelectorAll(".flash-outer");



for(let f of outerFlash){
    f.addEventListener("click",()=>{
        f.style.display = "none";
    })
}


const pUnd = document.querySelectorAll(".parentUnd");
const underline = document.querySelectorAll(".underline");

for(let p of pUnd){
    p.addEventListener("mouseenter",(dets)=>{
        console.log(dets)
        p.children[1].style.width = "100%"
    })
}
for(let p of pUnd){
    p.addEventListener("mouseleave",(dets)=>{
        console.log(dets)
        p.children[1].style.width = "0"
    })
}



// full view of Image

const img = document.querySelectorAll(".showImg");
const fullView = document.querySelector(".fullView");
const fullViewImgTag = document.querySelector(".fullViewImgTag");
const crossFull = document.querySelector(".cross-full");

for(let i of img){
    i.addEventListener("click",(dets)=>{
        console.log(fullView.style);
        fullViewImgTag.setAttribute("src",`${dets.target.currentSrc}`);
        fullViewImgTag.style.maxHeight = "100vh"
        fullView.style.display = "flex";
        fullView.style.justifyContent = "center";
        fullView.style.alignItems = "center";
        crossFull.style.display = "block"
    })
}
crossFull.addEventListener("click",(dets)=>{
    fullView.style.display = "none";
})




const sm = document.querySelector(".radio-btn-sm");
const lg = document.querySelector(".radio-btn-lg");
const md = document.querySelector(".radio-btn-md");

sm.addEventListener("click",()=>{
    sm.style.backgroundColor = "#E5AE65";
    md.style.backgroundColor = "#ccc";
    lg.style.backgroundColor = "#ccc";
});
lg.addEventListener("click",()=>{
    lg.style.backgroundColor = "#E5AE65";
    md.style.backgroundColor = "#ccc";
    sm.style.backgroundColor = "#ccc";
});
md.addEventListener("click",()=>{
    sm.style.backgroundColor = "#ccc";
    md.style.backgroundColor = "#E5AE65";
    lg.style.backgroundColor = "#ccc";
});

