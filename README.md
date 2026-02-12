# Task Manager

A Progressive Web App (PWA) for organizing daily tasks across work, personal, and house categories with calendar-based task management.

## Features

- Three task categories: Work, Personal, and House
- Weekly calendar view with date selection
- Task completion tracking with visual feedback
- Delete tasks with instant removal
- Data persistence using localStorage
- Installable as a Progressive Web App
- Fully responsive design for mobile, tablet, and desktop
- Offline functionality
- Custom category dropdown selector
- Motivational welcome screen with daily quotes

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/BoluwatifeOyebajo/TaskManager
cd task-manager
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open http://localhost:3000 in your browser

## Available Scripts

### `npm start`

Runs the app in development mode. Open http://localhost:3000 to view it in your browser. The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

### `npm test`

Launches the test runner in interactive watch mode.

### `npx serve -s build`

Serves the production build locally for testing PWA features.

## Technology Stack

### Core Technologies

- **React 18**: Component-based UI framework chosen for its declarative approach and efficient rendering
- **JavaScript (ES6+)**: Modern JavaScript features for cleaner, more maintainable code
- **CSS3**: Custom styling with responsive design and smooth animations

### Key Design Decisions

- **localStorage**: Selected for client-side data persistence without requiring a backend server. Provides instant data access and offline functionality.

- **Progressive Web App (PWA)**: Implemented to enable:
  - Offline functionality via Service Workers
  - Home screen installation on mobile devices
  - Native app-like experience
  - Fast load times through caching

- **Component Architecture**: Modular component structure for:
  - Reusability (Work, Personal, House components share similar structure)
  - Maintainability (separate concerns for calendar, forms, task lists)
  - Scalability (easy to add new categories or features)

- **Custom Dropdown Component**: Built instead of using native select element to:
  - Match design system perfectly
  - Provide consistent cross-browser styling
  - Enable custom animations and interactions

- **Date-based Task Organization**: Tasks are tied to specific dates allowing users to plan ahead and review past tasks while maintaining focus on the current day.

## Known Issues

- Calendar only displays the current week. Navigation to previous/future weeks is not yet implemented.
- Tasks cannot be edited after creation - only completion status and deletion are supported.
- No task priority or due time features.
- Limited to three predefined categories (Work, Personal, House).
- No data sync across devices - localStorage is device-specific.

## Future Improvements

### High Priority

- Add previous/next week navigation to calendar
- Implement task editing functionality
- Add task search and filter capabilities
- Enable task reordering via drag and drop

### Medium Priority

- Add task priority levels (high, medium, low)
- Implement task due times and reminders
- Create task statistics and completion tracking
- Add dark mode support
- Enable custom category creation

### Low Priority

- Cloud sync for cross-device access
- Task sharing and collaboration features
- Recurring task support
- Export tasks to calendar apps
- Integration with third-party services

## Browser Support

- Chrome/Edge (recommended for PWA features)
- Firefox
- Safari (iOS 11.3+)
- Opera

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

boluwatife.oyebajo.o@gmail.com

Project Link: https://github.com/BoluwatifeOyebajo/TaskManager
