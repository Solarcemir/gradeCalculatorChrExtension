# Grade Calculator - Chrome Extension

A powerful and intuitive Chrome extension that helps students calculate and manage their course grades with visual feedback and theme customization.

## 📋 Overview

Grade Calculator is a Chrome extension designed to help students track their academic performance across multiple courses. It features automatic grade calculations, visual progress tracking with a pie chart, and entertaining feedback through Mr. Incredible meme reactions based on your current grades.

## ✨ Features

- **Multi-Course Management**: Add and manage multiple courses with custom weights
- **Dynamic Grade Calculation**: Automatically calculates your current grade as you input assessment scores
- **Visual Course Weight Chart**: Pie chart visualization showing the distribution of your course weights
- **Final Exam Calculator**: Shows what grade you need on the final exam to achieve specific target grades (50%, 60%, 70%, 80%, 90%, 100%)
- **Progress Tracking**: Track individual course items (assignments, tests, projects) with their respective weights
- **Mr. Incredible Meme Feedback**: Visual feedback based on your current grade:
  - 90%+ : Super mode 🦸
  - 70-89%: Normal mode 😊
  - 60-69%: Confused mode 🤔
  - 50-59%: Uncanny mode 😰
  - Below 50%: GG mode 😱
- **Theme Toggle**: Switch between dark and light modes for comfortable viewing
- **Persistent Storage**: All your data is saved locally and persists between sessions
- **Privacy-Focused**: No data collection - everything stays on your device

## 🚀 Installation

### From Source (Developer Mode)

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/Solarcemir/gradeCalculatorChrExtension.git
   ```
   Or download the ZIP file and extract it.

2. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to the folder containing the extension files
   - Select the folder and click "Select Folder"

5. **Pin the Extension**
   - Click the Extensions icon (puzzle piece) in Chrome toolbar
   - Find "Grade Calculator" and click the pin icon

## 📖 How to Use

### Adding a Course

1. Click the Grade Calculator icon in your Chrome toolbar
2. Enter a course name in the "Course" field
3. Set the course weight (e.g., 0.5 for a course worth 50% of your total grade)
4. Click "+ Add Course"

### Adding Course Items

1. Select a course from "My Courses" list
2. Click "+ Add Item" button
3. Fill in the following fields:
   - **Course Item**: Name of the assessment (e.g., "Midterm", "Assignment 1")
   - **Worth %**: Weight of this item in the course (e.g., 30 for 30%)
   - **Your Mark %**: Your grade on this item (e.g., 85 for 85%)
4. The extension automatically calculates:
   - **% of Course Mark**: Contribution to your overall course grade
   - **Current Mark**: Your current grade in the course
   - **Final Exam Worth**: Remaining weight available for final exam
   - **Required Marks**: What you need on the final to achieve target grades

### Managing Courses

- **Switch Between Courses**: Click on any course name in the "My Courses" list
- **Remove a Course**: Scroll down and click "× Remove Course"
- **Switch Theme**: Click "× Switch Lighting" to toggle between dark and light modes

### Understanding the Display

- **Course Weights Chart**: Shows the relative weight distribution of all your courses
- **Current Mark**: Your current grade based on completed assessments
- **Final Exam Worth**: Percentage of the course grade still available (100% minus completed assessments)
- **Required % on the final**: Shows what grade you need on the final exam to achieve specific overall grades

## 🛠️ Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Styling with custom dark/light themes
- **JavaScript (ES6+)**: Core functionality and calculations
- **Chart.js**: Pie chart visualization for course weights
- **Chrome Extension API**: Storage and browser integration
- **Google Fonts**: Inter font family for modern typography

## 📁 Project Structure

```
gradeCalculatorChrExtension/
├── manifest.json          # Chrome extension configuration
├── index.html            # Main popup interface
├── script.js             # Core functionality and calculations
├── style.css             # Styling and themes
├── chart.js              # Chart.js library for visualizations
├── privacy policy.html   # Privacy policy document
├── icon16.png           # Extension icon (16x16)
├── icon48.png           # Extension icon (48x48)
├── icon128.png          # Extension icon (128x128)
├── super.jpg            # Meme image for 90%+ grades
├── normal.jpg           # Meme image for 70-89% grades
├── confused.jpg         # Meme image for 60-69% grades
├── uncanny.jpg          # Meme image for 50-59% grades
└── gg.jpg               # Meme image for below 50% grades
```

## 🔒 Privacy

This extension respects your privacy:
- **No data collection**: We don't collect, store, or transmit any personal data
- **Local storage only**: All data is stored locally on your device using Chrome's storage API
- **No third-party services**: No external services or analytics
- **No tracking**: Your grades and course information stay private

For more details, see the [Privacy Policy](privacy%20policy.html).

## 💡 Tips

- **Keep weights accurate**: Make sure your course item weights add up correctly
- **Regular updates**: Update your grades as you receive them for the most accurate calculations
- **Use the final exam calculator**: Plan ahead by seeing what you need on finals
- **Multiple courses**: Manage all your courses in one place for a complete academic overview
- **Theme preference**: Switch themes to match your environment (light/dark mode)

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the Grade Calculator:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📝 License

This project is available for personal and educational use.

## 📧 Contact

For questions, feedback, or support, please contact:
- **Email**: lhoifan@uoguelph.ca
- **GitHub**: [Solarcemir](https://github.com/Solarcemir)

## 🙏 Acknowledgments

- Chart.js library for beautiful chart visualizations
- Google Fonts for the Inter font family
- The Mr. Incredible meme for grade motivation 😄

---

**Note**: This extension is designed for Chrome browser and uses Manifest V3. Make sure you're running a recent version of Chrome for the best experience.
