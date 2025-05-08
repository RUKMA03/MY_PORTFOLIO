"use client"

import { useEffect, useRef } from "react"

export const PixelatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Define colors from the color scheme
    const colors = [
      "#302071", // darkPurple
      "#130B2B", // deepPurple
      "#E4C3E2", // lightPink
      "#B24D95", // magenta
      "#926FBD", // lavender
      "#D69593", // coral
      "#F1A7E1", // pink
      "#A0CDB5", // mint
      "#FDE648", // yellow
    ]

    // Pixel size
    const pixelSize = 20
    const cols = Math.ceil(canvas.width / pixelSize)
    const rows = Math.ceil(canvas.height / pixelSize)

    // Create grid
    const grid: number[][] = []
    for (let y = 0; y < rows; y++) {
      grid[y] = []
      for (let x = 0; x < cols; x++) {
        grid[y][x] = Math.floor(Math.random() * colors.length)
      }
    }

    // Animation variables
    let frame = 0
    const animationSpeed = 0.05 // Lower is slower

    // Animation function
    const animate = () => {
      frame += animationSpeed

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw pixels
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Skip some pixels for a more dynamic effect
          if (Math.random() > 0.995) {
            grid[y][x] = Math.floor(Math.random() * colors.length)
          }

          // Calculate noise based on position and time
          const noise = Math.sin(x * 0.1 + y * 0.1 + frame) * 0.5 + 0.5

          // Only draw some pixels based on noise
          if (noise > 0.4) {
            ctx.fillStyle = colors[grid[y][x]]
            ctx.globalAlpha = noise * 0.3 // Make it semi-transparent
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="pixel-bg" />
}
