   // SVG ANIMATED
        document.addEventListener("DOMContentLoaded", function() {
            gsap.registerPlugin(ScrollTrigger);

            function setupScrollTriggeredAnimations() {
                document.querySelectorAll('[svg="animated"]').forEach(function(svg) {
                    const paths = svg.querySelectorAll('path');
                    paths.forEach(function(path) {
                        const length = path.getTotalLength();
                        gsap.set(path, {
                            strokeDasharray: length,
                            strokeDashoffset: length
                        });

                        ScrollTrigger.create({
                            trigger: svg,
                            start: "top 80%", // When the top of the SVG hits 80% of the viewport height
                            end: "bottom top", // When the bottom of the SVG hits the top of the viewport
                            onToggle: self => {
                                if (self.isActive) {
                                    let animationDuration = svg.getAttribute('svg-animation-time');
                                    animationDuration = animationDuration ? parseInt(animationDuration, 10) / 1000 : 1; // Default to 1 second if not specified or parsing fails
                                    gsap.to(path, {
                                        strokeDashoffset: 0,
                                        duration: animationDuration,
                                        ease: "circ.inOut",
                                    });
                                } else {
                                    gsap.set(path, {
                                        strokeDashoffset: length
                                    });
                                }
                            },
                            once: false, // Ensure the animation can trigger more than once
                        });
                    });
                });
            }

            // Sets up hover-triggered SVG animations
            function setupHoverTriggeredAnimations() {
                const allSVGs = document.querySelectorAll('svg[hover-animate="true"]');

                document.querySelectorAll('a[hover="true"]').forEach(function(link) {
                    const svg = link.querySelector('svg[hover-animate="true"]');
                    if (svg) {
                        const paths = svg.querySelectorAll('path');
                        paths.forEach(function(path) {
                            const length = path.getTotalLength();
                            gsap.set(path, {
                                strokeDasharray: length,
                                strokeDashoffset: length
                            });
                        });

                        gsap.set(svg, {
                            visibility: 'hidden'
                        });

                        const animation = gsap.timeline({
                                paused: true
                            })
                            .to(svg, {
                                visibility: 'visible',
                                duration: 0
                            })
                            .to(paths, {
                                strokeDashoffset: 0,
                                duration: 1,
                                ease: "circ.inOut",
                                stagger: 0.1,
                            });

                        const reverseAnimation = gsap.timeline({
                                paused: true
                            })
                            .to(paths, {
                                strokeDashoffset: (i, target) => target.getTotalLength(),
                                duration: .5, // Different duration for reverse
                                ease: "circ.inOut",
                                stagger: 0.1,
                            })
                            .to(svg, {
                                visibility: 'hidden',
                                duration: 0
                            });

                        link.addEventListener('mouseenter', function() {
                            allSVGs.forEach(otherSvg => {
                                if (otherSvg !== svg) {
                                    gsap.set(otherSvg, {
                                        visibility: 'hidden'
                                    });
                                }
                            });
                            gsap.set(svg, {
                                visibility: 'visible'
                            });
                            paths.forEach(function(path) {
                                const length = path.getTotalLength();
                                gsap.set(path, {
                                    strokeDashoffset: length
                                }); // Reset before playing
                            });
                            animation.restart();
                        });

                        link.addEventListener('mouseleave', function() {
                            reverseAnimation.restart();
                        });
                    }
                });
            }

            // Sets up hover-triggered SVG animations with restart on hover and customizable duration
            function setupRestartOnHoverAnimations() {
                document.querySelectorAll('a[hover-restart="true"]').forEach(function(link) {
                    const svg = link.querySelector('svg[restart-animate="true"]');
                    if (svg) {
                        const paths = svg.querySelectorAll('path');
                        paths.forEach(function(path) {
                            const length = path.getTotalLength();
                            gsap.set(path, {
                                strokeDasharray: length,
                                strokeDashoffset: 0
                            }); // Initially visible

                            let animationDuration = svg.getAttribute('svg-animation-time');
                            animationDuration = animationDuration ? parseInt(animationDuration, 10) / 1000 : 0.4; // Default to 0.4 seconds if not specified or parsing fails

                            const playAnimation = gsap.to(path, {
                                strokeDashoffset: 0,
                                paused: true,
                                duration: animationDuration,
                                ease: "circ.inOut",
                            });

                            link.addEventListener('mouseenter', function() {
                                gsap.set(path, {
                                    strokeDashoffset: length
                                }); // Reset before playing
                                playAnimation.restart();
                            });
                        });
                    }
                });
            }

            // Check if the device supports hover
            const supportsHover = window.matchMedia('(hover: hover)').matches;

            // Initialize scroll-triggered animations
            setupScrollTriggeredAnimations();

            // Initialize hover-triggered animations only if hover is supported
            if (supportsHover) {
                setupHoverTriggeredAnimations();
                setupRestartOnHoverAnimations();
            }
        });