import iconPlus from "../images/icon-plus.svg";
import iconMinus from "../images/icon-minus.svg";
import { currentUser } from "../data";

const Score = (props) => {
   let plusClass;
   let minusClass;
   let scoreClass;

    if (props.isupvoted && !props.isdownvoted) {
        plusClass = 'plus-clicked';
        minusClass = 'minus-btn';
        scoreClass = 'score-value-up';
    } else if (!props.isupvoted && props.isdownvoted) {
        minusClass = 'minus-clicked';
        plusClass = 'plus-btn';
        scoreClass = 'score-value-down';
    }
    else {
      plusClass = 'plus-btn';
      minusClass = 'minus-btn';
      scoreClass = 'score-value';
    }
   return (
      <div className="comment-score">
         {props.commentUsername === currentUser.username ?
            <>
               <button className="plus-btn notAllowed">
                  <img src={iconPlus} alt="plus"></img>
               </button>
               <p role="score-value" className="score-value">{props.commentScore}</p>
               <button className="minus-btn notAllowed">
                  <img src={iconMinus} alt="minus"></img>
               </button>
            </>
            :
            <>
               <button className={plusClass} onClick={() => props.onPlus(props.commentId, currentUser.username)}>
                  <img src={iconPlus} alt="plus"></img>
               </button>
               <p role="score-value" className={scoreClass}>{props.commentScore}</p>
               <button className={minusClass} onClick={() => props.onMinus(props.commentId, currentUser.username)}>
                  <img src={iconMinus} alt="minus"></img>
               </button>
            </>
         }
      </div>
   )
}

export default Score;