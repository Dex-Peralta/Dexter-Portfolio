import wattWiseImage from '../assets/WattWise.png'
import sasSboImage from '../assets/SAS-SBO.png'
import ifindImage from '../assets/ifind.jpeg'
import eduProfileImage from '../assets/EduProfile.jpeg'

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
]

export default projects
