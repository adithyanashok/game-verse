// Comments
export interface ReviewComment {
  id: number;
  userId: number;
  comment: string;
  parentCommentId?: number | null;
  createdAt: string;
  updatedAt: string;
  isYourComment: boolean;
  username: string;
}

export interface CreateCommentPayload {
  reviewId: number;
  comment: string;
  parentCommentId?: number;
}

export interface UpdateCommentPayload {
  id: number;
  comment: string;
}
