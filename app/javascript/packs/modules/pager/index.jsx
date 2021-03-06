import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { range, map } from 'lodash';

const Pager = ({
  totalItems,
  pageIndex,
  itemsPerPage,
  windowSize,
  onClick,
}) => {
    const totalPages = () => Math.ceil(parseFloat(totalItems) / parseFloat(itemsPerPage));
    const totalSegments = () => Math.ceil(totalPages() / parseFloat(windowSize));
    const currentSegment = () => Math.ceil(parseFloat(pageIndex) / parseFloat(windowSize));
    const isFirstSegment = () => {
        if (currentSegment() === 1) {
            return true;
        }
        return false;
    };
    const isLastSegment = () => {
        if (currentSegment() < totalSegments()) {
            return false;
        }
        return true;
    };
    const minWindow = () => ((currentSegment() - 1) * parseInt(windowSize, 10)) + 1;
    const maxWindow = () => {
        if (!isLastSegment()) {
            return currentSegment() * parseInt(windowSize, 10);
        }
        return totalPages();
    };
    const isActivePage = (page) => {
        if (parseInt(page, 10) === parseInt(pageIndex, 10)) {
            return true;
        }
        return false;
    };

    const handlePageClick = (page) => {
        onClick(page);
    };

    return (
      <Menu floated="right" pagination>
        <Menu.Item as="a" onClick={() => handlePageClick(1)} icon>
          <Icon name="step backward" />
        </Menu.Item>
        {
        (() => {
            if (!isFirstSegment()) {
                return (
                  <Menu.Item as="a" onClick={() => handlePageClick(minWindow() - 1)} icon>
                    <Icon name="left chevron" />
                  </Menu.Item>
                );
            }
            return (null);
        })()
      }
        {
        map(range(minWindow(), maxWindow() + 1), (index) => (
          <Menu.Item
            active={isActivePage(index)}
            onClick={() => handlePageClick(index)}
            key={index}
            as="a"
          >{index}</Menu.Item>
        ))
      }
        {
        (() => {
            if (!isLastSegment()) {
                return (
                  <Menu.Item as="a" onClick={() => handlePageClick(maxWindow() + 1)} icon>
                    <Icon name="right chevron" />
                  </Menu.Item>
                );
            }
            return (null);
        })()
      }
        <Menu.Item as="a" onClick={() => handlePageClick(totalPages())} icon>
          <Icon name="step forward" />
        </Menu.Item>
      </Menu>
    );
};

const enhance = compose(
  lifecycle({
      getDefaultProps() {
          return {
              totalItems: 11,
              pageIndex: 1,
              itemsPerPage: 4,
              windowSize: 4,
          };
      },
  })
);

export default enhance(Pager);
