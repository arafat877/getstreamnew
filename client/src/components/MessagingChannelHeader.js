import React, { useEffect, useRef, useState } from 'react';
import { Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfoIcon, ChannelSaveIcon, HamburgerIcon } from '../assets';
import WindowControls from './WindowControls';
import TypingIndicator from './TypingIndicator';

const MessagingChannelHeader = ({ theme, setTheme, toggleMobile }) => {
  const { client } = useChatContext();
  const { channel } = useChannelStateContext();

  const [channelName, setChannelName] = useState(channel?.data.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const inputRef = useRef();

  const members = Object.values(channel.state?.members || {}).filter(
    (member) => member.user?.id !== client.user?.id,
  );

  const updateChannel = async (e) => {
    if (e) e.preventDefault();

    if (channelName && channelName !== channel.data.name) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` },
      );
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!channelName) {
      setTitle(
        members.map((member) => member.user?.name || member.user?.id || 'Unnamed User').join(', '),
      );
    }
  }, [channelName, members]);

  const EditHeader = () => (
    <form
      style={{ flex: 1 }}
      onSubmit={(e) => {
        e.preventDefault();
        inputRef.current.blur();
      }}
    >
      <input
        autoFocus
        className="channel-header__edit-input"
        onBlur={updateChannel}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Type a new name for the chat"
        ref={inputRef}
        value={channelName}
      />
    </form>
  );

  return (
    <div className="messaging__channel-header">
      <div id="mobile-nav-icon" className={`${theme}`} onClick={toggleMobile}>
        <HamburgerIcon />
      </div>
      <Avatar image={members.length === 1 ? members[0]?.user.image : 'https://www.pngkit.com/png/full/128-1284523_group-chat-icon-google-group-chat-icon.png'} size={40} />
      {!isEditing ? (
        <div className="channel-header__name">{channelName || title}</div>
      ) : (
        <EditHeader />
      )}
      <div className="messaging__channel-header__right">
        <TypingIndicator />
        {channelName !== 'Social Demo'
          && (!isEditing ? <ChannelInfoIcon {...{ isEditing, setIsEditing }} /> : <ChannelSaveIcon />)}
      </div>
      <WindowControls theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default React.memo(MessagingChannelHeader);
