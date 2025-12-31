export interface Discussion {
  id: number;
  title: string;
  description: string;
  adminId: number;
  totalMembers: number;
  createdAt: string;
  updatedAt: string;
}
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface FetchDiscussionPayload {
  id: number;
}

export interface CreateDiscussionPayload {
  title: string;
  description: string;
}

export interface Message {
  id?: number;
  content: string;
  sender: {
    id: number;
    name: string;
  };
}

export interface CountPayload {
  totalMembers: number;
  id: number;
}

export interface UserJoinedPayload {
  userId: number;
  message: string;
  totalMembers: number;
}
