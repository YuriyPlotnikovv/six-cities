import {FormEvent, useState, ChangeEvent} from 'react';
import {useAppDispatch} from '../../hooks/store';
import {UserAuth} from '../../types/user';
import {loginUser} from '../../store/actions';
import {INVALID_PASSWORD_MESSAGE, VALID_PASSWORD_REGEXP} from '../../const/const';
import {toast} from 'react-toastify';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!password.match(VALID_PASSWORD_REGEXP)) {
      toast.warn(INVALID_PASSWORD_MESSAGE);
      return;
    }

    const data: UserAuth = {email, password};
    dispatch(loginUser(data));
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden" htmlFor="email">E-mail</label>
          <input
            className="login__input form__input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleEmailChange}
            autoComplete="username"
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden" htmlFor="password">Password</label>
          <input
            className="login__input form__input"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>
        <button className="login__submit form__submit button" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
