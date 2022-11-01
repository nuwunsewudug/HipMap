import { useState } from "react";
import { useCommentSort } from "../../hoc/useCommetSort";
import { commentsDummy } from "./commentsDummy";
import { CommentWrapperDiv } from "./commentStyle";
import CommentWrapper from "./component/CommentWrapper";
import WriteComment from "./component/writeComment";

export interface comment {
  nickname: string;
  comment_id: string;
  content: string;
  group: number;
  sequence: number;
  create_time: string;
}

export interface selectComment {
  nickname: string;
  index: number;
  comment_id: string;
  group: number;
  sequence: number;
}

interface writeComment extends selectComment {
  content: string;
}
export interface commentsProps {
  comments: comment[];
}

const CommentsWrapper = ({ shortsId }: { shortsId: number }) => {
  const sortedComments = useCommentSort(commentsDummy);
  const [selectComments, setSelectComment] = useState<
    selectComment | undefined
  >();

  const getComment = (e: selectComment) => {
    setSelectComment(e);
  };
  const cleanSelectComment = () => {
    setSelectComment(undefined);
  };
  const getCommentInput = (e: string) => {
    if (selectComments) {
    }
    console.log(e);
  };

  return (
    <CommentWrapperDiv>
      {sortedComments?.map((e, i) => (
        <CommentWrapper
          key={i}
          getComment={getComment}
          comment_id={e.comment_id}
          content={e.content}
          create_time={e.create_time}
          group={e.group}
          index={i}
          nickname={e.nickname}
          sequence={e.sequence}
        />
      ))}
      <div>
        <WriteComment
          nickname={
            selectComments !== undefined ? selectComments.nickname : null
          }
          getCommentInput={getCommentInput}
          cleanSelectComment={cleanSelectComment}
        />
      </div>
    </CommentWrapperDiv>
  );
};

export default CommentsWrapper;
