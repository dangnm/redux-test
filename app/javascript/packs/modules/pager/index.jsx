import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import lifecycle from 'recompose/lifecycle';
import { range, map } from 'lodash';

const Pager = ({
  totalItems,
  pageIndex,
  itemsPerPage,
  onClick,
  ...otherProps
}) => {
  const totalSegments = () => {
    return Math.ceil(parseFloat(totalItems) / parseFloat(itemsPerPage));
  }
  const currentSegment = () => {
    return Math.ceil(parseFloat(pageIndex) / parseFloat(itemsPerPage));
  }
  const isFirstSegment = () => {
    if (currentSegment() == 1) {
      return true;
    };
    return false;
  }
  const isLastSegment = () => {
    if (currentSegment() < totalSegments()) {
      return false
    }
    return true
  }
  const minWindow = () => {
    return (currentSegment() - 1) * parseInt(itemsPerPage) + 1
  }
  const maxWindow = () => {
    if (!isLastSegment()) {
      return currentSegment() * parseInt(itemsPerPage)
    }
    return totalItems
  }
  const isActivePage = (page) => {
    if (parseInt(page) == parseInt(pageIndex)) {
      return true
    }
    return false
  }

  const handlePageClick = (page) => {
    onClick(page)
  }

  return(
    <Menu floated='right' pagination>
      <Menu.Item as='a' onClick={() => handlePageClick(1)} icon>
        <Icon name='step backward' />
      </Menu.Item>
      {
        (() => {
          if (!isFirstSegment()) {
            return (
              <Menu.Item as='a' onClick={() => handlePageClick(minWindow() - 1)} icon>
                <Icon name='left chevron' />
              </Menu.Item>
            )
          }
        })()
      }
      {
        map(range(minWindow(), maxWindow() + 1), (index) => (
          <Menu.Item active={isActivePage(index)} onClick={() => handlePageClick(index)} key={index} as='a'>{index}</Menu.Item>
        )) 
      }
      {
        (() => {
          if (!isLastSegment()) {
            return (
              <Menu.Item as='a' onClick={() => handlePageClick(maxWindow() + 1)} icon>
                <Icon name='right chevron' />
              </Menu.Item>
            )
          }
        })()
      }
      <Menu.Item as='a' onClick={() => handlePageClick(totalItems)} icon>
        <Icon name='step forward' />
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
        itemsPerPage: 4
      }
    }
  })
)

export default enhance(Pager);
