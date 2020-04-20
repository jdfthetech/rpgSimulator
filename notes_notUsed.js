
  // only needed to make a new window for the button code
  const BrowserWindow = electron.remote.BrowserWindow

  //how you'd do a button that pops up a window:

  /*
  const button1 = document.getElementById('button1')
  button1.addEventListener('click', function(event){
    const modalPath = path.join('file://',__dirname, 'somefile.html')
    let win = new BrowserWindow({ width: 400, height: 200})
    win.on('close', function() {win = null})
    win.loadURL(modalPath)
    win.show()
  })

  would add button into html this way: 

  <button id="button1">test button1</button>

  */