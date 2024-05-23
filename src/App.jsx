import React from "react";

const App = () => {
  const [text, setText] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");

  const translate = async (e) => {
    e.preventDefault();
    const language = document.getElementById("language").value;
    const text = document.getElementById("text").value;

    if (language === "") {
      alert("Please select a language");
      return;
    }
    if (text === "") {
      alert("Please enter text");
      return;
    }

    try {
      const response = await fetch(
        `https://api.funtranslations.com/translate/${language}.json?text=${text}`
      );
      const data = await response.json();

      if (data.contents.translated) {
        setTranslatedText(data.contents.translated);
      } else {
        setTranslatedText(data.error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };
  const copyTranslatedText = () => {
    navigator.clipboard.writeText(translatedText);
  };

  return (
    <div className="max-w-[100%] mt-[3%] flex-col justify-center items-center">
      <div className="flex mx-28 rounded-md p-3 flex-col justify-center items-center bg-zinc-400 gap-3 text-lg">
        <div>
          <h1>
            English to &nbsp;
            <select
              name="language"
              id="language"
              className="bg-transparent text-stone-900"
            >
              <option value="">Select Language</option>
              <option value="valspeak">Valspeak</option>
              <option value="fudd">Fudd</option>
              <option value="chef">Chef</option>
              <option value="jive">Jive</option>
              <option value="pirate">Pirate</option>
              <option value="redneck">Redneck</option>
              <option value="swedish">Swedish</option>
              <option value="cockney">Cockney</option>
              <option value="valley">Valley</option>
              <option value="kraut">Kraut</option>
              <option value="norwegian">Norwegian</option>
              <option value="leetspeak">Leetspeak</option>
              <option value="morse">Morse</option>
            </select>
          </h1>
        </div>
        <div className="gap-3">
          <div className="m-3">
            <h1>Your Text</h1>
            <textarea
              name="text"
              id="text"
              cols="30"
              rows="10"
              placeholder="Enter Text"
              className="w-[50vw] h-[30vh] border-2 border-gray-300 p-2 rounded-md"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <button onClick={copyText} className="border-2 border-zinc-900 rounded-md bg-zinc-500 hover:bg-zinc-800 ">Copy text</button>
          </div>
          <div className=" m-3">
            <h1>Translated Text</h1>
            <textarea
              name="text"
              id="text"
              cols="30"
              rows="10"
              readOnly
              placeholder="Enter Text"
              value={translatedText}
              className="w-[50vw] h-[30vh] border-2 border-gray-300 p-2 rounded-md"
            ></textarea>
            <button onClick={copyTranslatedText} className="border-2 border-zinc-900 rounded-md bg-zinc-500 hover:bg-zinc-800 ">Copy text</button>
            <div className="flex justify-center mt-3">
              <form onSubmit={translate}>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Translate
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
