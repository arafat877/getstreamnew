import React, { useEffect } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { CreateChannelIcon } from '../assets';
import SkeletonLoader from './SkeletonLoader';

const MessagingChannelList = ({ children, loading, onCreateChannel }) => {
  const { client, setActiveChannel } = useChatContext();
  const { id, image, name } = client.user || {};

  useEffect(() => {
    const getDemoChannel = async () => {
      const channel = client.channel('messaging', 'first', { name: 'Social Demo', demo: 'social' });
      await channel.watch();
      await channel.addMembers([client.user.id]);
      setActiveChannel(channel);
    };

    if (!loading && !children?.props?.children?.length) getDemoChannel();
  }, [loading]);

  const ListHeaderWrapper = ({ children }) => (
    <div className="messaging__channel-list">
      <div className="messaging__channel-list__header">
        <Avatar image={image} name={name} size={40} />
        <div className="messaging__channel-list__header__name">{name || id}</div>
        <button type="button" className="messaging__channel-list__header__button" onClick={onCreateChannel}>
          <CreateChannelIcon />
        </button>
      </div>
      {children}
    </div>
  );

  if (loading) {
    return (
      <ListHeaderWrapper>
        <div className="messaging__channel-list__message">
          <SkeletonLoader />
        </div>
      </ListHeaderWrapper>
    );
  }

  return <ListHeaderWrapper>{children}</ListHeaderWrapper>;
};

export default MessagingChannelList;
