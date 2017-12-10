import { makeFetchAction } from 'redux-api-call';

export const UPDATE_ADMINS_ACTION = 'UPDATE_ADMINS_ACTION';

const {
  actionCreator: updateAdmin,
  errorSelector: updateAdminErrorSelector,
} = makeFetchAction(
  UPDATE_ADMINS_ACTION,
  ({ id, firstName, lastName,  password, passwordConfirmation }, csrfToken) => ({
    endpoint: () => `/admin/admins/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify({
      admin: {
        id,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirmation: passwordConfirmation },
    }),
    credentials: 'same-origin',
  })
);

export const FETCH_ADMIN_ACTION = 'FETCH_ADMIN_ACTION';

const {
  actionCreator: fetchAdmin,
  dataSelector: apiFetchAdminSelector,
  isFetchingSelector: isAdminFetchingSelector,
} = makeFetchAction(
  FETCH_ADMIN_ACTION,
  (id) => ({
    endpoint: () => `/admin/admins/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
);

export {
  updateAdmin,
  updateAdminErrorSelector,
  fetchAdmin,
  apiFetchAdminSelector,
  isAdminFetchingSelector,
};
