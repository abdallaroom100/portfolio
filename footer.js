document.addEventListener('DOMContentLoaded', function() {
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const leftPupil = leftEye.querySelector('.eye-inner');
    const rightPupil = rightEye.querySelector('.eye-inner');
    const svg = document.getElementById('svg');

    let svgRect = svg.getBoundingClientRect();
    const svgViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
    const viewBoxWidth = svgViewBox[2];
    const viewBoxHeight = svgViewBox[3];

    const leftEyeCenter = { x: 400, y: 500 };
    const rightEyeCenter = { x: 600, y: 500 };
    const maxPupilDistance = 80;

    // تحديث إحداثيات SVG عند تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        svgRect = svg.getBoundingClientRect();
    });

    // تحديث إحداثيات SVG عند التمرير (scroll)
    window.addEventListener('scroll', function() {
        svgRect = svg.getBoundingClientRect();
    });

    let animationId;

    function updateEyes(e) {
        // التحقق إذا كان الـ SVG مرئي في الـ viewport
        if (svgRect.top >= window.innerHeight || svgRect.bottom <= 0) {
            return; // لو الـ footer مش مرئي، ما نحدثش العيون
        }

        const mouseX = (e.clientX - svgRect.left) * (viewBoxWidth / svgRect.width);
        const mouseY = (e.clientY - svgRect.top) * (viewBoxHeight / svgRect.height);

        const leftDx = mouseX - leftEyeCenter.x;
        const leftDy = mouseY - leftEyeCenter.y;
        const leftAngle = Math.atan2(leftDy, leftDx);
        const leftDistance = Math.min(maxPupilDistance, Math.sqrt(leftDx * leftDx + leftDy * leftDy));

        const rightDx = mouseX - rightEyeCenter.x;
        const rightDy = mouseY - rightEyeCenter.y;
        const rightAngle = Math.atan2(rightDy, rightDx);
        const rightDistance = Math.min(maxPupilDistance, Math.sqrt(rightDx * rightDx + rightDy * rightDy));

        const leftPupilX = Math.cos(leftAngle) * leftDistance;
        const leftPupilY = Math.sin(leftAngle) * leftDistance;
        const rightPupilX = Math.cos(rightAngle) * rightDistance;
        const rightPupilY = Math.sin(rightAngle) * rightDistance;

        leftPupil.setAttribute('transform', `translate(${leftPupilX}, ${leftPupilY})`);
        rightPupil.setAttribute('transform', `translate(${rightPupilX}, ${rightPupilY})`);
    }

    document.addEventListener('mousemove', function(e) {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        animationId = requestAnimationFrame(() => updateEyes(e));
    });

    // إعادة تعيين موقع العيون إذا خرجت الفأرة عن الصفحة أو لم يكن الـ footer مرئيًا
    document.addEventListener('mouseleave', function() {
        leftPupil.setAttribute('transform', `translate(0, 0)`);
        rightPupil.setAttribute('transform', `translate(0, 0)`);
    });

    // Text animation
    const textLinks = document.querySelectorAll('.footer .text');

    textLinks.forEach(link => {
        const text = link.textContent;
        link.innerHTML = '';

        const wrapper = document.createElement('span');
        wrapper.className = 'letter-wrapper';

        const originalContainer = document.createElement('span');
        originalContainer.className = 'original-letters';
        for (let i = 0; i < text.length; i++) {
            const letter = document.createElement('span');
            letter.className = 'letter original';
            letter.textContent = text[i];
            letter.style.transitionDelay = `${i * 0.02}s`;
            originalContainer.appendChild(letter);
        }

        const duplicateContainer = document.createElement('span');
        duplicateContainer.className = 'duplicate-letters';
        for (let i = 0; i < text.length; i++) {
            const letter = document.createElement('span');
            letter.className = 'letter duplicate';
            letter.textContent = text[i];
            letter.style.transitionDelay = `${i * 0.02}s`;
            duplicateContainer.appendChild(letter);
        }

        wrapper.appendChild(originalContainer);
        wrapper.appendChild(duplicateContainer);
        link.appendChild(wrapper);

        link.addEventListener('mouseenter', function() {
            this.classList.add('play');
        });

        link.addEventListener('mouseleave', function() {
            this.classList.remove('play');
        });
    });
});
//  document.addEventListener('DOMContentLoaded', function() {
//             const leftEye = document.getElementById('left-eye');
//             const rightEye = document.getElementById('right-eye');
//             const leftPupil = leftEye.querySelector('.eye-inner');
//             const rightPupil = rightEye.querySelector('.eye-inner');
//             const svg = document.getElementById('svg');

//             let svgRect = svg.getBoundingClientRect();
//             const svgViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
//             const viewBoxWidth = svgViewBox[2];
//             const viewBoxHeight = svgViewBox[3];

//             const leftEyeCenter = { x: 400, y: 500 };
//             const rightEyeCenter = { x: 600, y: 500 };
//             const maxPupilDistance = 80;

//             window.addEventListener('resize', function() {
//                 svgRect = svg.getBoundingClientRect();
//             });

//             let animationId;

//             function updateEyes(e) {
//                 const mouseX = (e.clientX - svgRect.left) * (viewBoxWidth / svgRect.width);
//                 const mouseY = (e.clientY - svgRect.top) * (viewBoxHeight / svgRect.height);

//                 const leftDx = mouseX - leftEyeCenter.x;
//                 const leftDy = mouseY - leftEyeCenter.y;
//                 const leftAngle = Math.atan2(leftDy, leftDx);
//                 const leftDistance = Math.min(maxPupilDistance, Math.sqrt(leftDx * leftDx + leftDy * leftDy));

//                 const rightDx = mouseX - rightEyeCenter.x;
//                 const rightDy = mouseY - rightEyeCenter.y;
//                 const rightAngle = Math.atan2(rightDy, rightDx);
//                 const rightDistance = Math.min(maxPupilDistance, Math.sqrt(rightDx * rightDx + rightDy * rightDy));

//                 const leftPupilX = Math.cos(leftAngle) * leftDistance;
//                 const leftPupilY = Math.sin(leftAngle) * leftDistance;
//                 const rightPupilX = Math.cos(rightAngle) * rightDistance;
//                 const rightPupilY = Math.sin(rightAngle) * rightDistance;

//                 leftPupil.setAttribute('transform', `translate(${leftPupilX}, ${leftPupilY})`);
//                 rightPupil.setAttribute('transform', `translate(${rightPupilX}, ${rightPupilY})`);
//             }

//             document.addEventListener('mousemove', function(e) {
//                 if (animationId) {
//                     cancelAnimationFrame(animationId);
//                 }
//                 animationId = requestAnimationFrame(() => updateEyes(e));
//             });

//             // Text animation
//             const textLinks = document.querySelectorAll('.footer .text');

//             textLinks.forEach(link => {
//                 const text = link.textContent;
//                 link.innerHTML = '';

//                 const wrapper = document.createElement('span');
//                 wrapper.className = 'letter-wrapper';

//                 const originalContainer = document.createElement('span');
//                 originalContainer.className = 'original-letters';
//                 for (let i = 0; i < text.length; i++) {
//                     const letter = document.createElement('span');
//                     letter.className = 'letter original';
//                     letter.textContent = text[i];
//                     letter.style.transitionDelay = `${i * 0.02}s`;
//                     originalContainer.appendChild(letter);
//                 }

//                 const duplicateContainer = document.createElement('span');
//                 duplicateContainer.className = 'duplicate-letters';
//                 for (let i = 0; i < text.length; i++) {
//                     const letter = document.createElement('span');
//                     letter.className = 'letter duplicate';
//                     letter.textContent = text[i];
//                     letter.style.transitionDelay = `${i * 0.02}s`;
//                     duplicateContainer.appendChild(letter);
//                 }

//                 wrapper.appendChild(originalContainer);
//                 wrapper.appendChild(duplicateContainer);
//                 link.appendChild(wrapper);

//                 link.addEventListener('mouseenter', function() {
//                     this.classList.add('play');
//                 });

//                 link.addEventListener('mouseleave', function() {
//                     this.classList.remove('play');
//                 });
//             });
//         });