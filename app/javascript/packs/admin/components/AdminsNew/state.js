import { makeFetchAction } from 'redux-api-call';

export const CREATE_ADMINS_ACTION = 'CREATE_ADMINS_ACTION';

const {
    actionCreator: createAdmin,
    errorSelector: createAdminErrorSelector,
} = makeFetchAction(
    CREATE_ADMINS_ACTION,
    ({ email, password, passwordConfirmation }, csrfToken) => ({
        endpoint: (state) => '/admin/admins.json',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
            admin: { email, password, password_confirmation: passwordConfirmation },
        }),
        credentials: 'same-origin',
    })
);

export {
    createAdmin,
    createAdminErrorSelector,
};
