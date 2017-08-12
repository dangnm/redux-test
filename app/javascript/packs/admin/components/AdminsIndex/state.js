import { getOr, flow, get } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';

const getAdmins = getOr([], 'admins');

export const adminsSelector = (state = []) => {
    return getAdmins(state);
};

export const ADMINS = 'ADMINS';

const {
    updater: mockAdminsUpdater,
    actionCreator: fetchAdmins,
    dataSelector: apiAdminsWithMetaSelector,
} = makeFetchAction(
    ADMINS,
    () => ({
        endpoint: (state) => {
            return `/admin/admins.json`;
        },
        method: 'GET',
    })
);

const apiAdminsSelector = state => flow(apiAdminsWithMetaSelector, get('data'))(state) || [];

export {
    mockAdminsUpdater,
    fetchAdmins,
    apiAdminsSelector,
};

const mockAdmins = {
    data: [
        { id: '1', email: 'test1@test.com', created_at: 26},
        { id: '2', email: 'test2@test.com', created_at: 26},
        { id: '3', email: 'test3@test.com', created_at: 26},
    ]
};

export {
    mockAdmins
};
