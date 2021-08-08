import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList } from 'stream-chat-react';

import { CreateChannel, CustomMessage, MessagingChannelList, MessagingChannelPreview, MessagingInput, MessagingThreadHeader } from './components';
import { ChannelInner } from './components/ChannelInner/ChannelInner';
import { useChecklist } from './ChecklistTasks';
import { getRandomImage } from './assets';

import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
  LoadingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

// import WindowControls from './components/WindowControls/WindowControls';

import 'stream-chat-react/dist/css/index.css';
import './App.css';
import Auth from './components/Auth/Auth';

const urlParams = new URLSearchParams(window.location.search);

const apiKey = urlParams.get('apikey') || process.env.REACT_APP_STREAM_KEY || "e6nfz3p5c2qb";
const user = urlParams.get('user') || process.env.REACT_APP_USER_ID || "adrianhajdin";
const userToken = urlParams.get('user_token') || process.env.REACT_APP_USER_TOKEN ||"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoid2lsZC12b2ljZS05In0.g1VeBhppAnfX8AZJTcuKNz_oIskszvAd43ieRykkSN0";
const targetOrigin = urlParams.get('target_origin') || process.env.REACT_APP_TARGET_ORIGIN;

// const noChannelNameFilter = urlParams.get('no_channel_name_filter') || false;
// const skipNameImageSet = urlParams.get('skip_name_image_set') || false;

// const filters = noChannelNameFilter
//   ? { type: 'messaging', members: { $in: [user] } }
//   : { type: 'messaging', name: 'Social Demo', demo: 'social' };

const options = { state: true, watch: true, presence: true, limit: 8 };

const sort = {
  last_message_at: -1,
  updated_at: -1,
  cid: 1,
};

const id = localStorage.getItem('userId');
const name = localStorage.getItem('username');
const image = localStorage.getItem('image');

const userToConnect = { id, name, image};

// if (skipNameImageSet) {
//   delete userToConnect.name;
//   delete userToConnect.image;
// }

export const GiphyContext = React.createContext({});

const App = () => {
  const [chatClient, setChatClient] = useState(null);
  const [giphyState, setGiphyState] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useChecklist(chatClient, targetOrigin);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey);
      const id = localStorage.getItem('userId');
      const name = localStorage.getItem('username');
      const image = localStorage.getItem('image');

      console.log({ id, name, image })

      await client.connectUser({ id, name, image, }, token);

      setChatClient(client);
    };

    if(token) {
      initChat();
    }

    return () => chatClient.disconnectUser();
  }, [token]); // eslint-disable-line

  useEffect(() => {
    const handleThemeChange = ({ data, origin }) => {
      // handle events only from trusted origin
      if (origin === targetOrigin) {
        if (data === 'light' || data === 'dark') {
          setTheme(data);
        }
      }
    };

    window.addEventListener('message', handleThemeChange);
    return () => window.removeEventListener('message', handleThemeChange);
  }, []);

  useEffect(() => {
    const mobileChannelList = document.querySelector('#mobile-channel-list');
    if (isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else if (!isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }, [isMobileNavVisible]);

  useEffect(() => {
    /*
     * Get the actual rendered window height to set the container size properly.
     * In some browsers (like Safari) the nav bar can override the app.
     */
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();

    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  const toggleMobile = () => setMobileNav(!isMobileNavVisible);

  const giphyContextValue = { giphyState, setGiphyState };

  
  // <WindowControls setTheme={setTheme} />
  
  const CustomList = (props) => {
    const { children, error, loading, LoadingErrorIndicator, LoadingIndicator } = props;
  
    if (error) {
      return <LoadingErrorIndicator type={'connection'} />;
    }
  
    if (loading) {
      return <LoadingIndicator />;
    }
  
    return <div>{children}</div>;
  };
  
  const CustomErrorIndicator = (props) => {
    const { text } = props;
  
    return <div>{text}</div>;
  };
  
  const CustomLoadingIndicator = () => {
    return <div>Loading, loading, loading...</div>;
  };
  
  if (!localStorage.getItem('token')) return <Auth />
  if (!chatClient) return null;

  // return (
  //   <Chat client={chatClient} theme={`messaging ${theme}`}>
  //   <div id="mobile-channel-list" onClick={toggleMobile}>
  //     <ChannelList 
  //       sort={sort} 
  //       options={options}
  //       // showChannelSearch
  //       List={(props) => (
  //           <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
  //         )}
  //         Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
  //     />
  //   </div>
  //   <Channel>
  //     <Window>
  //       <ChannelHeader />
  //       <MessageList />
  //       <MessageInput />
  //     </Window>
  //     <Thread />
  //   </Channel>
  // </Chat>

  // )

  return (
    <Chat client={chatClient} theme={`messaging ${theme}`}>
      <div id='mobile-channel-list' onClick={toggleMobile}>
        <ChannelList
          // filters={filters}
          sort={sort}
          options={options}
          List={(props) => (
            <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
          )}
          Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
        />
      </div>
      <div>
        <Channel
          Input={MessagingInput}
          maxNumberOfFiles={10}
          Message={CustomMessage}
          multipleUploads={true}
          ThreadHeader={MessagingThreadHeader}
          TypingIndicator={() => null}
        >
          {isCreating && (
            <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />
          )}
          <GiphyContext.Provider value={giphyContextValue}>
            <ChannelInner theme={theme} toggleMobile={toggleMobile} />
          </GiphyContext.Provider>
        </Channel>
      </div>
    </Chat>
  );
};

export default App;
