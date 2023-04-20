import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
  {
    id: 1,
    userName: "midudev",
    name: "Miguel Ángel Durán",
    initialIsFollowing: true,
  },
  {
    id: 2,
    userName: "ralfxdev",
    name: "Randy López",
    initialIsFollowing: false,
  },
  {
    id: 3,
    userName: "midudev",
    name: "Miguel Ángel Durán",
    initialIsFollowing: true,
  },
  {
    id: 4,
    userName: "ralfxdev",
    name: "Randy López",
    initialIsFollowing: false,
  },
];

export function App() {
  return (
    <>
      {users.map((user) => {
        const { userName, name, initialIsFollowing, id } = user;
        return (
          <TwitterFollowCard
            userName={userName}
            name={name}
            initialIsFollowing={initialIsFollowing}
            key={id}
          />
        );
      })}
    </>
  );
}
