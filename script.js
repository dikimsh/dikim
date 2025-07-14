// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Change header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    // Highlight active navigation link
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.about-card, .project-card, .award-card, .education-card, .contact-card, .experience-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Typing effect for hero section
    const heroTitle = document.querySelector('.hero-text h1');
    const heroSubtitle = document.querySelector('.hero-text h2');
    const heroDescription = document.querySelector('.hero-text p');
    
    if (heroTitle && heroSubtitle && heroDescription) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        const descriptionHTML = heroDescription.innerHTML;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        heroDescription.innerHTML = '';
        
        function typeWriter(element, text, speed = 100) {
            return new Promise((resolve) => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                        resolve();
                    }
                }, speed);
            });
        }
        
        function typeWriterHTML(element, htmlText, speed = 100) {
            return new Promise((resolve) => {
                // HTML 태그를 제거하고 순수 텍스트만 추출
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlText;
                const plainText = tempDiv.textContent || tempDiv.innerText || '';
                
                let i = 0;
                const timer = setInterval(() => {
                    if (i < plainText.length) {
                        // <br> 태그 위치를 확인하여 줄바꿈 처리
                        const currentText = plainText.substring(0, i + 1);
                        const lines = htmlText.split('<br>');
                        let displayText = '';
                        let charCount = 0;
                        
                        for (let j = 0; j < lines.length; j++) {
                            const lineText = lines[j];
                            const lineLength = lineText.length;
                            
                            if (charCount + lineLength <= i + 1) {
                                displayText += lineText;
                                if (j < lines.length - 1) displayText += '<br>';
                                charCount += lineLength;
                            } else {
                                const remainingChars = (i + 1) - charCount;
                                displayText += lineText.substring(0, remainingChars);
                                break;
                            }
                        }
                        
                        element.innerHTML = displayText;
                        i++;
                    } else {
                        clearInterval(timer);
                        element.innerHTML = htmlText;
                        resolve();
                    }
                }, speed);
            });
        }
        
        // Start typing animation after a short delay
        setTimeout(async () => {
            await typeWriter(heroTitle, titleText, 150);
            await typeWriter(heroSubtitle, subtitleText, 80);
            await typeWriterHTML(heroDescription, descriptionHTML, 60);
        }, 500);
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .project-card, .award-card, .education-card, .contact-card, .experience-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: #a0a0a0;
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style); 