import { css } from 'styled-components'

export const breakpoints = {
  sm: 768,
}

const BREAK_POINT = 768

export const spLayout = () => {
  return (style: TemplateStringsArray) =>
    `@media (max-width: ${BREAK_POINT - 1}px) { ${style} }`
}
export const pcLayout = () => {
  return (style: TemplateStringsArray) =>
    `@media (min-width: ${BREAK_POINT}px) { ${style} }`
}


export const deviceLayout = {
  spLayout: (...args) => css`
    @media (max-width: ${breakpoints.sm - 1}px) {
      ${css(...args)};
    }
  `,
  pcLayout: (...args) => css`
    @media (min-width: ${breakpoints.sm}px) {
      ${css(...args)};
    }
  `,
}
