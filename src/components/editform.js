const Editform = (props) => {
   return (
      <>
         <form className="edit-comment" onSubmit={props.onHandleEditCommentSubmit}>
            <textarea
               autoFocus
               name="edit comment box"
               rows="3"
               placeholder="Edit comment"
               value={props.currentcomment}
               onChange={props.onHandleEditInputChange}
            />
            <br></br>
            <button className="update-btn" type="submit" onClick={props.onHandleEditCommentSubmit}>Update</button>
            <button className="cancel-btn" onClick={() => props.onSetIsEditing(false)}>Cancel</button>
         </form>
      </>
   )
};

export default Editform;