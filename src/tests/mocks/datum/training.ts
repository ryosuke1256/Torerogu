import { getStringTypeDate } from '~/utils/app';
import { GetTrainingOneTypeQuery } from '~/libs/graphql/generated/graphql';

export const trainingOneType: GetTrainingOneTypeQuery['trainings'] = [
  {
    __typename: 'trainings',
    id: 1,
    user_id: 1,
    training_type_id: 1,
    training_weight: 60,
    training_count: 10,
    training_set: 10,
    is_finish: false,
    date: getStringTypeDate(new Date()),
    training_type: {
      __typename: 'training_types',
      id: 1,
      name: 'ベンチプレス',
    },
  },
  {
    __typename: 'trainings',
    id: 2,
    user_id: 1,
    training_type_id: 10,
    training_weight: 30,
    training_count: 10,
    training_set: 15,
    is_finish: false,
    date: getStringTypeDate(new Date()),
    training_type: {
      __typename: 'training_types',
      id: 10,
      name: 'サイドレイズ',
    },
  },
];