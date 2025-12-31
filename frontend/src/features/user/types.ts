export interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export interface FollowStatusResponse {
  isFollowing: boolean;
}

export interface UserState {
  topReviewers: UserProfile[];
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  followLoading: boolean;
  followError: string | null;
}

export interface UpdateUserProfilePayload {
  name: string;
  bio: string;
}
