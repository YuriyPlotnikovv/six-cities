import {createApi} from '../utils/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {StoreState} from '../types/store';
import {Action} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute} from '../const/const';
import {fetchUserStatus} from './actions';
import type { History } from 'history';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument({api})];

  const mockStore = configureMockStore<
    StoreState,
    Action,
    ThunkDispatch<StoreState, { api: AxiosInstance, history: History }, Action>
  >(middlewares);

  it('fetchUserStatus should be fullfilled when server returns 200', async () => {
    const store = mockStore();

    mockApi
      .onGet(ApiRoute.Login)
      .reply(200, {});
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUserStatus());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUserStatus.pending.type,
      fetchUserStatus.fulfilled.type
    ]);
  });

  it('fetchUserStatus should be rejected when server returns 401', async () => {
    const store = mockStore();

    mockApi
      .onGet(ApiRoute.Login)
      .reply(401, {});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUserStatus());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchUserStatus.pending.type,
      fetchUserStatus.rejected.type
    ]);
  });
});
