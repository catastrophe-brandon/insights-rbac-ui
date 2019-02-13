import React, { Component } from 'react';
import propTypes from 'prop-types';
import { PageHeader, PageHeaderTitle, Section } from '@red-hat-insights/insights-frontend-components';
import {
  Bullseye,
  DataList
} from '@patternfly/react-core';
import Group from './Group';

class GroupList extends Component {

  state= {
    expanded: []
  };

  toggleExpand = id => {
    const expanded = this.state.expanded;
    const index = expanded.indexOf(id);
    const newExpanded =
        index >= 0 ? [ ...expanded.slice(0, index), ...expanded.slice(index + 1, expanded.length) ] : [ ...expanded, id ];
    this.setState(() => ({ expanded: newExpanded }));
  };

  isExpanded = key => {
    return this.state.expanded.includes(key);
  };

  fetchUserListForGroup = (group) => {
    if (!group.members) {
      return '';
    }

    return group.members.map(user => `${user.first_name} ${user.last_name}`).join(', ');
  };

  render() {
    if (this.props.isLoading) {
      return (
        <PageHeader>
          <PageHeaderTitle title={ this.props.noItems }/>
        </PageHeader>
      );
    }

    // <GroupDetail isExpanded={ expandedList.includes(item.name) } toggle={ toggle }/>) }
    return (
      <React.Fragment>
        <Bullseye>
          <div>
            { this.props.isLoading && (<span color={ '#00b9e4' }> Loading...</span>) }
          </div>
        </Bullseye>
        { (this.props.items && this.props.items.length > 0) && (
          <DataList aria-label="Expandable data list">
            { this.props.items.map((item) => {
              return (
                <Group key= { item.id } item={ item } isExpanded={ this.isExpanded } toggleExpand={ this.toggleExpand }/>);
            }
            )
            }
          </DataList>)
        }
      </React.Fragment>
    );
  };
}


GroupList.propTypes = {
  isLoading: propTypes.bool,
  items: propTypes.array,
  noItems: propTypes.string
};

export default GroupList;
