export const makeRoomId = (
  channelId: string,
  roomType: 'channel' | 'direct-message',
) => `${roomType}:${channelId}`
