import ListaCancionesPreferidas from "./components/ListaCancionesPreferidas/ListaCancionesPreferidas";
import Analitica from "./components/analitica/Analitica";
import ContactForm from "./components/ContactForm/ContactForm";
import Home from "./components/home/home";

function App() {

  return (
    <>
    <main>
      <Home />
      <ListaCancionesPreferidas />
      <Analitica />
      <ContactForm />
    </main>
    </>
  );
}


export default App;
