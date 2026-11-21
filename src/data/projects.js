import wattWiseImage from '../assets/WattWise.png'
import sasSboImage from '../assets/SAS-SBO.png'
import ifindImage from '../assets/ifind.jpeg'
import eduProfileImage from '../assets/EduProfile.jpeg'
import targaryenQuestImage from '../assets/House-of-the-Dragon-Targaryen-Quest.jpeg'

const projects = [
  {
    number: '01',
    name: 'WattWise',
    image: wattWiseImage,
    imagePosition: 'center top',
    title: 'Smart Energy Monitoring and Remote-Control System',
    description:
      'Monitors household energy use and supports remote appliance control through a connected dashboard.',
    contribution:
      'I helped develop the WattWise web application for monitoring energy usage and remotely controlling appliances. I wrote firmware for the ESP32 and helped build the physical IoT prototype. I also co-wrote the capstone paper, documenting how our team designed, built, and tested the system.',
    category: 'IoT & Energy',
    technologies: ['Laravel', 'Vue.js', 'Firebase', 'ESP32', 'PZEM-004T'],
  },
  {
    number: '02',
    name: 'iFind',
    image: ifindImage,
    title: 'Lost and Found Management System',
    description:
      'A lost-and-found platform for the College of Technologies Student Body Organization.',
    contribution:
      'I served as Programmer 1 for iFind, a lost-and-found platform for our college’s Student Body Organization. I helped identify the features the system needed, tested all system functions, and debugged issues our team encountered during development and testing.',
    category: 'Web Application',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    number: '03',
    name: 'EduProfile',
    image: eduProfileImage,
    title: 'School Profiling and Student Status Monitoring SaaS',
    description:
      'A multi-tenant system for managing student records, academic status, and intervention documents.',
    contribution:
      'I helped design and build EduProfile’s user interface and contributed to developing the system’s features for managing student records, tracking academic status, and organizing intervention documents.',
    category: 'Education SaaS',
    technologies: ['Laravel', 'PHP', 'Multi-tenant architecture'],
  },
  {
    number: '04',
    name: 'SAS-SBO',
    image: sasSboImage,
    title: 'Student Body Organization Attendance System',
    description:
      'An Android attendance application that uses scanning for student verification and Firebase for attendance records.',
    contribution:
      'I helped build the user interface and develop features for the SAS-SBO Android app. I also tested all app functions, with particular attention to how the app verified students by scanning their QR codes.',
    category: 'Android Application',
    technologies: ['Android', 'Firebase', 'Cloud Firestore', 'CameraX', 'Google ML Kit'],
  },
  {
    number: '05',
    name: 'House of the Dragon: Targaryen Quest',
    image: targaryenQuestImage,
    imagePosition: 'center',
    title: 'A 2D Platformer Game / Desktop Application',
    description:
      'A Java-based 2D side-scrolling platformer featuring character combat, animated enemies, interactive levels, and boss battles.',
    contribution:
      'Exact individual responsibilities for this group project have not been provided. Add Dexter Ian E. Peralta’s specific responsibilities here when available.',
    category: 'Game Development / Java',
    technologies: ['Java', 'Object-Oriented Programming (OOP)', 'Data Structures and Algorithms (DSA)', 'Eclipse IDE', '2D Game Development'],
    year: '2024',
    course: 'IT123 — Object-Oriented Programming',
    developmentType: 'Collaborative Academic Project',
    overview:
      'A 2D platformer inspired by medieval fantasy settings, created as an academic project to demonstrate Java programming and Object-Oriented Programming principles.',
    objective:
      'Apply classroom knowledge of OOP, data structures, algorithms, and software development to create an interactive game with working gameplay mechanics.',
    features: [
      '2D Side-Scrolling Gameplay',
      'Character Movement and Combat',
      'Enemy AI and Boss Battles',
      'Collision Detection',
      'Level Management',
      'Sprite Animation',
      'Game State Management',
      'Sound and Game Settings',
    ],
    challenges: [
      'Character sprite integration',
      'Animation consistency',
      'Collision detection',
      'Enemy interactions',
      'Level progression',
      'Debugging gameplay mechanics',
    ],
    lessons: [
      'Applying object-oriented design to practical software development',
      'Organizing code into reusable classes',
      'Implementing gameplay mechanics',
      'Debugging and iterative testing',
      'Collaborating with a development team',
    ],
    team: [
      'Dexter Ian E. Peralta',
      'Angelie Marie B. Dinawanao',
      'Joanna Nicole P. Yroy',
    ],
    gallery: [
      {
        src: targaryenQuestImage,
        alt: 'House of the Dragon: Targaryen Quest main menu title screen',
        label: 'Main Menu / Title Screen',
      },
    ],
  },
]

export default projects
