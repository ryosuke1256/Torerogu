import { FONT, COLOR, Z_INDEX } from '~/styles/const';
import { css, SerializedStyles } from '@emotion/react';
import { media } from '~/styles/shares';

export const tabStyles = {
  nav: (navWidth?: number, customCss?: SerializedStyles) => css`
    clear: both;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    background-color: #fff;
    position: static;
    border-bottom: none;
    ${customCss};
    ${media.pc(css`
      position: fixed;
      top: auto;
      left: auto;
      z-index: ${Z_INDEX.PRIMARY_NAVIGATION};
      width: ${navWidth}px;
      border-bottom: 0.3px solid ${COLOR.BORDER_GRAY};
    `)}
  `,
  item: (isActive?: boolean): SerializedStyles => css`
    display: inline-block;
    color: ${isActive ? COLOR.ORANGE : 'black'};
    ${isActive && `border-bottom: 1px solid ${COLOR.ORANGE}`};
    padding: 15px;
    font-size: ${FONT.BASE};
    background-color: inherit;
    text-align: center;
    cursor: pointer;
    ${media.pc(css`
      font-size: ${FONT.SMALL};
      &:first-of-type {
        border-right: 0.3px solid ${COLOR.BORDER_GRAY};
      }
    `)}
    @media (hover: hover) {
      &:hover {
        background-color: ${COLOR.HOVER_ORANGE};
      }
    }
  `,
};

export const roundStyles = {
  nav: css`
    display: flex;
    cursor: pointer;
    justify-content: center;
    margin-top: 20px;
  `,
  item: (isActive?: boolean, color = 'black', backgroundColor: string = COLOR.ORANGE, backgroundColorAtHover = `${COLOR.ORANGE}E6`) => css`
    color: ${color};
    text-align: center;
    padding: 10px;
    margin: 0 10px;
    border-radius: 20px;
    ${isActive && `color: #fff`};
    ${isActive && `background-color: ${backgroundColor}`};
    ${isActive && `box-shadow: 0 1px 1px 0px ${COLOR.BORDER_GRAY}`}; //x軸 y軸 ぼかし 広がり カラー;
    @media (hover: hover) {
      &:hover {
        color: #fff;
        background-color: ${backgroundColorAtHover};
        box-shadow: 0 2px 6px 2px ${COLOR.BORDER_GRAY};
      }
    }
  `,
};
