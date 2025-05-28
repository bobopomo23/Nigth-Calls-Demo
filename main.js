// main.js

// Importa los módulos necesarios de Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Crea la ventana del navegador.
  const mainWindow = new BrowserWindow({
    width: 1280, // Ancho inicial de la ventana
    height: 720, // Alto inicial de la ventana
    webPreferences: {
      // Es importante considerar la seguridad.
      // nodeIntegration: true, // Habilitar Node.js en el renderer (usar con precaución)
      // contextIsolation: false, // Deshabilitar aislamiento de contexto (usar con precaución)
      // preload: path.join(__dirname, 'preload.js') // Opcional: script para exponer APIs de forma segura
      // Para juegos simples locales, habilitar nodeIntegration puede ser más fácil inicialmente,
      // pero para aplicaciones más complejas, usa preload.js.
      nodeIntegration: true, // Simplificado para este ejemplo
      contextIsolation: false, // Simplificado para este ejemplo
      webSecurity: false // Necesario a veces para cargar archivos locales (file://), pero reduce seguridad. Considera alternativas.
    },
    icon: path.join(__dirname, 'path/to/your/icon.png') // Ruta al icono de la app (opcional)
  });

  // Carga el index.html de tu aplicación.
  // Asegúrate de que tu archivo HTML se llame 'index.html' y esté en la misma carpeta
  mainWindow.loadFile('index.html');

  // Abre las DevTools (herramientas de desarrollador) - opcional, útil para depurar.
  // mainWindow.webContents.openDevTools();

  // Maximiza la ventana (opcional)
  // mainWindow.maximize();

   // Oculta la barra de menú (opcional)
   mainWindow.setMenuBarVisibility(false);

}

// Este método se llamará cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs solo se pueden usar después de que ocurra este evento.
app.whenReady().then(() => {
  createWindow();

  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock se presiona y no hay otras ventanas abiertas.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Salir cuando todas las ventanas estén cerradas, excepto en macOS. Allí, es común
// para aplicaciones y sus barras de menú permanecer activas hasta que el usuario
// salga explícitamente con Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// En este archivo puedes incluir el resto del código específico del proceso principal de tu aplicación
// También puedes ponerlos en archivos separados y requerirlos aquí.
