import type { VFC, Dispatch } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { BREAKPOINT, FONT, COLOR } from '~/styles/const';
import { useIsActive } from '~/hooks';
import type { SetterOrUpdater } from 'recoil';
import { useRecoilValue } from 'recoil';
import { swiperAtom } from '~/store';

type Props = {
  index: number;
  activeIndex: number;
  title: string;
  isToggle?: true;
  setState?: SetterOrUpdater<number> | Dispatch<React.SetStateAction<number>>;
};

const Tab: VFC<Props> = ({ index, activeIndex, title, isToggle, setState }) => {
  const swiper = useRecoilValue(swiperAtom);

  const isActive = useIsActive(!!isToggle, activeIndex, index);

  return (
    <li
      onClick={() => {
        swiper?.slideTo(index);
        setState && setState(index);
      }}
      css={styles.tab(isActive)}
    >
      {title}
    </li>
  );
};

export default Tab;

const styles = {
  tab: (isActive?: boolean): SerializedStyles => css`
    color: ${isActive ? COLOR.ORANGE : 'black'};
    ${isActive && `border-bottom:1px solid ${COLOR.ORANGE}`};
    padding: 15px;
    font-size: ${FONT.BASE};
    background-color: #fff;
    cursor: pointer;
    @media (min-width: ${BREAKPOINT.MD}) {
      &:hover {
        /* border-bottom: 1px solid #dad2c8; */
        background-color: #fff8f1;
        /* background-color: #f8f8f8; */
      }
    }
  `,
};
