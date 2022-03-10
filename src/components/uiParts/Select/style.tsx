import { css, SerializedStyles } from '@emotion/react';
import { BORDER } from '../../../styles/const';

export const selectStyle = (customCss?: SerializedStyles) => css`
  width: 200px;
  border: 1px solid ${BORDER.GRAY};
  ${customCss}
`;
