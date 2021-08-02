const remote = require('electron').remote;

/** Create the titlebar elements */
const initialize_bar = function initializeTitleBar() {

    document.body.style.zoom = "500%";

    /** Make the window application a variable from electron */
    const win = remote.getCurrentWindow();

    /** Make the header (class bar) */
    const bar = document.createElement('header');

    /** Add the class to the bar */
    bar.classList.add('bar');

    /** Append it to the document. */
    document.body.appendChild(bar);

    /** If it has a title */
    const title = [...document.head.children].find(e => e.nodeName === 'TITLE');

    if (title) {
        /** Creat the windows title element that'll hold the title */
        const windows_title = document.createElement('div');

        /** Add the id for it */
        windows_title.id = 'window-title';

        /** Then add a span title to the windows title element */
        const title_element = document.createElement('span');

        /** Add the text. */
        title_element.innerText += title.innerText;

        /** Append it to the windows_title element */
        windows_title.appendChild(title_element);

        /** Add it to the bar element */
        bar.appendChild(windows_title)
    }

    /** Add the other elements */

    /** The parent element for each button */
    const controls = document.createElement('div');

    /** Add the id to the controls */
    controls.id = 'window-controls';

    /** Add it to the bar */
    bar.appendChild(controls);

    /**
     * Add a button to the controls
     * 
     * @param {String} id An id to identify
     * @param {String} list An list of icons
     * @param {Function} handler The handler for clicking on the button.
     */
    const add_button = (id, handler=function () {}, draggable=false) => {
        /** Create the button div */
        const button = document.createElement('div');

        /** Add the button class */
        button.classList.add('windows-button');

        /** Set the id */
        button.id = id + '-button';

        /** Add the icon image. */
        button.innerHTML = `<img class="icon" srcset="icons/${id}-w-10.png 1x, icons/${id}-w-12.png 1.25x, icons/${id}-w-15.png 1.5x, icons/${id}-w-15.png 1.75x, icons/${id}-w-20.png 2x, icons/${id}-w-20.png 2.25x, icons/${id}-w-24.png 2.5x, icons/${id}-w-30.png 3x, icons/${id}-w-30.png 3.5x" draggable="${draggable}">`;

        /** Append it to the controls. */
        controls.appendChild(button);

        /** Add the click handler */
        button.onclick = handler;        

        return button;
    }

    /** Add the buttons */

    /** Add the minimize button. */
    add_button('min', () => {
        /** Minimize */
        win.minimize();
    });

    /** Add the maximize button. */
    add_button('max', () => {
        /** Maximize */
        win.maximize();
    });

    /** Add the restore button. */
    add_button('restore', () => {
        /** Restore */
        win.unmaximize();
    });

    /** Add the restore button. */
    add_button('close', () => {
        /** Close */
        win.close();
    });

    /** Taken from the tutorial (toggleMaxRestoreButtons) */
    const iconMax = () => {
        /** If it's maximized */
        if (win.isMaximized()) {
            /** Add the maximized class */
            document.body.classList.add('maximized');
        } else {
            /** If not remove the maximized class so it only shows the correct icon */
            document.body.classList.remove('maximized');
        }
    }

    /** Events */
    win.on('maximize', iconMax);
    win.on('unmaximize', iconMax);
}

/** Add a listener to when the window loads */
window.addEventListener("load", initialize_bar);