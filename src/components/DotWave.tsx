import { useEffect, useRef } from 'react'

/**
 * Animated halftone dot field for the foot of the page.
 *
 * The dots sit on a fixed lattice and never move. What moves is the contour
 * they fill up to: three sine octaves at incommensurable periods, so the crest
 * neither repeats visibly across the width nor loops back to a shape you have
 * already seen. Both opacity and dot size ramp with depth below that contour,
 * which is what gives the top edge its dithered falloff instead of a hard line.
 *
 * Canvas rather than DOM nodes: a full-width field is a few thousand dots,
 * which is nothing to fillRect but thousands of boxes to lay out and composite.
 */

/** Lattice pitch, CSS px. Drives the dot count, so it is the perf knob. */
const SPACING = 11
/** Square edge for the deepest dots and for those at the fading edge. */
const DOT_MAX = 3.2
const DOT_MIN = 1.4
/** Depth below the contour over which a dot reaches full strength, CSS px.
 *  Kept well under the mean crest height, or most of the field sits in the
 *  ramp and the whole thing washes out to a faint smear. */
const FADE = 95
/** Opacity of the deepest dots. */
const ALPHA_MAX = 0.55

export function DotWave() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dots = 'rgb(234,228,211)'
    let raf = 0
    let visible = true
    const started = performance.now()
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function measure() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas!.clientWidth
      h = canvas!.clientHeight
      canvas!.width = Math.max(1, Math.round(w * dpr))
      canvas!.height = Math.max(1, Math.round(h * dpr))
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      // The canvas carries `color: var(--text-body)`, so the dots follow the
      // design tokens rather than hard-coding a second copy of the palette.
      dots = getComputedStyle(canvas!).color || dots
    }

    /** Height of the fill contour above the bottom edge, at column x. */
    function crest(x: number, t: number) {
      return (
        h * 0.34 +
        h * 0.2 * Math.sin(x / 191 + t * 0.00023) +
        h * 0.09 * Math.sin(x / 79 - t * 0.00037) +
        h * 0.045 * Math.sin(x / 37 + t * 0.00055)
      )
    }

    function draw(now: number) {
      // Reduced motion still gets the field, just frozen at its opening shape.
      const t = motion.matches ? 0 : now - started
      ctx!.clearRect(0, 0, w, h)
      ctx!.fillStyle = dots
      for (let x = SPACING / 2; x < w; x += SPACING) {
        const c = crest(x, t)
        // Walk up from the bottom edge and stop at the contour: dots above it
        // are outside the field and would only be drawn at zero alpha.
        for (let y = h - SPACING / 2; y > h - c; y -= SPACING) {
          const k = Math.min(1, (c - (h - y)) / FADE)
          const s = DOT_MIN + (DOT_MAX - DOT_MIN) * k
          ctx!.globalAlpha = ALPHA_MAX * k
          ctx!.fillRect(x - s / 2, y - s / 2, s, s)
        }
      }
      ctx!.globalAlpha = 1
    }

    function frame(now: number) {
      draw(now)
      if (visible && !motion.matches) raf = requestAnimationFrame(frame)
    }

    function start() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }

    measure()
    start()

    const resize = new ResizeObserver(() => {
      measure()
      start()
    })
    resize.observe(canvas)

    // The field is at the foot of a long page, so it is off-screen for most of
    // a visit. No reason to run the loop then.
    const seen = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true
      if (visible) start()
      else cancelAnimationFrame(raf)
    })
    seen.observe(canvas)

    const onMotionChange = () => start()
    motion.addEventListener('change', onMotionChange)

    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      seen.disconnect()
      motion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return <canvas ref={ref} className="dot-wave" aria-hidden />
}

export default DotWave
