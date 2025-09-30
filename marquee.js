$(document).ready(function() {
            let object = { value: 1 };
            let tl2 = gsap.timeline({ repeat: -1, onReverseComplete: () => tl2.progress(1) });
            tl2.fromTo('.testi-dupes', { xPercent: -100 }, { xPercent: 0, duration: 50, ease: 'none' });
            Observer.create({
                target: window,
                type: 'wheel,scroll,touch',
                onChangeY: (self) => {
                    let v = self.velocityY * 0.002;
                    v = gsap.utils.clamp(-40, 40, v);
                    tl2.timeScale(v);
                    let resting = v < 0 ? -1 : 1;
                    gsap.fromTo(object, { value: v }, { value: resting, duration: 1, onUpdate: () => tl2.timeScale(object.value) });
                }
            });
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) tl2.pause();
        });
         
 
 
 document.addEventListener("DOMContentLoaded", function() {
            gsap.registerPlugin(ScrollTrigger);
            document.querySelectorAll('[svg="animated"]').forEach(svg => {
                const paths = svg.querySelectorAll('path');
                paths.forEach(path => {
                    const length = path.getTotalLength();
                    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
                    ScrollTrigger.create({
                        trigger: svg,
                        start: "top 80%",
                        end: "bottom top",
                        onToggle: self => {
                            if (self.isActive) {
                                let duration = svg.getAttribute('svg-animation-time') || 1000;
                                gsap.to(path, { strokeDashoffset: 0, duration: parseInt(duration) / 1000, ease: "circ.inOut" });
                            } else {
                                gsap.set(path, { strokeDashoffset: length });
                            }
                        }
                    });
                });
            });
            if (window.matchMedia('(hover: hover)').matches) {
                document.querySelectorAll('a[hover="true"]').forEach(link => {
                    const svg = link.querySelector('svg[hover-animate="true"]');
                    if (svg) {
                        const paths = svg.querySelectorAll('path');
                        paths.forEach(path => gsap.set(path, { strokeDasharray: path.getTotalLength(), strokeDashoffset: path.getTotalLength() }));
                        gsap.set(svg, { visibility: 'hidden' });
                        const animation = gsap.timeline({ paused: true }).to(svg, { visibility: 'visible', duration: 0 }).to(paths, { strokeDashoffset: 0, duration: 1, ease: "circ.inOut", stagger: 0.1 });
                        const reverseAnimation = gsap.timeline({ paused: true }).to(paths, { strokeDashoffset: (i, target) => target.getTotalLength(), duration: 0.5, ease: "circ.inOut", stagger: 0.1 }).to(svg, { visibility: 'hidden', duration: 0 });
                        link.addEventListener('mouseenter', () => {
                            document.querySelectorAll('svg[hover-animate="true"]').forEach(otherSvg => { if (otherSvg !== svg) gsap.set(otherSvg, { visibility: 'hidden' }); });
                            gsap.set(svg, { visibility: 'visible' });
                            paths.forEach(path => gsap.set(path, { strokeDashoffset: path.getTotalLength() }));
                            animation.restart();
                        });
                        link.addEventListener('mouseleave', () => reverseAnimation.restart());
                    }
                });
                document.querySelectorAll('a[hover-restart="true"]').forEach(link => {
                    const svg = link.querySelector('svg[restart-animate="true"]');
                    if (svg) {
                        const paths = svg.querySelectorAll('path');
                        paths.forEach(path => {
                            const length = path.getTotalLength();
                            gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
                            let duration = svg.getAttribute('svg-animation-time') || 400;
                            const playAnimation = gsap.to(path, { strokeDashoffset: 0, paused: true, duration: parseInt(duration) / 1000, ease: "circ.inOut" });
                            link.addEventListener('mouseenter', () => {
                                gsap.set(path, { strokeDashoffset: length });
                                playAnimation.restart();
                            });
                        });
                    }
                });
            }
        });