import aluggy from "./assets/aluggy.svg";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#162D3F]">
      <img
        src={aluggy}
        alt="aluggy logo"
        className="w-[200px] mx-auto mt-[20px]"
      />

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-center font-mono font-bold text-[#EB5020] px-[20px] sm:text-lg md:text-xl">
          Estamos preparando o lugar certo para você encontrar o seu lugar.
        </h1>
      </div>

      <div className="flex justify-center gap-[20px] text-center font-mono text-[#EB5020] underline px-[20px] mb-[20px]">
        <a href="https://github.com/luiz-feliph/" target="_blank">
          GitHub
        </a>

        <a href="mailto:aluggy.app@gmail.com">
          aluggy.app@gmail.com
        </a>
        
      </div>
    </div>
  );
}

export default App;
