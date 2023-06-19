import { FC } from 'react'

type Props = {
  name: string,
  age: number,
}

export const Index: FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello {name}!</h1>
      <h2>You are {age} years old.</h2>
    </div>
  );
}