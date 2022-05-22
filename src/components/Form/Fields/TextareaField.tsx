import type { VFC, ComponentProps } from 'react';
import { FormFieldWrapper } from './FormFieldWrapper';
import { css } from '@emotion/react';
import { COLOR } from '~/styles/const';

type TextareaProps = ComponentProps<'textarea'>;

interface Props extends TextareaProps {
  title: string;
}

export const TextareaField: VFC<Props> = ({ title, ...textareaProps }) => {
  return (
    <FormFieldWrapper title={title}>
      <textarea {...textareaProps} css={textareaFieldStyle} />
    </FormFieldWrapper>
  );
};

const textareaFieldStyle = css`
  border: 1px solid ${COLOR.BORDER_GRAY};
  background-color: #fff;
  border-radius: 15px;
  text-align: left;
  padding: 7px 10px;
  &:focus {
    border: 1.5px solid rgba(255,153,0,0.7)};
  }
`;
