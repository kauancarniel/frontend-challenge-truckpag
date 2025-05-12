import { useContext, useState, useEffect } from 'react';
import Star from './Star';
import './FormCommentary.css';
import userContext from '../context/userContext';
import MovieContext from '../context/movieContext';

function FormCommentary({ id }: { id: string }) {
  const [assessment, setComment] = useState({ comment: '', rating: 0 });
  const [showComment, setShowComment] = useState(false);
  const [statiComment, setStaticComment] = useState({ comment: '', rating: 0 });

  const { comments, setComments } = useContext(userContext);
  const { dataApi } = useContext(MovieContext);

  const star = '★';
  const grades = [5, 4, 3, 2, 1];

  useEffect(() => {
    const comment = comments.find((comment) => comment.id === id);
    if (comment) {
      setStaticComment({ comment: comment.comment, rating: comment.rating });
      setComment({ comment: comment.comment, rating: comment.rating });
      setShowComment(true);
    }
  }, [dataApi]);

const handleSubmit = () => {
  const getExistComment = comments.find((comment) => comment.id === id);

  if (getExistComment) {
    const newComments = comments.filter((c) => c.id !== id);
    setComments([...newComments, { id: id, comment: assessment.comment, rating: assessment.rating }]);
    setShowComment(true);
  }
  else {
    setComments([...comments, { id: id, comment: assessment.comment, rating: assessment.rating }]);
    setStaticComment({ comment: assessment.comment, rating: assessment.rating });
    setShowComment(true);
  }

  setComment({ comment: assessment.comment, rating: assessment.rating });
};

  return (
    <>
      <div className="w-full flex flex-wrap justify-around gap-6">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (assessment.rating === 0) console.log('não é possivel adicionar um comentario sem nota');

            !showComment ? handleSubmit() : setShowComment(false);
          }}
        >
          { showComment ? (
            <div className="flex items-center gap-x-2 min-w-[120px]">
              <p className="mb-0 text-[#ffa723] text-[20px]">
                {Array.from({ length: statiComment.rating }, () => star).join('')}
              </p>
            </div>
          ) : (
            <div className="flex justify-between px-1 items-center">
              <h4 className="m-1">Your Rating:</h4>
              <div className="rating flex flex-row-reverse justify-end">
                {grades.map((grade) => (
                  <Star
                    key={grade}
                    grade={grade}
                    setComment={setComment}
                    assessment={assessment}
                    commentId={id}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-y-6">
            <textarea
              className="textarea"
              maxLength={200}
              minLength={0}
              required
              name="comment"
              cols={40}
              rows={3}
              disabled={ showComment }
              value={ assessment.comment }
              onChange={ ({ target: { name, value } }) => {
                setComment({ ...assessment, [name]: value });
              } }
              placeholder="Write your thoughts about this movie..."
            />
            <button
              className="button"
              id="button"
            >
              { !showComment ? "Comment" : "Edit Comment" }
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormCommentary;
