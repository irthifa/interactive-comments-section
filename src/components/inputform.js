import { currentUser } from "../data";

const Inputform = (props) => {
   return (
      <>
      <form role="comment-input" className="comment-container add-comment" onSubmit={props.onHandleCommentSubmit}>
                <img  src={require('../images/avatars/image-' + currentUser.username + '.png')} alt={currentUser.username}></img>
                <textarea
                  required
                  name="comment box"
                  rows="3"
                  placeholder="Add a comment..."
                  value={props.comment}
                  onChange={props.onHandleAddInputChange}
                />
                <button className="send-btn" type="submit">SEND</button>
              </form>
      </>
   )
};

export default Inputform;