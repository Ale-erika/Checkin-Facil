import Header from "../components/Header";
import ReactFormPage from "./ReactFormPage";

export default function ReactCheckinPage() {
  return (
    <div>
      <Header>Check-in Fácil</Header>

      <main>
        <div className="container mx-auto p-4">
          <ReactFormPage />
          {/* <h2>O conteúdo fica aqui.</h2> */}
        </div>
      </main>
    </div>
  );
}
