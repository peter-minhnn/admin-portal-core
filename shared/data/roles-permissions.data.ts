import { ROLES } from "@/shared/constants";

export const avatarIds: string[] = [];
for (let i = 1; i <= 15; i++) {
  const formattedNumber = i.toString().padStart(2, "0");
  avatarIds.push(formattedNumber);
}

export function getRandomArrayElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const users = [
  {
    id: 1,
    role: ROLES.ADMIN,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds,
    )}.webp`,
  },
  {
    id: 2,
    role: ROLES.ADMIN,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds,
    )}.webp`,
  },
];

export const rolesList = [
  {
    name: ROLES.ADMIN,
    color: "#2465FF",
    users,
  },
  {
    name: ROLES.STAFF,
    color: "#F5A623",
    users,
  },
];

export const roleActions = [
  {
    id: 1,
    name: "Add User",
  },
  {
    id: 2,
    name: "Rename",
  },
  {
    id: 3,
    name: "Remove Role",
  },
];
