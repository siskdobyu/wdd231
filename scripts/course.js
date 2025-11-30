const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const coursesListContainer = document.querySelector('#courses-list');
const courseCountElement = document.querySelector('#course-count');
const courseSummaryElement = document.querySelector('.course-summary'); // Select the whole summary paragraph

// --- 1. Modify displayCourses to handle the course count visibility ---
function displayCourses(courseList) {
    coursesListContainer.innerHTML = ''; // Clear previous content

    // Show the summary paragraph (and count) when courses are displayed
    courseSummaryElement.style.display = 'block';

    courseList.forEach(course => {
        // ... (Course card creation logic remains the same) ...
        const courseButton = document.createElement('button');
        courseButton.textContent = `${course.subject} ${course.number} ${course.title}`;
        const completionClass = course.completed ? 'completed-course' : 'uncompleted-course';
        courseButton.classList.add(completionClass);

        if (course.completed) {
            courseButton.innerHTML = `<span class="checkmark">✅</span> ${courseButton.textContent}`;
        }
        coursesListContainer.appendChild(courseButton);
    });

    calculateCredits(courseList);
}


function calculateCredits(courseList) {
    // ... (reduce function remains the same) ...
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

    if (courseCountElement) {
        courseCountElement.textContent = totalCredits;
    }
}


function filterCourses(subject) {
    let filteredList = [];

    if (subject === 'All') {
        filteredList = courses;
    } else {
        filteredList = courses.filter(course => course.subject === subject);
    }

    displayCourses(filteredList);
}


// --- 2. Remove the initial call to displayCourses(courses) here ---

// --- 3. Initial Setup on Page Load ---
// Hide the course list and summary paragraph on initial load
coursesListContainer.innerHTML = '';
if (courseSummaryElement) {
    courseSummaryElement.style.display = 'none';
}


// --- 4. Event Listeners (Call display/filter only on click) ---
document.querySelector('#all-courses').addEventListener('click', () => {
    filterCourses('All');
});

document.querySelector('#wdd-courses').addEventListener('click', () => {
    filterCourses('WDD');
});

document.querySelector('#cse-courses').addEventListener('click', () => {
    filterCourses('CSE');
});

function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
    courseDetails.showModal();

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

courseDiv.addEventListener('click', () => {
    displayCourseDetails(course);
});