import { getOr, flow, get } from 'lodash/fp';
import { makeFetchAction } from 'redux-api-call';

const getAdmins = getOr([], 'admins');

export const adminsSelector = (state = []) => {
    return getAdmins(state);
};

export const ADMINS = 'ADMINS';

const {
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
    fetchAdmins,
    apiAdminsSelector,
};

