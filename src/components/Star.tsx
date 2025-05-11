function Star({ grade, setComment, assessment }: {grade: number, setComment: (assessment: { rating: number, comment: string }) => void, assessment: { rating: number, comment: string }}) {
  const { rating } = assessment;
  return (
    <>
      <input
        type="checkbox"
        id={ `star${grade}` }
        key={ `star${grade}` }
        name="rating"
        value={ grade }
        checked={ Number(grade) <= Number(rating) }
        onChange={ ({ target: { name, value } }) => {
          setComment({ ...assessment, [name]: Number(value) });
        } }
      />
      <label htmlFor={ `star${grade}` } title="text" />
    </>
  );
}

export default Star;