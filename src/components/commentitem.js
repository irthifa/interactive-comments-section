import iconReply from "../images/icon-reply.svg";
import iconEdit from "../images/icon-edit.svg";
import iconDelete from "../images/icon-delete.svg";

import TimeAgo from 'timeago-react';
import { currentUser } from "../data";
import Score from "./score";

const Commentitem = (props) => {
   return (
      <>
         <div className={props.classname}>
            <Score
               onPlus={props.onPlus}
               onMinus={props.onMinus}
               commentId={props.comment.id}
               commentScore={props.comment.score}
               commentUsername={props.comment.user.username}
               isupvoted={props.comment.upVoters.includes(currentUser.username)}
               isdownvoted={props.comment.downVoters.includes(currentUser.username)}
            />
      
            <div className="comment-info">
               <div role="user" className="user">
                  <div role="user-title" className="user-title">
                     <a href={'#' + props.comment.user.username}><img className="user-img" src={require('../images/avatars/image-' + props.comment.user.username + '.png')} alt={props.comment.user.username}></img></a>
                     <a href={'#' + props.comment.user.username}><h1 className="user-name">{props.comment.user.username}</h1></a>
                     {props.comment.user.username === currentUser.username ?
                        <p className="you">you</p>
                        :
                        null
                     }
                     {props.comment.createdAt.includes("ago") ?
                        <h2 className="createdAt">{props.comment.createdAt}</h2>
                        :
                        <h2 className="createdAt"><TimeAgo datetime={props.comment.createdAt} locale='en' /></h2>
                     }
                  </div>
                  {props.comment.user.username === currentUser.username ?
                     <>
                        <button className="delete-btn" onClick={() => props.onDelete(props.comment.id)}>
                           <img src={iconDelete} alt=""></img>
                           <span> Delete</span>
                        </button>
                        <button className="edit-btn" onClick={() => props.onEdit(props.comment)}>
                           <img src={iconEdit} alt=""></img>
                           <span> Edit</span>
                        </button>
                     </>
                     :
                     <button className="reply-btn" onClick={() => props.onReply(props.comment)}>
                        <img src={iconReply} alt=""></img>
                        <span> Reply</span>
                     </button>
                  }

               </div>
               {props.isEditing ?
                  <>
                     {props.editing === props.comment.id ?
                        props.editFormComponent
                        :
                        <p role="comment-content" className="comment-content"><span>{props.replyingTo} </span>{props.comment.content}</p>
                     }
                  </>
                  :
                  <>
                     <p role="comment-content" className="comment-content"><span>{props.replyingTo} </span>{props.comment.content}</p>
                  </>
               }

            </div>
         </div>
      </>
   )
};

export default Commentitem;