import React from 'react';

import { CommandRegistry } from '@lumino/commands';
import { MessageLoop } from '@lumino/messaging';
import { BoxPanel, CommandPalette, ContextMenu, DockPanel, Menu, MenuBar, Widget } from '@lumino/widgets';

const commands = new CommandRegistry();


class ContentWidget extends Widget {
  static createNode() {
      let node = document.createElement('div');
      let content = document.createElement('div');
      let input = document.createElement('input');
      input.placeholder = 'Placeholder...';
      content.appendChild(input);
      node.appendChild(content);
      return node;
  }
  constructor(name) {
      super({ node: ContentWidget.createNode() });
      this.setFlag(Widget.Flag.DisallowLayout);
      this.addClass('content');
      this.addClass(name.toLowerCase());
      this.title.label = name;
      this.title.closable = true;
      this.title.caption = `Long description for: ${name}`;
  }
  get inputNode() {
      return this.node.getElementsByTagName('input')[0];
  }
  onActivateRequest(msg) {
      if (this.isAttached) {
          this.inputNode.focus();
      }
  }
}

function main() {
  let r1 = new ContentWidget('Red');
  let b1 = new ContentWidget('Blue');
  let g1 = new ContentWidget('Green');

  let dock = new DockPanel();

  dock.addWidget(r1);
  dock.addWidget(b1, { mode: 'split-right' });
  dock.addWidget(g1, { mode: 'split-left' });
  dock.id = 'dock';

  let savedLayouts = [];
  commands.addCommand('save-dock-layout', {
    label: 'Save Layout',
    caption: 'Save the current dock layout',
    execute: () => {
      savedLayouts.push(dock.saveLayout());
    }
});
}

function LuminoTony() {
 

  return (
    <div>LuminoTony</div>
  )
}

export default LuminoTony