import { MemberRole } from '@prisma/client'

export const MemberRoleValueMap = {
  [MemberRole.OWNER]: 3,
  [MemberRole.ADMIN]: 2,
  [MemberRole.MODERATOR]: 1,
  [MemberRole.GUEST]: 0,
}

/**
 * Return true if the current user role has the higher role than the message user role
 *
 * current user role is `currentMemberRole`,
 * message user role is `messageMemberRole`
 */
export const allowDeletionByRoles = (
  currentMemberRole: MemberRole,
  messageMemberRole: MemberRole,
): boolean => MemberRoleValueMap[currentMemberRole] > MemberRoleValueMap[messageMemberRole]
