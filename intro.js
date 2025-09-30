

// 
//  const logoMainContentHeight = document.querySelector(".logo__main__content").clientHeight
gsap.to(".logo__main__content",1,{
   
    height:0,
    ease:"power4.inOut",
   
})

gsap.from(".clip-top, .clip-bottom",2,{
    delay:1,
    height:"50vh",
    ease:"power4.inOut"
})


gsap.to(".marquee",3.5, {
    delay:0.75,
    top:"50%",
    ease:"power4.inOut"
})


gsap.from(".clip-top .marquee, .clip-bottom .marquee",5, {
    delay:1,
    left:"100%",
    ease:"power4.inOut"
})

gsap.from(".clip-center .marquee",5, {
    delay:1,
    left:"-50%",
    ease:"power3.inOut"
})


gsap.to(".clip-top",2, {
    delay:6,
    clipPath:"inset(0 0 100% 0)",
    ease:"power4.inOut"
})
gsap.to(".clip-bottom",2, {
    delay:6,
    clipPath:"inset(100% 0 0 0)",
    ease:"power4.inOut"
})

gsap.to(".marquee-container span",1,{
    delay:6.3,
    opacity:0,
    ease:"power4.inOut",
    onComplete:()=>{
        document.querySelector("body").classList.remove("hide__overflow")
        document.querySelector(".loader").style.cssText = "pointer-events:none"
    }
})
gsap.to(".clip-center",1,{
    delay:6.3,
    opacity:0,
    ease:"power3.inOut",
    onComplete:()=>{
      document.querySelector(".loader").remove()
    }
   
})
gsap.fromTo(".our__image img",1.3,{
    scale:0.1,
 delay:6.45,
 rotate:-45
},{
   delay:6.45,
    scale:1,
    rotate:0,
    ease:"power4.inOut"
})




// let fadeTargets = navWrap.querySelectorAll("[data-menu-fade]")
// let menuButton = document.querySelector(".menu-button")
// let menuButtonTexts = menuButton.querySelectorAll("p")
// let menuButtonIcon = menuButton.querySelector(".menu-button-icon")

let tl = gsap.timeline()
