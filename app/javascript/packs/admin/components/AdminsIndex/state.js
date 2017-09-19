import { getOr, flow, get, pick } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';
import { camelizeKeys } from 'humps';

const getAdmins = getOr([], 'admins');

export const adminsSelector = (state = []) => getAdmins(state);

export const ADMINS = 'ADMINS';

const {
    updater: mockAdminsUpdater,
    actionCreator: fetchAdmins,
    dataSelector: apiAdminsWithMetaSelector,
} = makeFetchAction(
    ADMINS,
    (page) => ({
        endpoint: () => `/admin/admins.json?page=${page || '1'}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
);

const apiAdminsSelector = state => flow(apiAdminsWithMetaSelector, get('data'), camelizeKeys, get('items'))(state) || [];
const apiAdminsPagerSelector = state => flow(apiAdminsWithMetaSelector, get('data'), camelizeKeys, pick(['pageIndex', 'itemsPerPage', 'totalItems']))(state) || {};

export {
    mockAdminsUpdater,
    fetchAdmins,
    apiAdminsSelector,
    apiAdminsPagerSelector,
};

const mockAdmins = {
    data: {
        items_per_page: 3,
        page_index: 2,
        total_pages: 3,
        total_items: 10,
        items: [
            { id: '1', email: 'test1@test.com', created_at: 26 },
            { id: '2', email: 'test2@test.com', created_at: 26 },
            { id: '3', email: 'test3@test.com', created_at: 26 },
        ],
    },
};

export {
    mockAdmins,
};
