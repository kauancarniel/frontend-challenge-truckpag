function Star({ grade, setComment, assessment, commentId }: { 
  grade: number, 
  setComment: (assessment: { rating: number, comment: string }) => void, 
  assessment: { rating: number, comment: string },
  commentId: string
}) {
  const { rating } = assessment;
  return (
    <>
      <input
        type="checkbox"
        id={`star${commentId}-${grade}`}
        key={`star${commentId}-${grade}`}
        min={1}
        name={`rating-${commentId}`}
        value={grade}
        checked={Number(grade) <= Number(rating)}
        onChange={({ target: { value } }) => {
          setComment({ ...assessment, rating: Number(value) });
        }}
      />
      <label htmlFor={`star${commentId}-${grade}`} title="text" />
    </>
  );
}

export default Star;