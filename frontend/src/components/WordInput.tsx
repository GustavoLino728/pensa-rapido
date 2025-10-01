"use client";

type ValidationResult = {
  isValidStart: boolean;
  isRealWord: boolean | null;
  message: string;
}

interface WordInputProps {
  word: string;
  onWordChange: (word: string) => void;
  onValidate: () => void;
  isValidating: boolean;
  validationResult: ValidationResult | null;
  selectedLetter: string | null;
}

export default function WordInput({ 
  word, 
  onWordChange, 
  onValidate, 
  isValidating, 
  validationResult,
  selectedLetter 
}: WordInputProps) {
  
  const getInputClassName = () => {
    let baseClass = "border rounded px-4 py-2 flex-1 ";
    
    if (!validationResult) {
      return baseClass + "border-gray-300";
    }
    
    if (!validationResult.isValidStart) {
      return baseClass + "border-red-500 bg-red-50";
    }
    
    if (validationResult.isRealWord === true) {
      return baseClass + "border-green-500 bg-green-50";
    }
    
    if (validationResult.isRealWord === false) {
      return baseClass + "border-yellow-500 bg-yellow-50";
    }
    
    return baseClass + "border-gray-300";
  };

  return (
    <div className="p-4">
      {selectedLetter && (
        <p className="mb-2 text-sm text-gray-600">
          Digite uma palavra que comece com: <strong>{selectedLetter}</strong>
        </p>
      )}
      
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={word}
          onChange={(e) => onWordChange(e.target.value)}
          placeholder="Digite uma palavra"
          className={getInputClassName()}
          disabled={isValidating}
        />
        <button
          onClick={onValidate}
          disabled={isValidating || !word.trim() || !selectedLetter}
          className={`
            px-4 py-2 rounded font-medium
            ${isValidating || !word.trim() || !selectedLetter
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }
          `}
        >
          {isValidating ? "Validando..." : "OK"}
        </button>
      </div>
      
      {validationResult && (
        <div className={`
          p-2 rounded text-sm
          ${!validationResult.isValidStart 
            ? "bg-red-100 text-red-700" 
            : validationResult.isRealWord 
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
          }
        `}>
          {validationResult.message}
        </div>
      )}
    </div>
  );
}