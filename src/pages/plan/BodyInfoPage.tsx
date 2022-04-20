import React, { useState } from 'react';
import type { VFC } from 'react';
import { FormContainer, InputField } from '~/components';
import { SubmitHandler } from 'react-hook-form';
import { getStringTypeDate } from '~/utils/app';
import { CREATE_BODY_INFO_HISTORIES } from '~/libs/graphql/mutations';
import { useMutation } from '@apollo/client';
import type { CreateBodyInfoHistoriesMutation } from '~/types/generated/graphql';

type PlanBodyInfoFormValues = {
  date: Date;
  weight: number;
  bodyFatPercentage: number | '' | null;
};

type Props = {
  pageIndex: number;
};

const BodyInfoPage: VFC<Props> = ({ pageIndex }) => {
  const [open, setOpen] = useState(false);
  const [insertBodyInfo, {}] = useMutation<CreateBodyInfoHistoriesMutation>(CREATE_BODY_INFO_HISTORIES, {
    onCompleted: () => setOpen(true),
  });

  const registerBodyInfo: SubmitHandler<PlanBodyInfoFormValues> = (data) => {
    // TODO:FIX
    const user_id = 1;
    if (data.bodyFatPercentage === '') {
      data.bodyFatPercentage = null;
    }
    insertBodyInfo({ variables: { height: null, weight: data.weight, body_fat_percentage: data.bodyFatPercentage, date: data.date, user_id: user_id, is_record: false } });
  };

  return (
    <FormContainer<PlanBodyInfoFormValues> pageIndex={pageIndex} submitFunc={registerBodyInfo} title={'✏️ 目標体重を設定する'} open={open} handleClose={() => setOpen(false)}>
      <InputField required type='date' title='日付' min={getStringTypeDate(new Date(), 'YYYY-MM-DD')} placeholder='60' formConf={{ name: 'date', option: { required: true } }} />
      <InputField title='体重' unit='kg' type='text' placeholder='60' formConf={{ name: 'weight', option: { required: true, maxLength: 3, pattern: /[0-9]/ } }} />
      <InputField title='体脂肪率' type='text' unit='%' placeholder='10' formConf={{ name: 'bodyFatPercentage', option: { maxLength: 2, pattern: /[0-9]/ } }} />
    </FormContainer>
  );
};

export default BodyInfoPage;
