import { css } from 'styled-components';

export const small = (props) => {
  return css`
    @media only screen and (max-width: 22.5em) {
      ${props}
    }
  `;
};

export const phone = (props) => {
  return css`
    @media only screen and (max-width: 37.5em) {
      ${props}
    }
  `;
};

export const portrait = (props) => {
  return css`
    @media only screen and (max-width: 56.25em) {
      ${props}
    }
  `;
};

export const landscape = (props) => {
  return css`
    @media only screen and (max-width: 75em) {
      ${props}
    }
  `;
};
