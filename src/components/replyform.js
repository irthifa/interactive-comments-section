import { currentUser } from "../data";

const Replyform = (props) => {
   return (
      <>
         <form className="comment-container replying-comment" onSubmit={props.onHandleReplyCommentSubmit}>
            <img src={require('../images/avatars/image-' + currentUser.username + '.png')} alt={currentUser.username}></img>
            <textarea 
               autoFocus
               required
               name="comment box"
               rows="3"
               placeholder={'@' + props.replyingto.user.username}
               value={props.replycomment}
               onChange={props.onHandleReplyInputChange}
            />
            <div className="btns-container">
               <button className="send-btn" type="submit">Reply</button>
               <button className="cancel-btn" onClick={() => props.onSetIsReplying(false)}>Cancel</button>
            </div>
         </form>
      </>
   )
};

export default Replyform;