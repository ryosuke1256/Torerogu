import React from 'react';
import type { VFC } from 'react';
import { SerializedStyles } from '@emotion/react';
import { templates } from '../../../styles/template';
import { useFormContext } from 'react-hook-form';
import { selectStyle } from './style';

type Props = {
  title: string;
  texts: any[] | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  form: { name: string; option: { required: boolean } };
  marginBottom?: number;
  customCss?: SerializedStyles;
};

const Select: VFC<Props> = ({ title, texts, form, marginBottom: mb = 0, customCss }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <select {...register(form.name, form.option)} css={selectStyle(mb, customCss)} required>
        <option value='' hidden>
          {title}
        </option>
        {texts?.map((text:any, i:number) => {
          return (
            <option key={i} value={text}>
              {text?.name ?? text}
              {text?.name}
            </option>
          );
        })}
      </select>
      <p css={templates.errorMessage}>{errors.name?.type === 'required' && '必須項目です'}</p>
    </>
  );
};

export default Select;
