import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from 'react';
import {MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RatingStarsTitle, STARS_COUNT, SubmitStatus} from '../../const/const';
import {ReviewAuth} from '../../types/review';

type ReviewsFormProps = {
  onSubmit: (formData: Omit<ReviewAuth, 'id'>) => void;
  submitStatus: SubmitStatus;
}

function ReviewsForm({onSubmit, submitStatus}: ReviewsFormProps): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const isSubmitting = submitStatus === SubmitStatus.Pending;

  const handleChangeRating = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };
  const handleChangeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (text.length < 50) {
      return;
    }

    onSubmit({
      comment: text,
      rating
    });
  };

  useEffect(() => {
    if (submitStatus === SubmitStatus.Fullfilled) {
      setText('');
      setRating(0);
    }

  }, [submitStatus]);

  return (
    <form data-testid="reviews-form" className="reviews__form form" action="#" method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Array.from({length: STARS_COUNT}, (item, key) => {
            const starKey = `${STARS_COUNT - key}-stars` as keyof typeof RatingStarsTitle;
            return (
              <Fragment key={key}>
                <input className="form__rating-input visually-hidden"
                  name="rating"
                  defaultValue={STARS_COUNT - key}
                  id={`${STARS_COUNT - key}-stars`}
                  checked={STARS_COUNT - key === rating}
                  type="radio"
                  onChange={handleChangeRating}
                  disabled={isSubmitting}
                />
                <label htmlFor={`${STARS_COUNT - key}-stars`} className="reviews__rating-label form__rating-label"
                  title={RatingStarsTitle[starKey]}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={text}
        minLength={MIN_COMMENT_LENGTH}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChangeText}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          disabled={isSubmitting || !rating || (text.length < MIN_COMMENT_LENGTH || text.length > MAX_COMMENT_LENGTH)}
          className="reviews__submit form__submit button" type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
