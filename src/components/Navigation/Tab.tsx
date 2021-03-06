import Link from 'next/link';
import React, { useState, useEffect, VFC } from 'react';
import { css, keyframes, SerializedStyles } from '@emotion/react';
import { getIcon } from './getIcon';
import { PAGE_PATH } from '~/constants';
import type { PageTitle } from '~/types';
import { useSetRecoilState } from 'recoil';
import { mainTabIndexAtom } from '~/store/atoms';
import { COLOR, FONT, CONTENT_AREA, CONTENT_AREA_PC_MIN_WIDTH_NUM } from '~/styles/const';
import { media } from '~/styles/shares';
import { useIsActive, useRipple, useGetWindowSize } from '~/hooks';

type Props = {
  isToggle?: true;
  isResetIndex: boolean;
  title: PageTitle;
  index: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const Tab: VFC<Props> = ({ isToggle, isResetIndex, title, index, activeIndex: parentActiveIndex, setActiveIndex: parentSetActiveIndex }) => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | undefined>();
  const setActiveIndex = useSetRecoilState<number>(mainTabIndexAtom); /* eslint-disable-line @typescript-eslint/no-unused-vars */
  const isActive = useIsActive(!!isToggle, parentActiveIndex, index);

  const [, setCoords, isRippling] = useRipple(170);

  const windowSize = useGetWindowSize();

  useEffect(() => {
    setIsTouchDevice(false);
  }, [windowSize.width]);

  return (
    <Link href={PAGE_PATH[title]} passHref>
      <a
        onClick={(e) => {
          parentSetActiveIndex(index);
          isResetIndex && setActiveIndex(0);
          const rect = e.currentTarget.getBoundingClientRect();
          setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onTouchStart={() => {
          windowSize.width <= CONTENT_AREA_PC_MIN_WIDTH_NUM && setIsTouchDevice(true);
        }}
        css={styles.box}
      >
        {isTouchDevice && isRippling ? <span css={styles.ripple} /> : ''}
        <p>{getIcon(title, isActive)}</p>
        <p css={styles.title(isActive)}>{title}</p>
      </a>
    </Link>
  );
};

const rippleEffect = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0.4;
  }
  50% {
    transform: scale(1);
    opacity: 0.18;
  }
  100% {
    transform: scale(1.25);
    opacity: 0.16;
  }
`;

const styles = {
  box: css`
    display: block;
    width: 50px;
    height: 50px;
    text-align: center;
    padding-top: 3px;
    position: relative;
    ${media.pc(
      css`
        width: auto;
        display: flex;
        justify-content: flex-start;
        flex-shrink: 0;
        align-items: center;
        padding: 28px 20px;
        border-radius: 30px;
        margin-bottom: 10px;
        @media (hover: hover) {
          &:hover {
            background-color: ${COLOR.HOVER_RED};
          }
        }
      `,
    )}
  `,
  title: (isActive?: boolean): SerializedStyles => css`
    color: ${isActive ? COLOR.RED : 'black'};
    padding-top: 2px;
    font-size: ${FONT.X_SMALL};
    ${media.pc(
      css`
        display: inline-block;
        padding-left: 10px;
        font-size: ${FONT.BASE};
        @media (max-width: ${CONTENT_AREA.PC_MIN_WIDTH}) {
          display: none;
        }
      `,
    )}
  `,
  ripple: css`
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: ${COLOR.RED};
    content: '';
    border-radius: 50%;
    opacity: 1;
    animation: 0.17s ease 0s forwards ${rippleEffect};
  `,
};
