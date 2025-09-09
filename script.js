const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// Typing Animation
const typingText = document.getElementById('typing-text');
const originalText = typingText.textContent;
typingText.textContent = '';
let index = 0;
function typeWriter() {
    if (index < originalText.length) {
        typingText.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeWriter, 70);
    }
}
setTimeout(typeWriter, 500);

// Neural Network Animation
const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const nodes = [];
const connections = [];
const numNodes = 20;

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = 5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.lineTo(this.x + this.radius * Math.cos(Math.PI / 3), this.y + this.radius * Math.sin(Math.PI / 3));
        ctx.lineTo(this.x + this.radius * Math.cos(2 * Math.PI / 3), this.y + this.radius * Math.sin(2 * Math.PI / 3));
        ctx.lineTo(this.x, this.y + this.radius);
        ctx.lineTo(this.x + this.radius * Math.cos(4 * Math.PI / 3), this.y + this.radius * Math.sin(4 * Math.PI / 3));
        ctx.lineTo(this.x + this.radius * Math.cos(5 * Math.PI / 3), this.y + this.radius * Math.sin(5 * Math.PI / 3));
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 191, 255, ${Math.random() * 0.5 + 0.5})`;
        ctx.fill();
        ctx.strokeStyle = '#00BFFF';
        ctx.stroke();
    }
}

class Connection {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.opacitySpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        this.opacity += this.opacitySpeed;
        if (this.opacity > 0.6 || this.opacity < 0.1) this.opacitySpeed *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.node1.x, this.node1.y);
        ctx.lineTo(this.node2.x, this.node2.y);
        ctx.strokeStyle = `rgba(70, 130, 180, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Initialize nodes and connections
for (let i = 0; i < numNodes; i++) {
    nodes.push(new Node());
}

for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() < 0.1) {
            connections.push(new Connection(nodes[i], nodes[j]));
        }
    }
}

function animateNeuralNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    connections.forEach(connection => {
        connection.update();
        connection.draw();
    });
    requestAnimationFrame(animateNeuralNetwork);
}
animateNeuralNetwork();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');
    const nameError = nameInput.nextElementSibling;
    const emailError = emailInput.nextElementSibling;
    const messageError = messageInput.nextElementSibling;

    let valid = true;
    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    messageError.classList.add('hidden');

    if (!nameInput.value.trim()) {
        nameError.classList.remove('hidden');
        valid = false;
    }
    if (!emailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        emailError.classList.remove('hidden');
        valid = false;
    }
    if (!messageInput.value.trim()) {
        messageError.classList.remove('hidden');
        valid = false;
    }

    if (valid) {
        console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });
        alert('Thank you for your message! I’ll respond soon.');
        contactForm.reset();
    }
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    navLinks.classList.toggle('show');
    navLinks.classList.toggle('hidden');
}

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleMenu();
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.add('hidden');
        navLinks.classList.remove('show');
    });
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.slide-in').forEach(el => observer.observe(el));

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hidden';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('hidden', window.scrollY < 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});