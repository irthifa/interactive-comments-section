import { Fragment } from "react";
import Comment from "./comment";
import Commentitem from "./commentitem";

const Displaycomments = (props) => {
   return (
      <>
         <div className="comment-list">
            {props.comments.map((e =>
               <Fragment key={e.id}>
                  <Comment
                     isReplying={props.isReplying}
                     replyingid={props.replyingid}
                     comment={e}
                     replyFormComponent={props.replyFormComponent}

                     commentItemComponent={<Commentitem
                     classname={props.commentClass}
                     onEdit={props.onEdit}
                     onDelete={props.onDelete}
                     onReply={props.onReply}
                     onPlus={props.onPlus}
                     onMinus={props.onMinus}
                     comment={e}

                     isEditing={props.isEditing}
                     editing={props.editing}
                     editFormComponent={props.editFormComponent}
                     />}
                  />
                  <div className="reply-container">
                  {e.replies === "" ? <></> :
                     e.replies.map(r =>
                        <Comment
                           key={r.id}
                           isReplying={props.isReplying}
                           replyingid={props.replyingid}
                           comment={r}
                           replyFormComponent={props.replyFormComponent}

                           commentItemComponent={<Commentitem
                           classname={props.replyCommentClass}
                           replyingTo={'@' + r.replyingTo}
                           onEdit={props.onEdit}
                           onDelete={props.onDelete}
                           onReply={props.onReply}
                           onPlus={props.onPlus}
                           onMinus={props.onMinus}
                           comment={r}

                           isEditing={props.isEditing}
                           editing={props.editing}
                           editFormComponent={props.editFormComponent}
                           />}
                        />
                        )}
                        </div>
               </Fragment>
            ))}
         </div>
      </>
   )
};

export default Displaycomments;