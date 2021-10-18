export const userObj: Record<number, string> = {};
export const userEmailToDingtalkObj: Record<string, string> = {};
export const roleObj: Record<number, string> = {};

// action view project的类型，project key 对应 name
export const actionViewProjectKeyToNameObj: Record<string, string> = {};

// action view type的类型，project key + id 对应 name
export const actionViewTypeProjectKeyUnionIdToNameObj: Record<string, string> = {};

export const dingtalkCache = {
  access_token: '',
  access_token_expire: 0
};

export default {
  userObj,
  userEmailToDingtalkObj,
  roleObj,
  actionViewProjectKeyToNameObj,
  actionViewTypeProjectKeyUnionIdToNameObj,
  dingtalkCache
};
