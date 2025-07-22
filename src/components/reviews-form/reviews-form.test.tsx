import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewsForm from './reviews-form';
import {STARS_COUNT, SubmitStatus} from '../../const/const';

describe('Component: ReviewsForm', () => {
  const mockReview = {
    comment: 'a'.repeat(55),
    rating: 3,
  };
  const onSubmit = jest.fn();

  it('should render correct', () => {
    render(
      <ReviewsForm onSubmit={onSubmit} submitStatus={SubmitStatus.Still}/>
    );

    const stars = screen.getAllByRole('radio');
    expect(screen.getByLabelText(/your review/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /your review/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();
    expect(stars.length).toBe(STARS_COUNT);
  });

  it('should call onSubmit with correct data when form is submitted', async () => {
    render(
      <ReviewsForm onSubmit={onSubmit} submitStatus={SubmitStatus.Still}/> // <--- !
    );

    const stars = screen.getAllByRole('radio');
    await userEvent.click(stars[STARS_COUNT - mockReview.rating]);
    await userEvent.type(screen.getByRole('textbox', {name: /your review/i}), mockReview.comment);
    await userEvent.click(screen.getByRole('button', {name: /submit/i}));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(mockReview);
  });

  // ...остальные тесты также на Still

  it('should disable form fields and button when pending', () => {
    render(
      <ReviewsForm onSubmit={onSubmit} submitStatus={SubmitStatus.Pending}/>
    );

    const button = screen.getByRole('button', {name: /submit/i});
    expect(button).toBeDisabled();
    const textarea = screen.getByRole('textbox', {name: /your review/i});
    expect(textarea).toBeDisabled();
    const stars = screen.getAllByRole('radio');
    stars.forEach((star) => expect(star).toBeDisabled());
  });

  it('should reset text and rating after submitStatus switched to Fullfilled', async () => {
    const {rerender} = render(
      <ReviewsForm onSubmit={onSubmit} submitStatus={SubmitStatus.Still}/>
    );

    const textarea = screen.getByRole('textbox', {name: /your review/i});
    const stars = screen.getAllByRole('radio');
    await userEvent.type(textarea, mockReview.comment);
    await userEvent.click(stars[STARS_COUNT - mockReview.rating]);
    expect(textarea).toHaveValue(mockReview.comment);
    rerender(<ReviewsForm onSubmit={onSubmit} submitStatus={SubmitStatus.Fullfilled}/>);
    expect(textarea).toHaveValue('');
  });
});
