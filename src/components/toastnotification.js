const Toastnotification = (props) => {
   return (
      <>
         <div className="toast-container">
            <p className="toast-message">{props.message}</p>
            <button className="toast-cancel" onClick={() => props.onSetShow(false)}>X</button>
         </div>
      </>
   )
};

export default Toastnotification;