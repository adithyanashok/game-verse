export interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string;
  followerCount: number;
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
