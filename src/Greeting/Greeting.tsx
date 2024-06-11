import "./Greeting.scss";

type GreetingProps = {
  greeting: string;
  greetingImage: string;
};

const Greeting = ({ greeting, greetingImage }: GreetingProps) => {
  return (
    <div className="greeting">
      <div className="greeting__image-container">
        <img
          className="greeting__image"
          src={greetingImage}
          alt="current time icon"
        />
      </div>
      <h1 className="greeting__greeting">{greeting}</h1>
    </div>
  );
};

export default Greeting;
