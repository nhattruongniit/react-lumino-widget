import React from 'react'
import { useSelector } from 'react-redux';
import { BoxPanel, DockPanel, Widget } from "@lumino/widgets";
// import Lumino from './Lumino';
import LuminoMultiTab from './LuminoMultiTab'

const widgets = {
  2: [
    {
      tabTitle: "Error",
      id: '123'
    },
    {
      tabTitle: "Error12312",
      id: 'dag554'
    }
  ],
  3: [
    {
      tabTitle: "tab3-1",
      id: '3123'
    },
    {
      tabTitle: "tab41312",
      id: '1231234'
    },
    {
      tabTitle: "tab3-3",
      id: 'qadq2e123'
    },
    {
      tabTitle: "tab413123131321",
      id: 'greg312'
    }
  ]

}



function CenterBox() {
  const [widgetArrays, setWidgetArrays] = React.useState(widgets)
  const activeTab = useSelector(state => state.widgets.activeTab);

  const main = new BoxPanel({ direction: "left-to-right", spacing: 0 });
  const dock = new DockPanel();

  console.log('widgetArrays: ', widgetArrays[activeTab])


  function handleAddNewAddon() {
    const newWidget = {
      tabTitle: Date.now().toString(),
      id: Date.now()
    }

    const newWidgetArrays = {
      ...widgetArrays,
      [activeTab]: [...widgetArrays[activeTab], newWidget]
    }

    setWidgetArrays(newWidgetArrays)
  }

  return (
    <div>
      <button type='button' onClick={handleAddNewAddon}>add new addon</button>
      {widgetArrays[activeTab].length > 0 && (
        <div key={activeTab}>
          <LuminoMultiTab activeTab={activeTab} widgets={widgetArrays[activeTab]} main={main} dock={dock} />
        </div>
      )}


      {/* {widgetArrays.map(widget => (
        <div key={widget.id}>
          <Lumino activeTab={activeTab} widgets={widgetArrays} layout={layout}/>
        </div>
      ))} */}
    </div>
  )
}

export default CenterBox