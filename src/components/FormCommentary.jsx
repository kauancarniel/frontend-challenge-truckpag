import React, { useState } from 'react';
import Star from './Star';
import './FormCommentary.css';

function FormCommentary() {
  const [assessment, setComment] = useState({ comment: '', rating: 0 });

  const grades = [5, 4, 3, 2, 1];

  const handleSubmit = () => {
    console.log(assessment.comment)
    console.log(assessment.rating)
  };

  return (
      <div className="w-full flex flex-wrap justify-around gap-6">
        <form
          onSubmit={ (event) => {
            event.preventDefault();
            handleSubmit();
          } }
        >
          <div className="flex justify-between px-1 items-center">
            <h4 className="m-1">Your Rating:</h4>
            <div className="rating flex flex-row-reverse justify-end">
              { grades.map((grade) => (
                <Star
                  key={ grade }
                  grade={ grade }
                  setComment={ setComment }
                  assessment={ assessment }
                />
              )) }
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-6">
            <textarea
              className="textarea"
              maxLength="200"
              required
              name="comment"
              cols="40"
              rows="3"
              value={ assessment.comment }
              onChange={ ({ target: { name, value } }) => {
                setComment({ ...assessment, [name]: value });
              } }
              placeholder="Add a comment..."
            />
            <button
              disabled={ !assessment.comment && !assessment.rating}
              className="button"
              id="button"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
  );
}

export default FormCommentary;
