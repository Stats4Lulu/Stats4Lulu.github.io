import { useState, useEffect } from 'react'

export function useTheme() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Initial check
        setIsDark(document.documentElement.classList.contains('dark'))

        // Observer for changes
        const observer = new MutationObserver(() =>
            setIsDark(document.documentElement.classList.contains('dark')),
        )

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        return () => observer.disconnect()
    }, [])

    return { isDark }
}
