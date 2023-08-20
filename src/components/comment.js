const Comment = (props) => {
   return (
      <>
         {props.isReplying ?
            <>
               {props.replyingid === props.comment.id ?
                  (
                     <>
                        {props.commentItemComponent}
                        {props.replyFormComponent}
                     </>
                  ) : (
                     <>
                        {props.commentItemComponent}
                     </>
                  )}
            </>
            :
            <>
               {props.commentItemComponent}
            </>
         }

      </>
   )
};

export default Comment;