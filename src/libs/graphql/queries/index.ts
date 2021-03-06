import { gql } from '@apollo/client';

export const GET_TRAINING_TRAINING_TYPE = gql`
  query GetTrainingTrainingType {
    trainings {
      id
      user_id
      training_type_id
      training_weight
      training_count
      training_set
      is_finish
      date
      training_type {
        id
        name
      }
    }
  }
`;

export const GET_TRAINING_CATEGORY_WITH_TYPE = gql`
  query GetTrainingCategoryWithType {
    training_categories(order_by: { id: asc }) {
      id
      name
    }
    training_types {
      id
      name
      training_category_id
    }
  }
`;

export const GET_TRAINING_WITH_BODY_INFO = gql`
  query GetTrainingWithBodyInfo {
    trainings(order_by: { id: asc }) {
      id
      user_id
      training_type_id
      training_weight
      training_count
      training_set
      is_finish
      date
    }
    body_info_data_histories(order_by: { id: asc }) {
      id
      user_id
      weight
      date
      is_record
    }
  }
`;
