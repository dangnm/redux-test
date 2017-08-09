import { getOr } from 'lodash/fp';

const getAdmins = getOr([], 'admins');

export const adminsSelector = (state = []) => {
    return getAdmins(state);
};

