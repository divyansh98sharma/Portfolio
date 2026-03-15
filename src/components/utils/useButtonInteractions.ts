import { useState, useCallback, useRef } from 'react'

export type ButtonState = 'idle' | 'loading' | 'success' | 'error'

interface UseButtonInteractionsOptions {
  onHover?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => Promise<void> | void
  hapticFeedback?: boolean
  soundFeedback?: boolean
}

export function useButtonInteractions(options: UseButtonInteractionsOptions = {}) {
  const [state, setState] = useState<ButtonState>('idle')
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const triggerHapticFeedback = useCallback(() => {
    if (options.hapticFeedback && 'vibrate' in navigator) {
      // Light tap feedback - 4ms follows our 4pt grid system
      navigator.vibrate(4)
    }
  }, [options.hapticFeedback])

  const triggerSoundFeedback = useCallback(() => {
    if (options.soundFeedback && 'AudioContext' in window) {
      try {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        // Silently fail if audio context is not available
        console.debug('Audio feedback not available')
      }
    }
  }, [options.soundFeedback])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    options.onHover?.()
  }, [options.onHover])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setIsPressed(false)
  }, [])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    options.onFocus?.()
  }, [options.onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    options.onBlur?.()
  }, [options.onBlur])

  const handleMouseDown = useCallback(() => {
    setIsPressed(true)
    triggerHapticFeedback()
  }, [triggerHapticFeedback])

  const handleMouseUp = useCallback(() => {
    setIsPressed(false)
  }, [])

  const handleClick = useCallback(async (e: React.MouseEvent | React.KeyboardEvent) => {
    if (state === 'loading') return
    
    triggerSoundFeedback()
    
    if (options.onClick) {
      try {
        setState('loading')
        await options.onClick(e)
        setState('success')
        
        // Reset to idle after 1.2 seconds (following 4pt grid timing)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setState('idle')
        }, 1200)
      } catch (error) {
        setState('error')
        
        // Reset to idle after 2 seconds for error state
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setState('idle')
        }, 2000)
        
        throw error
      }
    }
  }, [state, options.onClick, triggerSoundFeedback])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsPressed(true)
      handleClick(e)
    }
  }, [handleClick])

  const handleKeyUp = useCallback(() => {
    setIsPressed(false)
  }, [])

  const getButtonClasses = useCallback(() => {
    const classes = []
    
    if (state === 'loading') classes.push('loading')
    if (state === 'success') classes.push('success')
    if (state === 'error') classes.push('error')
    if (isHovered) classes.push('hovered')
    if (isFocused) classes.push('focused')
    if (isPressed) classes.push('pressed')
    
    return classes.join(' ')
  }, [state, isHovered, isFocused, isPressed])

  const buttonProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    className: getButtonClasses(),
    'data-state': state,
    'data-hovered': isHovered,
    'data-focused': isFocused,
    'data-pressed': isPressed,
  }

  return {
    state,
    isHovered,
    isFocused,
    isPressed,
    setState,
    buttonProps,
    getButtonClasses,
  }
}