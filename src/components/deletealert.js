const Deletealert = (props) => {
   return (
      <>
         <div className="confirm-box">
            <div className="confirm-container">
               <h1>Delete comment</h1>
               <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
               <div>
                  <button className="no" onClick={props.onCancelDelete}>no, cancel</button>
                  <button className="yes" onClick={props.onProceedDelete}>yes, delete</button>
               </div>
            </div>
         </div>
      </>
   )
};

export default Deletealert;