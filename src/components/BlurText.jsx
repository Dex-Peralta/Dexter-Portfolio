import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export default function BlurText({
  text,
  as: Element = 'p',
  className = '',
  animateBy = 'words',
  delay = 40,
  duration,
  stepDuration = 0.25,
  blur = 7,
  y = 10,
  triggerOnce = false,
  ...props
}) {
  const elementRef = useRef(null)
  const [cycle, setCycle] = useState(0)
  const [ready, setReady] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setReady(true)
      setHasBeenVisible(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        if (triggerOnce) {
          if (!hasBeenVisible) {
            setReady(true)
            setHasBeenVisible(true)
            setCycle((value) => value + 1)
          }
        } else {
          setReady(true)
          setHasBeenVisible(true)
          setCycle((value) => value + 1)
        }
      } else {
        if (!triggerOnce) setReady(false)
      }
    }, { threshold: 0.08, rootMargin: '8% 0px 8% 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasBeenVisible, triggerOnce])

  const words = String(text).trim().split(/\s+/)
  const items = animateBy === 'words' ? words : [text]
  const effectiveDuration = duration ?? stepDuration

  if (reduceMotion) {
    return (
      <Element ref={elementRef} className={className} {...props}>
        {text}
      </Element>
    )
  }

  return (
    <Element
      ref={elementRef}
      className={`blur-text ${className}`}
      aria-label={text}
      {...props}
    >
      <span className="blur-text__sr" aria-hidden="true">
        {items.map((item, index) => (
          <motion.span
            key={`${cycle}-${index}-${item}`}
            className="blur-text__word"
            initial={ready ? { opacity: 0, filter: `blur(${blur}px)`, y } : false}
            animate={ready
              ? { opacity: 1, filter: 'blur(0px)', y: 0 }
              : { opacity: 0, filter: `blur(${blur}px)`, y }}
            transition={{ duration: effectiveDuration, delay: animateBy === 'words' ? index * (delay / 1000) : 0, ease: 'easeOut' }}
          >
            {item}{index < items.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </span>
    </Element>
  )
}
