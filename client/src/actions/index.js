import { SIGN_IN, SIGN_OUT } from './types.js';

export const signIn = (userProfile) => {
  return {
    type: SIGN_IN,
    payload: {
      userId: userProfile.getId(),
      email: userProfile.getEmail(),
      fullName: userProfile.getName(),
      firstName: userProfile.getGivenName(),
      lastName: userProfile.getFamilyName(),
      profileImg: userProfile.getImageUrl()
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};