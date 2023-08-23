export default function Header({ children, size }) {
  let fontSize = "text-xl";

  if (size === "large") {
    fontSize = "text-2xl";
  }

  return (
    <header>
      <div className=" bg-indigo-200 mx-auto p-4">
        <h1
          className={`text-center  text-white text-4xl font-semibold ${fontSize}`}
        >
          {children}
        </h1>
      </div>
    </header>
  );
}
