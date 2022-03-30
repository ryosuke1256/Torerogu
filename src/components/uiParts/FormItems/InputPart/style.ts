import { css, SerializedStyles } from '@emotion/react';
import { COLOR } from '~/styles/const';

export const inputPartStyle = {
  input: (cursor: 'pointer' | 'text' | 'move' | 'auto' = 'auto', customCss?: SerializedStyles) => css`
    width: 200px;
    border: 1px solid ${COLOR.BORDER_GRAY};
    background-color: #fff;
    border-radius: 5px;
    text-align: right;
    padding: 4px 10px;
    color:black;
    cursor: ${cursor};
    &::placeholder {
    }
    &:focus {
      border: 1.5px solid rgba(255,153,0,0.7)};
    }
    ${customCss}
  `,
  inputTitle: css`
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
    z-index: 1000;

    pointer-events: none;
  `,
};

export const textareaStyle = (customCss?: SerializedStyles) => css`
  border: 1px solid ${COLOR.BORDER_GRAY};
  background-color: #fff;
  border-radius: 15px;
  text-align: left;
  padding: 7px 10px;
  &:focus {
    border: 1.5px solid rgba(255,153,0,0.7)};
  }
  ${customCss}
`;

export const submitStyle = () => css`
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 13px 0;
  border: 0;
  border-radius: 22px;
  cursor: pointer;
`;
