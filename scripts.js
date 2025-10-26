
// ===== Custom Animated Cursor =====
document.addEventListener('DOMContentLoaded', () => {
  // Only enable custom cursor on desktop
  if (window.innerWidth > 900) {
    const cursor = document.querySelector('.cursor');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    const speed = 0.22; // Lower is slower

    function animateCursor() {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = 1;
    });

    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('cursor-click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = 1;
    });

    animateCursor();
  }
});

// ...existing code...

emailjs.init("hodX2j1r5XyUT4iZ9");

document.getElementById("feedbackForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    const templateParams = {
      user_name: name,
      user_email: email,
      user_message: message
    };

    // Send the email using EmailJS
    emailjs.send("service_uveadgc", "template_v8oexfn", templateParams)
      .then(response => {
        alert("Message sent successfully!");
        document.getElementById("feedbackForm").reset();
      })
      .catch(error => {
        console.error("Email sending failed:", error);
        alert("Failed to send message. Try again later.");
      });

    // Send Auto-Reply to the Sender
    emailjs.send("service_uveadgc", "template_poa1j6a", templateParams)
      .then(response => {
        alert("Message sent! A confirmation email has been sent to you.");
        document.getElementById("feedbackForm").reset();
      })
      .catch(error => {
        console.error("Auto-reply failed:", error);
        alert("Failed to send auto-reply. Please try again later.");
      });

  } else {
    alert("Please fill out all fields.");
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const nameElement = document.getElementById('typed-name');
  const textArray = ['Cloud Engineer', 'AI Enthusiast', 'Front End Developer', 'ML Developer']; // Add more if needed
  const typingSpeed = 200; // Milliseconds per character
  const pauseBeforeDelete = 1000; // Pause before deleting text
  const pauseBeforeNext = 1500; // Pause before typing the next text
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = textArray[textIndex];
    if (!isDeleting) {
      nameElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), pauseBeforeDelete);
      }
    } else {
      nameElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeEffect, pauseBeforeNext);
        return;
      }
    }
    setTimeout(typeEffect, isDeleting ? 100 : typingSpeed);
  }

  typeEffect();
});

/* ========= Animated Character's Eyes Following the Cursor ========= */
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const characterContainer = document.querySelector('.character-container');

document.addEventListener('mousemove', (e) => {
  const rect = characterContainer.getBoundingClientRect();
  const eyeCenterX = rect.left + rect.width / 2;
  const eyeCenterY = rect.top + rect.height / 2;
  const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
  const eyeMovement = rect.width * 0.02; // Adjust for how far the eyes move

  leftEye.style.transform = `translate(${Math.cos(angle) * eyeMovement}px, ${Math.sin(angle) * eyeMovement}px)`;
  rightEye.style.transform = `translate(${Math.cos(angle) * eyeMovement}px, ${Math.sin(angle) * eyeMovement}px)`;
});

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  const projectsGrid = document.querySelector('.projects-grid');
  const leftArrow = document.querySelector('.slider-arrow.left');
  const rightArrow = document.querySelector('.slider-arrow.right');
  let autoScrollInterval;
  const scrollAmount = 300;
  const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      projectsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      if (projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth - 10) {
        setTimeout(() => {
          projectsGrid.scrollTo({ left: 0, behavior: 'smooth' });
        }, 500);
      }
    }, 3000);
  };

  const stopAutoScroll = () => clearInterval(autoScrollInterval);

  sliderContainer.addEventListener('mouseenter', stopAutoScroll);
  sliderContainer.addEventListener('mouseleave', startAutoScroll);
  startAutoScroll();

  const handleScroll = (direction) => {
    projectsGrid.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    setTimeout(() => {
      if (projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth - 10) {
        projectsGrid.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 500);
  };

  leftArrow.addEventListener('click', () => handleScroll(-1));
  rightArrow.addEventListener('click', () => handleScroll(1));

  // Intersection Observer for Entry Animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.project').forEach((project) => observer.observe(project));
});



document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[class*="slide"]:not(.hero)');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Refined skill data with descriptions and projects
const skillDetails = {
  python: {
    name: "Python",
    description:
      "I have honed my expertise in Python by developing AI-powered applications and data analysis tools. These projects allowed me to explore the language’s versatility, significantly enhancing my problem-solving skills.",
    projects: [
      "AI-Powered Expense Tracker – Implemented machine learning techniques for expense categorization and analysis.",
      "NLP-Powered College Chatbot – Built an intelligent chatbot using NLP for retrieving college-related information.",
      "Image Recognition using Inception & Xception on CIFAR-10 – Developed a deep learning model for image classification."
    ]
  },
  c: {
    name: "C",
    description:
      "I built a strong foundation in C during college, where I learned essential system-level programming techniques. This academic experience has given me a deep understanding of low-level operations and performance optimization.",
    projects: [] 
  },
  cpp: {
    name: "C++",
    description:
      "By applying C++ in performance-critical projects, I’ve gained practical experience in writing efficient code. My work in C++ has helped me to understand data structures and algorithms to create robust software solutions.",
    projects: []
  },
  mysql: {
    name: "MySQL",
    description:
      "I have acquired theoretical and lab knowledge of MySQL, covering relational database concepts, querying, and optimization techniques. This understanding enables me to design structured databases and perform efficient data retrieval operations.",
    projects: []
  },
  mongodb: {
    name: "MongoDB",
    description:
      "I have utilized MongoDB in various full-stack projects, gaining hands-on experience in handling flexible, scalable data storage. This experience has enhanced my ability to manage dynamic datasets efficiently.",
    projects: []
  },
  aiml: {
    name: "AI & ML",
    description:
      "My journey in AI & ML includes hands-on projects such as developing image recognition systems and predictive models. These projects have allowed me to apply cutting-edge algorithms and gain practical insights into intelligent system design.",
    projects: [
      "Image Recognition using Inception & Xception on CIFAR-10 – Built deep learning models for accurate image classification.",
      "Image Recognition using CNN on CIFAR-10 – Implemented a convolutional neural network for image classification.",
      "AI-Powered Expense Tracker – Integrated ML-based insights for financial tracking.",
      "NLP-Powered College Chatbot – Used NLP models for intelligent chatbot responses."
    ]
  },
  aws: {
    name: "AWS",
    description:
      "I have deployed cloud-based solutions using AWS, ensuring scalability and security for various projects. This experience has enabled me to manage and optimize cloud infrastructures effectively, supporting robust application development.",
    projects: [
      "NLP-Powered College Chatbot – Deployed on AWS EC2 for scalable hosting."
    ]
  }
  ,
  git: {
    name: "Git (Version Control)",
    description:
      "I use Git for version control to efficiently manage code changes, collaborate with teams, and maintain project history. My experience includes branching, merging, and resolving conflicts in both solo and group projects.",
    projects: [
      "Portfolio Website – Managed all code changes and feature additions using Git.",
      "AI-Powered Expense Tracker – Collaborated with team members using Git for version control.",
      "NLP-Powered College Chatbot – Utilized Git for source management and deployment workflows."
    ]
  }
};

// Select elements from your HTML
const logos = document.querySelectorAll('.skill-logo');
const skillName = document.getElementById('skill-name');
const skillDescription = document.getElementById('skill-description');
const skillProjects = document.getElementById('skill-projects');

// Typing effect helper functions
function clearTypingTimeouts(element) {
  if (element.typingTimeouts) {
    element.typingTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
  }
  element.typingTimeouts = [];
}

function scheduleTypingTimeout(element, fn, delay) {
  const id = setTimeout(fn, delay);
  element.typingTimeouts.push(id);
}

function typeText(element, text, speed = 50) {
  clearTypingTimeouts(element);
  
  let eraseIndex = element.textContent.length;

  function erase() {
    if (eraseIndex > 0) {
      element.textContent = element.textContent.substring(0, --eraseIndex);
      scheduleTypingTimeout(element, erase, speed / 2);
    } else {
      type();
    }
  }

  let typeIndex = 0;
  function type() {
    if (typeIndex < text.length) {
      element.textContent += text.charAt(typeIndex++);
      scheduleTypingTimeout(element, type, speed);
    }
  }
  erase();
}

// Update details with slide-out/in and typing effect
function updateDetails(skill) {
  const details = skillDetails[skill];
  if (!details) return;

  // Slide out current description and project list
  skillDescription.classList.remove('slide-in');
  skillProjects.classList.remove('slide-in');
  skillDescription.classList.add('slide-out');
  skillProjects.classList.add('slide-out');

  // After slide-out, update content and apply slide-in effect
  setTimeout(() => {
    skillDescription.textContent = details.description;
    if (details.projects && details.projects.length > 0) {
      skillProjects.innerHTML = "<strong>Projects:</strong><br>" + details.projects.join("<br>");
    } else {
      skillProjects.textContent = "";
    }
    skillDescription.classList.remove('slide-out');
    skillProjects.classList.remove('slide-out');
    skillDescription.classList.add('slide-in');
    skillProjects.classList.add('slide-in');
  }, 300); // Adjust this timeout to match your CSS animation duration

  // Update the heading with a typing effect
  typeText(skillName, details.name, 50);
}

// Add hover event listeners to skill logos
logos.forEach(logo => {
  logo.addEventListener('mouseover', () => {
    updateDetails(logo.dataset.skill);
  });
});
