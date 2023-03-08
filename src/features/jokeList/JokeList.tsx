import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useLazyGetRandomJokeQuery } from './jokeListAPI';
import { selectJokes, addJoke } from './jokeListSlice';

export default function JokeList(): JSX.Element {
  const dispatch = useAppDispatch();
  const jokes = useAppSelector(selectJokes);
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [lazyGetRandomJoke] = useLazyGetRandomJokeQuery();

  function handleSetupChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSetup(event.target.value);
  }

  function handlePunchlineChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPunchline(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(addJoke({ setup, punchline }));
  }

  function handleGetRandomJoke(): void {
    void lazyGetRandomJoke();
  }

  return (
    <div>
      <ul>
        {jokes.map((joke, index) =>
          <li key={index}>{joke.setup} : {joke.punchline}</li>
        )}
      </ul>
      <button onClick={handleGetRandomJoke}>
        Get Random Joke
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={setup}
          name='setup'
          id='setup'
          onChange={handleSetupChange}
        />
        <input
          type='text'
          value={punchline}
          name='punchline'
          id='punchline'
          onChange={handlePunchlineChange}
        />
        <input type='submit' value='Add Joke' />
      </form>
    </div>
  );
}
