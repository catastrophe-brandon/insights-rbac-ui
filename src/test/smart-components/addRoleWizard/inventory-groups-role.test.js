import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import InventoryGroupsRole from '../../../smart-components/role/add-role/inventory-groups-role';
import * as inventoryActions from '../../../redux/actions/inventory-actions';
import * as groupActions from '../../../redux/actions/group-actions';
// import { FETCH_INVENTORY_GROUP } from '../../../redux/action-types'
// import { fetchGroup } from '../../../helpers/group/group-helper';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();

const initialState = {
  inventoryReducer: {
      isLoading: false,
      loadingResources: 0,
      resourceTypes: {
          data: [],
      },
  },
  meta: {
    limit: 20,
    offset: 0,
    itemCount: 0,
  },
}

const testInventoryGroups = [
  {
    account: "6089719",
    created: "2023-07-31T12:44:04.189365+00:00",
    host_count: 2,
    id: "e6b81abe-b7a0-478d-a7e8-69819eda6488",
    name: "fooBar",
    org_id: "11789772",
    updated: "2023-07-31T13:35:18.661580+00:00",
  },
  {
    account: "6089719",
    created: "2023-07-30T13:24:14.687406+00:00",
    host_count: 2,
    id: "6e2f7659-d64f-4bf9-8e51-85971e866ffa",
    name: "rhiqe.2f9917d5-8f46-4fc6-8b49-8a23951ad9a9.laptop-08.sellers-hall.biz",
    org_id: "11789772",
    updated: "2023-08-01T07:10:43.153519+00:00",
  },
  {
    account: "6089719",
    created: "2023-07-30T13:24:18.303223+00:00",
    host_count: 0,
    id: "167688d4-c425-4930-98de-53ef02938c85",
    name: "rhiqe.b59b3b91-da28-4914-9ed5-b05946d0f864.lt-56.key.org",
    org_id: "11789772",
    updated: "2023-07-30T13:24:18.303254+00:00",
  },
  {
    account: "6089719",
    created: "2023-07-30T13:24:16.508664+00:00",
    host_count: 0,
    id: "56ca852f-12ce-4d8a-a3f6-4e4db06ae41a",
    name: "rhiqe.c28a2e1f-0fc7-4c0f-8e66-097fd2979d42.laptop-50.park-baldwin.com",
    org_id: "11789772",
    updated: "2023-07-30T13:24:16.508672+00:00",
  }
]

const renderComponent = (store) => {
    return render(
        <React.Fragment>
            <Provider store={store}>
                <BrowserRouter>
                    <InventoryGroupsRole />
                </BrowserRouter>
            </Provider>
        </React.Fragment>
    );
}

describe('Inventory groups role', () => {
    test('')
    let store;
    let fetchGroups;
    let addMembers;

    
    test('Add permissions to group renders without failing', () => {
        const { container } = render(<InventoryGroupsRole />);
        expect(container).toBeDefined(); 
    });

    test('', () => {
        // const store = mockStore(); 

    });
});
