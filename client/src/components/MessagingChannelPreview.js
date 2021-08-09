import React, { useContext } from 'react';
import { Avatar, ChatContext } from 'stream-chat-react';

const getTimeStamp = (channel) => {
  let lastHours = channel.state.last_message_at?.getHours();
  let lastMinutes = channel.state.last_message_at?.getMinutes();

  if (lastHours === 0) lastHours = 12;

  if (lastMinutes?.toString()?.length === 1) {
    lastMinutes = `0${lastMinutes}`;
  }

  return `${lastHours}:${lastMinutes}`;
};

const MessagingChannelPreview = ({ channel, latestMessage, setActiveChannel, setIsCreating }) => {
  const { channel: activeChannel, client } = useContext(ChatContext);

  const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

  const selectChannel = () => {
    setIsCreating(false);
    setActiveChannel(channel);
  };

  return (
    <div className={channel?.id === activeChannel?.id ? 'channel-preview__container selected' : 'channel-preview__container'} onClick={selectChannel}>
      <Avatar image={members.length === 1 ? members[0]?.user.image : 'https://www.pngkit.com/png/full/128-1284523_group-chat-icon-google-group-chat-icon.png'} size={40} />
      <div className="channel-preview__content-wrapper">
        <div className="channel-preview__content-top">
          <p className="channel-preview__content-name">{channel.data.name || members[0]?.user.name}</p>
          <p className="channel-preview__content-time">{getTimeStamp(channel)}</p>
        </div>
        <p className="channel-preview__content-message">{latestMessage || 'Send a message'}</p>
      </div>
    </div>
  );
};

export default MessagingChannelPreview;
