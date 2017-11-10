import React from 'react';
import { compose, lifecycle, branch, renderComponent, setDisplayName, withProps } from 'recompose';
import { identity } from 'lodash';
import BeatLoading from 'respinner/lib/beat';

const spinnerWhenFetching = (
  fetcher,
  dataNotAvailable,
  extendProps,
) => compose(
  setDisplayName('Spinner'),
  lifecycle({
    componentDidMount() {
      // eslint-disable-next-line immutable/no-this
      fetcher(this.props);
    },
  }),
  withProps(() => ({ ...extendProps })),
  branch(
    dataNotAvailable,
    renderComponent(({ spinnerStyles }) =>
      (<div className="text-center" style={spinnerStyles}>
        <BeatLoading size={16} fill="#1dbbee" count={3} />
      </div>)
    ),
    identity
  )
);

export default spinnerWhenFetching;
