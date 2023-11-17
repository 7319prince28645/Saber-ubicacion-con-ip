import Results from "./Results";
import { useState } from "react";
function Header({ setDataApp}) {
  const [ip, setIp] = useState("");

  const onChangeIP = () => {
    const inputValue = document.getElementById("address").value;
    setIp(inputValue);
  }
  

  return (
    <>
      <header className="flex gap-4 flex-col items-center py-4 img w-full h-1/4">
        <h1 className="text-xl text-slate-200">IP Address Trackers</h1>
        <label htmlFor="address" className="flex w-3/6">
          <input
            type="text"
            id="address"
            placeholder="Search for any IP address or domain"
            className="rounded-s-xl border-t border-b border-l border-gray-500 px-2 py-2 w-full"
          />
          <p className="bg-black rounded-s-sm w-10 rounded-r-xl imgArrow" onClick={onChangeIP}>
          </p>
        </label>
      </header>
      <Results ip={ip} setDataApp={setDataApp}/>
    </>
  );
}

export default Header;
