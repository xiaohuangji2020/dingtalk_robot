import { getManager } from 'typeorm';
import { User } from '@/entities/User';
import { ActionViewProject } from '@/entities/ActionViewProject';
import { ActionViewType } from '@/entities/ActionViewType';
import { Robot } from '@/entities/Robot';
// import { Role } from '@/entities/Role';
import localCache from '@/config/LocalCache';

export default async () => {
  const entityManager = getManager();
  const users = await entityManager.find(User);
  users.forEach(user => {
    localCache.userObj[user.userId] = user.userName;
    localCache.userEmailToDingtalkObj[user.email] = user.dingtalkId;
  });

  const actionViewProjects = await entityManager.find(ActionViewProject);
  actionViewProjects.forEach(actionViewProject => {
    localCache.actionViewProjectKeyToNameObj[actionViewProject.key] = actionViewProject.name;
  });

  const actionViewTypes = await entityManager.find(ActionViewType);
  actionViewTypes.forEach(actionViewType => {
    if (!actionViewType.open) {
      return;
    }
    localCache.actionViewTypeProjectKeyUnionIdToNameObj[actionViewType.projectKey + actionViewType.code] = actionViewType.name;
  });
  // const roles = await entityManager.find(Role);
  // roles.forEach(role => {
  //   localCache.roleObj[role.roleId] = role.positionName;
  // });

  const robots = await entityManager.find(Robot);
  const robot = robots.pop();
  if (robot) {
    localCache.robotObj.id = robot.id;
    localCache.robotObj.appKey = robot.appKey;
    localCache.robotObj.appSecret = robot.appSecret;
  }
};
