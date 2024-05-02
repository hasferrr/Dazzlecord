export const makeRoomId = (
  userId: string,
  channelId: string,
  roomType: 'channel' | 'direct-message',
) => {
  if (roomType === 'channel') {
    return channelId
  } if (roomType === 'direct-message') {
    const sortedIds = [userId, channelId].sort()
    return sortedIds.join(':')
  }
  return ''
}
