let courses = [];
let activeCourseId = null;
let courseWeightsChart = null;

// Save courses to chrome.storage.local
function saveCourses() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ 'courses': courses }, function() {
      console.log('Courses saved:', courses);
    });
  } else {
    localStorage.setItem('courses', JSON.stringify(courses));
    console.log('Courses saved to localStorage:', courses);
  }
}

// Load courses from chrome.storage.local
function loadCourses() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['courses'], function(result) {
      if (result.courses) {
        courses = result.courses;
        courses.forEach(course => {
          const courseLink = document.createElement('div');
          courseLink.className = 'course-link';
          courseLink.textContent = course.name;
          courseLink.dataset.courseId = course.id;
          courseLink.addEventListener('click', () => showCourse(course.id));
          document.getElementById('courses-list').prepend(courseLink);

          createCourseContent(course);
          if (course.items && course.items.length > 0) {
            const itemsContainer = document.getElementById(`items-${course.id}`);
            course.items.forEach(item => {
              const newItem = document.createElement('div');
              newItem.className = 'course-item';
              newItem.innerHTML = `
                <input type="text" name="item" value="${item.name || ''}" required>
                <input type="number" name="worth" value="${item.worth || 0}" required>
                <input type="number" name="grade" value="${item.grade || 0}" required>
                <input type="number" name="percent" value="${item.percent || 0}" readonly>
              `;
              itemsContainer.appendChild(newItem);
              attachListenersToItem(newItem, course.id);
            });
            calculateCourseMark(course.id); // Recalculate on load
          }
        });

        if (courses.length > 0) {
          showCourse(courses[0].id);
          if (courses.length === 1) {
            const extraContent = document.createElement('div');
            extraContent.className = 'extra-content';
            extraContent.innerHTML = `
              <h3>Grade Status</h3>
              <img src="normal.jpg" alt="Mr. Incredible Meme">
            `;
            document.querySelector('.main-container').appendChild(extraContent);
            console.log('Initial extra content created');
          }
          updateChart();
        }
      }
    });
  } else {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      courses = JSON.parse(savedCourses);
      courses.forEach(course => {
        const courseLink = document.createElement('div');
        courseLink.className = 'course-link';
        courseLink.textContent = course.name;
        courseLink.dataset.courseId = course.id;
        courseLink.addEventListener('click', () => showCourse(course.id));
        document.getElementById('courses-list').prepend(courseLink);

        createCourseContent(course);
        if (course.items && course.items.length > 0) {
          const itemsContainer = document.getElementById(`items-${course.id}`);
          course.items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'course-item';
            newItem.innerHTML = `
              <input type="text" name="item" value="${item.name || ''}" required>
              <input type="number" name="worth" value="${item.worth || 0}" required>
              <input type="number" name="grade" value="${item.grade || 0}" required>
              <input type="number" name="percent" value="${item.percent || 0}" readonly>
            `;
            itemsContainer.appendChild(newItem);
            attachListenersToItem(newItem, course.id);
          });
          calculateCourseMark(course.id); // Recalculate on load
        }
      });

      if (courses.length > 0) {
        showCourse(courses[0].id);
        if (courses.length === 1) {
          const extraContent = document.createElement('div');
          extraContent.className = 'extra-content';
          extraContent.innerHTML = `
            <h3>Grade Status</h3>
            <img src="normal.jpg" alt="Mr. Incredible Meme">
          `;
          document.querySelector('.main-container').appendChild(extraContent);
          console.log('Initial extra content created');
        }
        updateChart();
      }
    }
  }
}

// Initialize the pie chart
function initializeChart() {
  const ctx = document.getElementById('course-weights-chart').getContext('2d');
  if (!ctx) {
    console.error('Canvas context not found for course-weights-chart');
    return;
  }
  courseWeightsChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [
          '#8e5be2', '#a375e7', '#ff73fa', '#6200ff', '#9b59b6', '#d7bde2'
        ],
        borderColor: '#40444b',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#ffffff', font: { size: 10, family: 'Inter', weight: '600' } }
        },
        title: {
          display: true,
          text: 'Course Weights',
          color: '#ffffff',
          font: { size: 12, family: 'Inter', weight: '700' }
        }
      }
    }
  });
  console.log('Chart initialized');
}

// Update the pie chart with current course weights
function updateChart() {
  if (!courseWeightsChart) {
    console.error('Chart not initialized');
    return;
  }
  const labels = courses.map(course => course.name);
  const weights = courses.map(course => course.weight);
  courseWeightsChart.data.labels = labels;
  courseWeightsChart.data.datasets[0].data = weights;
  courseWeightsChart.update();
  console.log('Chart updated with labels:', labels, 'weights:', weights);
}

// Function to get the appropriate Mr. Incredible image based on current grade
function getMrIncredibleImage(currentGrade) {
  if (currentGrade >= 90) return 'super.jpg';
  if (currentGrade >= 70) return 'normal.jpg';
  if (currentGrade >= 60) return 'confused.jpg';
  if (currentGrade >= 50) return 'uncanny.jpg';
  return 'gg.jpg';
}

// Update the extra content with the Mr. Incredible image
function updateExtraContent(currentGrade) {
  const extraContent = document.querySelector('.extra-content');
  if (extraContent) {
    const imageSrc = getMrIncredibleImage(currentGrade);
    extraContent.innerHTML = `<h3>Grade Status</h3><img src="${imageSrc}" alt="Mr. Incredible Meme">`;
    console.log('Extra content updated with image:', imageSrc);
  } else {
    console.error('Extra content element not found');
  }
}

// Toggle theme mode
function toggleTheme() {
  const body = document.body;
  const isLightMode = body.classList.contains('light-mode');
  body.classList.toggle('light-mode', !isLightMode);
  document.querySelectorAll('.modes-btn').forEach(btn => btn.classList.toggle('light-mode', !isLightMode));
  if (courseWeightsChart) {
    courseWeightsChart.options.plugins.legend.labels.color = isLightMode ? '#333333' : '#ffffff';
    courseWeightsChart.options.plugins.title.color = isLightMode ? '#333333' : '#ffffff';
    courseWeightsChart.update();
  }
}

// Initialize chart and load courses on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeChart();
  loadCourses();
});

document.getElementById('add-course-btn').addEventListener('click', () => {
  const courseName = document.getElementById('course').value.trim();
  const courseWeight = parseFloat(document.getElementById('weight').value) || 0;
  if (!courseName || courseWeight <= 0) {
    alert("Please enter a valid course name and weight.");
    return;
  }
  const courseId = `course-${Date.now()}`;
  const course = { id: courseId, name: courseName, weight: courseWeight, items: [] };
  courses.push(course);
  const courseLink = document.createElement('div');
  courseLink.className = 'course-link';
  courseLink.textContent = courseName;
  courseLink.dataset.courseId = courseId;
  courseLink.addEventListener('click', () => showCourse(courseId));
  document.getElementById('courses-list').prepend(courseLink);
  createCourseContent(course);
  showCourse(courseId);
  updateChart();
  if (courses.length === 1) {
    const extraContent = document.createElement('div');
    extraContent.className = 'extra-content';
    extraContent.innerHTML = `<h3>Grade Status</h3><img src="normal.jpg" alt="Mr. Incredible Meme">`;
    document.querySelector('.main-container').appendChild(extraContent);
    console.log('Initial extra content created');
  }
  document.getElementById('course').value = '';
  document.getElementById('weight').value = '0.5';
  saveCourses();
});

function createCourseContent(course) {
  const courseContent = document.createElement('div');
  courseContent.id = course.id;
  courseContent.className = 'course-section';
  courseContent.innerHTML = `
    <h2>${course.name} (Weight: ${course.weight})</h2>
    <div class="main-info">
      <h3>Course Item</h3><h3>Worth %</h3><h3>Your Mark %</h3><h3>% of Course Mark</h3>
    </div>
    <div class="course-items-container" id="items-${course.id}"></div>
    <button type="button" class="add-item-btn">+ Add Item</button>
    <div class="calculations">
      <h3>Current Mark</h3><h3>Worth %</h3><h3>Your Mark %</h3><h3>% of Course Mark</h3>
    </div>
    <div class="calculation-values">
      <div id="current-mark-${course.id}" class="current-mark">0%</div>
      <div class="value-box" id="value-worth-${course.id}">0%</div>
      <div class="value-box" id="value-mark-${course.id}">0%</div>
      <div class="value-box" id="value-course-mark-${course.id}">0%</div>
    </div>
    <div class="final-grade"><h3>Final Exam Worth:</h3><div id="final-worth-${course.id}">0%</div></div>
    <h3>required % on the final</h3>
    <div class="final-calculations">
      <div><h3>to finish with a 50%</h3><div id="goal-50-${course.id}">0%</div></div>
      <div><h3>to finish with a 60%</h3><div id="goal-60-${course.id}">0%</div></div>
      <div><h3>to finish with a 70%</h3><div id="goal-70-${course.id}">0%</div></div>
      <div><h3>to finish with a 80%</h3><div id="goal-80-${course.id}">0%</div></div>
      <div><h3>to finish with a 90%</h3><div id="goal-90-${course.id}">0%</div></div>
      <div><h3>to finish with a 100%</h3><div id="goal-100-${course.id}">0%</div></div>
    </div>
    <button type="button" class="remove-course-btn">× Remove Course</button>
    <button type="button" class="modes-btn">× Switch Lighting</button>
  `;
  document.getElementById('course-content').appendChild(courseContent);

  const addItemBtn = courseContent.querySelector('.add-item-btn');
  const itemsContainer = courseContent.querySelector('.course-items-container');
  addItemBtn.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.className = 'course-item';
    newItem.innerHTML = `
      <input type="text" name="item" placeholder="Item name" required>
      <input type="number" name="worth" placeholder="%" min="0" max="100" required>
      <input type="number" name="grade" placeholder="%" min="0" max="100" required>
      <input type="number" name="percent" placeholder="%" readonly>
    `;
    itemsContainer.appendChild(newItem);
    attachListenersToItem(newItem, course.id);
    const courseObj = courses.find(c => c.id === course.id);
    if (courseObj) {
      courseObj.items.push({ name: '', worth: 0, grade: 0, percent: 0 });
      saveCourses();
    }
  });
  addItemBtn.click();

  const removeBtn = courseContent.querySelector('.remove-course-btn');
  removeBtn.addEventListener('click', () => {
    removeCourse(course.id);
    saveCourses();
  });

  const modeBtn = courseContent.querySelector('.modes-btn');
  modeBtn.addEventListener('click', toggleTheme);
}

function showCourse(courseId) {
  document.querySelectorAll('.course-section').forEach(section => section.classList.remove('active'));
  const courseSection = document.getElementById(courseId);
  if (courseSection) {
    courseSection.classList.add('active');
    activeCourseId = courseId;
    const currentMarkElement = document.getElementById(`current-mark-${activeCourseId}`);
    if (currentMarkElement) {
      const currentGrade = parseFloat(currentMarkElement.textContent.replace('%', '')) || 0;
      updateExtraContent(currentGrade);
    } else {
      console.error(`Current mark element not found for course ${courseId}`);
    }
  } else {
    console.error(`Course section not found for ID ${courseId}`);
  }
}

function removeCourse(courseId) {
  courses = courses.filter(course => course.id !== courseId);
  const courseLink = document.querySelector(`.course-link[data-course-id="${courseId}"]`);
  if (courseLink) courseLink.remove();
  const courseContent = document.getElementById(courseId);
  if (courseContent) courseContent.remove();
  if (activeCourseId === courseId) {
    activeCourseId = null;
    if (courses.length > 0) showCourse(courses[0].id);
    else document.querySelector('.extra-content')?.remove();
  }
  updateChart();
  saveCourses();
}

function calculateCourseMark(courseId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    console.error(`Course with ID ${courseId} not found`);
    return;
  }

  let totalWorth = 0;
  let totalWeightedMark = 0;
  const items = document.querySelectorAll(`#items-${courseId} .course-item`);
  course.items = []; // Sync with DOM

  items.forEach((item, index) => {
    const nameInput = item.querySelector('input[name="item"]');
    const worthInput = item.querySelector('input[name="worth"]');
    const gradeInput = item.querySelector('input[name="grade"]');
    const percentInput = item.querySelector('input[name="percent"]');

    if (!nameInput || !worthInput || !gradeInput || !percentInput) {
      console.error('Missing input fields in item:', item);
      return;
    }

    const name = nameInput.value.trim();
    const worth = parseFloat(worthInput.value) || 0;
    const grade = parseFloat(gradeInput.value) || 0;
    const percentOfCourse = worth > 0 ? (worth * grade) / 100 : 0;

    percentInput.value = isNaN(percentOfCourse) ? '0' : percentOfCourse.toFixed(1);
    totalWorth += worth;
    totalWeightedMark += percentOfCourse;

    course.items[index] = { name, worth, grade, percent: percentOfCourse };
    console.log(`Item ${index}: Worth=${worth}, Grade=${grade}, Percent=${percentOfCourse}`);
  });

  const currentMark = totalWorth > 0 ? (totalWeightedMark / totalWorth * 100).toFixed(1) : '0';
  const elements = {
    valueWorth: document.getElementById(`value-worth-${courseId}`),
    valueMark: document.getElementById(`value-mark-${courseId}`),
    valueCourseMark: document.getElementById(`value-course-mark-${courseId}`),
    currentMark: document.getElementById(`current-mark-${courseId}`)
  };

  for (let id in elements) {
    if (!elements[id]) {
      console.error(`${id} element not found for course ${courseId}`);
      return;
    }
  }

  elements.valueWorth.textContent = totalWorth.toFixed(1) + '%';
  elements.valueMark.textContent = totalWorth > 0 ? (totalWeightedMark / totalWorth * 100).toFixed(1) + '%' : '0%';
  elements.valueCourseMark.textContent = totalWeightedMark.toFixed(1) + '%';
  elements.currentMark.textContent = currentMark + '%';
  console.log(`Course ${courseId}: Total Worth=${totalWorth}, Total Weighted=${totalWeightedMark}, Current Mark=${currentMark}`);

  if (courseId === activeCourseId) updateExtraContent(parseFloat(currentMark) || 0);
  updateFinalWorth(courseId);
  updateRequiredMarks(courseId);
  saveCourses();
}

function attachListenersToItem(item, courseId) {
  const worthInput = item.querySelector('input[name="worth"]');
  const gradeInput = item.querySelector('input[name="grade"]');
  const nameInput = item.querySelector('input[name="item"]');

  if (!worthInput || !gradeInput || !nameInput) {
    console.error('One or more inputs not found in item:', item);
    return;
  }

  [worthInput, gradeInput].forEach(input => {
    input.addEventListener('input', () => {
      console.log(`Input changed for ${input.name} in course ${courseId}: ${input.value}`);
      calculateCourseMark(courseId);
    });
  });

  nameInput.addEventListener('input', () => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const index = Array.from(item.parentNode.children).indexOf(item);
      if (course.items[index]) {
        course.items[index].name = nameInput.value;
        saveCourses();
      }
    }
  });
}

function updateFinalWorth(courseId) {
  let totalWorth = 0;
  const items = document.querySelectorAll(`#items-${courseId} .course-item`);
  items.forEach(item => {
    const worth = parseFloat(item.querySelector('input[name="worth"]').value) || 0;
    totalWorth += worth;
  });
  const finalWorth = Math.max(0, 100 - totalWorth);
  const finalWorthElement = document.getElementById(`final-worth-${courseId}`);
  if (finalWorthElement) {
    finalWorthElement.textContent = `${finalWorth}%`;
    console.log(`Course ${courseId} - Final Worth: ${finalWorth}%`);
  } else {
    console.error(`Final worth element not found for course ${courseId}`);
  }
}

function updateRequiredMarks(courseId) {
  const finalWorthElement = document.getElementById(`final-worth-${courseId}`);
  const currentMarkElement = document.getElementById(`current-mark-${courseId}`);

  if (!finalWorthElement || !currentMarkElement) {
    console.error(`Required marks elements not found for course ${courseId}`);
    return;
  }

  const finalWorthText = finalWorthElement.textContent.replace('%', '');
  const finalWorth = parseFloat(finalWorthText) / 100;
  const currentText = currentMarkElement.textContent.replace('%', '');
  const currentMark = parseFloat(currentText) || 0;

  if (isNaN(finalWorth) || finalWorth <= 0) {
    console.log(`Invalid final worth for course ${courseId}: ${finalWorthText}`);
    return;
  }

  [50, 60, 70, 80, 90, 100].forEach(grade => {
    const requiredMark = finalWorth > 0 ? ((grade - (currentMark * (1 - finalWorth))) / finalWorth).toFixed(1) : 'N/A';
    const goalElement = document.getElementById(`goal-${grade}-${courseId}`);
    if (goalElement) {
      goalElement.textContent = requiredMark !== 'N/A' ? `${requiredMark}%` : 'N/A';
      console.log(`Course ${courseId} - Required for ${grade}%: ${requiredMark}%`);
    } else {
      console.error(`Goal element for ${grade}% not found for course ${courseId}`);
    }
  });
}