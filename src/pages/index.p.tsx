import type { NextPage } from 'next';
import { GET_TRAINING_ONE_TYPE } from '../libs/graphql/queries';
import type { GetTrainingOneTypeQuery } from '../types/generated/graphql';
import { useQuery } from '@apollo/client';
import { pageTemplate } from '../styles/share/pageTemplate';
import { getCurrentDate } from '../utils/app';
import Top from './Top';
import History from './History';
import { SwiperContainer } from '../components';
import { useGetWindowSize } from '~/hooks';

const Home: NextPage = () => {
  const { data, error, loading } = useQuery<GetTrainingOneTypeQuery>(GET_TRAINING_ONE_TYPE, {
    variables: { date: getCurrentDate(new Date(), false) },
    fetchPolicy: 'network-only',
  });

  const { height, width } = useGetWindowSize();

  if (loading) {
    return (
      <div css={pageTemplate.contentArea}>
        <p>Loading...</p>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <p>
        {height},{width}
      </p>
      <SwiperContainer>
        <Top data={data} />
        <History />
      </SwiperContainer>
    </>
  );
};

export default Home;
