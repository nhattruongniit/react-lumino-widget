import ReactDOM from "react-dom";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { BoxPanel, DockPanel, Widget } from "@lumino/widgets";
import { Provider, useSelector } from "react-redux";
import { store, useAppDispatch } from "../../app/store";
import {
  selectWidgets,
  deleteWidget,
  activateWidget,
  handleUpdateLayout
} from "./widgetsSlice";
import Watcher from "../counter/Watcher";
import Incrementor from "../counter/Incrementor";
import Decrementor from "../counter/Decrementor";
import "./Lumino.css";

/**
 * LuminoWidget allows us to fire custom events to the HTMLElement that is holding all
 * the widgets. This approach handles the plumbing between Lumino and React/Redux
 */
class LuminoWidget extends Widget {
  constructor(
    id,
    name,
    mainRef,
    closable = true
  ) {
    super({ node: LuminoWidget.createNode(id) });

    this.id = id;
    this.name = name;
    this.mainRef = mainRef;
    this.closable = closable;

    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass("content");

    this.title.label = name; // this sets the tab name
    this.title.closable = closable;
  }

  static createNode(id) {
    const div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
  }

  /**
   * this event is triggered when the user clicks the close button
   */
  onCloseRequest(msg) {
    // create custom event
    const event = new CustomEvent("lumino:deleted", this.getEventDetails());
    // fire custom event to parent element
    this.mainRef?.dispatchEvent(event);
    // continue with normal Widget behaviour
    super.onCloseRequest(msg);
  }

  /**
   * creates a LuminoEvent holding name/id to properly handle them in react/redux
   */
  getEventDetails() {
    return {
      detail: {
        id: this.id,
        name: this.name,
        closable: this.closable,
      },
    };
  }
}

const getComponent = (type) => {
  switch (type) {
    case "WATCHER":
      return Watcher;
    case "INCREMENTOR":
      return Incrementor;
    case "DECREMENTOR":
      return Decrementor;
    default:
      return Watcher;
  }
};

/**
 * This component watches the widgets redux state and draws them
 */

let renderedWidgetIdsRef = {}

const Lumino = ({ widgets, activeTab, main, dock }) => {
  const [attached, setAttached] = useState(false); // avoid attaching DockPanel and BoxPanel twice
  const mainRef = useRef(null); // reference for Element holding our Widgets
  const [renderedWidgetIds, setRenderedWidgetIds] = useState([]); // tracker of components that have been rendered with LuminoWidget already
  // const widgets = useSelector(selectWidgets); // widgetsState
  const dispatch = useAppDispatch();
  const layout = useSelector(state => state.widgets.layout);

  const model = layout[activeTab];

  
// const main = new BoxPanel({ direction: "left-to-right", spacing: 0 });
// const dock = new DockPanel();
  /**
   * creates a LuminoWidget and adds it to the DockPanel. Id of widget is added to renderedWidgets
   */
  const addWidget = useCallback((w) => {
    if (mainRef.current === null) return;
    setRenderedWidgetIds((cur) => [...cur, w.id]);
    renderedWidgetIdsRef = {
      ...renderedWidgetIdsRef,
      [activeTab]: {
        ...renderedWidgetIdsRef[activeTab],
        [w.id]: true
      }
    }
    const lum = new LuminoWidget(w.id, w.tabTitle, mainRef.current, true);
    dock.addWidget(lum);
  }, []);

  /**
   * watch widgets state and calls addWidget for Each. After addWidget is executed we look
   * for the element in the DOM and use React to render the Component into the widget
   * NOTE: We need to use Provider in order to access the Redux State inside the widgets.
   */
  useEffect(() => {
    if (!attached) return;

    widgets.forEach((w) => {
      if (renderedWidgetIds.includes(w.id)) return; // avoid drawing widgets twice
      if (renderedWidgetIdsRef[activeTab] && renderedWidgetIdsRef[activeTab][w.id]) return;

      addWidget(w); // addWidget to DOM
      const el = document.getElementById(w.id); // get DIV
      const Component = getComponent(w.type); // get Component for TYPE
      if (el) {
        // ReactDOM.render(
        //   // draw Component into Lumino DIV
        //   <Provider store={store}>
        //       <Component id={w.id} name={w.tabTitle}  />
        //   </Provider>,
        //   el
        // );
        <Component id={w.id} name={w.tabTitle}  />
      }
    });
  }, [widgets, attached, addWidget, renderedWidgetIds]);

  /**
   * This effect initializes the BoxPanel and the Dockpanel and adds event listeners
   * to dispatch proper Redux Actions for our custom events
   */
  useEffect(() => {
    if (mainRef.current === null || attached === true) {
      return;
    }
    main.id = "main";
    main.addClass("main");
    dock.id = "dock";
    window.onresize = () => main.update();
    BoxPanel.setStretch(dock, 1);
    Widget.attach(main, mainRef.current);
    setAttached(true);
    main.addWidget(dock);

    mainRef.current.addEventListener("lumino:deleted", (e) => {
      const le = new LuminoWidget().getEventDetails();
      dispatch(deleteWidget(le.detail.id));
    });
  }, [mainRef, attached, dispatch]);
  

  // const restoreLayout = mainLayout => () => {
  //   console.log('mainLayout: ', mainLayout)
  //   if(!mainLayout?.main) return;
  //   dock.restoreLayout(mainLayout);
  // }

  function handleSaveLayout() {
    const layout = dock.saveLayout();
    console.log('handleSaveLayout: ', layout)
    if(!layout.main) return;
    dispatch(handleUpdateLayout({
      layout: layout,
      tabId: activeTab
    }))
  }

  useEffect(() => {
    console.log('useEffect: ', model)
    if(!model?.main) return;
    dock.restoreLayout(model);
  }, [model])

  return (
    <>
      <button type="button" onClick={handleSaveLayout}>save layout</button>
      <ul>
        {model && (
          <>
            type:  <div>{model.main.type}</div> <br />
            orientation: <div>{model.main.orientation}</div> <br />
            {/* <button type="button" onClick={restoreLayout(model)}>restore layout</button> */}
          </>
        )}
      </ul>

      <div ref={mainRef} className={"main"} />

    </>
  );
};

export default Lumino;
