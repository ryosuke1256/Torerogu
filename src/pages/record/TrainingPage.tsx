import React, { useState } from 'react';
import type { VFC } from 'react';
import type { GetRecordPagePropsQuery, CreateTrainingMutation } from '../../types/generated/graphql';
import { CREATE_TRAINING } from '../../libs/graphql/mutations/record';
import { Slider, Space, Card, Input, InputForm } from '../../components/entryPoints';
import { cardStyle, sliderStyle, simpleButton, inputStyle } from '../../components/styleEntryPoints';
import { templates } from '../../styles/template';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import Snackbar from '../../components/uiParts/Snackbar';

type TrainingType = {
  id: number;
  name: string;
  training_category_id: number;
};

type TrainingFormValues = {
  trainingWeight: number;
  setCount: number;
  count: number;
};

type Props = {
  data?: GetRecordPagePropsQuery;
};

const TrainingPage: VFC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategoryID, setSelectedCategoryID] = useState<number>(1);
  const [selectedTrainingType, setSelectedTrainingType] = useState<TrainingType | null>(null);

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm<TrainingFormValues>();
  const method = useForm<TrainingFormValues>();

  const { handleSubmit } = method;

  const [insertTraining, { error }] = useMutation<CreateTrainingMutation>(CREATE_TRAINING, {
    onCompleted: () => setOpen(true),
  });

  const handleClick = (data: Readonly<TrainingType>) => {
    setSelectedTrainingType(data);
  };

  const getTrainingTypes = (): Readonly<TrainingType>[] | undefined => {
    const slectedTrainingTypes = data?.training_types.filter(function (training_type) {
      return training_type.training_category_id === selectedCategoryID;
    });
    return slectedTrainingTypes;
  };

  const registerTraining: SubmitHandler<TrainingFormValues> = (data) => {
    insertTraining({ variables: { user_id: 1, training_type_id: selectedTrainingType?.id, training_weight: data.trainingWeight, training_count: data.count, training_set: data.setCount, is_finish: true, date: new Date() } });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (error) return <p>記録に失敗しました、もう一度実行してください</p>;

  if (selectedTrainingType) {
    //TODO:回数ではない場合、ex.ランニング
    return (
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(registerTraining)}>
          <div css={templates.contentArea}>
            <h2 css={templates.title}>✏️ {selectedTrainingType.name}</h2>
            <InputForm title={'重量'} unit={'kg'} typeAttr={'text'} type={'isInput'} placeholder={'60'} _css={inputStyle} form={{ name: 'trainingWeight', option: { required: true, pattern: /[0-9]/ } }} />
            <InputForm title={'セット数'} unit={'set'} typeAttr={'text'} type={'isInput'} placeholder={'5'} _css={inputStyle} form={{ name: 'set', option: { required: true, pattern: /[0-9]/ } }} />
            <InputForm title={'回数'} unit={'回'} typeAttr={'text'} type={'isInput'} placeholder={'10'} _css={inputStyle} form={{ name: 'count', option: { required: true, pattern: /[0-9]/ } }} />
            <Input type={'isInput'} typeAttr='submit' _css={simpleButton(10)} value={'記録する'} />
            <p css={templates.back} onClick={() => setSelectedTrainingType(null)}>
              ＜ カテゴリ選択に戻る
            </p>
          </div>
          <Snackbar text={'記録しました！'} open={open} handleClose={handleClose} />
        </form>
      </FormProvider>
    );
  } else {
    return (
      <>
        <Space height={20} />
        <Slider items={data?.training_categories} setState={setSelectedCategoryID} sliderStyle={sliderStyle} />
        {getTrainingTypes()?.map((training_type) => {
          return (
            <Card data={training_type} handleClick={handleClick} key={training_type.id} _css={cardStyle(15)}>
              {training_type.name}
            </Card>
          );
        })}
      </>
    );
  }
};

export default TrainingPage;