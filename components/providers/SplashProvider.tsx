'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface SplashCtx {
  splashActive: boolean
  onDismiss: () => void
}

const SplashContext = createContext<SplashCtx>({ splashActive: true, onDismiss: () => {} })

export function SplashProvider({ children }: { children: React.ReactNode }) {
  // Start as true so the overlay renders immediately — prevents any flash of content
  const [splashActive, setSplashActive] = useState(true)

  const onDismiss = useCallback(() => {
    setSplashActive(false)
  }, [])

  return (
    <SplashContext.Provider value={{ splashActive, onDismiss }}>
      {children}
    </SplashContext.Provider>
  )
}

export const useSplash = () => useContext(SplashContext)
