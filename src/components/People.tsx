import styled from "styled-components";
import logo from "@/assets/logo.png";

export interface Person {
  name: string;
  role?: string;
  image?: string;
  email?: string;
}

const PeopleListStyle = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const ProfileStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  transition: transform 400ms ease;

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  &:hover {
    transform: translateY(-0.25rem);
  }
`;

const ProfileImage = styled.img<{ size: string }>`
  border-radius: 2rem;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  aspect-ratio: 1/1;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

function Profile({
  name,
  role,
  image,
  email,
  size = "15rem",
}: Person & { size?: string }) {
  const imageAlt = image ? name : "Default profile image";
  image = image || logo.src;

  const content = (
    <ProfileStyle>
      <ProfileImage src={image} alt={imageAlt} size={size} />
      <h1>{name}</h1>
      {role && <h2>{role}</h2>}
    </ProfileStyle>
  );

  return email ? <a href={`mailto:${email}`}>{content}</a> : content;
}

export function PeopleList({
  people,
  size = "15rem",
}: {
  people: Person[];
  size?: string;
}) {
  return (
    <PeopleListStyle>
      {people.map((person) => (
        <Profile key={person.name} {...person} size={size} />
      ))}
    </PeopleListStyle>
  );
}
