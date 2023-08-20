import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { currentUser, commentsData } from "./data";
import Inputform from "./components/inputform";
import Displaycomments from "./components/displaycomments";
import Editform from "./components/editform";
import Replyform from "./components/replyform";
import Deletealert from "./components/deletealert";
import Toastnotification from "./components/toastnotification";

function App() {
  //localStorage.clear();
  const [comments, setComments] = useState(() => {
    const localComments = JSON.parse(localStorage.getItem("comments"));
    if (localComments?.length > 0) {
      return localComments;
    }
    else {
      const savedComments = commentsData.concat(localComments);
      return savedComments;
    }
  });

  const [comment, setComment] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [currentComment, setCurrentComment] = useState({});

  const [isReplying, setIsReplying] = useState(false);

  const [replyingto, setReplyingto] = useState({});

  const [replyComment, setReplyComment] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  let dltid = useRef("");

  const [show, setShow] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    if (show) {
      timerId.current = setTimeout(() => {
        setShow(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timerId.current);
    };
  }, [show]);

  const [toastmsg, setToastmsg] = useState("");

  useEffect(() => {
    //localStorage.setItem("comments", JSON.stringify(commentsData));
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  console.log(JSON.stringify(commentsData.concat(comments)))
  function handleAddInputChange(e) {
    setComment(e.target.value);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();

    if (comment !== "") {
      let date = new Date();
      let x = date.toLocaleString().substring(0, 10).split('/').reverse().join('-');
      let y = date.toLocaleString().substring(11, 20);
      let formattedDate = x + y;
      setComments([
        ...comments,
        {
          id: uuidv4(),
          content: comment.trim(),
          createdAt: formattedDate,
          score: 0,
          user: currentUser,
          replies: [],
          upVoters: [],
          downVoters: []
        }
      ]);
      setShow(true);
      setToastmsg("Comment submitted successfully");
    }
    setComment("");
  }

  function handleEditInputChange(e) {
    setCurrentComment({
      ...currentComment,
      content: e.target.value
    });
  }

  function handleEditClick(comment) {
    setIsEditing(true);
    setCurrentComment({ ...comment });
  }

  function handleUpdatedComment(id, updatedComment) {
    let array = JSON.parse(localStorage.getItem("comments"));
    array.map((e) => {
      if (e.id === id) {
        e.content = updatedComment.content;
        setIsEditing(false);
        setComments(array);
        setShow(true);
        setToastmsg("Comment updated successfully");
      }
      else {
        e.replies.map((r) => {
          if (r.id === id) {
            r.content = updatedComment.content;
            setIsEditing(false);
            setComments(array);
            setShow(true);
            setToastmsg("Comment updated successfully");
          }
        })
      }
    })
  }

  function handleEditCommentSubmit(e) {
    e.preventDefault();
    handleUpdatedComment(currentComment.id, currentComment);
  }

  function handleDeleteClick(commentToDlt) {
    dltid.current = commentToDlt;
    setIsVisible(true);
  }

  function cancelDelete() {
    setIsVisible(false);
  }
  function proceedDelete() {
    let array = JSON.parse(localStorage.getItem("comments"));
    array.map((e) => {
      if (e.id === dltid.current) {
        const removedComment = array.filter((comment) => {
          return comment.id !== dltid.current;
        });
        array = removedComment;
      }
      else if (e.replies.length > 0) {
        e.replies.map((r) => {
          if (r.id === dltid.current) {
            const removedReply = e.replies.filter((reply) => {
              return reply.id !== dltid.current;
            });
            e.replies = removedReply;
          }
        })
      }
    })
    setComments(array);
    setIsVisible(false);
    setShow(true);
    setToastmsg("Comment deleted successfully");
  }

  function handleReplyClick(comment) {
    setIsReplying(true);
    setReplyingto({ ...comment });
    setReplyComment("");
  }

  function handleReplyInputChange(e) {
    setReplyComment(e.target.value);
  }

  function handleReplyCommentSubmit(e) {
    let array = JSON.parse(localStorage.getItem("comments"));
    e.preventDefault();

    if (replyComment !== "") {
      setIsReplying(false);
      let date = new Date();
      let x = date.toLocaleString().substring(0, 10).split('/').reverse().join('-');
      let y = date.toLocaleString().substring(11, 20);
      let formattedDate = x + y;
      var reply = {
        id: uuidv4(),
        content: replyComment.trim(),
        createdAt: formattedDate,
        score: 0,
        replyingTo: replyingto.user.username,
        user: currentUser,
        replies: [],
        upVoters: [],
        downVoters: []
      }
      array.map((e) => {
        if (e.id === replyingto.id) {
          e.replies.push(reply);
          setComments(array);
          setShow(true);
          setToastmsg("successfully replied to @" + replyingto.user.username);
        }
        else {
          e.replies.map((r) => {
            if (r.id === replyingto.id) {
              e.replies.push(reply);
              setComments(array);
              setShow(true);
              setToastmsg("successfully replied to @" + replyingto.user.username);
            }
          })
        }
      })
    }
    setReplyComment("");
  }

  function handlePlusClick(comment, user) {
    let array = JSON.parse(localStorage.getItem("comments"));
    let selectedComment;

    array.map((e) => {
      if (e.id === comment) {
        selectedComment = e;
      }
      else {
        e.replies.map((r) => {
          if (r.id === comment) {
            selectedComment = r;
          }
        })
      }
    })

    let upvoters = selectedComment.upVoters.includes(user);
    let downVoters = selectedComment.downVoters.includes(user);
    if (!upvoters && !downVoters) {
      selectedComment.score = selectedComment.score + 1;
      selectedComment.upVoters.push(user);
      setComments(array);
    }
    if (!upvoters && downVoters) {
      selectedComment.score = selectedComment.score + 1;
      selectedComment.upVoters.push(user);
      setComments(array);
    }
    if (upvoters && downVoters) {
      selectedComment.score = selectedComment.score + 1;
      selectedComment.upVoters.push(user);
      let down = selectedComment.downVoters.filter(function (name) {
        return name !== user;
      })
      selectedComment.downVoters = down;
      setComments(array);
    }
    setComments(array);
  }

  function handleMinusClick(comment, user) {
    let array = JSON.parse(localStorage.getItem("comments"));
    let selectedComment;

    array.map((e) => {
      if (e.id === comment) {
        selectedComment = e;
      }
      else {
        e.replies.map((r) => {
          if (r.id === comment) {
            selectedComment = r;
          }
        })
      }
    })

    let upvoters = selectedComment.upVoters.includes(user);
    let downVoters = selectedComment.downVoters.includes(user);
    if (!upvoters && !downVoters) {
      selectedComment.score = selectedComment.score - 1;
      selectedComment.downVoters.push(user);
      setComments(array);
    }
    if (upvoters && !downVoters) {
      selectedComment.score = selectedComment.score - 1;
      selectedComment.downVoters.push(user);
      setComments(array);
    }
    if (upvoters && downVoters) {
      selectedComment.score = selectedComment.score - 1;
      selectedComment.downVoters.push(user);
      let up = selectedComment.upVoters.filter(function (name) {
        return name !== user;
      })
      selectedComment.upVoters = up;
      setComments(array);
    }
    setComments(array);
  }
  return (
    <>
      {isVisible ?
        <Deletealert
          onCancelDelete={cancelDelete}
          onProceedDelete={proceedDelete}
        />
        : <></>}

      {show ?
        <Toastnotification
          message={toastmsg}
          onSetShow={setShow}
        />
        : <></>}

      <div className="main-container">
        <div className="contents">

          <Displaycomments
            comments={comments}
            commentClass='comment-container'
            replyCommentClass='comment-container reply-comment'
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onReply={handleReplyClick}
            onPlus={handlePlusClick}
            onMinus={handleMinusClick}

            isEditing={isEditing}
            editing={currentComment.id}

            editFormComponent=
            {<Editform
            currentcomment={currentComment.content}
            onHandleEditCommentSubmit={handleEditCommentSubmit}
            onHandleEditInputChange={handleEditInputChange}
            onSetIsEditing={setIsEditing}
            />}

            isReplying={isReplying}
            replyingid={replyingto.id} 

            replyFormComponent=
            {<Replyform
            replyingto={replyingto}
            onSetIsReplying={setIsReplying}
            onHandleReplyCommentSubmit={handleReplyCommentSubmit}
            replycomment={replyComment}
            onHandleReplyInputChange={handleReplyInputChange}
            />}
          />

          <Inputform
            onHandleCommentSubmit={handleCommentSubmit}
            comment={comment}
            onHandleAddInputChange={handleAddInputChange}
          />

          <footer className="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
            Coded by <a href="#">irthifa ikram</a>.
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;