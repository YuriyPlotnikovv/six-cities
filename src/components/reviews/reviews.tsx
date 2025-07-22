import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsItem from '../reviews-item/reviews-item';
import {Review, ReviewAuth} from '../../types/review';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {postReview} from '../../store/actions';
import {getCommentStatus, selectComments} from '../../store/slices/storeData/selectors';
import {getIsAuthorized} from '../../store/slices/storeUser/selectors';

type ReviewProp = {
  id: number;
}

function Reviews({id}: ReviewProp): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectComments);
  const authorizationStatus = useAppSelector(getIsAuthorized);
  const commentStatus = useAppSelector(getCommentStatus);

  const onFormSubmit = (formData: Omit<ReviewAuth, 'id'>) => {
    dispatch(postReview({id, ...formData}));
  };


  return (
    <section className="property__reviews reviews">
      {
        reviews.length > 0 && (
          <>
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

            <ul className="reviews__list">
              {
                reviews.map((review: Review) => (
                  <ReviewsItem key={review.id} review={review}/>
                ))
              }
            </ul>
          </>
        )
      }
      {
        authorizationStatus && <ReviewsForm onSubmit={onFormSubmit} submitStatus={commentStatus}/>
      }
    </section>
  );
}

export default Reviews;
