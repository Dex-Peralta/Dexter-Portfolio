import {
  SiAndroid,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiPhp,
  SiReact,
  SiVuedotjs,
} from 'react-icons/si'
import { FaCamera, FaCss3Alt, FaDatabase, FaMicrochip } from 'react-icons/fa'
import { MdDevices } from 'react-icons/md'
import BlurText from './BlurText.jsx'

function Icon({ icon: IconComponent, color, label }) {
  return (
    <span className="skill-badge-icon" style={{ color }} aria-hidden="true">
      <IconComponent aria-hidden="true" focusable="false" />
      {label}
    </span>
  )
}

export default function SkillBadge({ skill }) {
  if (skill === 'HTML & CSS') {
    return (
      <span className="skill-badge">
        <span className="skill-badge-icons" aria-hidden="true">
          <SiHtml5 className="skill-logo" color="#E34F26" aria-hidden="true" focusable="false" />
          <FaCss3Alt className="skill-logo" color="#1572B6" aria-hidden="true" focusable="false" />
        </span>
        <BlurText as="span" text={skill} />
      </span>
    )
  }

  if (skill === 'Git & GitHub') {
    return (
      <span className="skill-badge">
        <span className="skill-badge-icons" aria-hidden="true">
          <SiGit className="skill-logo" color="#F05133" aria-hidden="true" focusable="false" />
          <SiGithub className="skill-logo" color="#F2E9E2" aria-hidden="true" focusable="false" />
        </span>
        <BlurText as="span" text={skill} />
      </span>
    )
  }

  const definitions = {
    JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
    React: { icon: SiReact, color: '#61DAFB' },
    'Vue.js': { icon: SiVuedotjs, color: '#42B883' },
    Laravel: { icon: SiLaravel, color: '#FF2D20' },
    PHP: { icon: SiPhp, color: '#777BB4' },
    Firebase: { icon: SiFirebase, color: '#FFCA28' },
    MongoDB: { icon: SiMongodb, color: '#47A248' },
    Android: { icon: SiAndroid, color: '#3DDC84' },
    'Google ML Kit': { icon: SiGoogle, color: '#4285F4' },
    'Responsive UI': { icon: MdDevices, color: '#D8BBAA' },
    SQL: { icon: FaDatabase, color: '#D8BBAA' },
    CameraX: { icon: FaCamera, color: '#D8BBAA' },
    ESP32: { icon: FaMicrochip, color: '#D8BBAA' },
    'PZEM-004T': { icon: FaMicrochip, color: '#D8BBAA' },
  }

  const fallback = { icon: FaMicrochip, color: '#D8BBAA' }
  const { icon, color } = definitions[skill] || fallback

  return (
    <span className="skill-badge">
      <Icon icon={icon} color={color} />
      <BlurText as="span" text={skill} />
    </span>
  )
}
