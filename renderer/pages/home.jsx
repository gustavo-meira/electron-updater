import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ipcRenderer } from 'electron';

function Home() {
  const [appVersion, setAppVersion] = React.useState('');
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const [updateDownloaded, setUpdateDownloaded] = React.useState(false);

  useEffect(() => {
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (_, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      setAppVersion(arg.version);
    });
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      setUpdateAvailable(true);
    });
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      setUpdateDownloaded(true);
    });
  }, []);

  const restartApp = () => {
    ipcRenderer.send('update_app');
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <div>
        <p>
          App Version: <strong>{appVersion}</strong>
        </p>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
      {updateAvailable || updateDownloaded && (
          <div>
            <h1>Update Available</h1>
            <p>
              A new version of the app is available. Downloading now...
            </p>
            {
              updateDownloaded && (
                <button onClick={restartApp}>Restart Button</button>
              )
            }
          </div>
        )
      }
    </React.Fragment>
  );
};

export default Home;
