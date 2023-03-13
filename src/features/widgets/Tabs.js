import React from 'react'
import { useSelector } from 'react-redux';
import { store, useAppDispatch } from "../../app/store";

import {
  handleActiveTab,
} from "./widgetsSlice";

function Tabs() {
  const dispatch = useAppDispatch();
  const activeTab = useSelector(state => state.widgets.activeTab);

  const tabs = [
      {
          "id": 2,
          "name": "tab-1",
          "project_id": 9,
          "order": 0,
          "layout": [],
          "created_at": "2023-03-08T14:03:03.000000Z",
          "updated_at": "2023-03-08T14:03:03.000000Z"
      },
      {
          "id": 3,
          "name": "tab-2",
          "project_id": 9,
          "order": 1,
          "layout": [],
          "created_at": "2023-03-08T14:14:32.000000Z",
          "updated_at": "2023-03-08T14:14:32.000000Z"
      }
  ]

  return (
    <div>
      {tabs.map(tab => (
        <button 
          key={tab.id} 
          type="button"
          onClick={() => dispatch(handleActiveTab(tab.id))}
          style={{ background: activeTab === tab.id ? 'red' : 'white'}}
        >
          {tab.name}
        </button>
      ))}
    </div>
  )
}

export default Tabs