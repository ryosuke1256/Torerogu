import React, { Dispatch, SetStateAction, useState, VFC } from 'react';

type Props = {
  initIsChecked?: boolean;
  title: string;
  id?: number;
  handleClick?: (id: number, isChecked: boolean) => void | Dispatch<SetStateAction<boolean>>;
};

export const Checkbox: VFC<Props> = ({ initIsChecked, title, id, handleClick }) => {
  const [isChecked, setIsChecked] = useState<boolean>(initIsChecked ? initIsChecked : false);
  return (
    <>
      <input
        type='checkbox'
        id='custom-checkbox'
        value=''
        defaultChecked={isChecked}
        onClick={() => {
          id && handleClick && handleClick(id, isChecked);
          setIsChecked((prev) => !prev);
        }}
      />
      <label htmlFor='custom-checkbox' className='custom-style'>
        {title}
      </label>
    </>
  );
};
