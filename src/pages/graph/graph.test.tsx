import Graph from './index.p';
import { act, screen } from '@testing-library/react';
import { testRenderer } from '~/tests/mocks/renders/testRenderer';
import { GetTrainingWithBodyMock } from '~/tests/mocks/datum/getTrainingWithBodyInfo';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    };
  },
}));
jest.mock('../../components/PageSlider/useChangeSettingOnInWindowSize');

describe('<Graph>', () => {
  const renderPage = testRenderer(<Graph />, [GetTrainingWithBodyMock]);

  it('loading画面表示され、データをフェッチし取得後pageがレンダリングされる', async () => {
    await act(async () => {
      renderPage();
      expect(screen.findByTestId('loading'));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(await screen.findByTestId('page'));
      screen.debug();
    });
  });
});