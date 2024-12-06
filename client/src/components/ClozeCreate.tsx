import { useState } from "react";
import Points from "./sub_components/Points";
import QuestionTypeHeader from "./QuestionTypeHeader";
import Container from "./Container";
import useFetchQuestions from "../hooks/useFetchQuestions";
import { CLOZE } from "../constants";

const ClozeCreate = () => {
  const { data } = useFetchQuestions(CLOZE);
  console.log("cloze data -> ", data);

  const [points, setPoints] = useState("");
  const [preview, setPreview] = useState("A quick ___ fox jumped over a ___");
  const [sentence, setSentence] = useState(
    "A quick brown fox jumped over a fence"
  );
  const [options, setOptions] = useState([
    { id: 1, value: "brown", enabled: true },
    { id: 2, value: "fence", enabled: true },
  ]);
  const [underlinedWords, setUnderlinedWords] = useState<
    Record<string, boolean>
  >({});

  const handleAddOption = () => {
    setOptions([...options, { id: Date.now(), value: "", enabled: false }]);
  };

  const handleRemoveOption = (id: number) => {
    const removedOption = options.find((option) => option.id === id)?.value;
    if (removedOption) {
      // Remove underline and update sentence and preview
      const updatedSentence = sentence.replace(
        `<u>${removedOption}</u>`,
        removedOption
      );
      const updatedPreview = preview.replace("___", removedOption);
      setSentence(updatedSentence);
      setPreview(updatedPreview);
    }
    setOptions(options.filter((option) => option.id !== id));
  };

  const handleWordsUnderline = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString().trim();
      if (selectedText) {
        if (underlinedWords[selectedText]) {
          // If already underlined, remove underline
          const updatedSentence = sentence.replace(
            `<u>${selectedText}</u>`,
            selectedText
          );
          const updatedPreview = preview.replace("___", selectedText);
          const updatedOptions = options.filter(
            (option) => option.value !== selectedText
          );
          setSentence(updatedSentence);
          setPreview(updatedPreview);
          setOptions(updatedOptions);
          const newUnderlinedWords = { ...underlinedWords };
          delete newUnderlinedWords[selectedText];
          setUnderlinedWords(newUnderlinedWords);
        } else {
          // Add underline
          const updatedSentence = sentence.replace(
            selectedText,
            `<u>${selectedText}</u>`
          );
          const updatedPreview = preview.replace(selectedText, "___");
          setSentence(updatedSentence);
          setPreview(updatedPreview);
          setOptions([
            ...options,
            { id: Date.now(), value: selectedText, enabled: true },
          ]);
          setUnderlinedWords({
            ...underlinedWords,
            [selectedText]: true,
          });
        }
      }
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const updatedSentence = e.currentTarget.innerText;
    setSentence(updatedSentence);
    setPreview(updatedSentence); // Synchronize preview initially
  };

  const handlePreview = () => {
    // const data = { question, points, categories, items };
    // console.log("Saved Question:", data);
    alert("Question Saved!");
  };

  return (
    <Container>
      {/* Header Section */}
      <QuestionTypeHeader
        color="green"
        handlePreview={handlePreview}
        type="Create Cloze Question"
        // color="green"
        // handlePreview={()=>void}
      />

      {/* Main Content */}
      <div className="flex justify-start items-start">
        <div className="w-[90%] border border-l-green-200 border-l-8 p-6 rounded-md">
          <div className="flex justify-between items-center mb-6">
            <div className="w-[75%]">
              <label className="block text-lg font-semibold mb-2">
                Preview*
              </label>
              <input
                type="text"
                value={preview}
                readOnly
                className="w-full p-2 border rounded-md focus:outline-slate-200"
              />
            </div>
            <Points points={points} setPoints={setPoints} />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Sentence*
            </label>
            <div
              contentEditable
              onInput={handleInputChange}
              onMouseUp={handleWordsUnderline}
              className="w-full p-2 border rounded-md focus:outline-slate-200"
              // dangerouslySetInnerHTML={{ __html: sentence }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Options</label>
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={option.enabled}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index].enabled = e.target.checked;
                    setOptions(updatedOptions);
                  }}
                  className="mr-2"
                />
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index].value = e.target.value;
                    setOptions(updatedOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 p-2 border rounded-md focus:outline-slate-200"
                />
                <button
                  onClick={() => handleRemoveOption(option.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              onClick={handleAddOption}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              + Add Option
            </button>
          </div>
        </div>
        {/* <SideButtons /> */}
      </div>
    </Container>
  );
};

export default ClozeCreate;
