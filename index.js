/** The main process (electron) */
const { app, BrowserWindow } = require('electron');

/** Others, that may be useful later on. */
const path = require('path');

/** Options for the browser window (options.json) */
const browser_options = require('./options.json');

/**
 * A function to execute when the window is activate
 * 
 * @param {Object} options The options for the browser window 
 * @returns {BrowserWindow}
 */
const initialize_window = (options={}) => {
  /** Make a new browser window */
  const window = new BrowserWindow(options);

  /** Load a file into the window */
  window.loadFile(options.url);

  /** Return the window. */
  return window;
}

/** When the app is ready, then launch up the browser window. */
app.whenReady().then(() => {
  /** Initialize the window */
  initialize_window(browser_options);
});