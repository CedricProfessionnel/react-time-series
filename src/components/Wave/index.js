import React from "react"
import range from "lodash/range"
import { styled } from "@material-ui/core/styles"
import colorAlpha from "color-alpha"

const Container = styled("div")({})

export const Wave = ({
  curves,
  width,
  height,
  transformMatrix,
  durationGroups = [],
  timestamps = [],
}) => {
  return (
    <Container style={{ curves, width, height }}>
      <svg width={width} height={height}>
        {durationGroups.flatMap(({ durations, color }) => {
          return durations.map((duration) => {
            const { x: startX } = transformMatrix.applyToPoint(
              duration.start,
              0
            )
            const { x: endX } = transformMatrix.applyToPoint(duration.end, 0)
            return (
              <rect
                fill={colorAlpha(color, 0.2)}
                x={startX}
                y={0}
                width={endX - startX}
                height={height}
              />
            )
          })
        })}
        {curves.map((curve, i) => (
          <polyline
            key={i}
            stroke={curve.color}
            fill="transparent"
            points={curve.data
              .map(([t, y]) => {
                const p = transformMatrix.applyToPoint(t, y)
                return `${p.x},${p.y}`
              })
              .join(" ")}
          />
        ))}
        {timestamps.map((ts, i) => {
          const { x } = transformMatrix.applyToPoint(ts.time, 0)
          return (
            <line
              key={i}
              x1={x}
              x2={x}
              y1={0}
              y2={height}
              stroke={ts.color}
              strokeWidth={1}
            />
          )
        })}
      </svg>
    </Container>
  )
}

export default Wave
