
import React from 'react'
import { MenuBar, Menu, Widget } from '@lumino/widgets'
import { CommandRegistry } from '@lumino/commands';

const commands = new CommandRegistry();

function createMenu() {
  let sub1 = new Menu({ commands });
  sub1.title.label = 'More...';
  sub1.title.mnemonic = 0;
  sub1.addItem({ command: 'example:one' });
  sub1.addItem({ command: 'example:two' });
  sub1.addItem({ command: 'example:three' });
  sub1.addItem({ command: 'example:four' });
  

  let sub2 = new Menu({ commands });
  sub2.title.label = 'More...';
  sub2.title.mnemonic = 0;
  sub2.addItem({ command: 'example:one' });
  sub2.addItem({ command: 'example:two' });
  sub2.addItem({ command: 'example:three' });
  sub2.addItem({ command: 'example:four' });

  let root = new Menu({ commands });
  root.addItem({ command: 'example:copy' });
  root.addItem({ command: 'example:cut' });
  root.addItem({ command: 'example:paste' });
  root.addItem({ type: 'separator' });
  root.addItem({ command: 'example:new-tab' });
  root.addItem({ command: 'example:close-tab' });
  root.addItem({ command: 'example:save-on-exit' });
  root.addItem({ type: 'separator' });
  root.addItem({ command: 'example:open-task-manager' });
  root.addItem({ type: 'separator' });
  root.addItem({ command: 'example:close' });

  return root;
}

function MenuBarLumino() {
  const menubarRef = React.useRef(null);

  React.useEffect(() => {
    if (menubarRef.current === null) {
      return;
    }

    commands.addCommand('example:cut', {
      label: 'Cut',
      mnemonic: 1,
      iconClass: 'fa fa-cut',
      execute: () => {
        console.log('Cut');
      }
    });
  
    commands.addCommand('example:copy', {
      label: 'Copy File',
      mnemonic: 0,
      iconClass: 'fa fa-copy',
      execute: () => {
        console.log('Copy');
      }
    });
  
    commands.addCommand('example:paste', {
      label: 'Paste',
      mnemonic: 0,
      iconClass: 'fa fa-paste',
      execute: () => {
        console.log('Paste');
      }
    });
  
    commands.addCommand('example:new-tab', {
      label: 'New Tab',
      mnemonic: 0,
      caption: 'Open a new tab',
      execute: () => {
        console.log('New Tab');
      }
    });
  
    commands.addCommand('example:close-tab', {
      label: 'Close Tab',
      mnemonic: 2,
      caption: 'Close the current tab',
      execute: () => {
        console.log('Close Tab');
      }
    });
  
    commands.addCommand('example:save-on-exit', {
      label: 'Save on Exit',
      mnemonic: 0,
      caption: 'Toggle the save on exit flag',
      execute: () => {
        console.log('Save on Exit');
      }
    });
  
    commands.addCommand('example:open-task-manager', {
      label: 'Task Manager',
      mnemonic: 5,
      isEnabled: () => false,
      execute: () => {}
    });
  
    commands.addCommand('example:close', {
      label: 'Close',
      mnemonic: 0,
      iconClass: 'fa fa-close',
      execute: () => {
        console.log('Close');
      }
    });

    let menu1 = createMenu();
    menu1.title.label = 'File';
    menu1.title.mnemonic = 0;
    

    let menu2 = createMenu();
    menu2.title.label = 'Edit';
    menu2.title.mnemonic = 0;

    let menu3 = createMenu();
    menu3.title.label = 'View';
    menu3.title.mnemonic = 0;


    let bar = new MenuBar();
    bar.addMenu(menu1);
    bar.addMenu(menu2);
    bar.addMenu(menu3);
    bar.id = 'menuBar';

    Widget.attach(bar, menubarRef.current);

    
  }, [menubarRef]);
  return (
    <div ref={menubarRef} className={"main"} />
  )
}

export default MenuBarLumino